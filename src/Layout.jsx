import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const Layout = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
