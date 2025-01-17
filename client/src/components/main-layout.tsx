import React from "react";
import { MyNavbar } from "./navbar";
import { Outlet } from "react-router";
import { Footer } from "./footer";

export const MainLayout = () => {
  return (
    <div className="w-full h-screen relative">
      <MyNavbar />
      <div className=" h-full ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
