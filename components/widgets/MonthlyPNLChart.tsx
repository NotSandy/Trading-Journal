import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  defaults,
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

defaults.font.family = "Nunito";
defaults.font.size = 16;
defaults.color = "#BABABA";

const options = {
  plugins: {
    title: {
      display: true,
      text: "Profit & Loss",
    },
    legend: {
      display: false,
      position: "bottom" as "bottom",
      align: "center" as "center",
    },
  },
  animation: {
    animateRotate: true,
    animateScale: true,
  },
  responsive: true,
  maintainAspectRatio: false,
};

const data = {
  labels: ["Profit", "Loss"],
  datasets: [
    {
      label: "Win",
      backgroundColor: ["#48C9B0", "#EC747B"],
      hoverBackgroundColor: ["#1ABC9C", "#E7515A"],
      data: [65, 59],
      hoverOffset: 4,
      borderWidth:0,
      rotation: 180,
    },
  ],
};

const MonthlyPNLChart = () => {
  return (
    <div className="px-2 mb-4">
      <div className="rounded-md bg-neutral-800">
        <div className="flex flex-wrap items-center justify-center p-4 gap-y-4">
          <div className="basis-full">
            <div className="text-lg font-bold text-neutral-100">
              <span>Monthly PnL</span>
            </div>
          </div>
          <div className="flex basis-full gap-x-4">
            <div className="basis-1/2">
              <div className="flex-col space-y-4">
                <div className="text-neutral-300">
                  <span>You are up</span>
                </div>
                <div className="text-2xl text-neutral-100">
                  <span>$1,203</span>
                </div>
                <div className="text-neutral-300">
                  <span>in the past 30 days</span>
                </div>
              </div>
            </div>
            <div className="h-32 basis-1/2">
              <Doughnut data={data} options={options}></Doughnut>
            </div>
          </div>
          <div className="basis-full">
            <div className="text-neutral-300">
              <span>Keep up the good work!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyPNLChart;
