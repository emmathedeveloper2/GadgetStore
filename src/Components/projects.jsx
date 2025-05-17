import { FaUser } from "react-icons/fa";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Project() {
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
      <div className="shadow-lg h-96 md:w-[128%] lg:w-[32.5%] rounded-lg bg-white mt-5 p-4">
        <div className="text">
          <h1>Orders overview</h1>
          <p>
            ^|<span>24%</span> this month
          </p>
        </div>

        <div>
          <button
            onClick={exportToCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Export Devices to CSV
          </button>
        </div>
      </div>
    </div>
  );
}
