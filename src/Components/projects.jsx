import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import DownloadCSV from "./DownloadCsv";
import { fetchDevices } from "../lib/firebase";
import DigitalClock from "./DigitalClock";

// Helper function to format date as Mon/April/2025
function formatDeviceDate(dateStr) {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;
  const day = date.toLocaleString("en-US", { weekday: "short" });
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function Project() {
  const [devicesThisMonth, setDevicesThisMonth] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadDevices() {
      try {
        const devices = await fetchDevices("devices");
        setData(devices);

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const count = devices
          .filter((device) => {
            if (!device.date) return false;
            const deviceDate = new Date(device.date);
            return (
              deviceDate.getMonth() === currentMonth &&
              deviceDate.getFullYear() === currentYear
            );
          }).length;

        setDevicesThisMonth(count);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setData([]);
        setDevicesThisMonth(0);
      }
    }
    loadDevices();
  }, []);

  return (
    <div className="md:grid lg:flex justify-between">
      {/* Left Section */}
      <div className="shadow-lg h-96 md:w-[128%] lg:w-[66%] rounded-lg bg-white p-4 mt-5 overflow-auto">
        <div className="font-mono mb-4">
          <p className="text font-bold">Devices</p>
          <p>✔️ {devicesThisMonth} done this month</p>
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
              {Array.isArray(devicesThisMonth) && devicesThisMonth.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-400">No devices registered this month.</td>
                </tr>
              ) : (
                data
                  .slice(-7) // Show last 7 devices
                  .map((device, index) => {
                    // Count how many times this matric appears
                    const amount = data.filter(d => d.matric === device.matric).length;
                    // Format the device date
                    const dateStr = formatDeviceDate(device.date);

                    return (
                      <tr key={index} className="border-t border-[#eaecee]">
                        <td className="p-2 flex items-center gap-2 text-[#929DAE]">
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="device"
                            className="h-5 w-5 rounded-full"
                          />
                          {device.matric}
                        </td>
                        <td className="p-2">{device.name}</td>
                        <td className="p-2">{amount}</td>
                        <td className="p-2 text-green-600 font-medium">Completed</td>
                        <td className="p-2 text-[#929DAE]">{dateStr}</td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Section */}
      <div className="shadow-lg h-96 md:w-[128%] lg:w-[32.5%] rounded-lg bg-white mt-5 p-4 text-center justify-center items-center flex">
        <div className="relative ">
          <DownloadCSV />
          <DigitalClock />
        </div>
      </div>
    </div>
  );
}
