import React from "react";
import { NextPage } from "next";

interface Props {
  text: string;
  handler: React.MouseEventHandler<SVGSVGElement>;
}

const Checkbox:NextPage<Props> = ({ text, handler }) => {
  return (
    <label className="inline-flex items-center">
      <input
        className="relative w-4 h-4 transition duration-200 rounded-sm appearance-none cursor-pointer bg-neutral-500 checked:bg-primary-500"
        type="checkbox"
        value=""
        id="checkbox"
      />
      <span className="pl-2 text-md text-neutral-500">{text}</span>
    </label>
  );
};

export default Checkbox;
