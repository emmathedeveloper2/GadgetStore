// src/pages/MyDevices.jsx
import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

export default function Mydevice() {
  const [devices, setDevices] = useState(() => {
    const stored = localStorage.getItem("devices")
    return stored ? JSON.parse(stored) : [];
  })

  useEffect(() => {
    const storedDevices = JSON.parse(localStorage.getItem("devices")) || [];
    setDevices(storedDevices)
  }, [])
  
  const [searchTerm, setSearchTerm] = useState("");
  

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this device?");
    if (confirm) {
     const updated = devices.filter((d) => d.id !== id);
     setDevices(updated);
     localStorage.setItem("device", JSON.stringify(updated))
    }
  };

  const filteredDevices = devices.filter((device) =>
    device.matric.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-52">
        <Topbar />
        <main className="mt-20 p-6">
          <div className="flex items-center justify-center mb-6 gap-4">
            <input
              type="text"
              placeholder="Matric number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2"
            />
            <button
              className="text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              onClick={() => setSearchTerm("")}
            >
              Search
            </button>
          </div>
          <h2 className="text-2xl font-bold mb-6">My Registered Devices</h2>

          {filteredDevices.length === 0 ? (
            <p className="text-gray-500">No devices match the search criteria.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {filteredDevices.map((device) => (
                <div
                  key={device.id}
                  className="border border-gray-200 rounded shadow p-4 flex flex-col"
                >
                  <img
                    src={device.image}
                    alt={device.brand}
                    className="h-32 object-contain mb-3"
                  />
                  <div className="mb-2">
                    <strong>Type:</strong> {device.type}
                  </div>
                  <div className="mb-2">
                    <strong>Brand:</strong> {device.brand}
                  </div>
                  <div className="mb-2">
                    <strong>Serial:</strong> {device.serial || "N/A"}
                  </div>
                  <div className="mb-4 text-sm text-gray-600">
                    <strong>MAC:</strong> {device.mac || "N/A"}
                  </div>
                  <div className="mb-4 text-sm text-gray-600">
                    <strong>Matric:</strong> {device.matric}
                  </div>
                  <div className="mb-4 text-sm text-gray-600">
                    <strong>Date:</strong> {device.date || "N/A"}
                  </div>

                  <div className="mt-auto flex justify-between">
                    <button
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(device.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => alert("Coming soon!")}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
