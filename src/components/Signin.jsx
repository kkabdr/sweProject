import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Form.css';
import {Link} from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Cookies from 'universal-cookie';
// import SignupDoctor from "./components/SignupDoctor"
// import SignupPatient from "./components/SignupPatient";

function Signin(){
    const navigate = useNavigate()
    const [role,setRole] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()

    async function handleClick(){
        const user = {
            "email":email,
            "password":password
        }
        console.log(role,email)
        const rawData = await fetch("http://localhost:4000/api/auth/"+role+"/signin",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"credentials":user})
        })

        const result = await rawData.json()
        console.log(result)
        if(result.ok){
            //create cookie with jwt
            console.log("here")
            const cookies = new Cookies();
            cookies.set('token', result.token, { path: '/' });
            cookies.set('role', role, {path:'/'})
            cookies.set('userID', result.id, {path:"/"})
            console.log(cookies.get('token'))
    
            navigate("/admin")
            return
        }
        console.log('Credentials error')
    }

    return(

        <div className='signin'>
                <h3>Enter your account details to enter</h3>
            <p>
                <input onChange={(e)=>{setEmail(e.target.value)}} required name='email' type='email' placeholder='Enter your email'/>
            </p>
            <p>
                <input onChange={(e)=>{setPassword(e.target.value)}} required name='password' type='password' placeholder='Enter your password'/>
            </p>
            <p>
                <label for='role'>admin</label>
                <input type='radio' onClick={(e)=>{setRole(e.target.value)}} name='role' value='admin'/>
                <label for='role'>patient</label>
                <input type='radio' onClick={(e)=>{setRole(e.target.value)}} name='role' value='patient'/>
                <label for='role'>doctor</label>
                <input type='radio' onClick={(e)=>{setRole(e.target.value)}} name='role' value='doctor'/>
            </p>
            <p>
                <button onClick={handleClick}  className="colorful">Sign In</button>
            </p>

            <Link to = {"/admin"}>
                <button  className="colorful">Admin</button>
            </Link>
            
            
        </div>
    )
}

export default Signin