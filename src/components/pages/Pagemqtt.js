import React, { useEffect, useState } from "react";
import mqtt from 'mqtt/dist/mqtt';
import Swal from 'sweetalert2/dist/sweetalert2.js'


const Pagemqtt = (props) => {
    const [showdate, setshowdate] = useState();
    const [isShown, setIsShown] = useState(false);
    const max = ['235', '80', '10000', '10000', '60', '5']

    useEffect(() => {
        console.log(props)
        const client = mqtt.connect('wss://broker.emqx.io/mqtt', { port: 8084 });
        client.on('connect', () => {
            client.subscribe(props.macaddress);
        });

        client.on('message', (topic, message) => {
            let obj = JSON.parse(message.toString());
            //console.log(obj.data);
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


    return (
        <div>
            {(isShown === true) ?
                <>
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
                                    <div className="col">
                                        <div className={"cards  " + (index === index && date.output[0] >= 0 && date.output[0] <= max[index] ? 'border border-3 border-success' : 'border border-3 border-danger')}>
                                            <h4 className="text-white text-center">{date.title}</h4>
                                            <div className="text-white text-center"><h3>{((date.output[0] + date.output[1] + date.output[2]) / 3).toFixed(2)}</h3></div>
                                            <div className="text-white text-center"><h3>{date.unit}</h3></div>
                                        </div>
                                    </div>
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