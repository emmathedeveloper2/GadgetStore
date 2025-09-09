import { IoMdHome } from "react-icons/io";
// import { IoIosSettings } from "react-icons/io";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useState } from "react";
import Notification from "./Notification";
import { NavLink } from "react-router-dom";
import DigitalClock from "./DigitalClock";

export default function Topbar({ pageName = "Dashboard" , middlename = <DigitalClock />}) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [hasNewNotification] = useState(true);

  return (
    <header className="px-4 md:px-6 py-4 fixed top-0 left-0 md:left-52 right-0 z-10 backdrop-blur-md bg-white/70 hidden md:block">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left Section */}
        <div className="text-[#929DAE] w-full md:w-auto">
          <h1 className="flex items-center gap-1 font-mono font-semibold text-sm">
            <NavLink to="/dashboard">
              <IoMdHome className="text-lg" />
            </NavLink>
            <span>/ {pageName}</span>
          </h1>
          <h2 className="font-bold text-green-300 text-lg md:text-xl">{pageName}</h2>
        </div>


        <div>
          {/* Center Section */}
          <h1 className="text font-bold text-center">{middlename}</h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative px-4 py-2 ">
            <button onClick={() => setShowSidebar(true)} className="relative">
              <IoIosNotificationsOutline className="text-xl cursor-pointer hover:text-blue-500" />
              {hasNewNotification && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full"></span>
              )}
            </button>
            <Notification isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
          </div>

          {/* <IoIosSettings className="text-xl cursor-pointer hover:text-green-500" /> */}
        </div>
      </div>
    </header>
  );
}
