import React from "react";
import { Link } from "react-router-dom";

function Login(){
    return(
        <div className = "headerListItem">
                        <Link to = "/login">
                            <button className="navButton">Login</button>
                        </Link>
        </div>
    )
}

export default Login