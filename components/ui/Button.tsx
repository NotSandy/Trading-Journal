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

export const PageButton: NextPage<IButtonProps> = ({
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
