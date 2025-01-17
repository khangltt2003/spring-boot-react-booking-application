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
      const res = await axios({ method: "GET", url: "http://localhost:8080/rooms" });
      setRooms(res.data.rooms);
      setIsLoading(false);
    };
    getRooms();
  }, []);

  return (
    <div className="min-h-screen bg-black/90 p-6 ">
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
  );
};
