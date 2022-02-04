import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

interface INavbarItemProps {
  Icon: any;
  path: string;
  onClickNavbarItemHandler: any;
}

const NavbarItem: NextPage<INavbarItemProps> = ({ Icon, path, onClickNavbarItemHandler }) => {
  const router = useRouter();
  const redirectHandler = (e: any) => {
    e.preventDefault();
    onClickNavbarItemHandler();
    router.push(path);
  };
  return (
    <button
      className="flex items-center justify-center w-16 h-12 transition duration-200 hover:text-neutral-100 active:text-primary-500"
      onClick={redirectHandler}
    >
      <Icon className="w-6 h-6" />
    </button>
  );
};

export default NavbarItem;
