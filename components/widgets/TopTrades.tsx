import React, { useState } from "react";
import { Trade } from "@prisma/client";
import { format, utcToZonedTime } from "date-fns-tz";
import { NextPage } from "next";
import { Button } from "../ui/Button";
import { Switch } from "@headlessui/react";

interface ITopTradesProps {
  winTrades: Trade[];
  lossTrades: Trade[];
}

const TopTrades: NextPage<ITopTradesProps> = ({ winTrades, lossTrades }) => {
  const [option, setOption] = useState("Win");
  const [trades, setTrades] = useState(winTrades);
  const [greenText, setGreenText] = useState(true);
  const onChangeHandler = (value: string) => {
    setOption(value);
    switch (value) {
      case "Win":
        setTrades(winTrades);
        setGreenText(true);
        break;
      case "Loss":
        setTrades(lossTrades);
        setGreenText(false);
        break;
      default:
        setTrades(winTrades);
    }
  };

  return (
    <div className="px-2 mb-4">
      <div className="rounded-md bg-neutral-800">
        <div className="flex flex-wrap items-center justify-center p-4 gap-y-4">
          <div className="basis-full">
            <div className="flex justify-between">
              <div className="text-lg font-bold text-neutral-100">
                <span className="text-lg font-bold text-neutral-100">
                  Top Trades
                </span>
              </div>
              <label className="flex flex-col space-y-2">
                <select
                  className="block w-full capitalize transition duration-500 border-0 rounded-md shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 bg-neutral-900 text-neutral-100"
                  onChange={(e) => {
                    onChangeHandler(e.target.value);
                  }}
                  value={option}
                >
                  <option>Win</option>
                  <option>Loss</option>
                </select>
              </label>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 basis-full">
            {trades.map((trade: Trade) => {
              return (
                <div
                  key={trade.id}
                  className="flex items-center justify-between flex-grow p-2 rounded-md basis-2/5 gap-x-4 bg-neutral-900"
                >
                  <div className="flex items-center basis-2/3 gap-x-2">
                    <div className="flex-col whitespace-nowrap">
                      <div className="text-sm font-semibold text-neutral-100 sm:text-base">
                        <span>
                          {trade.ticker}{" "}
                          {trade.strike.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </span>
                      </div>
                      <div className="text-sm text-neutral-300 sm:text-base">
                        <span>
                          {format(
                            utcToZonedTime(new Date(trade.date), "UTC"),
                            "LLL dd, yyyy"
                          )}{" "}
                          {trade.strategy}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right basis-1/3">
                    <span
                      className={`${
                        greenText ? "text-success-300" : "text-danger-300"
                      } text-sm font-semibold sm:text-base `}
                    >
                      {trade?.pnl?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopTrades;
