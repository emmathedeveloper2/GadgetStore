// src/pages/MyDevices.jsx
import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

export default function Mydevice() {
  const [devices, setDevices] = useState(() => {
    const stored = localStorage.getItem("devices");
    return stored ? JSON.parse(stored) : [];
  });
  const [editingDevice, setEditingDevice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletedDeviceId, setDeletedDeviceId] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(""); // NEW

  useEffect(() => {
    const storedDevices = JSON.parse(localStorage.getItem("devices")) || [];
    setDevices(storedDevices);
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this device?"
    );
    if (confirm) {
      setDeletedDeviceId(id); // trigger animation
      setTimeout(() => {
        const updated = devices.filter((d) => d.id !== id);
        setDevices(updated);
        localStorage.setItem("devices", JSON.stringify(updated));
        setDeletedDeviceId(null); // reset
      }, 300); // match animation duration
    }
  };

  function handleEdit(device) {
    setEditingDevice(device);
  }

  function handleUpdate(e) {
    e.preventDefault();
    const devices = JSON.parse(localStorage.getItem("devices")) || [];

    const updatedDevices = devices.map((item) =>
      item.id === editingDevice.id ? editingDevice : item
    );

    localStorage.setItem("devices", JSON.stringify(updatedDevices));
    setEditingDevice(null);
    setDevices(updatedDevices);
  }

  // Filter devices by search term and selected semester
  const filteredDevices = devices.filter((device) => {
    const matchesMatric = device.matric
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSemester =
      !selectedSemester || device.semester === selectedSemester;
    return matchesMatric && matchesSemester;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-52">
        <Topbar />
        <main className="mt-40 p-6">
          <div className="flex items-center justify-center mb-6 gap-4 md:mt-0 mt-10">
            <input
              type="text"
              placeholder="Matric number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded w-96 px-4 py-2 focus:outline-0"
            />

            <button
              className="text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              onClick={() => setSearchTerm("")}
            >
              Search
            </button>

            <select
              name="semester"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-[300px] mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">All Semesters</option>
              <option value="Alpha Semester">Alpha Semester</option>
              <option value="Omega Semester">Omega Semester</option>
            </select>
          </div>
          <h2 className="text-2xl font-bold mb-6">Registered Devices</h2>

          {filteredDevices.length === 0 ? (
            <p className="text-gray-500">
              No devices match the search criteria.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {filteredDevices.map((device) => (
                <div
                  key={device.id}
                  className={`border border-gray-200 rounded shadow p-4 flex flex-col transition-all duration-300 ease-in-out transform
    ${
      deletedDeviceId === device.id
        ? "opacity-0 scale-95"
        : "opacity-100 scale-100"
    }
  `}
                >
                  <img
                    src={device.image}
                    // alt={device.brand}
                    className="h-32 object-contain mb-3"
                  />
                  <div className="mb-2">
                    <strong>Type:</strong> {device.type}
                  </div>
                  <div className="mb-2">
                    <strong>Brand:</strong> {device.brand}
                  </div>
                  <div className="mb-2">
                    <strong>Name:</strong> {device.name}
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
                      onClick={() => handleEdit(device)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {editingDevice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <form
                onSubmit={handleUpdate}
                className="flex flex-col w-96 bg-white p-8 rounded shadow-lg relative"
              >
                <div>
                  <label className="block text-sm font-medium">
                    Device Type
                  </label>
                  <input
                    value={editingDevice.type}
                    onChange={(e) =>
                      setEditingDevice({
                        ...editingDevice,
                        type: e.target.value,
                      })
                    }
                    placeholder="Type"
                    className="mb-2 p-2  mt-1 border-gray-300 border rounded w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Device brand
                  </label>
                  <input
                    value={editingDevice.brand}
                    onChange={(e) =>
                      setEditingDevice({
                        ...editingDevice,
                        brand: e.target.value,
                      })
                    }
                    placeholder="Brand"
                    className="mb-2 p-2  mt-1 border-gray-300 border rounded w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Device name
                  </label>
                  <input
                    value={editingDevice.name}
                    onChange={(e) =>
                      setEditingDevice({
                        ...editingDevice,
                        name: e.target.value,
                      })
                    }
                    placeholder="Name"
                    className="mb-2 p-2  mt-1 border-gray-300 border rounded w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Serial number
                  </label>
                  <input
                    value={editingDevice.serial}
                    onChange={(e) =>
                      setEditingDevice({
                        ...editingDevice,
                        serial: e.target.value,
                      })
                    }
                    placeholder="Serial"
                    className="mb-2 p-2  mt-1 border-gray-300 border rounded w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Device mac
                  </label>
                  <input
                    value={editingDevice.mac}
                    onChange={(e) =>
                      setEditingDevice({
                        ...editingDevice,
                        mac: e.target.value,
                      })
                    }
                    placeholder="Mac"
                    className="mb-2 p-2  mt-1 border-gray-300 border rounded w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Matric
                  </label>
                  <input
                    value={editingDevice.matric}
                    onChange={(e) =>
                      setEditingDevice({
                        ...editingDevice,
                        matric: e.target.value,
                      })
                    }
                    placeholder="Matric"
                    className="mb-2 p-2  mt-1 border-gray-300 border rounded w-full"
                  />
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingDevice(null)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
