import React, { useEffect, useState } from 'react';
import NavbarAdmin from "../../Navbar/NavbarAdmin";
import Swal from 'sweetalert2';
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ApiServer } from '../../Configs/Configserver';

import { Button, Modal } from 'react-bootstrap';

const AdminMac = () => {

    const history = useHistory();
    const [refresh, setrefresh] = useState(false);
    const togglerefresh = () => setrefresh(!refresh);
    const [data, setData] = useState(null);

    const [Modalusr_id, setModalusr_id] = useState('');
    const [modalm_id, setModalm_id] = useState('');
    const [ModalMacaddress, setModalMacaddress] = useState('');
    const [Modalname, setModalname] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(async () => {
        const token = localStorage.getItem('token');
        if (!token) {

            history.replace('/login');
            return;
        }

        const { data, status } = await axios.post((ApiServer + '/adminmachine'), {

        });
        console.log(data)
        setData(data)
        // console.log(data.m_mac_address)
        // console.log(data.m_name)
    }, [refresh])
    const modal = (index) => {

        console.log(data[index]);
        setModalusr_id(data[index].usr_id);
        setModalm_id(data[index].m_id);
        setModalMacaddress(data[index].m_mac_address);
        setModalname(data[index].m_name);
        setShow(true);
    }

    const modalok = async () => {

        console.log('sdadas')
        const { data, status } = await axios.post((ApiServer + '/admineditmachine'), {
            modalm_id,
            Modalusr_id,
            ModalMacaddress,
            Modalname,
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

        let m_id = data[index].m_id;
        console.log(m_id)
        Swal.fire({
            title: 'คุณแน่ใจที่จะลบ ?',
            showCancelButton: true,
            confirmButtonText: 'OK',
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const { data, status } = await axios.post((ApiServer + '/admindeletemachine'), {
                    m_id,
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
                        Macaddress:
                        <input className="form-control form-control-sm" onChange={e => setModalMacaddress(e.target.value)} value={ModalMacaddress} />
                    </div>
                    <div>
                        ชื่ออุปกรณ์:
                        <input className="form-control form-control-sm" onChange={e => setModalname(e.target.value)} value={Modalname} />
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
                <h1>จัดการอุปกรณ์</h1>
                <div className="Devices">
                    <div className="fromDevices">
                        {/* <TextInput class="inputDevices" placeholder="Mac Address" onChange={e => setaddMacAddress(e.target.value)} />
                        <button class="button" type="submit" onClick={() => btaddMacAddress()}>SUBMIT</button> */}
                    </div>
                    <div className="table">
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>Macaddress</th>
                                    <th>ชื่ออุปกรณ์</th>
                                    <th>Username</th>
                                    <th>จัดการ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((item, index) => {
                                    return (
                                        <tr className="active-rows" key={index}>
                                            <td>{item.m_mac_address}</td>
                                            <td>{item.m_name}</td>
                                            <td>{item.usr_username}</td>
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

export default AdminMac;