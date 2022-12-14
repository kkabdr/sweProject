import { useState,useEffect } from 'react';
import Cookies from 'universal-cookie';
import './Form.css';
import {Link, useFetcher} from 'react-router-dom';


function SignupDoctor() { 
    
    useEffect(()=>{
        
        
        fetchDepartments()
        fetchSpecializations()
    },[])
    const fetchDepartments = async ()=>{
        const rawData = await fetch("http://localhost:4000/api/data/departments/all")
        const departments = await rawData.json()  
        // console.log(departments)
        if(departments.ok){
            setAllDeps(departments.departments)
            console.log(allDeps)
        }
    }
    const fetchSpecializations = async ()=>{
        const rawData = await fetch("http://localhost:4000/api/data/specializations/all")
        const specializations = await rawData.json()  
        if(specializations.ok){
            setAllSpecs(specializations.specializations)
        }
    }
    const [allDeps,setAllDeps] = useState()
    const [allSpecs,setAllSpecs] = useState()
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
    const [department, setDepID] = useState();
    const [specialization, setSpecID] = useState();
    const [experience, setExperience] = useState();
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();

    // const [selectedFile, setSelectedFile] = useState(null);
    const [category, setCategory] = useState();
    const [price, setPrice] = useState();
    const [degree, setDegree] = useState();
    // const [rating, setRating] = useState('');
    const [workingdays, setWorkingDays] = useState([]);
    
    
    

    
    function handleWorkdays(e){
        let isChecked = e.target.checked 
        if(isChecked){
            setWorkingDays(prev => [...prev,e.target.value])
        }else{
            setWorkingDays(workingdays.filter(el => el !==e.target.value))
        }
    }
    
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
            "department_id":department, 
            "experience":experience,
            "photo":"none",
            "category":category,
            "price":price,
            "rating":0,
            "schedule": {
                "workdays":workingdays,
                "startTime":startTime,
                "endTime":endTime
            },
            "specialization_id": specialization,
            "degree":degree
        }

        const all = {
            "token":token,
            "doctor":baseInfo,
        }
        
        const rawData = await fetch("http://localhost:4000/api/auth/doctor/signup",{
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

            <p><h3>Specific Information</h3></p>
        
            
            
            <select onChange={(e) => { setDepID(e.target.value); } }  className = "options">
            <option value="" className = "optionItem">Select Department</option>
                {allDeps?.map((dep) => {return <option value={dep.id} className = "optionItem">{dep.department_name}</option>})}
            </select>
            <select onChange={(e) => { setSpecID(e.target.value); } }  className = "options">
            <option value="" className = "optionItem">Select Specialization</option>
                {allSpecs?.map((spec) => {return <option value={spec.id} className = "optionItem">{spec.specialization_name}</option>})}
            </select>
            <p><input onChange={(e)=>{setExperience(e.target.value)}} name="experience" type="number" placeholder='enter expience'/></p>
            <p>Chose category</p>
            <p>lowest<input onChange={(e)=>{setCategory(e.target.value)}} name="category" value="lowest" type="radio"/></p>
            <p>middle<input onChange={(e)=>{setCategory(e.target.value)}} name="category" value="middle" type="radio"/></p>
            <p>highest<input onChange={(e)=>{setCategory(e.target.value)}} name="category" value="highest" type="radio"/></p>
            <p><input onChange={(e)=>{setPrice(e.target.value)}} name="price" type="number" placeholder='enter price'/></p>
            <p><input onChange={(e)=>{setDegree(e.target.value)}} name="degree" type="text" placeholder='enter degree'/></p>
            <p>Choose workdays</p>
            {/* <p> */}
                <p>Monday <input onChange={(e)=>{handleWorkdays(e)}} name="monday" value="Monday" type="checkbox"/></p>
                <p>Tuesday <input onChange={(e)=>{handleWorkdays(e)}} name="tuesday" value="Tuesday" type="checkbox"/></p>
                <p>Wednesday <input onChange={(e)=>{handleWorkdays(e)}} name="wednesday" value="Wednesday" type="checkbox"/></p>
                <p>Thursday <input onChange={(e)=>{handleWorkdays(e)}} name="thursday" value="Thursday" type="checkbox"/></p>
                <p>Friday <input onChange={(e)=>{handleWorkdays(e)}} name="friday" value="Friday" type="checkbox"/></p>
            {/* </p> */}
            <p>Starting </p>
            <p><input onChange={(e)=>{setStartTime(e.target.value)}} type="time" name="workingHours"/></p>
            <p>Ending </p>
            <p><input onChange={(e)=>{setEndTime(e.target.value)}} type="time" name="workingHours"/></p>
            <p><button onClick={handleSubmit} className = "colorful">Sign Up Doctor</button></p>

            <Link to = {"/admin"}>
                <button className = "colorful">Go back</button>
            </Link>
        </div>
    )

}

export default SignupDoctor