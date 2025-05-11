import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

export default function Dashboard() {
  const exportToCSV = () => {
    const storedDevices = JSON.parse(localStorage.getItem("devices")) || [];

    if (storedDevices.length === 0) {
      alert("No devices to export.");
      return;
    }

    const headers = ["Type", "Brand", "Serial", "MAC", "Matric"];
    const rows = storedDevices.map((d) => [
      d.type,
      d.brand,
      d.serial,
      d.mac,
      d.matric,
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
  exportToCSV;
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Topbar />
        <main className="mt-20 p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome, Student 👋</h2>
          <p className="text-gray-600">
            Register your gadgets for the current semester to stay compliant.
          </p>
          <button
            // onClick={exportToCSV}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Export Devices to CSV
          </button>
        </main>
      </div>
    </div>
  );
}
