import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: any }) => {
  const [openNav, setOpenNav] = useState(false);

  const openNavHandler = () => {
    setOpenNav(!openNav);
  };
  return (
    <React.Fragment>
      <Header openNav={openNavHandler} />
      <Navbar active={openNav} onClickNavbarHandler={openNavHandler} />
      <main className="min-h-screen px-2 pt-20 pb-8 overflow-hidden sm:px-6 sm:pt-24 sm:pb-12 md:pl-24 md:-ml-2">
        {children}
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
