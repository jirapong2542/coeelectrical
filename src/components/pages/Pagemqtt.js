import React, { useEffect, useState } from "react";
import mqtt from 'mqtt/dist/mqtt';



const Pagemqtt = (props) => {
    const [showdate, setshowdate] = useState();
    const [isShown, setIsShown] = useState(false);
    useEffect(() => {

        const client = mqtt.connect('ws://broker.emqx.io/mqtt', { port: 8083 });
        client.on('connect', () => {
            client.subscribe(props.macaddress);
        });

        client.on('message', (topic, message) => {
            let obj = JSON.parse(message.toString());
            console.log(obj.data);
            setshowdate(obj.data)
            setIsShown(true);
        });
        return () => {
            client.end();
        }
    }, []);

    return (
        <div>
            {(isShown === true) ?
                <>
                    <div className="row row-cols-lg-6 mb-2">
                        {
                            showdate.map((date, index) => {
                                return (
                                    <div className="col">
                                        <div class="cards">
                                            <h4 className="text-white text-center">{date.title} 1</h4>
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
                                        <div class="cards">
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
                                        <div class="cards">
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
                                return (
                                    <div className="col">
                                        <div class="cards">
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