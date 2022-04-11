import React, { useEffect, useState } from 'react';
import NavbarAdmin from "../../Navbar/NavbarAdmin";
import Swal from 'sweetalert2';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ApiServer } from '../../Configs/Configserver';
import { Button, Modal } from 'react-bootstrap';

const Admin = () => {

    const history = useHistory();

    const [refresh, setrefresh] = useState(false);
    const togglerefresh = () => setrefresh(!refresh);
    const [data, setData] = useState(null);

    const [Modalusr_id, setModalusr_id] = useState('');
    const [Modalfname, setModalfname] = useState('');
    const [Modallname, setModallname] = useState('');
    const [ModalUsername, setModalUsername] = useState('');
    const [Modalpassword, setModalpassword] = useState('');

    const [fname, setfname] = useState('');
    const [lname, setlname] = useState('');
    const [Username, setUsername] = useState('');
    const [password, setpassword] = useState('');


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [showmodaladduser, setShowmodaladduser] = useState(false);
    const handleClose1 = () => setShowmodaladduser(false);

    useEffect(async () => {
        const token = localStorage.getItem('tokenadmin');
        if (!token) {

            history.replace('/login');
            return;
        }


        const { data, status } = await axios.post((ApiServer + '/adminuser'), {

        });
        //console.log(data)
        setData(data)
        // console.log(data.m_mac_address)
        // console.log(data.m_name)
    }, [refresh])


    const modal = (index) => {

        console.log(data[index]);
        setModalusr_id(data[index].usr_id);
        setModalfname(data[index].usr_fname);
        setModallname(data[index].usr_lname);
        setModalUsername(data[index].usr_username);
        setModalpassword(data[index].usr_password);
        setShow(true);
    }
    const modaladduser = async () => {



        setShowmodaladduser(true);
    }

    const modalokadduser = async () => {


        const { data } = await axios.post((ApiServer + '/adminuser'), {

        });
        console.log(fname);
        console.log(lname);
        console.log(Username);
        console.log(password);

        if (Username === "") {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'ยังไม่กรอก Username',
                showConfirmButton: false,
                timer: 1000
            })
        } if (password === "") {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'ยังไม่กรอก Password',
                showConfirmButton: false,
                timer: 1000
            })
        } if (fname === "") {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'ยังไม่กรอก ชื่อ',
                showConfirmButton: false,
                timer: 1000
            })
        } if (lname === "") {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'ยังไม่กรอก นามสกุล',
                showConfirmButton: false,
                timer: 1000
            })
        } else {

            data.map(async (item, index) => {
                console.log(item.usr_username)
                if (Username === item.usr_username) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'username ซ้ำในระบบ',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    return;
                } else if (index === data.length - 1) {

                    const { data, status } = await axios.post((ApiServer + '/adduser'), {
                        fname,
                        lname,
                        Username,
                        password
                    });

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'เพื่มข้อมูลสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    setShowmodaladduser(false);
                    togglerefresh();
                }

            });
        }


        // console.log('sdadas')
        // const { data, status } = await axios.post((ApiServer + '/adminedituser'), {
        //     Modalusr_id,
        //     Modalfname,
        //     Modallname,
        //     ModalUsername,
        //     Modalpassword
        // });

        // Swal.fire({
        //     position: 'top-end',
        //     icon: 'success',
        //     title: 'แก้ไขข้อมูลสำเร็จ',
        //     showConfirmButton: false,
        //     timer: 1500
        // })
        // setShow(false)
        // //console.log(data.serverStatus);
        // togglerefresh();
    }

    const modalok = async () => {

        console.log('sdadas')
        const { data, status } = await axios.post((ApiServer + '/adminedituser'), {
            Modalusr_id,
            Modalfname,
            Modallname,
            ModalUsername,
            Modalpassword
        });

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'แก้ไขข้อมูลสำเร็จ',
            showConfirmButton: false,
            timer: 1500
        })
        setShow(false)
        //console.log(data.serverStatus);
        togglerefresh();
    }

    const btdelete = async (index) => {

        let usr_id = data[index].usr_id;
        let usr_username = data[index].usr_username;
        let usr_password = data[index].usr_password;

        Swal.fire({
            title: 'คุณแน่ใจที่จะลบ ?',
            showCancelButton: true,
            confirmButtonText: 'OK',
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

                const { data, status } = await axios.post((ApiServer + '/admindeleteuser'), {
                    usr_id,
                    usr_username,
                    usr_password,
                });

                Swal.fire('ลบสำเร็จ!', '', 'success')
                togglerefresh();
            }
        })

    }
    return (
        <>
            <NavbarAdmin />
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>แก้ไขข้อมูล</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        ชื่อ:
                        <input className="form-control form-control-sm" onChange={e => setModalfname(e.target.value)} value={Modalfname} />
                    </div>
                    <div>
                        นามสกุล:
                        <input className="form-control form-control-sm" onChange={e => setModallname(e.target.value)} value={Modallname} />
                    </div>
                    <div>
                        Username:
                        <input className="form-control form-control-sm" onChange={e => setModalUsername(e.target.value)} value={ModalUsername} />
                    </div>
                    <div>
                        Password:
                        <input className="form-control form-control-sm" onChange={e => setModalpassword(e.target.value)} value={Modalpassword} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => modalok()}>ยืนยัน</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showmodaladduser}
                onHide={handleClose1}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>เพื่มสมาชิก</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        ชื่อ:
                        <input className="form-control form-control-sm" onChange={e => setfname(e.target.value)} value={fname} />
                    </div>
                    <div>
                        นามสกุล:
                        <input className="form-control form-control-sm" onChange={e => setlname(e.target.value)} value={lname} />
                    </div>
                    <div>
                        Username:
                        <input className="form-control form-control-sm" onChange={e => setUsername(e.target.value)} value={Username} />
                    </div>
                    <div>
                        Password:
                        <input className="form-control form-control-sm" onChange={e => setpassword(e.target.value)} value={password} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => modalokadduser()}>ยืนยัน</Button>
                </Modal.Footer>
            </Modal>

            <div className="page-heading-Devices">
                <h1>จัดการสมาชิก</h1>
                <div style={{ width: '90vw', margin: '10px' }} className="mx-auto ">
                    <button style={{ backgroundColor: '#63c76a' }} className="btn btn-success mx-1 float-end" onClick={() => modaladduser()}>
                        Add User
                    </button>
                </div>
                <div className="table">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>ชื่อ</th>
                                <th>นามสกุล</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((item, index) => {
                                return (
                                    <tr className="active-rows" key={index}>
                                        <td>{item.usr_fname}</td>
                                        <td>{item.usr_lname}</td>
                                        <td>{item.usr_username}</td>
                                        <td>{item.usr_password}</td>
                                        <td>
                                            <button style={{ backgroundColor: '#63c76a' }} className="btn btn-success mx-2" onClick={() => modal(index)}>
                                                Edit
                                            </button>
                                            <button style={{ backgroundColor: '#63c76a' }} className="btn btn-success mx-2" onClick={() => btdelete(index)}>
                                                Delete...
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </div>


        </>

    );
}



export default Admin;