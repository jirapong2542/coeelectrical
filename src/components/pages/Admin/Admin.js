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

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(async () => {
        const token = localStorage.getItem('tokenadmin');
        if (!token) {

            history.replace('/login');
            return;
        }


        const { data, status } = await axios.post((ApiServer + '/adminuser'), {

        });
        console.log(data)
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

            <div className="page-heading-Devices">
                <h1>จัดการสมาชิก</h1>
                <div className="Devices">
                    <div className="fromDevices">
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
            </div>


        </>

    );
}



export default Admin;