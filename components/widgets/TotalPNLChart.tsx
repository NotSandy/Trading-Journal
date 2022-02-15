import React, { useState } from "react";
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
import {
  calcAllTimeMonthsInterval,
  calcPastDaysInterval,
  calcPastMonthsInterval,
  calcPastMonthTradesMade,
  calcPastQuarterTradesMade,
  calcPastWeeksInterval,
  calcPastWeekTradesMade,
  calcPastYearTradesMade,
  formatDates,
  formatMonths,
  mapTradePnLToDay,
  mapTradePnLToMonth,
  mapTradePnLToWeek,
} from "../../utils/trades/utils";
import { NextPage } from "next";
import { Trade } from "@prisma/client";

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

interface ITotalPNLChartProps {
  trades: Trade[];
}

const TotalPNLChart: NextPage<ITotalPNLChartProps> = ({ trades }) => {
  const pastWeekTradesMade: Trade[] = calcPastWeekTradesMade(trades);
  const pastWeekDates = calcPastDaysInterval(new Date(), 6);
  const pastMonthTradesMade: Trade[] = calcPastMonthTradesMade(trades);
  const pastMonthDates = calcPastDaysInterval(new Date(), 29);
  const pastQuarterTradesMade: Trade[] = calcPastQuarterTradesMade(trades);
  const pastQuarterWeeks = calcPastWeeksInterval(new Date(), 89);
  const pastYearTradesMade: Trade[] = calcPastYearTradesMade(trades);
  const pastYearMonths = calcPastMonthsInterval(new Date(), 335);
  const allTimeMonths = calcAllTimeMonthsInterval(new Date(), trades[0].date);

  const [dateRange, setDateRange] = useState("Week");
  const [labels, setLabels] = useState(formatDates(pastWeekDates));
  const [pnlData, setPnlData] = useState(
    mapTradePnLToDay(pastWeekDates, pastWeekTradesMade)
  );

  const onChangeDateRangeHandler = (value: string) => {
    setDateRange(value);
    switch (value) {
      case "Week":
        setLabels(formatDates(pastWeekDates));
        setPnlData(mapTradePnLToDay(pastWeekDates, pastWeekTradesMade));
        break;
      case "Month":
        setLabels(formatDates(pastMonthDates));
        setPnlData(mapTradePnLToDay(pastMonthDates, pastMonthTradesMade));
        break;
      case "Quarter":
        setLabels(formatDates(pastQuarterWeeks));
        setPnlData(mapTradePnLToWeek(pastQuarterWeeks, pastQuarterTradesMade));
        break;
      case "Year":
        setLabels(formatMonths(pastYearMonths));
        setPnlData(mapTradePnLToMonth(pastYearMonths, pastYearTradesMade));
        break;
      case "All":
        setLabels(formatMonths(allTimeMonths));
        setPnlData(mapTradePnLToMonth(allTimeMonths, trades));
        break;
      default:
        setLabels(formatDates(pastWeekDates));
        setPnlData(mapTradePnLToDay(pastWeekDates, pastWeekTradesMade));
    }
  };

  const data = {
    labels,
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
        data: pnlData,
      },
    ],
  };

  return (
    <div className="px-2 mb-4">
      <div className="rounded-md bg-neutral-800">
        <div className="flex flex-wrap items-center justify-center p-4 gap-y-4">
          <div className="basis-full">
            <div className="flex justify-between">
              <span className="text-lg font-bold text-neutral-100">
                Total PnL
              </span>
              <label className="flex flex-col space-y-2">
                <select
                  className="block w-full capitalize transition duration-500 border-0 rounded-md shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 bg-neutral-900 text-neutral-100"
                  onChange={(e) => {
                    onChangeDateRangeHandler(e.target.value);
                  }}
                  value={dateRange}
                >
                  <option>Week</option>
                  <option>Month</option>
                  <option>Quarter</option>
                  <option>Year</option>
                  <option>All</option>
                </select>
              </label>
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
