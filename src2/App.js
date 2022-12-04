import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home";
import Reservation from "./pages/Reservation/Reservation";
import Doctor from "./pages/doctor/doctor";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route path="/reservation" element={<Reservation/>}></Route>
        <Route path="/reservation/:id" element={<Doctor/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
