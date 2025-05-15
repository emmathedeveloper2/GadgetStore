import Chart from "../Components/Chart";
import Project from "../Components/projects";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { FaUser } from "react-icons/fa";

export default function Dashboard() {
  // const exportToCSV = () => {
  //   const storedDevices = JSON.parse(localStorage.getItem("devices")) || [];

  //   if (storedDevices.length === 0) {
  //     alert("No devices to export.");
  //     return;
  //   }

  //   const headers = ["Matric", "Brand", "Serial", "MAC", "Type", "Date"];
  //   const rows = storedDevices.map((d) => [
  //     d.matric,
  //     d.brand,
  //     d.serial,
  //     d.mac,
  //     d.type,
  //     d.date,
  //   ]);

  //   let csvContent =
  //     "data:text/csv;charset=utf-8," +
  //     [headers, ...rows].map((e) => e.join(",")).join("\n");

  //   const encodedUri = encodeURI(csvContent);
  //   const link = document.createElement("a");
  //   link.setAttribute("href", encodedUri);
  //   link.setAttribute("download", "registered_devices.csv");
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-52  transition-all duration-300">
        <Topbar />
        <main className="mt-20 p-4 md:p-2">
          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 text-white">
            {[
              { color: "bg-black", label: "Students", value: 760, change: "+55%" },
              { color: "bg-green-600", label: "Gadgets", value: 760, change: "+55%" },
              { color: "bg-blue-400", label: "Students", value: 260, change: "+5%" },
              { color: "bg-red-500", label: "Students", value: 760, change: "+75%" },
            ].map((card, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-2 relative">
                {/* Icon */}
                <div className={`absolute -top-4 left-4 p-3 rounded-full ${card.color} text-white`}>
                  <FaUser className="text-lg" />
                </div>

                {/* Content */}
                <div className="ml-16 mt-2 text-[#929DAE] font-mono">
                  <p>{card.label}</p>
                  <p className="text-black text-xl font-bold">{card.value}</p>
                </div>

                <hr className="mt-4 text-[#F8F8F9]" />
                <p className="ml-4 mt-2 text-sm text-[#929DAE]">
                  <span className="text-green-600">{card.change}</span> than last period
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
