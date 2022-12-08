import React from "react";
import "./Home.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
/*import {Link} from 'react-router-dom';*/
const Home = () => {
    return(
        <>
        <Header />
        <div className="mainpage">
            <h1>Welcome to DenSys.me hospital management system!</h1>
            <img src="https://www.pngitem.com/pimgs/m/490-4900546_doctors-png-image-doctors-png-transparent-png.png"></img>
        </div>
        <Footer />
        </>
    )
}
export default Home