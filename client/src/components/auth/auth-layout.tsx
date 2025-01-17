import { Outlet } from "react-router";
import { MyNavbar } from "../navbar";

export const AuthLayout = () => {
  return (
    <div className="w-full h-screen bg-black/5 flex flex-col">
      <MyNavbar />
      <div className="flex-1 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};
