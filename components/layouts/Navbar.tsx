import React from "react";
import { NextPage } from "next";
import NavbarItem from "./NavbarItem";
import { TemplateIcon, SwitchHorizontalIcon } from "@heroicons/react/outline";

interface Props {
  active: boolean;
  onClickNavbarHandler: any;
}

const Navbar: NextPage<Props> = ({ active, onClickNavbarHandler }) => {
  return (
    <nav
      className={`${
        active ? "" : "-translate-x-16 md:translate-x-0"
      } md:block fixed top-0 bottom-0 z-40 w-16 pt-16 pb-8 text-sm bg-neutral-800 text-neutral-500 transition duration-200`}
    >
      <div className="flex flex-col items-center py-4 space-y-1">
        <NavbarItem
          Icon={TemplateIcon}
          path="/dashboard"
          onClickNavbarItemHandler={onClickNavbarHandler}
        />
        <NavbarItem
          Icon={SwitchHorizontalIcon}
          path="/trades"
          onClickNavbarItemHandler={onClickNavbarHandler}
        />
      </div>
    </nav>
  );
};

export default Navbar;
