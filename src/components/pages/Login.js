
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { ApiServer } from '../Configs/Configserver';

const Login = (props) => {
    props.setIsLogin(false)
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleLogin = async () => {
        const { data, status } = await axios.post((ApiServer + '/login'), {
            username,
            password
        });
        if (data.token === undefined) {
            console.log('รหัสผิด' + status)
            setError(true);
            return;
        }

        localStorage.setItem('token', data.token);
        props.setIsLogin(true)
        history.replace('/home');
    }
    return (
        //<form>
        <div className="page-heading-login">
            <div className="login-form">
                <div className="logo-login">COE</div>
                <div>
                    <div className="form-group">
                        {/* //<label className="login-label">Email Address</label> */}
                        <label className="login-label">Username</label>
                        <input className="inputlogin" type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div class="form-group">
                        <label className="login-label">Password</label>
                        <input className="inputlogin" type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div class="login-button">
                        <input className="buttonlogin" type="button"
                            value={"Login"}
                            onClick={handleLogin}
                        ></input>
                    </div>
                    <div style={{ textAlign: "center", color: "#ff0a0ac9" }}>
                        {error && <p>ตรวจสอบใหม่</p>}

                    </div>
                    <div className="login-content">
                        <center><h4>สาขาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย</h4></center>
                    </div>
                </div>
            </div>
        </div>

    );

}
export default Login;