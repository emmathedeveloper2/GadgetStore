import { FaLaptop, FaThList, FaUser } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (

    <aside className="absolute w-48 rounded-2xl h-[977px] bg-blue-800 text-white ml-2 top-2 left-0 p-4">
      <h2 className="text-1xl font-bold mb-10 flex items-center justify-center"><MdOutlineDashboardCustomize />GadgetReg</h2>

      <nav className="flex flex-col text gap-4">
        <Link to="/dashboard" className="hover:bg-blue-700 p-2 rounded flex items-center gap-2">
          <FaUser /> Dashboard
        </Link>
        <Link to="/Registerdevice" className="hover:bg-blue-700 p-2 rounded flex items-center gap-2">
          <FaLaptop /> Register Device
        </Link>
        <Link to="/Mydevice" className="hover:bg-blue-700 p-2 rounded flex items-center gap-2">
          <FaThList /> My Devices
        </Link>
        <Link to="/" className="hover:bg-blue-700 p-2 rounded flex items-center gap-2">
          <PiSignOutBold /> Sign out
        </Link>
      </nav>


      <nav className="flex-col text gap-4 hidden">
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
    </aside>

    
  );
}
