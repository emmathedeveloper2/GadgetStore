import { useEffect, useState } from "react";
import Chart from "../Components/Chart";
import Project from "../Components/projects";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { FaUser } from "react-icons/fa";
import { fetchDevices } from "../../lib/Firebase"; // Make sure this import is correct

export default function Dashboard() {
  const [cards, setCards] = useState([
    { color: "bg-black", label: "Students", value: 0, change: "+1" },
    { color: "bg-green-600", label: "Gadgets", value: 0, change: "+1" },
    { color: "bg-blue-400", label: "Alpha Semester", value: 0, change: "+1" },
    { color: "bg-red-500", label: "Omega Semester", value: 0, change: "+1" },
  ]);

  useEffect(() => {
    async function loadStats() {
      const devices = await fetchDevices("devices");
      // Unique matric numbers
      const uniqueMatric = new Set(devices.map((d) => d.matric));
      // Gadgets = total registrations
      const gadgets = devices.length;
      // Alpha Semester count
      const alpha = devices.filter(
        (d) => d.semester === "Alpha Semester"
      ).length;
      // Omega Semester count
      const omega = devices.filter(
        (d) => d.semester === "Omega Semester"
      ).length;

      setCards([
        {
          color: "bg-black",
          label: "Students",
          value: uniqueMatric.size,
          change: "+1",
        },
        { color: "bg-green-600", label: "Gadgets", value: gadgets, change: "+1" },
        {
          color: "bg-blue-400",
          label: "Alpha Semester",
          value: alpha,
          change: "+1",
        },
        {
          color: "bg-red-500",
          label: "Omega Semester",
          value: omega,
          change: "+1",
        },
      ]);
    }
    loadStats();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-52  transition-all duration-300">
        <Topbar />
        <main className="mt-25 p-4 md:p-2">
          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 text-white">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-2 relative"
              >
                {/* Icon */}
                <div
                  className={`absolute -top-4 left-4 p-4 rounded-md ${card.color} text-white`}
                >
                  <FaUser className="text-lg" />
                </div>
                {/* Content */}
                <div className="text-right mt-2 text-[#929DAE] font-mono">
                  <p className="text2">{card.label}</p>
                  <p className="text-[#344767] text-1xl font-bold">
                    {card.value}
                  </p>
                </div>
                <hr className="mt-4 text-[#F8F8F9]" />
                <p className="ml-4 mt-2 text-sm text-[#929DAE]">
                  <span className="text-green-600">{card.change}</span> than
                  last period
                </p>
              </div>
            ))}
          </div>

          {/* Chart + Projects */}
          <div className="mt-10">
            <Chart />
            <Project />
          </div>
        </main>
      </div>
    </div>
  );
}
