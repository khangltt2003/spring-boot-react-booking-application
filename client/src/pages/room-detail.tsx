import React from "react";
import { Button } from "@material-tailwind/react";
import { useParams, useSearchParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";

// const room = {
//   id: "1234",
//   type: "Deluxe Suite",
//   price: 299.99,
//   imageUrl: "https://via.placeholder.com/600x400",
//   description: "A luxurious suite with a stunning view, king-sized bed, and modern amenities.",

// };

const reviews = [
  { name: "Alice", rating: 5, comment: "Amazing stay! Highly recommend." },
  { name: "Bob", rating: 4, comment: "Great experience, but room service was a bit slow." },
  { name: "Charlie", rating: 5, comment: "Perfect for a weekend getaway!" },
];

export const RoomDetail = () => {
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { roomId } = useParams();

  console.log(roomId);

  useEffect(() => {
    const getRoom = async () => {
      setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: `http://localhost:8080/rooms/${roomId}`,
      });
      setRoom({ ...res.data.room, reviews });
      setIsLoading(false);
    };

    getRoom();
  }, []);

  // Calculate average rating
  const averageRating =
    room?.reviews.length > 0 ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1) : "No ratings yet";

  return (
    <div className="w-full bg-black/90 pb-10">
      <div className="flex flex-col w-[77%] mx-auto pt-5">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="flex gap-4 ">
              <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 shadow-lg shadow-blue-gray-600">
                <img src={room.imageUrl} alt={`Room ${room.type}`} className="w-full h-96 object-cover rounded-lg mb-4" />
                <h1 className="text-2xl font-bold mb-2">{room.type}</h1>
                <p className="text-lg text-gray-700 mb-4">{room.description}</p>
              </div>

              {/* Booking Section */}
              <div className="bg-white  flex flex-col items-center justify-start border border-gray-200 rounded-lg p-6 shadow-lg shadow-blue-gray-600">
                <p className="text-3xl font-semibold text-black mb-6">${room.price.toFixed(2)}/night</p>

                <h2 className="text-lg font-bold mb-4">Ready to book?</h2>
                <Button className="w-full mb-4" color="green">
                  Book Now
                </Button>
                <p className="text-sm text-gray-500">Secure your stay with just a few clicks.</p>
              </div>
            </div>

            {/* Reviews and Ratings Section */}
            <div className="mt-8 w-full">
              <h2 className="text-2xl font-bold mb-4 text-white">Reviews & Ratings</h2>
              <ul className="space-y-4">
                {room.reviews.map((review, index) => (
                  <li key={index} className="bg-white  border border-gray-200 p-4 rounded-lg shadow-sm shadow-black">
                    <p className="text-base font-semibold">{review.name}</p>
                    <p className="text-base text-neutral-600">Rating: {review.rating} ⭐</p>
                    <p className="text-base text-neutral-600 mt-1">{review.comment}</p>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
