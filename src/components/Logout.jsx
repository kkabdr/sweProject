import React from "react";
import Cookies from "universal-cookie";
import {Link} from 'react-router-dom'

function Logout(){

    // const logout = ()=>{
    //     const cookie = new Cookies
    //     cookie.set('token','',{path:"/"})
    //     cookie.set('role','',{path:"/"})
    //     cookie.set('userID', '',{path:"/"})
    // }

    return(
        <div className = "headerListItem">
                <Link to="/">
                    <button className="navButton">Logout</button>
                </Link>
        </div>
    )
}

export default Logout