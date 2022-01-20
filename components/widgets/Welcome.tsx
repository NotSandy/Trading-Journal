import { NextPage } from "next";
import React from "react";
import Image from "next/image";

interface Props {
  userProfilePicture: string;
}

const Welcome: NextPage<Props> = ({ userProfilePicture }) => {
  return (
    <div className="relative overflow-hidden rounded-md bg-neutral-800">
      <div className="flex justify-between bg-primary-500">
        <span className="p-4 mb-8 text-lg font-semibold text-neutral-100">
          Welcome back to Trade Journal!
        </span>
        <div className="relative w-32 h-32 mr-4">
          <Image
            src="/assets/undraw/financial-data.svg"
            alt="Email"
            layout="fill"
          />
        </div>
      </div>
      <div className="relative p-4">
        <div className="absolute w-16 h-16 border-4 rounded-full -top-8 border-neutral-900">
          <Image
            src={userProfilePicture}
            alt="Profile_Picture"
            layout="fill"
            className="rounded-full"
          />
        </div>
        <div className="flex justify-around mt-8 space-x-2 sm:flex-row">
          <div className="flex flex-col items-center">
            <span className="font-semibold text-neutral-100">$13190</span>
            <span className="text-neutral-300">Profit</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-neutral-100">21</span>
            <span className="text-neutral-300">Trades</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-neutral-100">78</span>
            <span className="text-neutral-300">Win %</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
