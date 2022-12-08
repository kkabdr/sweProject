import React from "react";
import Cookies from "universal-cookie";

import {Link, useNavigate} from 'react-router-dom'

function Logout(){
    const navigate = useNavigate()
    const logout = ()=>{
        console.log("Clicked")
        const cookie = new Cookies()
        cookie.set('token','')
        cookie.set('role','')
        cookie.set('userID', '')

        navigate("/")
        // window.location.reload(false);

    }

    return(
        <div className = "headerListItem">
                <Link to="/">
                    <button onClick={logout} className="navButton">Logout</button>
                </Link>
        </div>
    )
}

export default Logout