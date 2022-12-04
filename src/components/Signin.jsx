import React,{useState} from 'react'
import Cookies from 'universal-cookie';
import './Form.css';
import {Link} from 'react-router-dom';
import Header from './header/Header';
// import SignupDoctor from "./components/SignupDoctor"
// import SignupPatient from "./components/SignupPatient";

function Signin(){

    const [email,setEmail] = useState()
    const [password,setPassword] = useState()

    async function handleClick(){
        const user = {
            "email":email,
            "password":password
        }

        const rawData = await fetch("http://localhost:4000/api/auth/signin",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

        const result = await rawData.json()
        if(result.ok){
            //create cookie with jwt
            const cookies = new Cookies();
            cookies.set('token', result.token, { path: '/' });
            console.log(cookies.get('token'))
            return
        }
        console.log('Credentials error')
    }

    return(
        <>
        <Header />

        <div className='signin'>
            <p>
                <input onChange={(e)=>{setEmail(e.target.value)}} required name='email' type='email'/>
            </p>
            <p>
                <input onChange={(e)=>{setPassword(e.target.value)}} required name='password' type='password'/>
            </p>
            <p>
                <button onClick={handleClick}>Sign In</button>
            </p>

            <Link to = {"/admin"}>
                <button className = "route">Admin</button>
            </Link>
            
        </div>
</>
    )
}

export default Signin