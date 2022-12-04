import "./Reservation.css"
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

//import { format } from "date-fns";
const Reservation = () => {

    const [data, setData] = useState([]);
    const [doctor_name, setDoctorName] = useState("");
    const [department, setDepartment] = useState("");
    const [specialize, setSpecialize] = useState("");
    const [search, setSearch] = useState(false);

    const loadData = async () => {

        if(!doctor_name && !department && !specialize){
            const response = await axios.get(`http://10.101.40.93:4000/api/data/doctors/all`);//(`http://localhost:4000/api/get`);
            setData(response.data);
            setSearch(false);
        }
        if(!doctor_name && !department && specialize){
            const response = await axios.get(``);//(`http://localhost:4000/api/get/${specialize}`);
            setData(response.data);
            setSearch(false);
        }

        else if(!doctor_name && department && !specialize){
            const response = await axios.get(``);//(`http://localhost:4000/api/get/${department}`);
            setData(response.data);
            setSearch(false);
        }

        else if(doctor_name && !department && !specialize){
            const response = await axios.get(``);//(`http://localhost:4000/api/get/${doctor_name}`);
            setData(response.data);
            setSearch(false);
        }

        else if(doctor_name && !department && specialize){
            const response = await axios.get(``);//(`http://localhost:4000/api/get/${doctor_name}/${specialize}`);
            setData(response.data);
            setSearch(false);
        }

        else if(!doctor_name && department && specialize){
            const response = await axios.get(``);//(`http://localhost:4000/api/get/${department}/${specialize}`);
            setData(response.data); 
            setSearch(false);
        }

        else if(doctor_name && department && !specialize){
            const response = await axios.get(``);//(`http://localhost:4000/api/get/${doctor_name}/${department}`);
            setData(response.data);
            setSearch(false);
        }

        else if(doctor_name && department && specialize){
            const response = await axios.get(``);//(`http://localhost:4000/api/get/${doctor_name}/${department}/${specialize}`);
            setData(response.data);
            setSearch(false);
        }
        
    }

    loadData();

    // const ViewDoctor = (doctor) => {
    //     return(
    //         alert("Name: " ,doctor.name, ";", "\n", 
    //         "Middlename: " ,doctor.midname, ";", "\n",
    //         "Surname: ", doctor.surname, ";", "\n")
    //     )
    // }

    const handleDoctors = () =>{
        return(
            <div className="styled-div" style={{
                display: search === true ? '' : 'none',
            }}>
                {data.map((item) => {
                    return (
                        <div className = "styled-doctor"> 
                            <h1 className = "styled-h1">{item.name} {item.surname}</h1>
                            <h2 className = "styled-h2">{department}</h2>
                            <h2 className = "styled-h2">{specialize}</h2>
                            <Link to="/">
                                    <button className="btn btn-appoint">Appoint</button>
                            </Link>
                            {/* <button className="btn btn-view" onClick={() => ViewDoctor(item)}>View</button> */}
                        </div>
                    );
                })}
        </div> 
        )
    }

    return (
            <div><div className="reserveSearch">
                    <div className = "reserveSearchItem">
                        <label>Doctor's name</label>
                        <input type = "text" placeholder="Type doctor's name" className = "headerSearchInputItem" onChange = {(e) => {setDoctorName(e.target.value);}} value = {doctor_name}></input>
                    </div>

                    <div className = "reserveSearchItem">
                        <button className = "reserveBtn" onClick = {()=>setSearch(true)}>Search</button>   
                    </div>
            </div>
            <div className = "reservationMain">
                        <div className = "reservationMainLeft">
                            <div className = "reserveSearchItem">
                            <label>Department's name</label>
                                <select onChange={(e) => { setDepartment(e.target.value); } } value={department} className = "options">
                                    <option value="" className = "optionItem">Department's name</option>
                                    <option value="medicine" className = "optionItem">Medicine</option>
                                    <option value="surgery" className = "optionItem">Surgery</option>
                                    <option value="gynecology" className = "optionItem">Gynecology</option>
                                    <option value="obstretrics" className = "optionItem">Obstretrics</option>
                                    <option value="pediatrics" className = "optionItem">Pediatrics</option>
                                    <option value="radiology" className = "optionItem" >Radiology</option>
                                    <option value="eye" className = "optionItem">Eye</option>
                                    <option value="ent" className = "optionItem">ENT</option>
                                    <option value="dental" className = "optionItem">Dental</option>
                                    <option value="orthopedics" className = "optionItem">Orthopedics</option>
                                    <option value="neurology" className = "optionItem">Neurology</option>
                                    <option value="cardiology" className = "optionItem">Cardiology</option>
                                    <option value="psychiatry" className = "optionItem">Psychiatry</option>
                                    <option value="skin" className = "optionItem">Skin</option>
                                </select>
                        </div>

                        <div className = "reserveSearchItem">
                            <label>Specialize's name</label>
                                <select onChange={(e) => { setSpecialize(e.target.value); } } value={specialize} className = "options">
                                    <option value="" className = "optionItem">Specialization</option>
                                </select>
                        </div>

                        <div className = "reserveSearchItem">
                            <button className = "reserveBtn" onClick    = {()=>setSearch(true)}>Search</button>   
                        </div>
                        </div>
                            
                        <div className="reservationMainRight"> 
                                <div className = "styled-doctor"> 
                                <h1 className = "styled-h1">Temirlan Nurmakhan</h1>
                                <h2 className = "styled-h2">ENT</h2>
                                <h2 className = "styled-h2">Doctor</h2>
                                <Link to="/">
                                        <button className="btn btn-appoint">Appoint</button>
                                </Link>
                                {/* <button className="btn btn-view" onClick={() => ViewDoctor(1)}>View</button>  */}
                            </div>
                        </div> 

                    {handleDoctors()}
            </div>
            </div>
    )
}
export default Reservation