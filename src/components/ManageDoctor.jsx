import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from './header/Header'
import Footer from './footer/Footer'
import "./Form.css";


function ManageDoctor(){
    useEffect(()=>{
        
        fetchDoctors()
        fetchDepartments()
        fetchSpecializations()
    },[])
    const Cookie = new Cookies
    const token = Cookie.get("token")
    console.log(token)
    const fetchDepartments = async ()=>{
        const rawData = await fetch("http://localhost:4000/api/data/departments/all", {
        method:"GET",    
        headers:{
                "x-access-token":token
            }})
        const departments = await rawData.json()  
        // console.log(departments)
        if(departments.ok){
            setAllDeps(departments.departments)
            console.log(allDeps)
        }
    }
    const fetchSpecializations = async ()=>{
        const rawData = await fetch("http://localhost:4000/api/data/specializations/all",{
        method:"GET",    
        headers:{"x-access-token":token}})
        const specializations = await rawData.json()  
        if(specializations.ok){
            setAllSpecs(specializations.specializations)
        }
    }
    const [data, setData] = useState([]);
    const [doctor_name, setDoctorName] = useState("");
    const [department, setDepID] = useState("");
    const [specialization, setSpecID] = useState("");
    const [search, setSearch] = useState(false);
    const [allDeps,setAllDeps] = useState()
    const [allSpecs,setAllSpecs] = useState()

    // const ViewDoctor = (doctor) => {
    //     return(
    //         alert("Name: " ,doctor.name, ";", "\n", 
    //         "Middlename: " ,doctor.midname, ";", "\n",
    //         "Surname: ", doctor.surname, ";", "\n")
    //     )
    // }

    const fetchDoctors = async() =>{
        const rawData = await fetch("http://localhost:4000/api/data/doctors/search/?department_id=" +department + "&name=" +doctor_name +"&specialization_id=" +specialization,{headers:{"x-access-token":token}})
        const data = await rawData.json()
        if(data.ok){
            console.log(data.doctors)
            const myNode = document.getElementsByClassName("reservationMain");
            myNode.innerHTML = '';
            setData(data.doctors)
        }

    }
    return (
        <>
        <Header />
        <div className="main">
            <div className="reserveSearch">
                <div className = "reserveSearchItem">
                    
                    {/* <label>Doctor's name</label> */}
                    <input type = "text" placeholder="Type doctor's name" className = "headerSearchInputItem" onChange = {(e) => {setDoctorName(e.target.value);}} value = {doctor_name}></input>
                </div>

                <div className = "reserveSearchItem">
                    <select onChange={(e) => { setDepID(e.target.value); } }  className = "options">
                        <option value="" className = "optionItem">Select Department</option>
                        {allDeps?.map((dep) => {return <option value={dep.id} className = "optionItem">{dep.department_name}</option>})}
                    </select>
                </div>
                <div className = "reserveSearchItem">

                    <select onChange={(e) => { setSpecID(e.target.value); } }  className = "options">
                        <option value="" className = "optionItem">Select Specialization</option>
                        {allSpecs?.map((spec) => {return <option value={spec.id} className = "optionItem">{spec.specialization_name}</option>})}
                    </select>
                </div>

                <div className = "reserveSearchItem">
                    <button className = "reserveBtn" onClick = {fetchDoctors}>Search</button>   
                </div>
                <div className = "reserveSearchItem">
                    <Link to={"/admin/signuppatient"}>
                        <button className = "reserveBtn">Add new doctor</button>   
                    </Link>
                </div>
            </div>

            <div className = "reservationMain">                     
                {data?.map((item) => {
                return (
                    
                    <div className = "styled-doctor"> 
                        <h1 className = "styled-h1">{item.name} {item.surname}</h1>
                        <h2 className = "styled-h2">{item.department_name}</h2>
                        <h2 className = "styled-h2">{item.specialization_name}</h2>
                        <Link to={"/admin/manage/doctor/" + item.id}>
                                <button className="colorful">Show</button>
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


export default ManageDoctor