import { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { fetchDevices, deleteDevice, updateDevice } from "../../lib/Firebase";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

const defaultImage = () => {};

export default function Mydevice() {
  const [devices, setDevices] = useState([]);
  const [editingDevice, setEditingDevice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletedDeviceId, setDeletedDeviceId] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // Define your Firestore collection name
  const COLLECTION_NAME = "devices";

  const loadDevices = async () => {
    try {
      const data = await fetchDevices(COLLECTION_NAME);
      setDevices(data);
    } catch (error) {
      console.error("Error loading devices:", error);
    }
  };

  useEffect(() => {
    loadDevices();
  }, []);

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      await deleteDevice(COLLECTION_NAME, id);
      setDeletedDeviceId(id); // trigger animation
      setTimeout(() => {
        setDevices((prev) => prev.filter((d) => d.id !== id));
        setDeletedDeviceId(null);
      }, 300);
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  function handleEdit(device) {
    setEditingDevice(device);
  }
  const sortedDevices = [...devices].sort((a, b) => {
    // If date is missing, treat as oldest
    if (!a.date) return 1;
    if (!b.date) return -1;
    // Compare as strings (assuming ISO format: YYYY-MM-DD)
    return b.date.localeCompare(a.date);
  });
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingDevice) return;

    try {
      await updateDevice(COLLECTION_NAME, editingDevice.id, editingDevice);
      setEditingDevice(null);
      loadDevices();
    } catch (error) {
      console.error("Error updating device:", error);
    }
  };

  function formatDeviceDate(dateStr) {
    if (!dateStr) return "N/A";
    // Try to parse as YYYY-MM-DD
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr; // fallback if invalid
    const day = date.toLocaleString("en-US", { weekday: "short" }); // e.g. Mon
    const month = date.toLocaleString("en-US", { month: "long" }); // e.g. April
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const filteredDevices = sortedDevices.filter((device) => {
    const matchesMatric = device.matric
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    let matchesDate = true;
    if (searchDate) {
      if (device.date) {
        matchesDate = device.date.startsWith(searchDate);
      } else {
        matchesDate = false;
      }
    }

    const matchesSemester =
      !selectedSemester || device.semester === selectedSemester;
    return matchesMatric && matchesSemester && matchesDate;
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 md:ml-52">
        <Topbar />
        <main className="mt-24 md:mt-40 p-2 sm:p-4 md:p-6">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row items-center justify-center mb-6 gap-4 md:mt-0 mt-10">
            <input
              type="text"
              placeholder="Matric number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded w-full md:w-80 px-4 py-2 focus:outline-0"
            />

            <button
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer w-full md:w-auto"
              onClick={() => setSearchTerm("")}
            >
              Search
            </button>

            <input
              type="text"
              placeholder="Day e.g 28"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="border border-gray-300 rounded w-full md:w-80 px-4 py-2 focus:outline-0"
            />

            <select
              name="semester"
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full md:w-[300px] mt-1 md:mt-0 p-2 border border-gray-300 rounded cursor-pointer"
            >
              <option value="">All Semesters</option>
              <option value="Alpha Semester">Alpha Semester</option>
              <option value="Omega Semester">Omega Semester</option>
            </select>
          </div>

          {searchTerm && (
            <div className="text-center mb-2 text-red-300 font-semibold">
              {filteredDevices.length} device
              {filteredDevices.length !== 1 ? "s" : ""} found for matric "
              {searchTerm}"
            </div>
          )}
          {searchDate && (
            <div className="text-center mb-2 text-red-300 font-semibold">
              {filteredDevices.length} device
              {filteredDevices.length !== 1 ? "s" : ""} found for Day "
              {searchDate}th"
            </div>
          )}

          <h2 className="text-2xl font-bold mb-6 text-center md:text-left">
            Registered Devices
          </h2>

          {filteredDevices.length === 0 ? (
            <p className="text-gray-500 text-center">
              No devices match the search criteria.
            </p>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
                    src={device.image || defaultImage(device.type)}
                    alt={device.name}
                    className="h-32 object-contain mb-3 w-full pointer-events-none "
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
                  <div className="mb-2 text-sm text-gray-600">
                    <strong>MAC:</strong> {device.mac || "N/A"}
                  </div>
                  <div className="mb-2 text-sm text-gray-600">
                    <strong>Matric:</strong> {device.matric}
                  </div>
                  <div className="mb-4 text-sm text-gray-600">
                    <strong>Date:</strong> {formatDeviceDate(device.date)}
                  </div>

                  <div className="mt-auto flex flex-col sm:flex-row gap-2 justify-between">
                    <AlertDialog>
                      <AlertDialogTrigger className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer">
                        Delete
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this Device and remove the data from the
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(device.id)}
                            className="bg-red-700"
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <button
                      className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 cursor-pointer"
                      onClick={() => handleEdit(device)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* EDIT MODAL */}
          {editingDevice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-none px-2">
              <form
                onSubmit={handleUpdate}
                className="flex flex-col w-full max-w-md bg-white p-4 sm:p-8 rounded shadow-lg relative"
              >
                {[
                  { key: "serial", label: "Serial Number" },
                  { key: "mac", label: "Device MAC" },
                  { key: "matric", label: "Matric" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium">
                      {field.label}
                    </label>
                    <input
                      value={editingDevice[field.key] || ""}
                      onChange={(e) =>
                        setEditingDevice({
                          ...editingDevice,
                          [field.key]: e.target.value,
                        })
                      }
                      placeholder={field.label}
                      className="mb-2 p-2 mt-1 border-gray-300 border rounded w-full"
                    />
                  </div>
                ))}

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
