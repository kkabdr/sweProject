import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'
import {Link} from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import "./Form.css";
 


function AdminAllDoctor(){
    useEffect(()=>{
        // checkToken()
    },[])

    // const navigate = useNavigate()
    // const checkToken = async()=>{
    //     const cookies = new Cookies();
    //     const token = cookies.get('token')
    //     if(!token){
    //         console.log("Not Authorized")
    //         navigate("/login")
    //         return
    //     }
    //     try{
    //         const decoded = jwt.verify(token, "secret")
    //         console.log(decoded)
    //         if(decoded.role !== 'admin'){
    //             console.log("Not Authorized")
    //             navigate("/login")
    //             return
    //         }
    //     }catch(err){
    //         console.log("Not Authorized")
    //         navigate("/login")
    //         return
    //     }
    // }
    return(
        <>
        <Header />
        <div>
            <div className='admin'>
            <p>

            <Link to = "/admin/manage/doctors">
                <button className='colorful'>Manage Doctors</button>
            </Link>
            <Link to = "/admin/manage/patients">
                <button className='colorful'>Manage Patients</button>
            </Link>

            </p>
            
            </div>
        </div>
        
        <Footer />
        </>
    )
}

export default AdminAllDoctor