import Signin from "./components/Signin";
import SignupDoctor from "./components/SignupDoctor"
import SignupPatient from "./components/SignupPatient";
import AdminAllDoctor from "./pages/AdminAllDoctor"
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import Home from "./pages/home/Home";
import Reservation from "./pages/Reservation/Reservation";
import Doctor from "./pages/doctor/doctor";
function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path = "/" element = {<Home/>}></Route>
        <Route exact path = "/reservation" element = {<Reservation/>}></Route>
        <Route exact path = "/reservation/Doctor" element = {<Doctor/>}></Route>
        <Route exact path = "/login" element = {<Signin/>}></Route>
        <Route exact path = "/admin" element = {<AdminAllDoctor/>}></Route>
        <Route exact path = "/admin/signuppatient" element = {<SignupPatient/>}></Route>
        <Route exact path = "/admin/signupdoctor" element = {<SignupDoctor/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
