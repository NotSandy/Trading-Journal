import React from "react";
import { HeartIcon } from "@heroicons/react/outline";

const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-0 right-0 z-30 w-screen h-8 text-sm bg-neutral-900 text-neutral-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center w-16 h-8">
          <HeartIcon className="w-4 h-4" />
        </div>
        <div className="pr-4">
          <p>© 2022 Sandy Liu. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
