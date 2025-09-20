import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase"; // adjust path
import { Bar, Line } from "react-chartjs-2";
import { IoTimeOutline } from "react-icons/io5";
import {  options, lineOptions2, lineOptions } from "./wait";

export default function ChartData() {
  const [barData, setBarData] = useState({
    labels: ["Lap", "Phn", "Mifi", "Airpod", "Tab", "Others"],
    datasets: [
      {
        label: "Gadget",
        data: [0, 0, 0, 0, 0, 0], // start empty
        backgroundColor: "white",
        borderColor: "#000000",
        borderWidth: 0,
        barPercentage: 0.1,
        borderRadius: 20,
      },
    ],
  });

  const [lineData, setLineData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "Devices Over Time",
        data: Array(9).fill(0),
        borderColor: "white",
        borderWidth: 2,
        tension: 0.4,
        pointBackgroundColor: "white",
      },
    ],
  });

  // 🔥 Fetch live updates from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "devices"), (snapshot) => {
      const counts = { Lap: 0, Phn: 0, Mifi: 0, Airpod: 0, Tab: 0, Others: 0 };

      snapshot.docs.forEach((doc) => {
        const device = doc.data().deviceType; // adjust field name
        if (counts[device] !== undefined) {
          counts[device] += 1;
        } else {
          counts.Others += 1;
        }
      });

      setBarData((prev) => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: [
              counts.Lap,
              counts.Phn,
              counts.Mifi,
              counts.Airpod,
              counts.Tab,
              counts.Others,
            ],
          },
        ],
      }));

      // optional: update line chart with time-series
      const month = new Date().getMonth();
      setLineData((prev) => {
        const newData = [...prev.datasets[0].data];
        newData[month] = snapshot.size; // total devices this month
        return {
          ...prev,
          datasets: [{ ...prev.datasets[0], data: newData }],
        };
      });
    });

    return () => unsubscribe();
  }, []);

  return (
        <div className="mt-15 flex flex-wrap gap-6 justify-center">
      {/* CHART CARD 1 */}

      <div className="shadow-lg w-full sm:w-[90%] md:w-[88%] lg:w-[32%] rounded-lg bg-[#FFFFFF]">
        <div className="flex flex-col items-center relative">
          <div className="w-full h-48 p-5 bg-[#2C85EC] rounded-md text-white shadow-lg">
            <Bar data={barData} options={options} />
          </div>
        </div>
        <div className="p-4  text-[#929DAE] font-mono">
          <p className="font-medium text-black">Device view</p>

          <p className="text2 mt-2 flex items-center gap-1">
            <IoTimeOutline />
          </p>
        </div>
      </div>

      {/* CHART CARD 2 */}
      <div className="shadow-lg w-full sm:w-[90%] md:w-[88%] lg:w-[32%] rounded-lg bg-[#FFFFFF]">
        <div className="flex flex-col items-center relative">
          <div className="w-full h-48 p-5 bg-[#59B15D] rounded-md text-white shadow-lg">
            <Line data={lineData} options={lineOptions2} />
          </div>
        </div>
        <div className="p-4  text-[#929DAE] font-mono">
          <p className="font-medium text-black">Student view</p>

          <p className="text2 mt-2 flex items-center gap-1">
            <IoTimeOutline />
          </p>
        </div>
      </div>

      {/* CHART CARD 3 */}
      <div className="shadow-lg w-full sm:w-[90%] md:w-[88%] lg:w-[32%] rounded-lg bg-[#FFFFFF] ">
        <div className="flex flex-col items-center relative">
          <div className="w-full h-48 p-5 bg-[#2D2D31] rounded-md text-white shadow-lg">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>
        <div className="p-4 text-left text-[#929DAE] font-mono">
          <p className="font-medium text-black">Chart view</p>

          <p className="text2 mt-2 flex items-center gap-1">
            <IoTimeOutline />
          </p>
        </div>
      </div>
    </div>
  );



}