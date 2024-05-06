import React from "react";
import { Outlet, useLocation } from "react-router";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Sidebar from "../components/sidebar/Sidebar";

const Layout = ({ hideHeaderPaths = [] }) => {
  const { pathname } = useLocation();
  return (
    <>
      {!hideHeaderPaths.includes("/" + pathname.split("/")[1]) && <Header />}
      {pathname.includes("admin") ? (
        <div className="w-screen flex items-stretch h-full">
          <Sidebar />
          <div className="flex">
            <Outlet />
          </div>
        </div>
      ) : (
        <Outlet />
      )}
      {!hideHeaderPaths.includes("/" + pathname.split("/")[1]) && <Footer />}
    </>
  );
};

export default Layout;
