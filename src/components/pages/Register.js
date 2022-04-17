

import React, { useState } from "react";
import axios from "axios";


import { ApiServer } from '../Configs/Configserver';

const Register = () => {


    const [Username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [confirm, setconfirm] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');
    const [error, setError] = useState('');

    const handlereg = async () => {


        if (Username === "") {
            setError('ยังไม่กรอก Username');
        } if (password === "") {
            setError('ยังไม่กรอก Password');
        } if (confirm === "") {
            setError('ยังไม่กรอก Confirm Password');
        } if (firstname === "") {
            setError('ยังไม่กรอก First Name');
        } if (lastname === "") {
            setError('ยังไม่กรอก Last Name');
        } if (password !== confirm) {
            setError('รหัสผ่านไม่ตรงกัน');
        } if (Username !== "" && firstname !== "" && lastname !== "" && (password === confirm)) {


            // const { data } = await axios.post((ApiServer + '/adminuser'));
            const { data } = await axios.post((ApiServer + '/getuser'), {
                Username,
            });

            if (data.length === 0) {

                const { data } = await axios.post((ApiServer + '/register'), {
                    Username,
                    password,
                    confirm,
                    firstname,
                    lastname
                });

                setError(data.message)
            } else {
                setError('username ซ้ำกรุณาสมัครใหม่');

            }

        }
    }

    return (
        //<form>
        <div className="page-heading-register">
            <div className="login-form">
                <div className="logo-register">COE</div>
                <div>
                    <div className="form-group">
                        <label className="login-label">Username</label>
                        <input className="inputlogin" type="text"
                            placeholder="Username" required="required"
                            value={Username}
                            onChange={e => setusername(e.target.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label className="login-label">Password</label>
                        <input className="inputlogin" type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setpassword(e.target.value)}
                        />
                    </div>

                    <div class="form-group">
                        <label className="login-label">Confirm Password</label>
                        <input className="inputlogin" type="password"
                            placeholder="Password"
                            required
                            value={confirm}
                            onChange={e => setconfirm(e.target.value)}
                        />
                    </div>

                    <div class="form-group">
                        <label className="login-label">First Name</label>
                        <input className="inputlogin" type="text"
                            placeholder="First Name"
                            required
                            value={firstname}
                            onChange={e => setfirstname(e.target.value)}
                        />
                    </div>

                    <div class="form-group">
                        <label className="login-label">Last Name</label>
                        <input className="inputlogin" type="text"
                            placeholder="Last Name"
                            value={lastname}
                            required
                            onChange={e => setlastname(e.target.value)}
                        />
                    </div>

                    <div class="login-button">
                        <button className="buttonlogin" type="button"
                            value={""}
                            onClick={handlereg}
                        >สมัครสมาชิก...</button>
                    </div>

                    <div style={{ textAlign: "center", color: "#ff0a0ac9" }}>
                        {error}
                    </div>
                    <div className="login-content">
                        <center><h4>สาขาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย</h4></center>
                    </div>
                </div>
            </div>
        </div>
        //</form >

    );

}
export default Register;