import { FaLaptop, FaThList, FaUser } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="hidden md:block text2 fixed top-2 left-0 h-[977px] p-4 bg-[#2D2D31] text-white rounded-md ml-2 w-16 md:w-48 transition-all duration-300">
      {/* Header */}
      <div className="grid place-content-center">
        <h2 className="text-xl font-bold mb-10 flex items-center justify-center md:justify-start gap-2">
          <MdOutlineDashboardCustomize className="text-1xl" />
          <span className="hidden md:inline">GadgetReg</span>
        </h2>
        <hr className="text-[#4b4a4a] -mt-4" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-4 mt-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : "hover:bg-[#4c4c4e]"
            } p-2 rounded flex items-center gap-2`
          }
        >
          <FaUser className="text-lg" />
          <span className="hidden md:inline">Dashboard</span>
        </NavLink>
        <NavLink
          to="/Registerdevice"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : "hover:bg-[#4c4c4e]"
            } p-2 rounded flex items-center gap-2`
          }
        >
          <FaLaptop className="text-lg" />
          <span className="hidden md:inline">Register Device</span>
        </NavLink>
        <NavLink
          to="/Mydevice"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : "hover:bg-[#4c4c4e]"
            } p-2 rounded flex items-center gap-2`
          }
        >
          <FaThList className="text-lg" />
          <span className="hidden md:inline">Devices</span>
        </NavLink>
        <NavLink
        to="/Profile"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500" : "hover:bg-[#4c4c4e]"
            } p-2 rounded flex items-center gap-2 mt-auto`
          }
        >
          <PiSignOutBold className="text-lg" />
          <span className="hidden md:inline">Profile</span>
        </NavLink>

        <NavLink
          to="/"
          className={
            "bg-blue-500 hover:bg-[#ff6464] mt-[640px] p-2 rounded flex items-center gap-2"
          }
        >
          <PiSignOutBold className="text-lg" />
          <span className="hidden md:inline">Sign out</span>
        </NavLink>
      </nav>
    </aside>
  );
}
