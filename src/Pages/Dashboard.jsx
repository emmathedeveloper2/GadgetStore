import { useEffect, useState } from "react";
import Chart from "../Components/Chart";
import Project from "../Components/projects";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { FaUser } from "react-icons/fa";

const initialCards = [
  { color: "bg-black", label: "Students", value: 760, change: "+55%" },
  { color: "bg-green-600", label: "Gadgets", value: 7600, change: "+55%" },
  { color: "bg-blue-400", label: "Students", value: "26k", change: "+5%" },
  { color: "bg-red-500", label: "Students", value: "+76", change: "+75%" },
];

export default function Dashboard() {
  const [cards, setCards] = useState(initialCards);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) =>
        prev.map((card, idx) => {
         
          let newValue;
          if (idx === 1) {
            
            newValue = Math.floor(Math.random() * 9000 + 1000);
          } else if (idx === 2) {
           
            newValue = `${Math.floor(Math.random() * 90 + 10)}k`;
          } else if (idx === 3) {
            
            newValue = `+${Math.floor(Math.random() * 90 + 10)}`;
          } else {
            
            newValue = Math.floor(Math.random() * 900 + 100);
          }

          const newChange = `+${Math.floor(Math.random() * 90 + 10)}%`;
          return { ...card, value: newValue, change: newChange };
        })
      );
    }, 1800);

    return () => clearInterval(interval);
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
              <div key={index} className="bg-white shadow-lg rounded-lg p-2 relative">
                {/* Icon */}
                <div className={`absolute -top-4 left-4 p-4 rounded-md ${card.color} text-white`}>
                  <FaUser className="text-lg" />
                </div>
                {/* Content */}
                <div className="text-right mt-2 text-[#929DAE] font-mono">
                  <p className="text2">{card.label}</p>
                  <p className="text-[#344767] text-1xl font-bold">{card.value}</p>
                </div>
                <hr className="mt-4 text-[#F8F8F9]" />
                <p className="ml-4 mt-2 text-sm text-[#929DAE]">
                  <span className="text-green-600">{card.change}</span> than last period
                </p>
              </div>
            ))}
          </div>

          {/* Chart + Projects */}
          <div>
            <Chart />
            <Project />
          </div>
        </main>
      </div>
    </div>
  );
}
