import Chart from "../Components/Chart";
import Project from "../Components/projects";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { FaUser } from "react-icons/fa";

export default function Dashboard() {
  const exportToCSV = () => {
    const storedDevices = JSON.parse(localStorage.getItem("devices")) || [];

    if (storedDevices.length === 0) {
      alert("No devices to export.");
      return;
    }

    const headers = ["Matric", "Brand", "Serial", "MAC", "Type", "Date"];
    const rows = storedDevices.map((d) => [
      d.matric,
      d.brand,
      d.serial,
      d.mac,
      d.type,
      d.date,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "registered_devices.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //  exportToCSV();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-52">
        <Topbar />
        <main className="mt-20 p-6">
          <div className="flex justify-between items-center mb-6 ">
            <div className="shadow-lg h-26 w-96 rounded-lg bg-[#FFFFFF]">
              <p className="absolute h-13 w-13 rounded-lg bg-[#929DAE] flex items-center justify-center top-22 left-61">
                <FaUser />
              </p>
              <div className="ml-76 text p-1 text-[#929DAE] font-mono">
                <p>Students</p>
                <p className="text-black text-1xl font-bold">760</p>
              </div>
              <hr className="text-[#F8F8F9] mt-4" />
              <p className="text2 ml-2 mt-2 text-[#929DAE]">
                <span className="text-green-600">+55%</span> than last week
              </p>
            </div>

            <div className="shadow-lg h-26 w-96 rounded-lg bg-[#FFFFFF]">
              <p className="absolute h-13 w-13 rounded-lg bg-green-400 flex items-center justify-center top-22 left-168">
                <FaUser />
              </p>
              <div className="ml-76 text p-1 text-[#929DAE] font-mono">
                <p>Gadgets</p>
                <p className="text-black text-1xl font-bold">760</p>
              </div>
              <hr className="text-[#F8F8F9] mt-4" />
              <p className="text2 ml-2 mt-2 text-[#929DAE]">
                <span className="text-green-600">+55%</span> than last week
              </p>
            </div>

            <div className="shadow-lg h-26 w-96 rounded-lg bg-[#FFFFFF]">
              <p className="absolute h-13 w-13 rounded-lg bg-blue-400 flex items-center justify-center top-22 left-274">
                <FaUser />
              </p>
              <div className="ml-76 text p-1 text-[#929DAE] font-mono">
                <p>Students</p>
                <p className="text-black text-1xl font-bold">260</p>
              </div>
              <hr className="text-[#F8F8F9] mt-4" />
              <p className="text2 ml-2 mt-2 text-[#929DAE]">
                <span className="text-green-600">+5%</span> than last month
              </p>
            </div>

            <div className="shadow-lg h-26 w-96 rounded-lg bg-[#FFFFFF]">
              <p className="absolute h-13 w-13 rounded-lg bg-red-400 flex items-center justify-center top-22 left-382">
                <FaUser />
              </p>
              <div className="ml-76 text p-1 text-[#929DAE] font-mono">
                <p>Students</p>
                <p className="text-black text-1xl font-bold">760</p>
              </div>
              <hr className="text-[#F8F8F9] mt-4" />
              <p className="text2 ml-2 mt-2 text-[#929DAE]">
                <span className="text-green-600">+75%</span> than yesterday
              </p>
            </div>
          </div>

          {/* Bar Chart */}
          <Chart />
          <Project />
        </main>
      </div>
    </div>
  );
}
