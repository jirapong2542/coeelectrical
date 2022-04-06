import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Swal from 'sweetalert2'
import { ApiServer } from '../Configs/Configserver';

import { Button, Modal } from 'react-bootstrap';

const Devices = (props) => {
    const [refresh, setrefresh] = useState(false);
    const togglerefresh = () => setrefresh(!refresh);


    const [data, setData] = useState(null);
    const [addMacAddress, setaddMacAddress] = useState('');

    const history = useHistory();
    props.setIsLogin(true)

    const [Modalm_id, setModalm_id] = useState('');
    const [Modalusr_id, setModalusr_id] = useState('');
    const [ModalName, setModalName] = useState('');
    const [ModalMacaddress, setModalMacaddress] = useState('');
    const [ModalVoltage, setModalVoltage] = useState('');
    const [ModalCurrent, setModalCurrent] = useState('');
    const [ModalPower, setModalPower] = useState('');
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(async () => {
        const token = localStorage.getItem('token');
        if (!token) {

            history.replace('/login');
            return;
        }

        var { usr_id } = jwt_decode(token)
        // console.log(usr_id)
        const { data, status } = await axios.post((ApiServer + '/macaddressdevices'), {
            usr_id
        });
        setData([data[0]][0])

    }, [refresh])


    const modal = (index) => {
        console.log(data)
        setShow(true);
        console.log(data[index]);
        setModalm_id(data[index].m_id);
        setModalusr_id(data[index].usr_id);
        setModalMacaddress(data[index].m_mac_address);
        setModalName(data[index].m_name);
        setModalVoltage(data[index].LimitVoltage);
        setModalCurrent(data[index].LimitCurrent);
        setModalPower(data[index].LimitPower);
    }

    const modalok = async () => {
        //console.log(Modalm_id);
        //console.log(Modalusr_id);
        //console.log(ModalName);
        //console.log(ModalMacaddress);

        const { data, status } = await axios.post((ApiServer + '/edit'), {
            Modalm_id,
            Modalusr_id,
            ModalName,
            ModalMacaddress,
            ModalVoltage,
            ModalCurrent,
            ModalPower
        });

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'แก้ไขข้อมูลสำเร็จ',
            showConfirmButton: false,
            timer: 1500
        })
        setShow(false)
        togglerefresh();
    }

    const btdelete = async (index) => {

        let m_id = data[index].m_id;
        let usr_id = data[index].usr_id;
        let Name = data[index].m_name;
        let Macaddress = data[index].m_mac_address;
        Swal.fire({
            title: 'คุณแน่ใจที่จะลบ ?',
            showCancelButton: true,
            confirmButtonText: 'OK',
        }).then(async (result) => {

            if (result.isConfirmed) {
                const { data, status } = await axios.post((ApiServer + '/delete'), {
                    m_id,
                    usr_id,
                    Name,
                    Macaddress,
                });
                Swal.fire('ลบสำเร็จ!', '', 'success')
                togglerefresh();
            }
        })

    }

    const btaddMacAddress = () => {
        const token = localStorage.getItem('token');
        var { usr_id } = jwt_decode(token);

        if (data.length === 0) {
            Swal.fire({
                title: 'คุณแน่ในที่จะเพิ่มอุปกรณ์ ?',
                text: "อุปกรณ์ของคุณ : " + addMacAddress,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data, status } = await axios.post(ApiServer + '/addMacAddress', {
                        usr_id,
                        addMacAddress
                    });

                    Swal.fire(
                        'สำเร็จ!',
                        'เพิ่มอุปกรณสำเร็จ.',
                        'success'
                    )
                    togglerefresh();
                }
            })
        } else {
            Swal.fire(
                'ไม่สามารถเพิ่มอุปกรณ์ได้!',
                'เนื่องจากคุณมีอุปการณ์อยู่แล้ว!',
                'error'
            )
        }

    }

    return <div className="page-heading-Devices">
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
                    MacAddress:
                    <input className="form-control form-control-sm" onChange={e => setModalMacaddress(e.target.value)} value={ModalMacaddress} />
                </div>
                <div>
                    Name:
                    <input className="form-control form-control-sm" onChange={e => setModalName(e.target.value)} value={ModalName} />
                </div>
                <div>
                    Limit Voltage:
                    <input className="form-control form-control-sm" onChange={e => setModalVoltage(e.target.value)} value={ModalVoltage} />
                </div>
                <div>
                    Limit Current:
                    <input className="form-control form-control-sm" onChange={e => setModalCurrent(e.target.value)} value={ModalCurrent} />
                </div>
                <div>
                    Limit Power:
                    <input className="form-control form-control-sm" onChange={e => setModalPower(e.target.value)} value={ModalPower} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => modalok()}>ยืนยัน</Button>
            </Modal.Footer>
        </Modal>

        <div className="title1">
            <h1>DEVICES CONFIGURATION</h1>
        </div>
        <div className="Devices">
            <div className="fromDevices">
                <input class="inputDevices" placeholder="Mac Address" onChange={e => setaddMacAddress(e.target.value)} />
                <button style={{ backgroundColor: '#63c76a' }} class="btn btn-success" type="submit" onClick={() => btaddMacAddress()}>SUBMIT</button>
            </div>
            <div className="table">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Mac Address</th>
                            <th>Name</th>
                            <th>Limit Voltage</th>
                            <th>Limit Current</th>
                            <th>Limit Power</th>
                            <th>จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item, index) => {
                            return (
                                <tr className="active-rows" key={index}>
                                    <td>{item.m_mac_address}</td>
                                    <td>{item.m_name}</td>
                                    <td>{item.LimitVoltage} V</td>
                                    <td>{item.LimitCurrent} A</td>
                                    <td>{item.LimitPower} W</td>
                                    <td className="m-0">
                                        <button style={{ backgroundColor: '#63c76a' }} className="btn btn-success mx-2" onClick={() => modal(index)}>
                                            แก้ไขข้อมูล
                                        </button>
                                        <button style={{ backgroundColor: '#63c76a' }} className="btn btn-success mr-1" onClick={() => btdelete(index)}>
                                            ลบข้อมูล
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

};

export default Devices;