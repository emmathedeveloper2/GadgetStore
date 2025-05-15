import { FaLaptop, FaThList, FaUser } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden md:block fixed top-2 left-0 h-[977px] p-4 bg-[#2D2D31] text-white rounded-md ml-2 w-16 md:w-48 transition-all duration-300">
      {/* Header */}
      <h2 className="text-xl font-bold mb-10 flex items-center justify-center md:justify-start gap-2">
        <MdOutlineDashboardCustomize className="text-2xl" />
        <span className="hidden md:inline">GadgetReg</span>
      </h2>

      {/* Navigation */}
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="bg-blue-500 p-2 rounded flex items-center gap-2">
          <FaUser className="text-lg" />
          <span className="hidden md:inline">Dashboard</span>
        </Link>
        <Link to="/Registerdevice" className="hover:bg-[#4c4c4e] p-2 rounded flex items-center gap-2">
          <FaLaptop className="text-lg" />
          <span className="hidden md:inline">Register Device</span>
        </Link>
        <Link to="/Mydevice" className="hover:bg-[#4c4c4e] p-2 rounded flex items-center gap-2">
          <FaThList className="text-lg" />
          <span className="hidden md:inline">My Devices</span>
        </Link>
        <Link to="/" className="hover:bg-[#4c4c4e] p-2 rounded flex items-center gap-2 mt-auto">
          <PiSignOutBold className="text-lg" />
          <span className="hidden md:inline">Sign out</span>
        </Link>
      </nav>
    </aside>
  );
}
