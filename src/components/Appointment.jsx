import React,{useEffect,useState} from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import Cookies
 from "universal-cookie";
function Appointment(){
    


    const cookies = new Cookies()
    const [doctor,setDoctor] = useState({name:"",surname:"",department_name:"",specialization_name:""})
    const [time_from,setTimeFrom] = useState()
    const [time_to,setTimeTo] = useState()
    const [other,setOther] = useState()
    const [date, setDate] = useState()
    const [patient,setPatient] =useState()
    const {id} = useParams()
    useEffect(()=>{
        fetchDoctorByID()
    },[])
    const makeAppointment = async ()=>{
        const data = {
            "appointment":{
                "doctor_id":id,
                "patient_id":cookies.get("userID"),
                "appointment_date":date,
                "appointment_time_from":time_from,
                "appointment_time_to":time_to,
                "visited":0,
                "other":other
            }
        }
    
        console.log(data)
        const rawData = await fetch("http://localhost:4000/api/data/appointment",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "x-access-token":cookies.get("token")
            },
            body:JSON.stringify(data)
        })

        const result = await rawData.json()
        if(result.ok){
            console.log(result)
        }
        return
    }

    const fetchDoctorByID = async ()=>{
        const rawData = await fetch("http://localhost:4000/api/data/doctor/" + id,{
            method:"GET",
            headers:{
                "x-access-token":cookies.get("token")
            }
        })

        setPatient(cookies.get("userID"))


        const result = await rawData.json()
        if(result.ok){
            console.log(result.doctor)
            setDoctor(result.doctor)
        }
        return
    }

    return(
        <div>
            <div className = "styled-doctor"> 
                            <h1 className = "styled-h1">{doctor.name} {doctor.surname}</h1>
                            <h2 className = "styled-h2">{doctor.department_name}</h2>
                            <h2 className = "styled-h2">{doctor.specialization_name}</h2>
                            <h2 className="styled-h2">
                                Write the cause <span></span>
                                <input type="text" onChange={(e)=>{setOther(e.target.value)}}/>
                            </h2>
                            <h2 className="styled-h2">
                                choose date <span></span>
                                <input type="date" onChange={(e)=>{setDate(e.target.value)}}/>
                            </h2>
                            <h2 className="styled-h2">
                                choose time from<span></span>
                                <input type="time" onChange={(e)=>{setTimeFrom(e.target.value)}}/>
                            </h2>
                            <h2 className="styled-h2">
                                choose time to<span></span>
                                <input type="time" onChange={(e)=>{setTimeTo(e.target.value)}}/>
                            </h2>
                            <button className="colorful" onClick={()=>makeAppointment()}> Make Appoint</button>
                            <Link to={"/reservation/" + patient}>
                                <button className="colorful"> Go to My Reservations</button>
                            </Link>
                            <Link to={"/reservation" }>
                                <button className="colorful"> Go Back to Reservatoins</button>
                            </Link>
                            {/* <button className="btn btn-view" onClick={() => ViewDoctor(item)}>View</button> */}
                        </div>
        </div>
    )
}

export default Appointment
