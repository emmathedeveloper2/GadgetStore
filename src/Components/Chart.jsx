import { Bar, Line } from "react-chartjs-2"; // Import Line component
import { IoTimeOutline } from "react-icons/io5";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Data for the Bar chart
const data = {
  labels: ["Lap", "Phn", "Mifi", "Airpod", "Tab", "Others"],
  datasets: [
    {
      label: "Gadget",
      data: [10, 10, 0, 10, 0, 0],
      backgroundColor: "white",
      borderColor: "#000000",
      borderWidth: 0,
      barPercentage: 0.1,
      borderRadius: 20,
    },
  ],
};

// Options for the Bar chart
const options = {
  responsive: true,
  maintainAspectRatio: false, // Allow custom width and height
  aspectRatio: 3, // Set the width-to-height ratio (e.g., 3:1 for wide)
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
  },
  layouts: {
    padding: 20,
    color: "white",
  },
  scales: {
    x: {
      ticks: {
        color: "white",
        font: {
          size: 12,
        },
      },
      grid: {
        display: true,
        color: "#4599EF",
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "white",
        font: {
          size: 12,
        },
        callback: function (value) {
          return value % 2 === 0 ? value : null;
        },
      },
      grid: {
        display: true,
        color: "#4599EF",
      },
    },
  },
};

// Data for the Line chart
const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  datasets: [
    {
      label: "Devices Over Time",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 10],
      borderColor: "white",
      backgroundColor: "rgba(76, 175, 80, 0.2)",
      borderWidth: 2,
      tension: 0.4,
      pointBackgroundColor: "white",
      pointBorderColor: "#FFFFFF",
      pointBorderWidth: 2,
      pointRadius: 4,
    },
  ],
};

// Options for the Line chart
const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
  },
  scales: {
    x: {
      ticks: {
        color: "white",
        font: {
          size: 12,
        },
      },
      grid: {
        display: false,
        color: "#4599EF",
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "white",
        font: {
          size: 12,
        },
      },
      grid: {
        display: true,
        color: "#383838",
      },
    },
  },
};
const lineOptions2 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
  },
  scales: {
    x: {
      ticks: {
        color: "white",
        font: {
          size: 12,
        },
      },
      grid: {
        display: false,
        color: "#4599EF",
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: "white",
        font: {
          size: 12,
        },
      },
      grid: {
        display: true,
        color: "#63c068",
      },
    },
  },
};

export default function Chart() {
  return (
    <div className="mt-15 flex flex-wrap gap-6 justify-center">
      {/* CHART CARD 1 */}

      <div className="shadow-lg w-full sm:w-[90%] md:w-[88%] lg:w-[32%] rounded-lg bg-[#FFFFFF]">
        <div className="flex flex-col items-center relative">
          <div className="w-full h-48 p-5 bg-[#2C85EC] rounded-md text-white shadow-lg">
            <Bar data={data} options={options} />
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
