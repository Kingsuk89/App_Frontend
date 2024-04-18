import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { GetAuthUser } from "./app/slice/authSlice";
import { useDispatch } from "react-redux";

const Layout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAuthUser());
    return;
  }, [dispatch]);

  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
