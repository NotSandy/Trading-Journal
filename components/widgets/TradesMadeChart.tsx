import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  defaults,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      display: true,
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
      stacked: true,
      grid: {
        display: true,
        color: "#5D5D5D",
      },
    },
    y: {
      stacked: true,
      grid: {
        display: true,
        color: "#5D5D5D",
      },
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
      label: "Win",
      backgroundColor: "#48C9B0",
      hoverBackgroundColor: "#1ABC9C",
      data: [65, 59, 20, 81, 56, 55, 40, 45, 67, 100, 57, 21, 12],
    },
    {
      label: "Open",
      backgroundColor: "#E8B365",
      hoverBackgroundColor: "#E2A03F",
      data: [65, 59, 20, 81, 56, 55, 40, 45, 67, 100, 57, 21, 12],
    },
    {
      label: "Lost",
      backgroundColor: "#EC747B",
      hoverBackgroundColor: "#E7515A",
      data: [65, 59, 20, 81, 56, 55, 40, 45, 67, 100, 57, 21, 12],
    },
  ],
};

const TradesMadeChart = () => {
  return (
    <div className="px-2 mb-4">
      <div className="rounded-md bg-neutral-800">
        <div className="flex flex-wrap items-center justify-center p-4 gap-y-4">
          <div className="basis-full">
            <div className="text-lg font-bold text-neutral-100">
              <span>Trades Made</span>
            </div>
          </div>
          <div className="basis-full">
            <Bar data={data} options={options} height="100%"></Bar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradesMadeChart;
