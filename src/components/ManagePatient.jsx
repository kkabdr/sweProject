import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Header from './header/Header'
import Footer from './footer/Footer'
import "./Form.css";
import Cookies from "universal-cookie";

function ManagePatient(){
    useEffect(()=>{
        
        fetchPatients()
    },[])
    const [data, setData] = useState([]);
    const [patient_name, setPatientName] = useState("");
    

    // const ViewDoctor = (doctor) => {
    //     return(
    //         alert("Name: " ,doctor.name, ";", "\n", 
    //         "Middlename: " ,doctor.midname, ";", "\n",
    //         "Surname: ", doctor.surname, ";", "\n")
    //     )
    // }
    const Cookie = new Cookies()
    const token = Cookie.get("token")

    const fetchPatientWithFilter = async()=>{
        const rawData = await fetch("http://localhost:4000/api/data/patients/?name=" + patient_name,{
        method:"GET",    
        headers:{
                "x-access-token":token
            }})
        const result = await rawData.json()

        if(result.ok){
            console.log(result.patients)
            const myNode = document.getElementsByClassName("reservationMain");
            myNode.innerHTML = '';
            setData(result.patients)
        }
    }

    const fetchPatients = async() =>{
        const rawData = await fetch("http://localhost:4000/api/data/patients/all",{method:"GET",    
        headers:{
                "x-access-token":token
            }})
        const data = await rawData.json()
        if(data.ok){
            console.log(data.doctors)
            const myNode = document.getElementsByClassName("reservationMain");
            myNode.innerHTML = '';
            setData(data.patients)
        }

    }
    return (
        <>
        <Header />
        <div className="main">
            <div className="reserveSearch">
                <div className = "reserveSearchItem">
                    
                    {/* <label>Doctor's name</label> */}
                    <input type = "text" placeholder="Type patients's name" className = "headerSearchInputItem" onChange = {(e) => {setPatientName(e.target.value);}} ></input>
                </div>

                <div className = "reserveSearchItem">
                    <button className = "reserveBtn" onClick={fetchPatientWithFilter}>Search</button>   
                </div>
                <div className = "reserveSearchItem">
                    <Link to={"/admin/signuppatient"}>
                        <button className = "reserveBtn">Add new patient</button>   
                    </Link>
                </div>
            </div>

            <div className = "reservationMain">                     
                {data?.map((item) => {
                return (
                    
                    <div className = "styled-doctor"> 
                        <h1 className = "styled-h1">{item.name} {item.surname}</h1>
                        
                        <Link to={"/admin/manage/patient/" + item.id}>
                                <button className="colorful">Show More</button>
                        </Link>
                        {/* <button className="btn btn-view" onClick={() => ViewDoctor(item)}>View</button> */}
                    </div>
                );
            })}

            </div> 

        </div>
        <Footer />
        </>
)
}


export default ManagePatient