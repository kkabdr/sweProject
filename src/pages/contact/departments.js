import "./contact.css"
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Departments = () => {
    
    return (
        <div>            
            <Header/>
            <div className = "contact-main">
            <div className = "contact">
                <h3>These are our departments:</h3>
                <p>
                    <ul>
                        <li>Medicine</li>
                        <li>Surgery</li>
                        <li>Gynecology</li>                        
                        <li>Obstretrics</li>
                        <li>Pediatrics</li>                        
                        <li>Radiology</li>
                        <li>Eye</li>
                        <li>ENT</li>
                        <li>Dental</li>
                        <li>Orthopedics</li>
                        <li>Neurology</li>
                        <li>Cardiology</li>
                        <li>Psychiatry</li>
                        <li>Skin</li>
                        <li>Please give us 100%</li>
                    </ul>
                </p>
                
            </div>
        </div>
        <Footer />
        </div>
    )
}
export default Departments;
