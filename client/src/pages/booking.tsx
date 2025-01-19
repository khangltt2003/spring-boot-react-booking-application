import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookingCard } from "../components/booking/booking-card";
import { Loading } from "../components/Loading";

export const Booking = () => {
  const [searchCode, setSearchCode] = useState("");
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // Handle search
  const handleSearch = async () => {
    if (!searchCode) {
      setError("Please enter a confirmation code.");
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      setBooking(null);
      const res = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_BASE_URL}/bookings/confirmation-code/${searchCode}`,
      });
      setBooking(res.data.booking);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen relative">
      <div className="absolute h-full w-full">
        <img
          className="h-full w-full"
          src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
          alt=""
        />
      </div>
      <div className="absolute bg-black/40 h-full w-full ">
        <div className="translate-y-16 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-200 ">Find Your Booking</h1>
          {/* Search Box */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Enter Confirmation Code"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none w-full sm:w-[400px] md:w-[300px]"
            />
            <button onClick={handleSearch} className="px-6 py-2 bg-black text-white rounded-r-lg hover:bg-gray-800 transition">
              Search
            </button>
          </div>
          {error && <p className="text-center font-extrabold text-lg text-red-500 mb-4">{error}</p>}
          {isLoading && <Loading />}
          {booking && <BookingCard booking={booking} />}
        </div>
      </div>
    </div>
  );
};
