import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  defaults,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

defaults.font.family = "Nunito";
defaults.font.size = 16;
defaults.color = "#BABABA";

const options = {
  plugins: {
    // title: {
    //   display: true,
    //   text: "Trades Made",
    // },
    legend: {
      display: false,
      position: "bottom" as "bottom",
      align: "center" as "center",
    },
  },
  animation: {
    duration: 1000,
  },
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: true,
        color: "#5D5D5D",
      },
    },
    y: {
      grid: {
        display: true,
        color: "#5D5D5D",
      },
      grace: "5%",
    },
  },
};

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      // label: "Total PnL",
      pointBackgroundColor: "#7AC0F8",
      pointBorderColor: "#E8E8E8",
      pointBorderWidth: 1,
      pointRadius: 6,
      hoverBackgroundColor: "#2196F3",
      borderColor: "#8C8C8C",
      tension: 0.35,
      data: [65, 59, 20, 81, 56, 55, 40, 45, 67, 100, -10, 77],
    },
  ],
};

const TotalPNLChart = () => {
  return (
    <div className="px-2 mb-4">
      <div className="rounded-md bg-neutral-800">
        <div className="flex flex-wrap items-center justify-center p-4 gap-y-4">
          <div className="basis-full">
            <div className="text-lg font-bold text-neutral-100">
              <span>Total PnL Chart</span>
            </div>
          </div>
          <div className="h-96 basis-full">
            <Line data={data} options={options}></Line>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalPNLChart;
