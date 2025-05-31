// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Registerdevice from "./pages/Registerdevice";
import Mydevice from "./pages/Mydevice";
// import { CheckboxReactHookFormSingle } from "./Components/CheckboxReactHookFormSingle";

const App = ()  =>{
  return (
    <Router basename="">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Registerdevice" element={<Registerdevice/>} />
        <Route path="/Mydevice" element={<Mydevice/>} />
        {/* <Route path="/Omega" element={<CheckboxReactHookFormSingle />} /> */}
      </Routes>
    </Router>
  );
}


export default App