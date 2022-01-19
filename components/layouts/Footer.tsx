import React from "react";
import { HeartIcon } from "@heroicons/react/outline";

const Footer = () => {
  return (
    <footer className="relative z-30 w-screen h-8 -mt-8 text-sm bg-neutral-900 text-neutral-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center w-16 h-8">
          <HeartIcon className="w-4 h-4" />
        </div>
        <div className="pr-4">
          <span>© 2022 Sandy Liu. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
