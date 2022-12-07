import React,{useState,useEffect} from "react";
import Cookies from "universal-cookie";
import { Link,useNavigate } from "react-router-dom";


function User(){

    const cookies = new Cookies
    const token = cookies.get("token")
    const userRole = cookies.get("role")
    const userID = cookies.get("userID")
    useEffect(()=>{
        fetchUser()
    },[])
    const [name, setName] = useState()
    const [role,setRole] = useState()
    const fetchUser = async()=>{
        const rawData = await fetch("http://localhost:4000/api/data/" + userRole + "/"+userID,{
        method:"GET",    
        headers:{
            "x-access-token":token,
            },
        } )
        const result = await rawData.json()
        console.log(result[userRole])
        setName(result[userRole].name)
        setRole(userRole)

    }

    return(
        <div>
            <span>Role: {role} ----|----</span>
            <span>Name: {name}</span>
        </div>
    )
}

export default User