import "./Footer.css";
import "./map.png";

const Footer = () => {
    return(
        <div className = "footer">
            <div className = "footerContainer">
                {/* <div className = "footer-info"> */}
                    <h3>Densys.me</h3>
                    <h3>Working hours: Monday to Saturday from 9:00 to 18:00</h3>
                    <h3>Address: Astana, Kabanbay batyr, 53</h3>
                {/* </div> */}
                {/* <div className = "footer-map">
                    <img width= "168px" height= "168px" src="./map.png" alt="Map"/>
                </div> */}
            </div>
        </div>
    )
}
export default Footer;