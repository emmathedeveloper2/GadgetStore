import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { useState, useEffect } from "react";
import deviceData from "../Data/deviceData.json";

export default function RegisterDevice() {
  const [device, setDevice] = useState({
    type: "",
    brand: "",
    name: "",
    serial: "",
    mac: "",
    matric: "",
    image: "",
    semester: "",
    date: new Date().toLocaleDateString(),
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (device.type) {
      const filtered = deviceData.filter(
        (item) => item.DeviceType.toLowerCase() === device.type.toLowerCase()
      );
      const brands = [...new Set(filtered.map((item) => item.DeviceBrand))];
      const names = [...new Set(filtered.map((item) => item.DeviceName))];
      setFilteredBrands(brands);
      setFilteredNames(names);
    } else {
      setFilteredBrands([]);
      setFilteredNames([]);
    }
  }, [device.type]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setDevice((prev) => ({
        ...prev,
        image: files[0],
      }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setDevice((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const toBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const getDefaultImageForType = (type) => {
    switch (type.toLowerCase()) {
      case "laptop":
        return "/laptop.webp";
      case "phone":
        return "phone.webp";
      case "tab":
        return "tab.webp";
      case "airpod":
        return "/airpods.webp";
      case "smartwatch":
        return "/SmartWatch.png";
      case "mifi":
        return "/Mifi.png";
      case "others":
      default:
        return "/other.webp";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const existingDevices = JSON.parse(localStorage.getItem("devices")) || [];
    let base64Image = null;
    if (device.image && device.image instanceof File) {
      base64Image = await toBase64(device.image);
    }
    if (!base64Image && device.type) {
      base64Image = getDefaultImageForType(device.type);
    }
    const newDevice = {
      ...device,
      id: Date.now(),
      image: base64Image,
    };
    const updatedDevices = [...existingDevices, newDevice];
    localStorage.setItem("devices", JSON.stringify(updatedDevices));
    setDevice({
      type: "",
      brand: "",
      name: "",
      serial: "",
      mac: "",
      matric: "",
      image: "",
      semester: "",
      date: new Date().toLocaleDateString(),
    });
    setImagePreview("");
    alert("Device registered successfully!");
    setIsSubmitted(true);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-52 md:mt-0 mt-10">
        <Topbar />
        <main className="mt-20 flex flex-col justify-center items-center  p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Register New Device
          </h2>
          <form
            onSubmit={handleSubmit}
            className="bg-transparent p-6 rounded shadow-2xl max-w-xl space-y-4 focus:outline-none"
          >
            {/* Semester  */}
            <div>
              <label className="block text-sm font-medium">Semester</label>
              <select
                name="semester"
                required
                value={device.semester}
                onChange={handleChange}
                className="w-[500px] mt-1 p-2 border border-gray-300 rounded"
              >
                <option>Alpha Semester</option>
                <option>Omega Semester</option>
              </select>
            </div>

            {/* Device Type */}
            <div>
              <label className="block text-sm font-medium">Device Type</label>
              <select
                name="type"
                required
                value={device.type}
                onChange={handleChange}
                className="w-[500px] mt-1 p-2 border border-gray-300 rounded"
              >
                <option value="">-- Select Device --</option>
                <option>Laptop</option>
                <option>Phone</option>
                <option>Tab</option>
                <option>Airpod</option>
                <option>Mifi</option>
                <option>Smartwatch</option>
                <option>Others</option>
              </select>
            </div>

            {/* Device Brand */}
            <div>
              <label className="block text-sm font-medium">Brand/Model</label>
              <input
                name="brand"
                list="brandSuggestions"
                value={device.brand}
                onChange={handleChange}
                placeholder="e.g. HP, Samsung, Apple..."
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
              <datalist id="brandSuggestions">
                {filteredBrands.map((brand) => (
                  <option key={brand} value={brand} />
                ))}
              </datalist>
            </div>

            {/* Device Name */}
            <div>
              <label className="block text-sm font-medium">Device Name</label>
              <input
                name="name"
                list="deviceNameSuggestions"
                value={device.name}
                onChange={handleChange}
                placeholder="e.g. Pavilion 15, iPhone XR"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
              <datalist id="deviceNameSuggestions">
                {filteredNames.map((name) => (
                  <option key={name} value={name} />
                ))}
              </datalist>
            </div>

            {/* Device Serial Number */}
            <div>
              <label className="block text-sm font-medium">Serial Number</label>
              <input
                name="serial"
                type="text"
                required
                value={device.serial}
                onChange={handleChange}
                placeholder="e.g. 11-22-33333"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Device MAC Address */}
            <div>
              <label className="block text-sm font-medium">
                MAC Address / IMEI (optional)
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

            {/* Matric Number */}
            <div>
              <label className="block text-sm font-medium">Matric Number</label>
              <input
                name="matric"
                type="text"
                value={device.matric}
                onChange={handleChange}
                placeholder="e.g. DU0549"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                name="date"
                type="text"
                value={device.date}
                onChange={handleChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded"
                readOnly
              />
            </div>

            {/* Device Image */}
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
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt={device.name}
                  className="w-32 h-32 object-cover rounded"
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Submit Device
            </button>

          </form>

          {/* Success Message */}
          {isSubmitted && (
            <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded">
              <h2 className="text-lg font-bold">Device Registered:</h2>
              <h2>
                Type : <strong>{device.type}</strong>
              </h2>
              <h2>
                Semester : <strong>{device.semester}</strong>
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
              <h2>
                Date : <strong>{device.date}</strong>
              </h2>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
