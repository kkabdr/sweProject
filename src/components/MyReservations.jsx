import React,{useState,useEffect} from "react";
import { Navigate,Link } from "react-router-dom";
import Cookies from "universal-cookie";
function MyReservations(){
    useEffect(()=>{
        fetchCurrentAppointments()
        fetchPastAppointments()
    },[])
    const cookies = new Cookies()
    const token = cookies.get("token")
    const userID = cookies.get("userID")
    const [currentAppointment, setCurrentAppointment] = useState()
    const [pastAppointment, setPastAppointment] = useState()

    const fetchCurrentAppointments = async ()=>{
        
        const rawData = await fetch("http://localhost:4000/api/data/appointments/patient/"+userID+"?visited=0",
        {
            method:"GET",
            headers:{
                "x-access-token":token
            }
        })
        const data = await rawData.json() 
        if(data.ok){
            setCurrentAppointment(data.appointments)
            console.log(currentAppointment)
        }
    }

    const fetchPastAppointments = async ()=>{
        
        const rawData = await fetch("http://localhost:4000/api/data/appointments/patient/"+userID+"?visited=1",
        {
            method:"GET",
            headers:{
                "x-access-token":token
            }
        })
        const data = await rawData.json() 
        if(data.ok){
            setPastAppointment(data.appointments)
            console.log(pastAppointment)
        }
    }
    return(
        <div>
            <div id="current">
                {/* <button onClick={()=>fetchCurrentAppointments()}>current</button> */}
                <div>
                    <h1 className = "styled-h1">Current Appointments</h1>

                {   
                    currentAppointment?.map(item=>{
                        return (<div className = "styled-doctor"> 
                        <h1 className = "styled-h1">{item.doctor_name} {item.doctor_surname}</h1>
                        <h2 className = "styled-h2">{item.specialization_name}</h2>
                        <h2 className = "styled-h2">{item.department_name}</h2>
                        <h2 className="styled-h2">
                            Cause <span><em>{item.other}</em></span>
                        </h2>
                        <h2 className="styled-h2">
                            Date of appointment <span></span>
                            <input type="date" value={item.appointment_date.split("T")[0]} onChange={(e)=>{}}/>
                        </h2>
                        <h2 className="styled-h2">
                            Time from<span></span>
                            <input type="time" value={item.appointment_time_from} onChange={(e)=>{}}/>
                        </h2>
                        <h2 className="styled-h2">
                            Time to<span></span>
                            <input type="time" value={item.appointment_time_to} onChange={(e)=>{}}/>
                        </h2>
                        {/* <button className="colorful" onClick={()=>makeAppointment()}> Make Appoint</button> */}
                        
                        <Link to={"/reservation" }>
                            <button className="colorful"> Go Back to Reservatoins</button>
                        </Link>
                        {/* <button className="btn btn-view" onClick={() => ViewDoctor(item)}>View</button> */}
                    </div>
                    )})  
                }
                </div>
                
            </div>
                <hr></hr>
            <div id="history">
                {/* <button onClick={()=>fetchPastAppointments()}>past</button> */}

                <div>
                    <h1 className = "styled-h1">Past Appointments</h1>

                {   
                    pastAppointment?.map(item=>{
                        return (<div className = "styled-doctor"> 
                        <h1 className = "styled-h1">{item.doctor_name} {item.doctor_surname}</h1>
                        <h2 className = "styled-h2">{item.specialization_name}</h2>
                        <h2 className = "styled-h2">{item.department_name}</h2>
                        <h2 className="styled-h2">
                            Cause <span>{item.other}</span>
                        </h2>
                        <h2 className="styled-h2">
                            Date of appointment <span></span>
                            <input type="date" value={item.appointment_date.split("T")[0]} onChange={(e)=>{}}/>
                        </h2>
                        <h2 className="styled-h2">
                            Time from<span></span>
                            <input type="time" value={item.appointment_time_from} onChange={(e)=>{}}/>
                        </h2>
                        <h2 className="styled-h2">
                            Time to<span></span>
                            <input type="time" value={item.appointment_time_to} onChange={(e)=>{}}/>
                        </h2>
                        {/* <button className="colorful" onClick={()=>makeAppointment()}> Make Appoint</button> */}
                        
                        <Link to={"/reservation" }>
                            <button className="colorful"> Go Back to Reservatoins</button>
                        </Link>
                        {/* <button className="btn btn-view" onClick={() => ViewDoctor(item)}>View</button> */}
                    </div>
                    )})  
                }
                </div>
            </div>
            
        
        </div>
    )
    
}

export default MyReservations