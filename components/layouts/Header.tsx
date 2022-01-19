import React from "react";
import { NextPage } from "next";
import {
  StarIcon,
  MenuIcon,
  LogoutIcon,
  TranslateIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
import HeaderItem from "./HeaderItem";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import HeaderDropdownMenu from "./HeaderDropdownMenu";
import HeaderDropdownMenuItem from "./HeaderDropdownMenuItem";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";

interface Props {
  openNav: React.MouseEventHandler<HTMLButtonElement>;
}

const Header: NextPage<Props> = ({ openNav }) => {
  const { data: session, status } = useSession();

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
            <HeaderItem Icon={TranslateIcon}>
              <HeaderDropdownMenu>
                <HeaderDropdownMenuItem
                  title="Test"
                  Icon={TranslateIcon}
                  url="/"
                ></HeaderDropdownMenuItem>
              </HeaderDropdownMenu>
            </HeaderItem>
            <div className="relative">
              <Menu>
                <Menu.Button className="flex items-center justify-center h-16 pr-4 space-x-2 transition duration-200 cursor-pointer hover:text-neutral-100 active:text-primary-100">
                  <Image
                    src={`${session?.user?.image}`}
                    alt="Profile_Picture"
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{session?.user?.email}</span>
                  <ChevronDownIcon className="w-4 h-4" />
                </Menu.Button>
                <Transition
                  enter="transition duration-200 ease-out"
                  enterFrom="transform scale-75 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-200 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-75 opacity-0"
                >
                  <Menu.Items className="absolute flex flex-col transition duration-200 rounded-lg right-4 bg-neutral-800 drop-shadow-lg">
                    <div className="py-2 space-y-2">
                      <Menu.Item>
                        <Link href="/">
                          <a
                            className="flex items-center px-4 space-x-2 transition duration-200 cursor-pointer hover:text-neutral-100 active:text-primary-100"
                            onClick={() => signOut()}
                          >
                            <LogoutIcon className="w-4 h-4" />
                            <span>Logout</span>
                          </a>
                        </Link>
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
