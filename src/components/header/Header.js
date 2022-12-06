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
            <div className = "headerContainer">
                <div className = "headerList">
                    <div className = "headerListItem active">
                        <Link to = "/">
                            <span className = "logo">Densys.me</span>
                        </Link>
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
                        <Link to = "/contact">
                            <span className="link">Contact Us</span>
                        </Link>
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
                <Link to = "/reservation">
                    <button className = "headerBtn">Reservation</button>
                </Link>
            </div>  
        </div>
    )
}
export default Header
