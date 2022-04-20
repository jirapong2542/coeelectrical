import React, { useEffect, useState } from "react";
import mqtt from 'mqtt/dist/mqtt';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";

const Pagemqtt = (props) => {
    const [showdate, setshowdate] = useState();
    const [isShown, setIsShown] = useState(false);
    const max = ['240', '95', '99999', '99999', '60', '5']
    const [datavotage1, setDatavotage1] = useState(['0']);
    const [datavotage2, setDatavotage2] = useState(['0']);
    const [datavotage3, setDatavotage3] = useState(['0']);
    const [datacurrent1, setDatacurrent1] = useState(['0']);
    const [datacurrent2, setDatacurrent2] = useState(['0']);
    const [datacurrent3, setDatacurrent3] = useState(['0']);

    const [datapower1, setDatapower1] = useState(['0']);
    const [datapower2, setDatapower2] = useState(['0']);
    const [datapower3, setDatapower3] = useState(['0']);


    useEffect(() => {
        //console.log(props)
        const client = mqtt.connect('wss://broker.emqx.io/mqtt', { port: 8084 });
        client.on('connect', () => {
            client.subscribe(props.macaddress);
        });

        client.on('message', (topic, message) => {
            let obj = JSON.parse(message.toString());
            //console.log(obj.data[2]);
            datavotage1.push(obj.data[0].output[0]);
            datavotage2.push(obj.data[0].output[1]);
            datavotage3.push(obj.data[0].output[2]);
            datacurrent1.push(obj.data[1].output[0]);
            datacurrent2.push(obj.data[1].output[1]);
            datacurrent3.push(obj.data[1].output[2]);
            datapower1.push(obj.data[2].output[0]);
            datapower2.push(obj.data[2].output[1]);
            datapower3.push(obj.data[2].output[2]);
            //console.log(test)
            setshowdate(obj.data)
            setIsShown(true);
        });
        return () => {
            client.end();
        }
    }, []);




    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1800,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })


    const series1 = [
        {
            name: 'Phase 1',
            type: 'line',
            data: datavotage1
        },
        {
            name: 'Phase 2',
            type: 'line',
            data: datavotage2
        }, {
            name: 'Phase 3',
            type: 'line',
            data: datavotage3
        }
    ];
    const series2 = [
        {
            name: 'Phase 1',
            type: 'line',
            data: datacurrent1
        },
        {
            name: 'Phase 2',
            type: 'line',
            data: datacurrent2
        }, {
            name: 'Phase 3',
            type: 'line',
            data: datacurrent3
        }
    ];
    const series3 = [
        {
            name: 'Phase 1',
            type: 'line',
            data: datapower1
        },
        {
            name: 'Phase 2',
            type: 'line',
            data: datapower2
        }, {
            name: 'Phase 3',
            type: 'line',
            data: datapower3
        }
    ];
    const options1 = {
        chart: {
            background: 'rgba(0, 0, 0, 0.5)',
            id: 'realtime',
            height: 350,
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
            zoom: {
                enabled: true
            },

        },
        colors: ['#19e6a0', '#1798f9', '#df513d'],
        title: {
            text: 'Realtime Voltage',
            align: 'left',
            style: {
                fontSize: '25px',
                fontWeight: 'bold',
                color: 'white'
            }
        },
        theme: {
            mode: 'dark',
        },
        xaxis: {
            labels: {
                format: 'dd/MM',
                formatter: function (value, timestamp) {
                    return new Date().toLocaleString('af-ZA', {
                        timeZone: 'Asia/Bangkok'
                    });
                },
                style: {
                    fontSize: '5px'
                }
            }
        }
    };
    const options2 = {
        chart: {
            background: 'rgba(0, 0, 0, 0.5)',
            id: 'realtime',
            height: 350,
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
            zoom: {
                enabled: true
            },

        },
        colors: ['#19e6a0', '#1798f9', '#df513d'],
        title: {
            text: 'Realtime Current',
            align: 'left',
            style: {
                fontSize: '25px',
                fontWeight: 'bold',
                color: 'white'
            }
        },
        theme: {
            mode: 'dark',
        },
        xaxis: {
            labels: {
                format: 'dd/MM',
                formatter: function (value, timestamp) {
                    return new Date().toLocaleString('af-ZA', {
                        timeZone: 'Asia/Bangkok'
                    });
                },
                style: {
                    fontSize: '5px'
                }
            }
        }
    };
    const options3 = {
        chart: {
            background: 'rgba(0, 0, 0, 0.5)',
            id: 'realtime Power',
            height: 350,
            type: 'line',
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 1000
                }
            },
            zoom: {
                enabled: true
            },

        },
        colors: ['#19e6a0', '#1798f9', '#df513d'],
        title: {
            text: 'Realtime Current',
            align: 'left',
            style: {
                fontSize: '25px',
                fontWeight: 'bold',
                color: 'white'
            }
        },
        theme: {
            mode: 'dark',
        },
        xaxis: {
            labels: {
                format: 'dd/MM',
                formatter: function (value, timestamp) {
                    return new Date().toLocaleString('af-ZA', {
                        timeZone: 'Asia/Bangkok'
                    });
                },
                style: {
                    fontSize: '5px'
                }
            }
        }
    };


    return (
        <div>
            {(isShown === true) ?
                <>
                    <div className="container-fluid">
                        <div className="row  ">
                            <div className="d-flex justify-content-center col col-md-4 ">
                                <Chart options={options1} series={series1} type="line" height={300} width={480} />
                            </div>
                            <div className="d-flex justify-content-center col col-md-4">
                                <Chart options={options2} series={series2} type="line" height={300} width={480} />
                            </div>
                            <div className="d-flex justify-content-center col col-md-4">
                                <Chart options={options3} series={series3} type="line" height={300} width={480} />
                            </div>
                        </div>
                    </div>

                    <div className="row row-cols-lg-6 mb-2">
                        {
                            showdate.map((date, index) => {
                                return (
                                    <div className="col">
                                        <div className={"cards  " + (index === index && date.output[0] >= 0 && date.output[0] <= max[index] ? 'border border-3 border-success' : 'border border-3 border-danger')}>
                                            <h4 className="text-white text-center ">{date.title} 1</h4>
                                            <div className="text-white text-center"><h3>{date.output[0]}</h3></div>
                                            <div className="text-white text-center"><h3>{date.unit}</h3></div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div >
                    <div className="row row-cols-lg-6 mb-2">
                        {
                            showdate.map((date, index) => {
                                return (
                                    <div className="col">
                                        <div className={"cards  " + (index === index && date.output[0] >= 0 && date.output[0] <= max[index] ? 'border border-3 border-success' : 'border border-3 border-danger')}>
                                            <h4 className="text-white text-center">{date.title} 2</h4>
                                            <div className="text-white text-center"><h3>{date.output[1]}</h3></div>
                                            <div className="text-white text-center"><h3>{date.unit}</h3></div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div >
                    <div className="row row-cols-lg-6 mb-2">
                        {
                            showdate.map((date, index) => {
                                return (
                                    <div className="col">
                                        <div className={"cards  " + (index === index && date.output[0] >= 0 && date.output[0] <= max[index] ? 'border border-3 border-success' : 'border border-3 border-danger')}>
                                            <h4 className="text-white text-center">{date.title} 3</h4>
                                            <div className="text-white text-center"><h3>{date.output[2]}</h3></div>
                                            <div className="text-white text-center"><h3>{date.unit}</h3></div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div >
                    <div className="row row-cols-lg-6 mb-2">
                        {
                            showdate.map((date, index) => {
                                if (index === 0 && date.output[0] >= props.Voltage) {
                                    Toast.fire({
                                        icon: 'error',
                                        title: 'ไฟฟ้าทำงานผิดปกติ'
                                    })
                                }
                                if (index === 1 && date.output[0] >= props.Current) {
                                    Toast.fire({
                                        icon: 'error',
                                        title: 'กระแสไฟฟ้าทำงานผิดปกติ'
                                    })
                                }
                                if (index === 2 && date.output[0] >= props.Power) {
                                    Toast.fire({
                                        icon: 'error',
                                        title: 'กำลังไฟฟ้าทำงานผิดปกติ'
                                    })
                                }
                                return (
                                    <>
                                        {/* <div className="col">
                                            <div className={"cards  " + (index === index && date.output[0] >= 0 && date.output[0] <= max[index] ? 'border border-3 border-success' : 'border border-3 border-danger')}>
                                                <h4 className="text-white text-center">{date.title}</h4>
                                                <div className="text-white text-center"><h3>{((date.output[0] + date.output[1] + date.output[2]) / 3).toFixed(2)}</h3></div>
                                                <div className="text-white text-center"><h3>{date.unit}</h3></div>
                                            </div>
                                        </div> */}
                                    </>
                                )

                            })
                        }
                    </div >

                </>
                : <div className="page-heading-home"><h1>กรุณารออุปกรณ์ทำงาน</h1></div>
            }
        </div >
    );
}
export default Pagemqtt;