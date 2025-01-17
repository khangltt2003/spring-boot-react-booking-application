import { Button } from "@material-tailwind/react";
import { RoomCard } from "../components/room-card";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const RoomsList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const getRooms = async () => {
      const res = await axios({ method: "GET", url: "http://localhost:8080/rooms" });
      setRooms(res.data.rooms);
    };
    getRooms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 ">
      <h1 className="text-3xl font-bold text-center mb-8">Find Your Perfect Room</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-[77%] mx-auto">
        {rooms.map((room) => (
          <RoomCard room={room} />
        ))}
      </div>
    </div>
  );
};
