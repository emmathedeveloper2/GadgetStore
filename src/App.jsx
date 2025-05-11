// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Registerdevice from "./Pages/Registerdevice";
import Mydevice from "./Pages/Mydevice";

const App = ()  =>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Registerdevice" element={<Registerdevice/>} />
        <Route path="/Mydevice" element={<Mydevice/>} />
      </Routes>
    </Router>
  );
}


export default App