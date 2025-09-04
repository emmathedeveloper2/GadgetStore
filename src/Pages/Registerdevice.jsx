import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { useState, useEffect, useRef } from "react";
import deviceData from "../Data/deviceData.json";
import { saveDevice } from "../utils/deviceService.js";
import { FaPlus } from "react-icons/fa";

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
    date: new Date().toISOString().slice(0, 10), // <-- ISO format
  });

  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);
  const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);

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
    } else if (name === "matric") {
      // Always uppercase and start with DU
      let matricValue = value.toUpperCase();
      if (!matricValue.startsWith("DU")) {
        matricValue = "DU" + matricValue.replace(/^DU/i, "");
      }
      setDevice((prev) => ({
        ...prev,
        matric: matricValue,
      }));
    } else {
      setDevice((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageBase64 = "";

      if (device.image instanceof File) {
        imageBase64 = await toBase64(device.image);
      } else {
        const defaultImages = {
          Laptop: "/laptop.webp",
          Phone: "/phone.webp",
          Tab: "/tab.webp",
          Airpod: "/airpod.webp",
          Mifi: "/mifi.png",
          Smartwatch: "/smartwatch.png",
          Others: "/others.webp",
        };
        imageBase64 = defaultImages[device.type] || defaultImages["Others"];
      }

      const deviceWithImage = { ...device, image: imageBase64 };

      await saveDevice(deviceWithImage);
      setSuccessMessage("✅ Device registered successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);

      setDevice({
        type: "",
        brand: "",
        name: "",
        serial: "",
        mac: "",
        matric: "",
        image: "",
        semester: "",
        date: new Date().toISOString().slice(0, 10), // <-- ISO format
      });
    
      setImagePreview("");
      // setIsSubmitted(true);
    } catch (err) {
      ("Error saving device:", err);
      setSuccessMessage("❌ There was a problem saving the device.");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  function formatDeviceDate(dateStr) {
    if (!dateStr) return "N/A";
    // Use Africa/Lagos timezone for Nigeria (GMT+1)
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr; // fallback if invalid
    const day = date.toLocaleString("en-US", { weekday: "short", timeZone: "Africa/Lagos" }); // e.g. Friday
    const month = date.toLocaleString("en-US", { month: "short", timeZone: "Africa/Lagos" }); // e.g. April
    const year = date.toLocaleString("en-US", { year: "numeric", timeZone: "Africa/Lagos" }); // e.g. 2023
    return `${day} / ${month} / ${year}`;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-52 md:mt-0 mt-10">
        <Topbar pageName="Register" />
        <main className="mt-20 flex flex-col justify-center items-center  p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Register New Device
          </h2>
          {successMessage && (
            <div className="mb-4 w-full max-w-xl text-center p-3 rounded bg-green-100 text-green-700 border border-green-300 shadow">
              {successMessage}
            </div>
          )}
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
                <option value="">-- Select Semester --</option>
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
                // pattern="\d{2}-\d{2}-\d{5}"
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
                // pattern="([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}"
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
                // pattern="DU\d"
                className="w-full mt-1 p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium">Date</label>
              <input
                name="date"
                type="text"
                value={formatDeviceDate(device.date)}
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
                ref={fileInputRef}
                style={{ margin: "20px 0" }}
                onChange={handleChange}
                className="hidden"
              />
              <p onClick={() => fileInputRef.current.click()}>
                <FaPlus className="text-5xl border-2 border-gray-300 hover:bg-gray-300 hover:text-white p-2  text-gray-400 cursor-pointer" />
              </p>
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
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
            >
              Submit Device
            </button>
          </form>

          {/* Success Message */}

          {/* {isSubmitted && (
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
          )} */}
        </main>
      </div>
    </div>
  );
}
