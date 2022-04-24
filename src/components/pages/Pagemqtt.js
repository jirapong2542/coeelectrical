import React, { useEffect, useState } from "react";
import mqtt from 'mqtt/dist/mqtt';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Chart from "react-apexcharts";

const Pagemqtt = (props) => {
    const [showdate, setshowdate] = useState();
    const [isShown, setIsShown] = useState(false);
    const max = ['240', '95', '99999', '99999', '60', '5']
    const [datavotage1, setDatavotage1] = useState([]);
    const [datavotage2, setDatavotage2] = useState([]);
    const [datavotage3, setDatavotage3] = useState([]);


    const [datacurrent1, setDatacurrent1] = useState([]);
    const [datacurrent2, setDatacurrent2] = useState([]);
    const [datacurrent3, setDatacurrent3] = useState([]);

    const [datapower1, setDatapower1] = useState([]);
    const [datapower2, setDatapower2] = useState([]);
    const [datapower3, setDatapower3] = useState([]);


    useEffect(() => {
        //console.log(props)
        const client = mqtt.connect('wss://broker.emqx.io/mqtt', { port: 8084 });
        client.on('connect', () => {
            client.subscribe(props.macaddress);
        });
        let v1 = []
        let v2 = []
        let v3 = []
        let c1 = []
        let c2 = []
        let c3 = []
        let p1 = []
        let p2 = []
        let p3 = []
        client.on('message', (topic, message) => {
            let obj = JSON.parse(message.toString());
            //console.log(obj.data[2]);
            v1.push(obj.data[0].output[0])
            v2.push(obj.data[0].output[1])
            v3.push(obj.data[0].output[2])
            c1.push(obj.data[1].output[0])
            c2.push(obj.data[1].output[1])
            c3.push(obj.data[1].output[2])
            p1.push(obj.data[2].output[0])
            p2.push(obj.data[2].output[1])
            p3.push(obj.data[2].output[2])
            if (v1.length && c1.length && p1.length >= 10) {

                //console.log("เข้า")
                v1.splice(0, 1)
                v2.splice(0, 1)
                v3.splice(0, 1)
                c1.splice(0, 1)
                c2.splice(0, 1)
                c3.splice(0, 1)
                p1.splice(0, 1)
                p2.splice(0, 1)
                p3.splice(0, 1)
            }
            setDatavotage1(v1);
            setDatavotage2(v2);
            setDatavotage3(v3);
            setDatacurrent1(c1);
            setDatacurrent2(c2);
            setDatacurrent3(c3);
            setDatapower1(p1);
            setDatapower2(p2);
            setDatapower3(p3);

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
                enabled: false
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
                enabled: false
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
        },
        // stroke: {
        //     show: true,
        //     curve: 'smooth',
        //     lineCap: 'butt',
        //     colors: undefined,
        //     width: 5,
        //     dashArray: 0,
        // }
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
                enabled: false
            },

        },
        colors: ['#19e6a0', '#1798f9', '#df513d'],
        title: {
            text: 'Realtime Power',
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
                                if (index === 0 && date.output[0] <= 5) {
                                    Toast.fire({
                                        icon: 'error',
                                        title: 'ไฟฟ้าดับ'
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