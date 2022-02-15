import React, { useState } from "react";
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
import { Trade } from "@prisma/client";
import { NextPage } from "next";
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
  mapTradeMadeToDay,
  mapTradeMadeToMonth,
  mapTradeMadeToWeek,
} from "../../utils/trades/utils";

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
      grace: "5%",
    },
  },
};

interface ITradesMadeChartProps {
  trades: Trade[];
}

const TradesMadeChart: NextPage<ITradesMadeChartProps> = ({ trades }) => {
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
  const [winData, setWinData] = useState(
    mapTradeMadeToDay(pastWeekDates, pastWeekTradesMade, "win")
  );
  const [lossData, setLossData] = useState(
    mapTradeMadeToDay(pastWeekDates, pastWeekTradesMade, "loss")
  );
  const [openData, setOpenData] = useState(
    mapTradeMadeToDay(pastWeekDates, pastWeekTradesMade, "open")
  );
  const [tieData, setTieData] = useState(
    mapTradeMadeToDay(pastWeekDates, pastWeekTradesMade, "tie")
  );

  const onChangeDateRangeHandler = (value: string) => {
    setDateRange(value);
    switch (value) {
      case "Week":
        setLabels(formatDates(pastWeekDates));
        setWinData(mapTradeMadeToDay(pastWeekDates, pastWeekTradesMade, "win"));
        setLossData(
          mapTradeMadeToDay(pastWeekDates, pastWeekTradesMade, "loss")
        );
        setOpenData(
          mapTradeMadeToDay(pastWeekDates, pastWeekTradesMade, "open")
        );
        setTieData(mapTradeMadeToDay(pastWeekDates, pastWeekTradesMade, "tie"));
        break;
      case "Month":
        setLabels(formatDates(pastMonthDates));
        setWinData(
          mapTradeMadeToDay(pastMonthDates, pastMonthTradesMade, "win")
        );
        setLossData(
          mapTradeMadeToDay(pastMonthDates, pastMonthTradesMade, "loss")
        );
        setOpenData(
          mapTradeMadeToDay(pastMonthDates, pastMonthTradesMade, "open")
        );
        setTieData(
          mapTradeMadeToDay(pastMonthDates, pastMonthTradesMade, "tie")
        );
        break;
      case "Quarter":
        setLabels(formatDates(pastQuarterWeeks));
        setWinData(
          mapTradeMadeToWeek(pastQuarterWeeks, pastQuarterTradesMade, "win")
        );
        setLossData(
          mapTradeMadeToWeek(pastQuarterWeeks, pastQuarterTradesMade, "loss")
        );
        setOpenData(
          mapTradeMadeToWeek(pastQuarterWeeks, pastQuarterTradesMade, "open")
        );
        setTieData(
          mapTradeMadeToWeek(pastQuarterWeeks, pastQuarterTradesMade, "tie")
        );
        break;
      case "Year":
        setLabels(formatMonths(pastYearMonths));
        setWinData(
          mapTradeMadeToMonth(pastYearMonths, pastYearTradesMade, "win")
        );
        setLossData(
          mapTradeMadeToMonth(pastYearMonths, pastYearTradesMade, "loss")
        );
        setOpenData(
          mapTradeMadeToMonth(pastYearMonths, pastYearTradesMade, "open")
        );
        setTieData(
          mapTradeMadeToMonth(pastYearMonths, pastYearTradesMade, "tie")
        );
        break;
      case "All":
        setLabels(formatMonths(allTimeMonths));
        setWinData(
          mapTradeMadeToMonth(allTimeMonths, trades, "win")
        );
        setLossData(
          mapTradeMadeToMonth(allTimeMonths, trades, "loss")
        );
        setOpenData(
          mapTradeMadeToMonth(allTimeMonths, trades, "open")
        );
        setTieData(
          mapTradeMadeToMonth(allTimeMonths, trades, "tie")
        );
        break;
      default:
        setLabels(formatDates(pastWeekDates));
        setWinData(mapTradeMadeToDay(pastWeekDates, pastWeekTradesMade, "win"));
        setLossData(
          mapTradeMadeToDay(pastWeekDates, pastWeekTradesMade, "loss")
        );
        setOpenData(
          mapTradeMadeToDay(pastWeekDates, pastWeekTradesMade, "open")
        );
        setTieData(mapTradeMadeToDay(pastWeekDates, pastWeekTradesMade, "tie"));
    }
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Win",
        backgroundColor: "#48C9B0",
        hoverBackgroundColor: "#1ABC9C",
        data: winData,
      },
      {
        label: "Open",
        backgroundColor: "#E8B365",
        hoverBackgroundColor: "#E2A03F",
        data: openData,
      },
      {
        label: "Loss",
        backgroundColor: "#EC747B",
        hoverBackgroundColor: "#E7515A",
        data: lossData,
      },
      {
        label: "Tie",
        backgroundColor: "#8C8C8C",
        hoverBackgroundColor: "#5D5D5D",
        data: tieData,
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
                Trades Made
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
            <Bar data={data} options={options}></Bar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradesMadeChart;
