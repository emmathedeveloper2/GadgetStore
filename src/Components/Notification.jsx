// NotificationSidebar.jsx
import { useState, useEffect } from "react";
import { getDevices } from "../utils/deviceService.js";

export default function Notification({ isOpen, onClose }) {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getDevices(); 
      setDevices(data.slice(-7)); 
    }
    if (isOpen) fetchData();
  }, [isOpen]);

  return (
    <div className={`text2 fixed top-2 right-1 h-[977px] p-4 bg-[#2D2D31] text-white rounded-md  w-64 transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="font-bold">Recent Devices</h2>
        <button onClick={onClose} className="cursor-pointer active:text-red-400">✖</button>
      </div>
      <ul className="overflow-y-auto max-h-[90vh]  p-4 space-y-2">
        {devices.map((dev, idx) => (
          <li key={idx} className="border border-gray-200 rounded shadow p-3">
            <p><strong>{dev.brand}</strong> - {dev.name}</p>
            <div className="flex items-center justify-center gap-2 mt-2">
                <p>{dev.type}</p> |
                <p className="text-sm text-gray-500"> {dev.date}</p>
            </div>

          </li>
        ))}
      </ul>
    </div>
  );
}
