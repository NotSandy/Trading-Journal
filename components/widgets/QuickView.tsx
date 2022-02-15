import React, { useState } from "react";
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
import { Trade } from "@prisma/client";
import { NextPage } from "next";
import {
  calcLossAmount,
  calcPastDayTradesMade,
  calcPastMonthTradesMade,
  calcPastQuarterTradesMade,
  calcPastWeekTradesMade,
  calcPastYearTradesMade,
  calcProfitAmount,
  calcTotalPnL,
} from "../../utils/trades/utils";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";

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

interface IQuickViewProps {
  trades: Trade[];
}

const QuickView: NextPage<IQuickViewProps> = ({ trades }) => {
  const [dateRange, setDateRange] = useState("Day");
  const pastDayTradesMade: Trade[] = calcPastDayTradesMade(trades);
  const pastWeekTradesMade: Trade[] = calcPastWeekTradesMade(trades);
  const pastMonthTradesMade: Trade[] = calcPastMonthTradesMade(trades);
  const pastQuarterTradesMade: Trade[] = calcPastQuarterTradesMade(trades);
  const pastYearTradesMade: Trade[] = calcPastYearTradesMade(trades);
  const [quickViewData, setQuickViewData] = useState([
    calcProfitAmount(pastDayTradesMade),
    calcLossAmount(pastDayTradesMade),
  ]);

  const [totalPnl, setTotalPnl] = useState(calcTotalPnL(pastDayTradesMade));

  const defaultProfitable = () => {
    return calcTotalPnL(pastDayTradesMade) >= 0 ? true : false;
  };
  const [profitable, setProfitable] = useState(defaultProfitable);

  const [verbiage, setverbiage] = useState("today");

  const defaultMotivation = () => {
    if (calcTotalPnL(pastDayTradesMade) > 0) {
      return "Keep up the good work!";
    } else if (calcTotalPnL(pastDayTradesMade) == 0) {
      return "Put in some trades!";
    } else {
      return "Time to do some reflecting!";
    }
  };
  const [motivation, setMotivation] = useState(defaultMotivation);

  const onChangeDateRangeHandler = (value: string) => {
    setDateRange(value);
    switch (value) {
      case "Day":
        setQuickViewData([
          calcProfitAmount(pastDayTradesMade),
          calcLossAmount(pastDayTradesMade),
        ]);
        setTotalPnl(calcTotalPnL(pastDayTradesMade));
        setverbiage("today");
        if (calcTotalPnL(pastDayTradesMade) > 0) {
          setMotivation("Keep up the good work!");
          setProfitable(true);
        } else if (calcTotalPnL(pastDayTradesMade) == 0) {
          setMotivation("Put in some trades!");
          setProfitable(true);
        } else {
          setMotivation("Time to do some reflecting!");
          setProfitable(false);
        }
        break;
      case "Week":
        setQuickViewData([
          calcProfitAmount(pastWeekTradesMade),
          calcLossAmount(pastWeekTradesMade),
        ]);
        setTotalPnl(calcTotalPnL(pastWeekTradesMade));
        setverbiage("this week");
        if (calcTotalPnL(pastWeekTradesMade) > 0) {
          setMotivation("Keep up the good work!");
          setProfitable(true);
        } else if (calcTotalPnL(pastWeekTradesMade) == 0) {
          setMotivation("Put in some trades!");
          setProfitable(true);
        } else {
          setMotivation("Time to do some reflecting!");
          setProfitable(false);
        }
        break;
      case "Month":
        setQuickViewData([
          calcProfitAmount(pastMonthTradesMade),
          calcLossAmount(pastMonthTradesMade),
        ]);
        setTotalPnl(calcTotalPnL(pastMonthTradesMade));
        setverbiage("this month");
        if (calcTotalPnL(pastMonthTradesMade) > 0) {
          setMotivation("Keep up the good work!");
          setProfitable(true);
        } else if (calcTotalPnL(pastMonthTradesMade) == 0) {
          setMotivation("Put in some trades!");
          setProfitable(true);
        } else {
          setMotivation("Time to do some reflecting!");
          setProfitable(false);
        }
        break;
      case "Quarter":
        setQuickViewData([
          calcProfitAmount(pastQuarterTradesMade),
          calcLossAmount(pastQuarterTradesMade),
        ]);
        setTotalPnl(calcTotalPnL(pastQuarterTradesMade));
        setverbiage("this quarter");
        if (calcTotalPnL(pastQuarterTradesMade) > 0) {
          setMotivation("Keep up the good work!");
          setProfitable(true);
        } else if (calcTotalPnL(pastQuarterTradesMade) == 0) {
          setMotivation("Put in some trades!");
          setProfitable(true);
        } else {
          setMotivation("Time to do some reflecting!");
          setProfitable(false);
        }
        break;
      case "Year":
        setQuickViewData([
          calcProfitAmount(pastYearTradesMade),
          calcLossAmount(pastYearTradesMade),
        ]);
        setTotalPnl(calcTotalPnL(pastYearTradesMade));
        setverbiage("this year");
        if (calcTotalPnL(pastYearTradesMade) > 0) {
          setMotivation("Keep up the good work!");
          setProfitable(true);
        } else if (calcTotalPnL(pastYearTradesMade) == 0) {
          setMotivation("Put in some trades!");
          setProfitable(true);
        } else {
          setMotivation("Time to do some reflecting!");
          setProfitable(false);
        }
        break;
      case "All":
        setQuickViewData([calcProfitAmount(trades), calcLossAmount(trades)]);
        setTotalPnl(calcTotalPnL(trades));
        setverbiage("all time");
        if (calcTotalPnL(trades) > 0) {
          setMotivation("Keep up the good work!");
          setProfitable(true);
        } else if (calcTotalPnL(trades) == 0) {
          setMotivation("Put in some trades!");
          setProfitable(true);
        } else {
          setMotivation("Time to do some reflecting!");
          setProfitable(false);
        }
        break;
      default:
        setQuickViewData([
          calcProfitAmount(pastDayTradesMade),
          calcLossAmount(pastDayTradesMade),
        ]);
        setTotalPnl(calcTotalPnL(pastDayTradesMade));
        setverbiage("today");
        if (calcTotalPnL(pastDayTradesMade) > 0) {
          setMotivation("Keep up the good work!");
          setProfitable(true);
        } else if (calcTotalPnL(pastDayTradesMade) == 0) {
          setMotivation("Put in some trades!");
          setProfitable(true);
        } else {
          setMotivation("Time to do some reflecting!");
          setProfitable(false);
        }
    }
  };

  const data = {
    labels: ["Profit", "Loss"],
    datasets: [
      {
        backgroundColor: ["#48C9B0", "#EC747B"],
        hoverBackgroundColor: ["#1ABC9C", "#E7515A"],
        data: quickViewData,
        hoverOffset: 4,
        rotation: 180,
        borderWidth: 0,
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
                Quick View
              </span>
              <label className="flex flex-col space-y-2">
                <select
                  className="block w-full capitalize transition duration-500 border-0 rounded-md shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 bg-neutral-900 text-neutral-100"
                  onChange={(e) => {
                    onChangeDateRangeHandler(e.target.value);
                  }}
                  value={dateRange}
                >
                  <option>Day</option>
                  <option>Week</option>
                  <option>Month</option>
                  <option>Quarter</option>
                  <option>Year</option>
                  <option>All</option>
                </select>
              </label>
            </div>
          </div>
          <div className="flex basis-full gap-x-4">
            <div className="basis-1/2">
              <div className="flex-col space-y-2">
                <div className="text-neutral-300">
                  <span className="flex items-center gap-x-2">
                    You are
                    {profitable ? (
                      <ChevronUpIcon className="w-6 h-6 text-success-500" />
                    ) : (
                      <ChevronDownIcon className="w-6 h-6 text-danger-500" />
                    )}
                  </span>
                </div>
                <div className="text-lg xl:text-xl text-neutral-100">
                  <span>
                    {totalPnl.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>
                <div className="text-neutral-300">
                  <span>{verbiage}</span>
                </div>
              </div>
            </div>
            <div className="h-32 basis-1/2">
              <Doughnut data={data} options={options}></Doughnut>
            </div>
          </div>
          <div className="basis-full">
            <div className="text-neutral-300">
              <span>{motivation}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
