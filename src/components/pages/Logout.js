import React, { useEffect } from "react";
import { useHistory } from "react-router-dom"
const Logout = (props) => {

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        //console.log(token);
        if (token) {

            localStorage.removeItem('token');
            props.setIsLogin(false);
            history.replace('/login');
            return;
        }
        history.replace('/login');
    });

    return (
        <div>
        </div >
    );

}
export default Logout;