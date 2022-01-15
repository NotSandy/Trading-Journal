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
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
