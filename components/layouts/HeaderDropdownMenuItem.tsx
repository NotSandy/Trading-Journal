import React  from "react";
import { NextPage } from "next";
import Link from "next/link";
import { Menu } from "@headlessui/react";

interface Props {
  title: any;
  Icon: any;
  url: any;
}

const HeaderDropdownMenuItem: NextPage<Props> = ({ title, Icon, url }) => {
  return (
    <Menu.Item>
      <Link href={url}>
        <a className="flex items-center px-4 space-x-2 transition duration-200 cursor-pointer hover:text-neutral-100 active:text-primary-100">
          <Icon className="w-4 h-4" />
          <span>{title}</span>
        </a>
      </Link>
    </Menu.Item>
  );
};

export default HeaderDropdownMenuItem;
