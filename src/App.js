import Signin from "./components/Signin";
import SignupDoctor from "./components/SignupDoctor"
import SignupPatient from "./components/SignupPatient";
import AdminAllDoctor from "./components/AdminAllDoctor"
import ManageDoctor from "./components/ManageDoctor"
import ManagePatient from "./components/ManagePatient"
// import Patient from "./pages/Patient";
// import UpdateAppointment from "./pages/UpdateAppointment";
// import DeleteAppointment from "./pages/DeleteAppointment";
import {Route, Routes, BrowserRouter, useNavigate} from 'react-router-dom';
import Cookies from "universal-cookie";
import Home from "./pages/home/Home";
import Reservation from "./pages/Reservation/Reservation";
import Doctor from "./components/Doctor";
import Contact from "./pages/contact/contact";
import Departments from "./pages/contact/departments";
import Appointment from "./components/Appointment";
import MyReservations from "./components/MyReservations";
import MyPatients from "./components/MyPatients";
// import Cookies from "universal-cookie";

function App() {
// 
   
  // const cookie = new Cookies
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path = "/" element = {<Home/>}></Route>
        <Route exact path = "/reservation" element = {<Reservation/>}></Route>
        <Route exact path = "/reservation/:id" element = {<MyReservations/>}></Route>
        <Route exact path = "/departments" element = {<Departments/>}></Route>
        <Route exact path = "/doctor" element = {<Doctor/>}></Route>
        <Route exact path = "/login" element = {<Signin/>}></Route>
        <Route exact path = "/admin" element = {<AdminAllDoctor/>}></Route>
        <Route exact path = "/contact" element = {<Contact/>}></Route>
        <Route exact path = "/admin/signuppatient" element = {<SignupPatient/>}></Route>
        <Route exact path = "/admin/signupdoctor" element = {<SignupDoctor/>}></Route>
        <Route exact path = "/admin/manage/doctors" element = {<ManageDoctor/>}></Route>
        <Route exact path = "/admin/manage/patients" element = {<ManagePatient/>}></Route>
        <Route path = "/admin/manage/doctor/:id" element = {<Doctor/>}></Route>
        <Route path = "/make/appointment/:id" element = {<Appointment/>}></Route>
        <Route path = "/my-patients" element={<MyPatients/>}></Route>
        {/* <Route exact path = "/patient" element = {<Patient/>}></Route> */}
        {/* <Route exact path = "/patient/update" element = {<UpdateAppointment/>}></Route> */}
        {/* <Route exact path = "/patient/delete" element = {<DeleteAppointment/>}></Route> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
