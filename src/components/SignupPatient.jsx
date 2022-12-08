import { useState } from 'react';
import Cookies from 'universal-cookie';
import './Form.css';
import {Link} from 'react-router-dom';


function SignupPatient() {
    const [name, setName] = useState();
    const [middlename, setMidname] = useState();
    const [surname, setSurname] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [iin, setIIN] = useState();
    const [stateID, setStateID] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [contactNumber, setContactNumber] = useState();
    const [address, setAddress] = useState();

    const [otherInfo, setOtherInfo] = useState()
    const [bloodGroup, setBlood] = useState();
    const [maritalStatus, setMartialStatus] = useState();
    const [emContact, setEmContact] = useState();
    async function handleSubmit(){
        const cookies = new Cookies()
        const token = cookies.get('token')
        const baseInfo = {
            "dateofbirth":dateOfBirth,
            "iin":iin,
            "stateID":stateID,
            "name":name,
            "surname":surname,
            "middlename":middlename,
            "number":contactNumber,
            "email":email,
            "address":address,
            "password":password,
            "bloodgroup":bloodGroup,
            "marital_status":maritalStatus,
            "emergency_contact":emContact,
            "other":otherInfo
        }

        const all = {
            "token":token,
            "patient":baseInfo,
        }
        
        const rawData = await fetch("http://localhost:4000/api/auth/patient/signup",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(all)
        })

        const result = await rawData.json()
        console.log(result)
    }
    return(
        <div className='signup'>
            <p><h3>General Information</h3></p>
            <p><input onChange={(e)=>{setName(e.target.value)}} name="name" type="text" placeholder='enter name'/></p>
            <p><input onChange={(e)=>{setSurname(e.target.value)}} name="surname" type="text" placeholder='enter surname'/></p>
            <p><input onChange={(e)=>{setMidname(e.target.value)}} name="middlename" type="text" placeholder='enter middlename'/></p>
            <p><input onChange={(e)=>{setContactNumber(e.target.value)}} name="contactNumber" type="number" placeholder='enter contact number'/></p>
            <p><input onChange={(e)=>{setIIN(e.target.value)}} name="iin" type="number" placeholder='enter name IIN'/></p>
            <p><input onChange={(e)=>{setStateID(e.target.value)}} name="stateID" type="number" placeholder='enter state ID'/></p>
            <p><input onChange={(e)=>{setDateOfBirth(e.target.value)}} name="dateOfBirth" type="date"/></p>
            <p><input onChange={(e)=>{setAddress(e.target.value)}} name="address" type="text" placeholder='enter address'/></p>
            <p><input onChange={(e)=>{setEmail(e.target.value)}} name="email" type="email" placeholder='enter email'/></p>
            <p><input onChange={(e)=>{setPassword(e.target.value)}} name="password" type="password" placeholder='enter password'/></p>
            <p><input onChange={(e)=>{setEmContact(e.target.value)}} name="number" type="text" placeholder='enter your emergency phone number'/></p>
            <p>Chose marital status</p>
            <p>single<input onChange={(e)=>{setMartialStatus(e.target.value)}} name="maritalStatus" value="single" type="radio"/></p>
            <p>married<input onChange={(e)=>{setMartialStatus(e.target.value)}} name="maritalStatus" value="married" type="radio"/></p>
            <p><input onChange={(e)=>{setBlood(e.target.value)}} name="blood" type="text" placeholder='enter blood  type'/></p>
            <p><input onChange={(e)=>{setOtherInfo(e.target.value)}} name="other" type="text" placeholder='enter other info'/></p>
            <p><button onClick={handleSubmit} className = "colorful">Sign Up </button></p>

            <Link to = {"/admin"}>
                <button className = "colorful">Go back</button>
            </Link>
            
        </div>
    )

}

export default SignupPatient