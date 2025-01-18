import { Button } from "@material-tailwind/react";
import { RoomCard } from "../components/room-card";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";

export const RoomsList = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getRooms = async () => {
      setIsLoading(true);
      const res = await axios({ method: "GET", url: `${import.meta.env.VITE_API_BASE_URL}/rooms` });
      setRooms(res.data.rooms);
      setIsLoading(false);
    };
    getRooms();
  }, []);

  return (
    <div className="min-h-screen relative">
      <div className="absolute h-full w-full">
        <img
          className="h-full w-full "
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt=""
        />
      </div>

      <div className="absolute h-full w-full bg-black/40 p-6 ">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-200">Find Your Perfect Room</h1>
        {isLoading ? (
          <div className="mx-auto">
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-[77%] mx-auto">
            {rooms.map((room) => (
              <RoomCard room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
