import "./Header.css";
//import {DateRange} from 'react-date-range';
//import {useState} from 'react';
//import 'react-date-range/dist/styles.css';
//import 'react-date-range/dist/theme/default.css';
//import { format } from "date-fns";
import {Link} from 'react-router-dom';

const Header = () => {
    // const [openDate, setOpenDate] = useState(false);
    // const [department, setDepartment] = useState("");
    // const [search, setSearch] = useState([
    //     {
    //         startDate: new Date(),
    //         endDate: new Date(),
    //         key: 'selection'
    //     }
    // ]);
    
    return (
        <div className = "header">
            <div className = "headeContainer">
                <div className = "headerList">
                    <div className = "headerListItem active">
                        <span className = "logo">Densys.me</span>
                    </div>
                    <div className = "headerListItem active">
                        <Link to = "/departments">
                            <span className="link">Departments</span>
                        </Link>
                    </div>
                    <div className = "headerListItem">
                        <Link to = "/reservation">
                            <span className="link">Reservations</span>
                        </Link>
                    </div>
                    <div className = "headerListItem">
                        <span>Contact Us</span>
                    </div>
                    <div className = "headerListItem">
                        <Link to = "/login">
                            <button className="navButton">Login</button>
                        </Link>
                    </div>
                </div>
                <h1 className="headerTittle">"Make a Reservation today, to get service tomorrow"</h1>
                <p className="headerDesc">
                    High specialized doctors, new equipment with high accuracy.
                </p>
                <Link to = "/admin">
                    <button className = "headerBtn">Reservation</button>
                </Link>
                {/* <div className="headerSearch">
                    <div className = "headerSearchItem">
                        <input type = "text" placeholder="Type doctor's name" className = "headerSearchInputItem"></input>
                    </div>
                    <div className = "headerSearchItem">
                            <select onChange={(e) => { setDepartment(e.target.value); } } value={department} className = "options">
                                <option value="" className = "optionItem">Department's name</option>
                                <option value="medicine" className = "optionItem">Medicine</option>
                                <option value="surgery" className = "optionItem">Surgery</option>
                                <option value="gynecology" className = "optionItem">Gynecology</option>
                                <option value="obstretrics" className = "optionItem">Obstretrics</option>
                                <option value="pediatrics" className = "optionItem">Pediatrics</option>
                                <option value="radiology" className = "optionItem" >Radiology</option>
                                <option value="eye" className = "optionItem">Eye</option>
                                <option value="ent" className = "optionItem">ENT</option>
                                <option value="dental" className = "optionItem">Dental</option>
                                <option value="orthopedics" className = "optionItem">Orthopedics</option>
                                <option value="neurology" className = "optionItem">Neurology</option>
                                <option value="cardiology" className = "optionItem">Cardiology</option>
                                <option value="psychiatry" className = "optionItem">Psychiatry</option>
                                <option value="skin" className = "optionItem">Skin</option>
                            </select>
                    </div>
                    <div className = "headerSearchItem">
                        <span onClick={() => setOpenDate(!openDate)} className = "headerSearchText">{`${format(search[0].startDate, "MM/dd/yyyy")} to ${format(search[0].endDate, "MM/dd/yyyy")}`}</span>
                        {openDate && <DateRange editableDateInputs={true} onChange = {item => setSearch([item.selection])} moveRangeOnFirstSelection = {false} ranges={search} className = "date"/>}
                    </div>
                    <div className = "headerSearchItem">
                        <button className = "headerBtn">Reserve</button>   
                    </div>
                </div> */}
            </div>  
        </div>
    )
}
export default Header
