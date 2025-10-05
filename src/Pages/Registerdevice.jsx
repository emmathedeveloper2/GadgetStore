import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { useState, useEffect, useRef } from "react";
import deviceData from "../Data/deviceData.json";
import { saveDevice } from "../utils/deviceService.js";
import { FaPlus } from "react-icons/fa";
import InternetStatus from "@/Components/InternetStatus";

export default function RegisterDevice() {
  // Student info
  const [student, setStudent] = useState({
    hallresidence: "",
    semester: "",
    gender: "",
    matric: "",
    date: new Date().toISOString().slice(0, 10),
  });

  // Device count
  const [deviceCount, setDeviceCount] = useState(1);

  // Devices array
  const [devices, setDevices] = useState([
    { type: "", brand: "", name: "", serial: "", mac: "", image: "" },
  ]);

  const [filteredBrands, setFilteredBrands] = useState([[]]);
  const [filteredNames, setFilteredNames] = useState([[]]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRefs = useRef([]);
  

  // Update brand/model suggestions per device
  useEffect(() => {
    const updatedBrands = [];
    const updatedNames = [];

    devices.forEach((device) => {
      if (device.type) {

        const filtered = deviceData.filter(
          (item) =>
            item.DeviceType.toLowerCase() === device.type.toLowerCase()
        );

        updatedBrands.push([...new Set(filtered.map((i) => i.DeviceBrand))]);
        updatedNames.push([...new Set(filtered.map((i) => i.DeviceName))]);
      } else {
        updatedBrands.push([]);
        updatedNames.push([]);
      }
    });

    setFilteredBrands(updatedBrands);
    setFilteredNames(updatedNames);
  }, [devices]);

  // Student input change
  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    let updatedStudent = { ...student, [name]: val };

    // Always uppercase and start with DU for matric
    if (name === "matric") {
      val = val.toUpperCase();
      if (!val.startsWith("DU")) {
        val = "DU" + val.replace(/^DU/i, "");
      }
      updatedStudent.matric = val;
    }

    // Auto-set gender based on hallresidence
    if (name === "hallresidence") {
      if (["Faith Hall", "Bishop Hall", "Victory Hall"].includes(val)) {
        updatedStudent.gender = "Female";
      } else if (["New Hall", "Rehoboth Hall"].includes(val)) {
        updatedStudent.gender = "Male";
      } else {
        updatedStudent.gender = "";
      }
    }

    setStudent(updatedStudent);
  };

  // Device input change
  const handleDeviceChange = (e, index) => {
    const { name, value, files } = e.target;
    const updatedDevices = [...devices];

    if (name === "image" && files && files[0]) {
      updatedDevices[index][name] = files[0];
      const newPreviews = [...imagePreviews];
      newPreviews[index] = URL.createObjectURL(files[0]);
      setImagePreviews(newPreviews);
    } else {
      updatedDevices[index][name] = value;
    }

    setDevices(updatedDevices);
  };

  // Device count change
  const handleDeviceCountChange = (e) => {
    const count = parseInt(e.target.value);
    setDeviceCount(count);
    setDevices(
      Array.from({ length: count }, (_, i) => devices[i] || { type: "", brand: "", name: "", serial: "", mac: "", image: "" })
    );
    setImagePreviews(
      Array.from({ length: count }, (_, i) => imagePreviews[i] || "")
    );
    setFilteredBrands(Array.from({ length: count }, () => []));
    setFilteredNames(Array.from({ length: count }, () => []));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const now = new Date().toISOString(); // Get current date and time
      const savedDevices = await Promise.all(
        devices.map(async (device) => {
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

          // Merge student, device, image, and registration date/time
          return { ...student, ...device, image: imageBase64, date: now };
        })
      );

      for (const d of savedDevices) {
        await saveDevice(d);
      }

      setSuccessMessage("Devices registered successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);

      setStudent({
        hallresidence: "",
        semester: "",
        gender: "",
        matric: "",
        date: new Date().toISOString(),
      });
      setDevices([{ type: "", brand: "", name: "", serial: "", mac: "", image: "" }]);
      setDeviceCount(1);
      setImagePreviews([]);
    } catch (err) {
      console.error("Error saving device:", err);
      setSuccessMessage("❌ There was a problem saving the devices.");
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
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;
  const day = date.toLocaleString("en-US", { weekday: "short", timeZone: "Africa/Lagos" });
  const month = date.toLocaleString("en-US", { month: "short", timeZone: "Africa/Lagos" });
  const year = date.toLocaleString("en-US", { year: "numeric", timeZone: "Africa/Lagos" });
  return `${day} / ${month} / ${year}`;
}

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-52 md:mt-0 mt-10">
        <Topbar pageName="Register device" />
        <InternetStatus />
        <main className="mt-20 flex flex-col justify-center items-center p-6 w-full">


          <form onSubmit={handleSubmit} className="bg-transparent p-6 rounded shadow-2xl w-full max-w-5xl space-y-8">
            {/* Section 1 - Student Details */}
            <section className="p-6 border rounded-md shadow bg-white">

              <h2 className="font-bold text-lg mb-2">Student Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <select name="semester" value={student.semester} onChange={handleStudentChange} className="p-2 border rounded" required>
                  <option value="">-- Select Semester --</option>
                  <option>Alpha Semester</option>
                  <option>Omega Semester</option>
                </select>
                <select name="hallresidence" value={student.hallresidence} onChange={handleStudentChange} className="p-2 border rounded " required>
                  <option value="">-- Select Hall --</option>
                  <option>Faith Hall</option>
                  <option>Bishop Hall</option>
                  <option>Victory Hall</option>
                  <option>Landmark Hall</option>
                  <option>New Hall</option>
                  <option>Rehoboth Hall</option>
                </select>
                <select name="gender" value={student.gender} onChange={handleStudentChange} className="outline-o p-2 border text-[#968d8d] rounded" readOnly disabled={
                  ["Faith Hall", "Bishop Hall", "Victory Hall", "New Hall", "Rehoboth Hall"].includes(student.hallresidence)
                }>
                  <option value="">-- Choose Hall--</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input name="matric" value={student.matric} onChange={handleStudentChange} placeholder="e.g. DU0549" className="p-2 border rounded" required />
              </div>

            </section>


            {/* Section 2 - Device Count & Date */}
            <section className="p-6 border rounded-md shadow bg-white">
              <h2 className="font-bold text-lg mb-4">Devices Selection</h2>
              <div className="flex gap-4 flex-wrap">
                {[...Array(10)].map((_, i) => (
                  <label key={i} className="flex items-center gap-1">
                    <input type="radio" name="deviceCount" value={i + 1} checked={deviceCount === i + 1} onChange={handleDeviceCountChange} />
                    {i + 1}
                  </label>
                ))}
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium">Date</label>
                <input type="text" value={formatDeviceDate(student.date)} className="w-full text-[#968d8d] outline-0 p-2 border rounded" readOnly />
              </div>
            </section>

            {/* Section 3 - Devices */}
            <section className="p-6 border rounded-md shadow bg-white">
              <h2 className="font-bold text-lg mb-4">Device Details</h2>
              {devices.map((device, index) => (
                <div key={index} className="mb-6  pb-4">
                  <h3 className="font-semibold text-2xl text-blue-600 font-mono mb-2">Device {index + 1}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Type */}
                    <select name="type" value={device.type} onChange={(e) => handleDeviceChange(e, index)} className="p-2 border rounded" required>
                      <option value="">-- Select Device --</option>
                      <option>Laptop</option>
                      <option>Phone</option>
                      <option>Tab</option>
                      <option>Airpod</option>
                      <option>Mifi</option>
                      <option>Smartwatch</option>
                      <option>Others</option>
                    </select>
                    

                    {/* Brand */}
                    <div className="">
                      <label className="block text-sm font-medium">Brand/Model</label>
                      <input name="brand" list={`brandSuggestions-${index}`} value={device.brand} onChange={(e) => handleDeviceChange(e, index)} placeholder="e.g. HP, Samsung, Apple..." className="w-full mt-2  p-2 border rounded" required />
                      <datalist id={`brandSuggestions-${index}`}>
                        {filteredBrands[index]?.map((brand) => (
                          <option key={brand} value={brand} />
                        ))}
                      </datalist>
                    </div>

                    {/* Name */}
                    <div className="">
                      <label className="block text-sm font-medium">Device Name</label>
                      <input name="name" list={`deviceNameSuggestions-${index}`} value={device.name} onChange={(e) => handleDeviceChange(e, index)} placeholder="e.g. Pavilion 15, iPhone XR" className="w-full mt-1 p-2 border rounded" required />
                      <datalist id={`deviceNameSuggestions-${index}`}>
                        {filteredNames[index]?.map((name) => (
                          <option key={name} value={name} />
                        ))}
                      </datalist>
                    </div>

                    {/* Serial */}
                    <div className="">
                      <label className="block text-sm font-medium">Serial Number</label>
                      <input name="serial" value={device.serial} onChange={(e) => handleDeviceChange(e, index)} placeholder="Serial Number" className="w-full  p-2 border rounded" />
                    </div>

                    {/* MAC */}
                    <div>
                      <label className="block text-sm font-medium">
                        MAC Address / IMEI (optional)
                      </label>
                      <input name="mac" value={device.mac} onChange={(e) => handleDeviceChange(e, index)} placeholder="MAC Address / IMEI (optional)" className="w-full p-2 border rounded" />
                    </div>

                    {/* Image */}

                    <div className="">
                      <label className="block text-sm font-medium">Upload Image</label>
                      <input type="file" name="image" accept="image/*" ref={(el) => (fileInputRefs.current[index] = el)} onChange={(e) => handleDeviceChange(e, index)} className="hidden" />
                      <p onClick={() => fileInputRefs.current[index].click()}>
                        <FaPlus className="text-5xl border-2 border-gray-300 hover:bg-gray-300 hover:text-white p-2 text-gray-400 cursor-pointer" />
                      </p>
                      {imagePreviews[index] && <img src={imagePreviews[index]} alt={device.name} className="w-32 h-32 object-cover rounded" />}
                    </div>
                  </div>


                </div>
              ))}
            </section>

            {/* Submit */}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer">
              Submit Devices
            </button>
          </form>

          {successMessage && (
            <div className="fixed text bottom-4 right-1 w-60 text-center p-3 rounded bg-green-100 text-green-700 border border-green-300 shadow">
              {successMessage}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
