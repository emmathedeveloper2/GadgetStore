import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { useState } from "react";

export default function RegisterDevice() {
  const [device, setDevice] = useState({
    type: "",
    brand: "",
    serial: "",
    mac: "",
    matric: "",
    image: null,
  });
  const [isSubmmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setDevice((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve existing devices from local storage
    const existingDevices = JSON.parse(localStorage.getItem("devices")) || [];

    // Add the new device to the list
    const newDevice = {
      ...device,
      id: Date.now(), // Generate a unique ID
      image: device.image ? URL.createObjectURL(device.image) : null, // Convert file to URL
    };

    const updatedDevices = [...existingDevices, newDevice];

    // Save updated devices back to local storage
    localStorage.setItem("devices", JSON.stringify(updatedDevices));

    // Clear the form
    setDevice({
      type: "",
      brand: "",
      serial: "",
      mac: "",
      matric: "",
      image: null,
    });

    const data = {
      type: device.type,
      brand: device.brand,
      serial: device.serial,
      mac: device.mac,
      matric: device.matric,
      image: device.image,
    };
    console.log(data);

    alert("Device registered successfully!");

    setIsSubmitted(data);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="mt-20 p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Register New Device
          </h2>
          <form
            // onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow max-w-xl space-y-4"
          >
            <div>
              <label className="block text-sm font-medium">Device Type</label>
              <select
                name="type"
                required
                value={device.type}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              >
                <option value="">-- Select Device --</option>
                <option>Laptop</option>
                <option>Phone</option>
                <option>Mifi</option>
                <option>Airpods</option>
                <option>Tablet</option>
                <option>Others</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Brand</label>
              <input
                name="brand"
                type="text"
                required
                value={device.brand}
                onChange={handleChange}
                placeholder="e.g. HP, Samsung"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Serial Number</label>
              <input
                name="serial"
                type="text"
                required
                value={device.serial}
                onChange={handleChange}
                placeholder="e.g. ABC123456XYZ"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                MAC Address (optional)
              </label>
              <input
                name="mac"
                type="text"
                value={device.mac}
                onChange={handleChange}
                placeholder="e.g. 00:1B:44:11:3A:B7"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Matric Number</label>
              <input
                name="matric"
                type="text"
                value={device.matric}
                onChange={handleChange}
                placeholder="e.g. DU0549"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Upload Device Image
              </label>
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              onClick={(e) => handleSubmit(e)}
            >
              Submit Device
            </button>
          </form>

          {isSubmmitted && (
            <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded">
              <h2 className="text-lg font-bold">Device Registered:</h2>
              <h2>
                Type : <strong>{device.type}</strong>
              </h2>
              <h2>
                Brand : <strong>{device.brand}</strong>
              </h2>
              <h2>
                Serial : <strong>{device.serial}</strong>
              </h2>
              <h2>
                Address : <strong>{device.mac}</strong>
              </h2>
              <h2>
                Matric : <strong>{device.matric}</strong>
              </h2>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
