import "./Header.css";
//import {DateRange} from 'react-date-range';
//import {useState} from 'react';
//import 'react-date-range/dist/styles.css';
//import 'react-date-range/dist/theme/default.css';
//import { format } from "date-fns";
import {Link} from 'react-router-dom';
import User from "../User"; 
import { useState,useEffect } from "react";
import Logout from "../Logout";
import Login from "../Login";
import Cookies from "universal-cookie";
import MyPatients from "../MyPatients";
const Header = () => {



    useEffect(()=>{
        chechUser()
    },[])
    // const [openDate, setOpenDate] = useState(false);
    // const [department, setDepartment] = useState("");
    // const [search, setSearch] = useState([
    //     {
    //         startDate: new Date(),
    //         endDate: new Date(),
    //         key: 'selection'
    //     }

    const [tokenState,setTokenState] = useState()
    const [roleState,setRoleState] = useState()
    const [userIDState, setUserIDState] = useState()
    // ]);
    const chechUser = async ()=>{
        const cookie = new Cookies()
        setTokenState(cookie.get('token'))
        setRoleState(cookie.get('role'))
        setUserIDState(cookie.get('userID'))
    }
    
    return (
        <div className = "header">
            <div className = "headerContainer">
                <div className = "headerList">
                    <div className = "headerListItem active">
                        <Link to = "/">
                            <span className = "logo">Densys.me</span>
                        </Link>
                    </div>
                    
                    <div className = "headerListItem">
                        <Link to = {roleState==='admin'?"/admin":"/"}>
                        <span className="link">{roleState==='admin'?"Admin":"Home"}</span>
                        </Link>
                    </div>

                    <div className = "headerListItem active">
                        <Link to = "/departments">
                            <span className="link">Departments</span>
                        </Link>
                    </div>
                    <div>
                        <Link to = {roleState==='doctor'?"/my-patients/":"/reservation"}>
                            <span className="link">{roleState==='doctor'?"My patients":"Reservations"}</span>
                        </Link>
                    </div>
                        

                    {tokenState!==''?<><Logout/> <User/></>:<Login/>}
                    
                </div>
                {/* <h1 className="headerTittle">"Make a Reservation today, to get service tomorrow"</h1>
                <p className="headerDesc">
                    High specialized doctors, new equipment with high accuracy.
                </p> */}
                {/* {roleState!==''?<User/>:<Login/>} */}
                {/* <User/> */}
            </div>  
        </div>
    )
}
export default Header
