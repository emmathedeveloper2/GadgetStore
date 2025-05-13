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
      data: [60, 50, 30, 20, 40, 10],
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
      data: [0, 0, 300, 350, 450, 250, 200, 350, 400],
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
        color: "#636366",
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
        color: "#ace4af",
      },
    },
  },
};

export default function Chart() {
  return (
    <div className="mt-15 flex gap-5">
      <div className="shadow-lg h-58 w-[540px] rounded-lg bg-[#FFFFFF]  flex flex-col justify-center items-center">
        <div className="w-[515px] h-[165px] p-5 bg-[#2C85EC] rounded-md text-white mb-36 shadow-lg">
          <Bar data={data} options={options} />
        </div>

        <div className="absolute mt-32 text left-62 text-[#929DAE] font-mono">
          <p className="font-medium text-black">Gadgets view</p>
          <p className="text2">Gadgets performance</p>

          <p className="text2 mt-7 flex justify-center items-center gap-0.4">
            <IoTimeOutline />
            Updated 4 min ago
          </p>
        </div>
      </div>
      <div className="shadow-lg h-58 w-[540px] rounded-lg bg-[#FFFFFF]  flex justify-center items-center">
        <div className="w-[515px] h-[165px] p-5  rounded-md mb-36  bg-[#59B15D] text-white">
          <Line data={lineData} options={lineOptions2} />
        </div>

        <div className="absolute mt-32 text left-202 text-[#929DAE] font-mono">
          <p className="font-medium text-black">Gadgets view</p>
          <p className="text2">Gadgets performance</p>

          <p className="text2 mt-7 flex justify-center items-center gap-0.4">
            <IoTimeOutline />
            Updated 4 min ago
          </p>
        </div>
      </div>
      <div className="shadow-lg h-58 w-[540px] rounded-lg bg-[#FFFFFF]  flex justify-center items-center">
        <div className="w-[515px] h-[165px] p-5  rounded-md mb-36 bg-[#2D2D31] text-white">
          <Line data={lineData} options={lineOptions} />
        </div>

        <div className="absolute mt-32 text left-342 text-[#929DAE] font-mono">
          <p className="font-medium text-black">Gadgets view</p>
          <p className="text2">Gadgets performance</p>

          <p className="text2 mt-7 flex justify-center items-center gap-0.4">
            <IoTimeOutline />
            Updated 4 min ago
          </p>
        </div>
      </div>
    </div>
  );
}
