import React from "react";
import { NextPage } from "next";
import { Menu, Transition } from "@headlessui/react";

interface Props {
  children: any;
}

const HeaderDropdownMenu: NextPage<Props> = ({ children }) => {
  return (
    <Transition
      enter="transition duration-200 ease-out"
      enterFrom="transform scale-75 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-200 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-75 opacity-0"
    >
      <Menu.Items className="absolute right-0 flex flex-col transition duration-200 rounded-lg bg-neutral-800 drop-shadow-lg">
        <div className="py-2 space-y-2">{children}</div>
      </Menu.Items>
    </Transition>
  );
};

export default HeaderDropdownMenu;
