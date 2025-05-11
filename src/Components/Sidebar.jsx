import { FaLaptop, FaThList, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (

    <aside className="w-64 h-screen bg-blue-800 text-white fixed top-0 left-0 p-4">
      <h2 className="text-2xl font-bold mb-10 text-center">GadgetReg</h2>
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="hover:bg-blue-700 p-2 rounded flex items-center gap-2">
          <FaUser /> Dashboard
        </Link>
        <Link to="/Registerdevice" className="hover:bg-blue-700 p-2 rounded flex items-center gap-2">
          <FaLaptop /> Register Device
        </Link>
        <Link to="/Mydevice" className="hover:bg-blue-700 p-2 rounded flex items-center gap-2">
          <FaThList /> My Devices
        </Link>
      </nav>


      <nav className="flex-col gap-4 hidden">
        <Link to="/dashboard" className="hover:bg-blue-700 p-2 rounded flex items-center gap-2">
          <FaUser /> 
        </Link>
        <Link to="/Registerdevice" className="hover:bg-blue-700 p-2 rounded flex items-center gap-2">
          <FaLaptop />
        </Link>
        <Link to="/Mydevice" className="hover:bg-blue-700 p-2 rounded flex items-center gap-2">
          <FaThList />
        </Link>
      </nav>
    </aside>

    
  );
}
