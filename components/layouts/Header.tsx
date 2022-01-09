import React from "react";
import { NextPage } from "next";
import {
  StarIcon,
  MenuIcon,
  CogIcon,
  TranslateIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
import HeaderItem from "./HeaderItem";

interface Props {
  openNav: React.MouseEventHandler<HTMLButtonElement>;
}

const Header:NextPage<Props> = ({ openNav }) => {
  return (
    <header className="fixed top-0 z-50 w-screen h-16 bg-neutral-900 text-neutral-500">
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex items-center justify-center w-16 h-16 bg-neutral-800">
            <StarIcon className="w-6 h-6" />
          </div>
          <button
            className="flex items-center justify-center w-12 h-16 transition duration-200 md:hidden hover:text-neutral-100 active:text-primary-500"
            onClick={openNav}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex">
          <div className="flex space-x-1">
            <HeaderItem Icon={TranslateIcon} />
          </div>
          <div className="flex items-center pr-4 space-x-2 transition duration-200 cursor-pointer hover:text-neutral-100 active:text-primary-100">
            <img
              className="w-8 h-8 rounded-full"
              src="https://i.pinimg.com/originals/10/91/94/1091948c6b80b65b9eef8c163f0ae42a.jpg"
              alt="profile"
            ></img>
            <p>Sandy Liu</p>
            <ChevronDownIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
