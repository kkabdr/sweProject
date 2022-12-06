import "./contact.css"
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer"; 
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";

const Contact = () => {
    const [name, setName] = useState("");
    const [problem, setProblem] = useState("");
    const [description, setDescription] = useState("");

    const handleContact = () => {
        if(!name && !problem && !description){
            console.log(1);
        }
    }

return(
    <div>
        <Header/>

        <div className = "contact-main">
            <div className = "contact">
                <h3>Leave your contacts and we will contact you!</h3>
                <p>
                    <label>Your name:</label>
                    <input type = "text" className = "contactInput" onChange = {(e) => {setName(e.target.value);}} value = {name} placeholder="Your name"></input>
                </p>
                <p>
                    <label>Problem:</label>
                    <input type = "text" className = "contactInput" onChange = {(e) => {setProblem(e.target.value);}} value = {problem}  placeholder="Problem"></input>
                </p>
                <p>
                    <label>Description:</label>
                    <input type = "text" className = "contactInput" onChange = {(e) => {setDescription(e.target.value);}} value = {description}  placeholder="Description"></input>
                </p>
                <p className="button">
                    <button className = "contact-btn" onClick = {() => handleContact()}>Submit</button>
                </p>
            </div>
        </div>
        <Footer />
    </div>
)   
}
export default Contact;

