import { NextPage } from "next";
import React from "react";

interface ISmallStatProps {
  title: string;
  value: string;
  Icon: any;
}

const SmallStat: NextPage<ISmallStatProps> = ({title, value, Icon}) => {
  return (
    <div className="px-2 mb-4">
      <div className="rounded-md bg-neutral-800">
        <div className="flex flex-wrap items-center p-4">
          <div className="flex items-center justify-between basis-full">
            <div className="flex-col space-y-4">
              <div className="text-neutral-300">
                <span>{title}</span>
              </div>
              <div className="text-xl text-neutral-100">
                <span>{value}</span>
              </div>
            </div>
            <Icon className="w-12 h-12 border-8 rounded-full bg-primary-500 text-neutral-100 border-primary-500"></Icon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallStat;
