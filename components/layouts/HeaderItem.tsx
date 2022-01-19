import React, { useState } from "react";
import { NextPage } from "next";
import { Menu, Transition } from "@headlessui/react";

interface Props {
  Icon: any;
  children: any;
}

const HeaderItem: NextPage<Props> = ({ Icon, children }) => {
  const [openHeaderDropdown, setOpenHeaderDropdown] = useState(false);

  const openHeaderDropdownHandler = () => {
    setOpenHeaderDropdown(!openHeaderDropdown);
  };

  return (
    <Menu>
      <div className="relative">
        <Menu.Button className="relative flex items-center justify-center w-12 h-16 transition duration-200 hover:text-neutral-100 active:text-primary-500">
          <Icon className="w-6 h-6" />
        </Menu.Button>
        {children}
      </div>
    </Menu>
  );
};

export default HeaderItem;
