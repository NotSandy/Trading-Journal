import { Menu, Transition } from "@headlessui/react";
import { NextPage } from "next";
import React, { ReactNode } from "react";
import { classNames } from "../../utils/shared/utils";

interface IButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type: "button" | "submit" | "reset" | undefined;
}

export const Button: NextPage<IButtonProps> = ({
  children,
  className,
  disabled,
  type,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type: "button" | "submit" | "reset" | undefined;
}) => {
  return (
    <button
      type={type}
      className={classNames(
        "relative inline-flex items-center px-2 py-2 bg-neutral-900 text-neutral-100 hover:bg-neutral-700 rounded-md",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

interface IPageButtonProps
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  type: "button" | "submit" | "reset" | undefined;
}

export const PageButton: NextPage<IPageButtonProps> = ({
  children,
  className,
  disabled,
  ...rest
}: {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      type="button"
      className={classNames(
        "relative inline-flex items-center px-2 py-2 border border-neutral-800 bg-neutral-900 text-neutral-100 hover:bg-neutral-700",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

interface IDropdownButtonProps {
  Icon: any;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export const DropdownButton: NextPage<IDropdownButtonProps> = ({
  Icon,
  children,
  className,
}) => {
  return (
    <Menu>
      <div className="relative z-10">
        <Menu.Button
          className={classNames(
            "relative inline-flex items-center px-2 py-2 bg-neutral-900 text-neutral-100 hover:bg-neutral-700 rounded-md",
            className
          )}
        >
          <Icon className="w-6 h-6" />
        </Menu.Button>
        <Transition
          enter="transition duration-200 ease-out"
          enterFrom="transform scale-75 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-200 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-75 opacity-0"
        >
          <Menu.Items className="absolute right-0 flex flex-col mt-2 transition duration-200 rounded-lg bg-neutral-900 drop-shadow-lg">
            <div className="flex flex-wrap p-4">{children}</div>
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
};
