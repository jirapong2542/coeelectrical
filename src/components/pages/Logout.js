import React, { useEffect } from "react";
import { useHistory } from "react-router-dom"
const Logout = (props) => {

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');
        //console.log(token);
        if (token) {

            localStorage.removeItem('token');
            localStorage.removeItem('tokenadmin');
            props.setIsLogin(false);
            history.replace('/login');
            return;
        }
        localStorage.removeItem('tokenadmin');
        history.replace('/login');
    });

    return (
        <div>
        </div >
    );

}
export default Logout;