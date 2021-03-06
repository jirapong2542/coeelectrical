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
    const [ModalVoltage, setModalVoltage] = useState('');
    const [ModalCurrent, setModalCurrent] = useState('');
    const [ModalPower, setModalPower] = useState('');

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(async () => {
        const token = localStorage.getItem('tokenadmin');
        if (!token) {

            history.replace('/loginadmin');
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
        setModalVoltage(data[index].LimitVoltage);
        setModalCurrent(data[index].LimitCurrent);
        setModalPower(data[index].LimitPower);
        setShow(true);
    }

    const modalok = async () => {

        console.log('sdadas')
        const { data, status } = await axios.post((ApiServer + '/admineditmachine'), {
            modalm_id,
            Modalusr_id,
            ModalMacaddress,
            Modalname,
            ModalVoltage,
            ModalCurrent,
            ModalPower
        });

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '???????????????????????????????????????????????????',
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
            title: '????????????????????????????????????????????? ?',
            showCancelButton: true,
            confirmButtonText: 'OK',
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const { data, status } = await axios.post((ApiServer + '/admindeletemachine'), {
                    m_id,
                });

                Swal.fire('????????????????????????!', '', 'success')
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
                    <Modal.Title>?????????????????????????????????</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Macaddress:
                        <input className="form-control form-control-sm" onChange={e => setModalMacaddress(e.target.value)} value={ModalMacaddress} />
                    </div>
                    <div>
                        ?????????????????????????????????:
                        <input className="form-control form-control-sm" onChange={e => setModalname(e.target.value)} value={Modalname} />
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
                    <Button variant="primary" onClick={() => modalok()}>??????????????????</Button>
                </Modal.Footer>
            </Modal>

            <div className="page-heading-Devices">
                <h1>???????????????????????????????????????</h1>
                <div className="table">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Macaddress</th>
                                <th>?????????????????????????????????</th>
                                <th>Username</th>
                                <th>Limit Voltage</th>
                                <th>Limit Current</th>
                                <th>Limit Power</th>
                                <th>??????????????????</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((item, index) => {
                                return (
                                    <tr className="active-rows" key={index}>
                                        <td>{item.m_mac_address}</td>
                                        <td>{item.m_name}</td>
                                        <td>{item.usr_username}</td>
                                        <td>{item.LimitVoltage} V</td>
                                        <td>{item.LimitCurrent} A</td>
                                        <td>{item.LimitPower} W</td>
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

export default AdminMac;