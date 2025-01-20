import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { UserDashboard } from "../components/admin/user-dashboard";
import { useState } from "react";
import { BookingDashboard } from "../components/admin/booking-dashboard";
import { RoomDashboard } from "../components/admin/room-dashboard";

export function AdminDashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tab = searchParams.get("tab") || "user";

  return (
    <div className="relative w-full h-[700px]">
      <div className="absolute h-full w-full">
        <img
          className="w-full h-full object-cover"
          src="https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D"
          alt=""
        />
      </div>

      <div className="absolute bg-black/55 h-full w-full flex flex-col items-center ">
        <h1 className="text-2xl font-bold m-2 text-white">Admin Dashboard</h1>

        <div className="p-4 rounded-lg flex  min-h-screen  gap-5  w-[77%]">
          <div className="w-1/6 bg-white text-white  p-4 flex flex-col rounded-lg h-[550px]">
            <ul className="flex flex-col items-center gap-10">
              <li className="cursor-pointer text-black" onClick={() => navigate("/admin?tab=user")}>
                Users
              </li>
              <li className="cursor-pointer text-black" onClick={() => navigate("/admin?tab=room")}>
                Rooms
              </li>
              <li className="cursor-pointer text-black" onClick={() => navigate("/admin?tab=booking")}>
                Bookings
              </li>
            </ul>
          </div>
          <div className="h-full w-full">
            {tab === "user" && <UserDashboard />}
            {tab === "room" && <RoomDashboard />}
            {tab === "booking" && <BookingDashboard />}
          </div>
        </div>
      </div>
    </div>
  );
}
