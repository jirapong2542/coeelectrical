import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Pagemqtt from "./Pagemqtt";

import mqtt from 'mqtt/dist/mqtt';
import { ApiServer } from '../Configs/Configserver';


const Home = (props) => {
    props.setIsLogin(true)
    const history = useHistory();
    const [datamac, setDatamac] = useState("");
    const [isShown, setisShown] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.replace('/login');
            return;
        }
        test(token);
    }, []);

    const test = async (token) => {

        var { usr_id } = jwt_decode(token);
        const { data } = await axios.post((ApiServer + '/macaddress'), {
            usr_id
        });
        setDatamac(data.m_mac_address)
        //setisShown(true);

        test1(data.m_mac_address);
    }

    const test1 = (macaddress) => {

        console.log()
        const client = mqtt.connect('wss://broker.emqx.io/mqtt', { port: 8084 });
        client.on('connect', () => {
            client.subscribe(macaddress);
        });

        client.on('message', (topic, message) => {
            let obj = JSON.parse(message.toString());
            console.log(obj);
        });
        return () => {
            client.end();
        }
    }

    return (
        <div className="container-fluid mt-2">
            {
                (datamac === undefined) ? <div className="page-heading-home"> <h1>กรุณาเพิ่มอุปกรณ์</h1> </div>
                    :
                    (isShown === true) ? null
                        // < Pagemqtt macaddress={datamac} />
                        : null
            }


        </div >
    );
}

export default Home;