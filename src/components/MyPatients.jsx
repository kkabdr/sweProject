import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Header from './header/Header'
import Footer from './footer/Footer'
import "./Form.css";
import Cookies from "universal-cookie";

function MyPatients(){
    useEffect(()=>{
        fetchPatientWithFilter()
    },[])
    const [data, setData] = useState([]);
    const [patient_name, setPatientName] = useState("");
    const [visited,setVisited] = useState("")
    const [cause,setCause] = useState("")
    // const ViewDoctor = (doctor) => {
    //     return(
    //         alert("Name: " ,doctor.name, ";", "\n", 
    //         "Middlename: " ,doctor.midname, ";", "\n",
    //         "Surname: ", doctor.surname, ";", "\n")
    //     )
    // }
    const Cookie = new Cookies()
    const token = Cookie.get("token")
    const userID = Cookie.get("userID")
   
    const markVisited = async(id)=>{
        console.log(id)
        const rawData = await fetch("http://localhost:4000/api/data/appointments/"+ id,{
        method:"POST",    
        headers:{
                "x-access-token":token
            }})
        const result = await rawData.json()
        console.log(result)
        if(result.ok){
            fetchPatientWithFilter()
        }
    }

    const fetchPatientWithFilter = async()=>{
        const rawData = await fetch("http://localhost:4000/api/data/appointments/doctor/"+ userID+"?name=" + patient_name + "&visited="+visited+"&cause="+cause,{
        method:"GET",    
        headers:{
                "x-access-token":token
            }})
        const result = await rawData.json()

        if(result.ok){
            console.log(result.appointments)
            const myNode = document.getElementsByClassName("reservationMain");
            myNode.innerHTML = '';
            setData(result.appointments)
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
                    
                    {/* <label>Doctor's name</label> */}
                    <input type = "text" placeholder="Type probable cause" className = "headerSearchInputItem" onChange = {(e) => {setCause(e.target.value);}} ></input>
                </div>
                
                <select onChange={(e) => { setVisited(e.target.value); } }  className = "options">
                    <option value="" className = "optionItem">select type</option>
                        <option value={0} className = "optionItem">Upcoming</option>
                        <option value={1} className = "optionItem">Visited</option>
                </select>

                <div className = "reserveSearchItem">
                    <button className = "reserveBtn" onClick={fetchPatientWithFilter}>Search</button>   
                </div>
                
            </div>

            <div className = "reservationMain">                     
                {data?.map((item) => {
                return (
                    
                    <div className = "styled-doctor"> 
                        <h1 className = "styled-h1">{item.patient_name} {item.patient_surname}</h1>
                        <h2 className="styled-h2">
                                appointment date <span></span>
                                <input type="date" value={item.appointment_date.split("T")[0]}/>
                        </h2>
                        <h2 className="styled-h2">
                                Cause <span>{item.other}</span>
                        </h2>
                            <button className="colorful" onClick={()=>{markVisited(item.id)}}>Mark Visited</button>
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


export default MyPatients