import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Pagemqtt from "./Pagemqtt";

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
        setisShown(true);
    }

    return (
        <div className="container-fluid mt-2">
            {
                (datamac === undefined) ? <div className="page-heading-home"> <h1>กรุณาเพิ่มอุปกรณ์</h1> </div>
                    :
                    (isShown === true) ?
                        < Pagemqtt macaddress={datamac} />
                        : null
            }


        </div >
    );
}

export default Home;