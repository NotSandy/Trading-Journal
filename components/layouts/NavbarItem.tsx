import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

interface Props {
  Icon: any;
  path: string;
}

const NavbarItem: NextPage<Props> = ({ Icon, path }) => {
  const router = useRouter();
  const redirectHandler = (e: any) => {
    e.preventDefault();
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
