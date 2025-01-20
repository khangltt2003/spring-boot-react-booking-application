import React from "react";
import { useContext } from "react";
import AuthContext from "../components/provider/auth-provider";

export const Profile = () => {
  const { user } = useContext(AuthContext);

  const phoneNumber = `(${user.phoneNumber.substring(0, 3)}) ${user.phoneNumber.substring(3, 6)}-${user.phoneNumber.substring(6)}`;

  return (
    <div className="flex  items-start justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full md:w-[50%] h-full  p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center  mb-6">Profile</h1>
        <div className="flex flex-col gap-4">
          <div className="text-lg">
            <span className="font-semibold">Name:</span> {user?.name}
          </div>
          <div className="text-lg">
            <span className="font-semibold">Phone:</span> {phoneNumber}
          </div>
          <div className="text-lg">
            <span className="font-semibold">Email:</span> {user?.email}
          </div>
        </div>
        <button className="mt-6 w-full bg-black/80 text-white py-2 px-4 rounded hover:bg-black transition">Edit Profile</button>
      </div>
    </div>
  );
};
