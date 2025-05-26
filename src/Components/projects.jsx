import { FaUser } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import DownloadCSV from "./DownloadCsv";
import download from "/download.jpg";

export default function Project() {
  return (
    <div className="md:grid lg:flex justify-between">
      {/* Left Section */}
      <div className="shadow-lg h-96 md:w-[128%] lg:w-[66%] rounded-lg bg-white p-4 mt-5 overflow-auto">
        <div className="font-mono mb-4">
          <p className="text font-bold">Devices</p>
          <p>✔️ 30 done this month</p>
        </div>

        {/* Table Header */}
        <p className="text font-bold ml-1 mt-2">Recent Devices</p>
        <div className="mt-3 overflow-x-auto ml-4">
          <table className="min-w-full justify-between text-left border-collapse">
            <thead>
              <tr className="text-[#58595a] font-mono font-bold text-sm">
                <th className="p-2">Matrric</th>
                <th className="p-2">Name</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Completion</th>
                <th className="p-2">Time/Date</th>
              </tr>
            </thead>
            
            <tbody className="text-[#344767] font-mono text-sm">
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-t border-[#eaecee]">
                  <td className="p-2 flex items-center gap-2 text-[#929DAE]">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                      alt="device"
                      className="h-5 w-5 rounded-full"
                    />
                    DU0459
                  </td>
                  <td className="p-2">Laptop</td>
                  <td className="p-2">2</td>
                  <td className="p-2 text-green-600 font-medium">Completed</td>
                  <td className="p-2 text-[#929DAE]">8:00 PM</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Section */}
      <div className="shadow-lg h-96 md:w-[128%] lg:w-[32.5%] rounded-lg bg-white mt-5 p-4 text-center justify-center items-center flex">
        <img src={download} alt=""  className="w-[540px] h-[370px] rounded-2xl absolute"/>
        <div className="relative z-10">
          <DownloadCSV />
        </div>
      </div>
    </div>
  );
}
