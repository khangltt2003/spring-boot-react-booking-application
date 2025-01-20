import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../components/provider/auth-provider";
import axios from "axios";

export const UserBooking = () => {
  const { user, auth } = useContext(AuthContext);
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBooking = async () => {
      if (user && auth) {
        setLoading(true);
        try {
          const res = await axios({
            method: "GET",
            url: `${import.meta.env.VITE_API_BASE_URL}/users/get-user-booking/${user.id}`,
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          });
          setBooking(res.data.user.bookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    getBooking();
  }, [auth, user]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-6">Your Bookings</h1>
      {loading ? (
        <p className="text-gray-700">Loading your bookings...</p>
      ) : booking?.length > 0 ? (
        <table className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Booking ID</th>
              <th className="border border-gray-300 px-4 py-2">Room</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {booking?.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.roomType}</td>
                <td className="border border-gray-300 px-4 py-2">{item.date}</td>
                <td className="border border-gray-300 px-4 py-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-700">No bookings found.</p>
      )}
    </div>
  );
};
