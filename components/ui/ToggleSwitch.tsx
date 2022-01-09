import React from "react";
import { NextPage } from "next";

interface Props {
  text: string;
  handler: React.ChangeEventHandler<HTMLInputElement>;
}

const ToggleSwitch:NextPage<Props> = ({ text, handler }) => {
  return (
    <label className="inline-flex items-center">
      <input
        className="relative w-8 h-4 transition duration-200 rounded-full appearance-none cursor-pointer bg-neutral-500 checked:bg-primary-500"
        type="checkbox"
        id="toggle-switch"
        onChange={handler}
      />
      <span className="pl-2 text-md text-neutral-500">{text}</span>
    </label>
  );
};

export default ToggleSwitch;
