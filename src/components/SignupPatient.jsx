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
    const [emContact, setEmContact] = useState([]);

    
    
    function addNewEmContact(){
        let node = document.createElement("input", {name:"emcontact", id:"emcontact", type:"number"})
        node.classList.add("emcontactInput")
        node.onchange = ()=>{
            setEmContact(prev=>
                [...prev,node.value]
            )
        }
        let del = document.createElement("button")
        del.innerHTML = "X"
        del.onclick = ()=>{
            console.log("triger")
            let inp = del.parentElement.querySelector(':scope > input')
            setEmContact(emContact.filter((el)=>el!==inp.value))
            del.parentElement.remove()
        }
        let p = document.createElement("p")
        p.appendChild(node)
        p.appendChild(del)
        
        let target  = document.querySelector(".emcontact")
        console.log(target)
        target.appendChild(p)
    }
    
    function submitEmContact(){
        const emcontactInputs = document.querySelectorAll(".emcontactInput")
        for(let i = 0; i < emcontactInputs.le; i++){
            setEmContact(prev=>[...prev, emcontactInputs[i].innerHTML])
        }
    }
    async function handleSubmit(){
        submitEmContact()
        console.log(emContact)
        const cookies = new Cookies()
        const token = cookies.get('token')
        const type = 3
        const baseInfo = {
            "role_id":"3",
            "dateOfBirth":dateOfBirth,
            "iin":iin,
            "stateID":stateID,
            "name":name,
            "surname":surname,
            "middlename":middlename,
            "contactNumber":[contactNumber],
            "email":email,
            "address":address,
            "password":password
        }
        const specificInfo = {
            "bloodGroup":bloodGroup,
            "maritalStatus":maritalStatus,
            "emergencyContact":emContact,
            "other":otherInfo
        }

        const all = {
            "token":token,
            "type":type,
            "baseInfo":baseInfo,
            "specificInfo":specificInfo
        }
        console.log(all)
        
        const rawData = await fetch("http://localhost:4000/api/auth/signup",{
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
        <div>
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
            
            <p><h3>Specific Information</h3></p>
            <div className='emcontact'>
                <p><button onClick={addNewEmContact}>Add Contact Number</button></p>
            </div>
            <p>Chose marital status</p>
            <p>single<input onChange={(e)=>{setMartialStatus(e.target.value)}} name="maritalStatus" value="single" type="radio"/></p>
            <p>married<input onChange={(e)=>{setMartialStatus(e.target.value)}} name="maritalStatus" value="married" type="radio"/></p>
            <p><input onChange={(e)=>{setBlood(e.target.value)}} name="blood" type="text" placeholder='enter blood  type'/></p>
            <p><input onChange={(e)=>{setOtherInfo(e.target.value)}} name="other" type="text" placeholder='enter other info'/></p>
            <button onClick={handleSubmit}>Sign Up </button>

            <Link to = {"/admin"}>
                <button className = "route">Go back</button>
            </Link>
        </div>
    )

}

export default SignupPatient