import { IoMdHome } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";


export default function Topbar() {
  return (
    <header className="px-4 md:px-6 py-4 fixed top-0 left-0 md:left-52 right-0 z-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Section */}
        <div className="text-[#929DAE] w-full md:w-auto">
          <h1 className="flex items-center gap-1 font-mono font-semibold text-sm">
            <IoMdHome className="text-lg" /> / Dashboard
          </h1>
          <h2 className="text font-bold text-black text-lg md:text-xl">Dashboard</h2>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 w-full md:w-auto">

          <IoMdNotificationsOutline className="text-xl cursor-pointer hover:text-blue-500" />
          <IoIosSettings className="text-xl cursor-pointer hover:text-green-500" />
          <FaUserCircle className="text-xl text-gray-600 cursor-pointer hover:text-red-500" />
        </div>
      </div>
    </header>
  );
}
