import { Line } from 'react-chartjs-2';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ApiServer } from '../Configs/Configserver';

function Chart(props) {

    const [isLoad, setisLoad] = useState(false);
    const history = useHistory();
    props.setIsLogin(true)


    const [day1, setDay1] = useState('');
    const [day2, setDay2] = useState('');

    const colorp1 = "#19e6a0"
    const colorp2 = "#1798f9"
    const colorp3 = "#df513d"

    const [alldates, setallDates] = useState([]);
    const [alldatesshow, setallDatesshow] = useState([]);

    const [allVoltagep1, setallVoltagep1] = useState([]);
    const [allVoltagep2, setallVoltagep2] = useState([]);
    const [allVoltagep3, setallVoltagep3] = useState([]);

    const [allCurrentp1, setallCurrentp1] = useState([]);
    const [allCurrentp2, setallCurrentp2] = useState([]);
    const [allCurrentp3, setallCurrentp3] = useState([]);

    const [allPowerp1, setallPowerp1] = useState([]);
    const [allPowerp2, setallPowerp2] = useState([]);
    const [allPowerp3, setallPowerp3] = useState([]);

    const [allEnergyp1, setallEnergyp1] = useState([]);
    const [allEnergyp2, setallEnergyp2] = useState([]);
    const [allEnergyp3, setallEnergyp3] = useState([]);

    const [allFrequencyp1, setallFrequencyp1] = useState([]);
    const [allFrequencyp2, setallFrequencyp2] = useState([]);
    const [allFrequencyp3, setallFrequencyp3] = useState([]);

    const [allPowerFactorp1, setallPowerFactorp1] = useState([]);
    const [allPowerFactorp2, setallPowerFactorp2] = useState([]);
    const [allPowerFactorp3, setallPowerFactorp3] = useState([]);
    //--------------------datashow---------------------

    const [alldates1, setallDates1] = useState(alldates);
    const [alldatesshow1, setallDatesshow1] = useState(alldatesshow);

    const [showVoltagep1, setshowVoltagep1] = useState(allVoltagep1);
    const [showVoltagep2, setshowVoltagep2] = useState(allVoltagep2);
    const [showVoltagep3, setshowVoltagep3] = useState(allVoltagep3);

    const [showCurrentp1, setshowCurrentp1] = useState(allCurrentp1);
    const [showCurrentp2, setshowCurrentp2] = useState(allCurrentp2);
    const [showCurrentp3, setshowCurrentp3] = useState(allCurrentp3);

    const [showPowerp1, setshowPowerp1] = useState(allPowerp1);
    const [showPowerp2, setshowPowerp2] = useState(allPowerp2);
    const [showPowerp3, setshowPowerp3] = useState(allPowerp3);

    const [showEnergyp1, setshowEnergyp1] = useState(allEnergyp1);
    const [showEnergyp2, setshowEnergyp2] = useState(allEnergyp2);
    const [showEnergyp3, setshowEnergyp3] = useState(allEnergyp3);

    const [showFrequencyp1, setshowFrequencyp1] = useState(allFrequencyp1);
    const [showFrequencyp2, setshowFrequencyp2] = useState(allFrequencyp2);
    const [showFrequencyp3, setshowFrequencyp3] = useState(allFrequencyp3);

    const [showPowerFactorp1, setshowPowerFactorp1] = useState(allPowerFactorp1);
    const [showPowerFactorp2, setshowPowerFactorp2] = useState(allPowerFactorp2);
    const [showPowerFactorp3, setshowPowerFactorp3] = useState(allPowerFactorp3);



    useEffect(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            history.replace('/login');
            return;
        }

        var { usr_id } = jwt_decode(token);

        const { data } = await axios.post((ApiServer + '/chart'), {
            usr_id
        });

        //console.log(data)
        var macaddress = data;
        //console.log(data)
        if (macaddress.length != 0) {
            fetchdata(macaddress[0].m_mac_address);
        } else {
            setisLoad(false);
        }

    }, []);

    const fetchdata = async (macaddress) => {
        //console.log('ทดสอบfatchdata')
        //console.log(ID)

        if (macaddress !== undefined) {

            const { data, } = await axios.post((ApiServer + '/chartdata'), {
                macaddress
            });

            //console.log(data);

            const loop = data.map((value, index) => {

                //console.log((value.time).substring(10, 0))
                //alldatesshow.push(((value.created_at).substring(19, 0)).replace("T", " "))
                alldatesshow.push(value.time);
                // alldates.push((value.created_at).substring(10, 0));
                alldates.push((value.time).substring(10, 0));
                allVoltagep1.push(value.md_volt_p1);
                allVoltagep2.push(value.md_volt_p2);
                allVoltagep3.push(value.md_volt_p3);

                allCurrentp1.push(value.md_current_p1);
                allCurrentp2.push(value.md_current_p2);
                allCurrentp3.push(value.md_current_p3);

                allPowerp1.push(value.md_power_p1);
                allPowerp2.push(value.md_power_p2);
                allPowerp3.push(value.md_power_p3);

                allEnergyp1.push(value.md_energy_p1);
                allEnergyp2.push(value.md_energy_p2);
                allEnergyp3.push(value.md_energy_p3);

                allFrequencyp1.push(value.md_frequency_p1);
                allFrequencyp2.push(value.md_frequency_p2);
                allFrequencyp3.push(value.md_frequency_p3);

                allPowerFactorp1.push(value.md_factor_p1);
                allPowerFactorp2.push(value.md_factor_p2);
                allPowerFactorp3.push(value.md_factor_p3);
            });

        }
        setisLoad(true);

    }

    const filterData = () => {

        const dates2 = [...alldates];
        const dates3 = [...alldatesshow];

        const dataPointsVoltagep1 = [...allVoltagep1];
        const dataPointsVoltagep2 = [...allVoltagep2];
        const dataPointsVoltagep3 = [...allVoltagep3];

        const dataPointsCurrentp1 = [...allCurrentp1];
        const dataPointsCurrentp2 = [...allCurrentp2];
        const dataPointsCurrentp3 = [...allCurrentp3];

        const dataPointsPowerp1 = [...allPowerp1];
        const dataPointsPowerp2 = [...allPowerp2];
        const dataPointsPowerp3 = [...allPowerp3];

        const dataPointsEnergyp1 = [...allEnergyp1];
        const dataPointsEnergyp2 = [...allEnergyp2];
        const dataPointsEnergyp3 = [...allEnergyp3];

        const dataPointsFrequencyp1 = [...allFrequencyp1];
        const dataPointsFrequencyp2 = [...allFrequencyp2];
        const dataPointsFrequencyp3 = [...allFrequencyp3];

        const dataPointsPowerFactorp1 = [...allPowerFactorp1];
        const dataPointsPowerFactorp2 = [...allPowerFactorp2];
        const dataPointsPowerFactorp3 = [...allPowerFactorp3];

        const indexstartdate = dates2.indexOf(day1);
        const indexenddate = dates2.lastIndexOf(day2);

        const filterDate = dates3.slice(indexstartdate, indexenddate + 1);
        setallDatesshow1(filterDate);
        //------------filter
        //------------------------Voltage-----------------------------
        const filterDataVoltagep1 = dataPointsVoltagep1.slice(
            indexstartdate,
            indexenddate + 1
        );
        const filterDataVoltagep2 = dataPointsVoltagep2.slice(
            indexstartdate,
            indexenddate + 1
        );
        const filterDataVoltagep3 = dataPointsVoltagep3.slice(
            indexstartdate,
            indexenddate + 1
        );
        setshowVoltagep1(filterDataVoltagep1);
        setshowVoltagep2(filterDataVoltagep2);
        setshowVoltagep3(filterDataVoltagep3);
        //------------------------Current-----------------------------
        const filterDataCurrentp1 = dataPointsCurrentp1.slice(
            indexstartdate,
            indexenddate + 1
        );
        const filterDataCurrentp2 = dataPointsCurrentp2.slice(
            indexstartdate,
            indexenddate + 1
        );
        const filterDataCurrentp3 = dataPointsCurrentp3.slice(
            indexstartdate,
            indexenddate + 1
        );
        setshowCurrentp1(filterDataCurrentp1);
        setshowCurrentp2(filterDataCurrentp2);
        setshowCurrentp3(filterDataCurrentp3);

        //-----------------------Power-------------------------------------
        const filterDataPowerp1 = dataPointsPowerp1.slice(
            indexstartdate,
            indexenddate + 1
        );
        const filterDataPowerp2 = dataPointsPowerp2.slice(
            indexstartdate,
            indexenddate + 1
        );

        const filterDataPowerp3 = dataPointsPowerp3.slice(
            indexstartdate,
            indexenddate + 1
        );
        setshowPowerp1(filterDataPowerp1);
        setshowPowerp2(filterDataPowerp2);
        setshowPowerp3(filterDataPowerp3);
        //------------------Energy--------------------------------
        const filterDataEnergyp1 = dataPointsEnergyp1.slice(
            indexstartdate,
            indexenddate + 1
        );
        const filterDataEnergyp2 = dataPointsEnergyp2.slice(
            indexstartdate,
            indexenddate + 1
        );
        const filterDataEnergyp3 = dataPointsEnergyp3.slice(
            indexstartdate,
            indexenddate + 1
        );
        setshowEnergyp1(filterDataEnergyp1);
        setshowEnergyp2(filterDataEnergyp2);
        setshowEnergyp3(filterDataEnergyp3);
        //------------------Frequency-----------------------

        const filterDataFrequencyp1 = dataPointsFrequencyp1.slice(
            indexstartdate,
            indexenddate + 1
        );
        const filterDataFrequencyp2 = dataPointsFrequencyp2.slice(
            indexstartdate,
            indexenddate + 1
        );
        const filterDataFrequencyp3 = dataPointsFrequencyp3.slice(
            indexstartdate,
            indexenddate + 1
        );
        setshowFrequencyp1(filterDataFrequencyp1);
        setshowFrequencyp2(filterDataFrequencyp2);
        setshowFrequencyp3(filterDataFrequencyp3);

        //----------------------PowerFactor--------------------------
        const filterDataPowerFactorp1 = dataPointsPowerFactorp1.slice(
            indexstartdate,
            indexenddate + 1
        );
        const filterDataPowerFactorp2 = dataPointsPowerFactorp2.slice(
            indexstartdate,
            indexenddate + 1
        );

        const filterDataPowerFactorp3 = dataPointsPowerFactorp3.slice(
            indexstartdate,
            indexenddate + 1
        );

        setshowPowerFactorp1(filterDataPowerFactorp1);
        setshowPowerFactorp2(filterDataPowerFactorp2);
        setshowPowerFactorp3(filterDataPowerFactorp3);
    }

    const Resetdata = () => {

        setallDatesshow1(alldatesshow);

        setshowVoltagep1(allVoltagep1);
        setshowVoltagep2(allVoltagep2);
        setshowVoltagep3(allVoltagep3);

        setshowCurrentp1(allCurrentp1);
        setshowCurrentp2(allCurrentp2);
        setshowCurrentp3(allCurrentp3);

        setshowPowerp1(allPowerp1);
        setshowPowerp2(allPowerp2);
        setshowPowerp3(allPowerp3);

        setshowEnergyp1(allEnergyp1);
        setshowEnergyp2(allEnergyp2);
        setshowEnergyp3(allEnergyp3);

        setshowFrequencyp1(allFrequencyp1);
        setshowFrequencyp2(allFrequencyp2);
        setshowFrequencyp3(allFrequencyp3);

        setshowPowerFactorp1(allPowerFactorp1);
        setshowPowerFactorp2(allPowerFactorp2);
        setshowPowerFactorp3(allPowerFactorp3);

    }

    const lineVoltage = {
        labels: alldatesshow1,
        datasets: [
            {
                label: 'phase 1',
                data: showVoltagep1,
                backgroundColor: colorp1,
                borderColor: colorp1,
            },
            {
                label: 'phase 2 ',
                data: showVoltagep2,
                backgroundColor: colorp2,
                borderColor: colorp2,
            },
            {
                label: 'phase 3',
                data: showVoltagep3,
                backgroundColor: colorp3,
                borderColor: colorp3,
            }
        ]

    };

    const lineCurrent = {
        labels: alldatesshow1,
        datasets: [
            {
                label: 'phase 1',
                data: showCurrentp1,
                backgroundColor: colorp1,
                borderColor: colorp1,
            },
            {
                label: 'phase 2 ',
                data: showCurrentp2,
                backgroundColor: colorp2,
                borderColor: colorp2,
            },
            {
                label: 'phase 3',
                data: showCurrentp3,
                backgroundColor: colorp3,
                borderColor: colorp3,
            }
        ]

    };

    const linePower = {
        labels: alldatesshow1,
        datasets: [
            {
                label: 'phase 1',
                data: showPowerp1,
                backgroundColor: colorp1,
                borderColor: colorp1,
            },
            {
                label: 'phase 2 ',
                data: showPowerp2,
                backgroundColor: colorp2,
                borderColor: colorp2,
            },
            {
                label: 'phase 3',
                data: showPowerp3,
                backgroundColor: colorp3,
                borderColor: colorp3,
            }
        ]

    };

    const lineEnergy = {
        labels: alldatesshow1,
        datasets: [
            {
                label: 'phase 1',
                data: showEnergyp1,
                backgroundColor: colorp1,
                borderColor: colorp1,
            },
            {
                label: 'phase 2 ',
                data: showEnergyp2,
                backgroundColor: colorp2,
                borderColor: colorp2,
            },
            {
                label: 'phase 3',
                data: showEnergyp3,
                backgroundColor: colorp3,
                borderColor: colorp3,
            }
        ]

    };

    const lineFrequency = {
        labels: alldatesshow1,
        datasets: [
            {
                label: 'phase 1',
                data: showFrequencyp1,
                backgroundColor: colorp1,
                borderColor: colorp1,
            },
            {
                label: 'phase 2 ',
                data: showFrequencyp2,
                backgroundColor: colorp2,
                borderColor: colorp2,
            },
            {
                label: 'phase 3',
                data: showFrequencyp3,
                backgroundColor: colorp3,
                borderColor: colorp3,
            }
        ]

    };

    const linePowerFactor = {
        labels: alldatesshow1,
        datasets: [
            {
                label: 'phase 1',
                data: showPowerFactorp1,
                backgroundColor: colorp1,
                borderColor: colorp1,
            },
            {
                label: 'phase 2 ',
                data: showPowerFactorp2,
                backgroundColor: colorp2,
                borderColor: colorp2,
            },
            {
                label: 'phase 3',
                data: showPowerFactorp3,
                backgroundColor: colorp3,
                borderColor: colorp3,
            }
        ]

    };

    return (
        <div className="pagechart">
            {(isLoad === true) ?
                <>
                    <div className="fromchart">
                        <input class="inputDevices" type="date" onChange={e => setDay1(e.target.value)} />
                        <h3>TO</h3>
                        <input class="inputDevices" type="date" onChange={e => setDay2(e.target.value)} />
                        <button class="button" type="submit" onClick={filterData}>Filter</button>
                        <button style={{ marginLeft: 10 }} class="button" type="submit" onClick={Resetdata}>Reset</button>
                    </div >
                    <div className="xxx">
                        <div className="chartdetail">
                            <div>
                                <h2>Voltage</h2>
                                <Line data={lineVoltage} width={50}
                                    height={30} />
                            </div>
                        </div>
                        <div className="chartdetail">
                            <div>
                                <h2>Current</h2>
                                <Line data={lineCurrent} width={50}
                                    height={30} />
                            </div>
                        </div>
                        <div className="chartdetail">
                            <div>
                                <h2>Power</h2>
                                <Line data={linePower} width={50}
                                    height={30} />
                            </div>
                        </div>
                        <div className="chartdetail">
                            <div>
                                <h2>Energy</h2>
                                <Line data={lineEnergy} width={50}
                                    height={30} />
                            </div>
                        </div>
                        <div className="chartdetail">
                            <div>
                                <h2>Frequency</h2>
                                <Line data={lineFrequency} width={50}
                                    height={30} />
                            </div>
                        </div>
                        <div className="chartdetail">
                            <div>
                                <h2>PowerFactor</h2>
                                <Line data={linePowerFactor} width={50}
                                    height={30} />
                            </div>
                        </div>
                    </div>
                </>
                : null

            }
        </div>
    );
}

export default Chart;