import { NextPage } from "next";
import React from "react";
import Image from "next/image";
import {
  calcTotalPnL,
  calcTotalTrades,
  calcWinPercentage,
} from "../../utils/trades/utils";
import { Trade } from "@prisma/client";

interface IWelcomeProps {
  userProfilePicture: string;
  trades: Trade[];
}

const Welcome: NextPage<IWelcomeProps> = ({ userProfilePicture, trades }) => {
  return (
    <div className="px-2 mb-4">
      <div className="overflow-hidden rounded-md bg-neutral-800">
        <div className="flex justify-between bg-primary-500">
          <span className="p-4 mb-8 text-lg font-bold text-neutral-100 basis-2/3">
            Welcome back to Trade Journal!
          </span>
          <div className="relative w-32 h-32 my-4 mr-4 basis-1/3">
            <Image
              src="/assets/undraw/financial-data.svg"
              alt="Data"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </div>
        <div className="flex flex-wrap items-center p-4 gap-y-4">
          <div className="flex-col items-center justify-center basis-full">
            <div className="relative w-16 h-16 border-4 rounded-full -top-12 border-neutral-900">
              <Image
                src={userProfilePicture}
                alt="Profile_Picture"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            {/* <div className="-mt-8 text-neutral-100">
              <span>
                Rank: <span className="text-neutral-300">Novice Trader</span>
              </span>
            </div> */}
            <div className="-mt-8 text-neutral-100">
              <span className="text-lg font-bold text-neutral-100">
                Lifetime Stats
              </span>
            </div>
          </div>
          <div className="flex text-left gap-x-4 basis-full">
            <div className="flex flex-col basis-1/3">
              <span className="font-semibold text-neutral-100">
                {calcTotalPnL(trades).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
              <span className="text-neutral-300">Profit</span>
            </div>
            <div className="flex flex-col basis-1/3">
              <span className="font-semibold text-neutral-100">
                {calcTotalTrades(trades)}
              </span>
              <span className="text-neutral-300">Trades</span>
            </div>
            <div className="flex flex-col basis-1/3">
              <span className="font-semibold text-neutral-100">
                {calcWinPercentage(trades).toFixed(0) + " %"}
              </span>
              <span className="text-neutral-300">Win %</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
