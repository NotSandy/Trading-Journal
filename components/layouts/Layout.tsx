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
      <Navbar active={openNav} />
      <main className="min-h-screen px-8 pt-24 pb-16 overflow-hidden md:pl-24">{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
