import { useEffect, useState } from "react";
import { db } from "../../lib/Firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { CSVLink } from "react-csv";

export default function DownloadCSV() {
  const [devices, setDevices] = useState([]);
  const [csvReady, setCsvReady] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "devices"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setDevices(data);
        setCsvReady(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDevices();
  }, []);

  const headers = [
    { label: "Type", key: "type" },
    { label: "Brand", key: "brand" },
    { label: "Name", key: "name" },
    { label: "Serial", key: "serial" },
    { label: "MAC/IMEI", key: "mac" },
    { label: "Matric Number", key: "matric" },
    { label: "Semester", key: "semester" },
    { label: "Date", key: "date" },
  ];

  return (
    <div className="text-center my-4">
      {csvReady ? (
        <CSVLink
          data={devices}
          headers={headers}
          filename={"device-data.csv"}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download CSV
        </CSVLink>
      ) : (
        <p>Preparing CSV...</p>
      )}
    </div>
  );
}
