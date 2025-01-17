import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookingCard } from "../components/booking-card";

const data = [
  {
    id: "a1b2c3d4-5678-9101-1121-314151617181",
    checkInTime: "2025-01-20T14:00:00",
    checkOutTime: "2025-01-23T12:00:00",
    numAdults: 2,
    numChildren: 1,
    confirmationCode: "CONF12345",
    user: {
      id: "user123",
      name: "John Doe",
    },
    room: {
      id: "room101",
      type: "Deluxe Suite",
      price: 200,
    },
    createdAt: "2025-01-01T10:00:00",
    updatedAt: "2025-01-02T15:00:00",
  },
  {
    id: "e2f3g4h5-6789-0111-2131-415161718192",
    checkInTime: "2025-02-10T15:00:00",
    checkOutTime: "2025-02-15T11:00:00",
    numAdults: 1,
    numChildren: 0,
    confirmationCode: "CONF67890",
    user: {
      id: "user456",
      name: "Jane Smith",
    },
    room: {
      id: "room205",
      type: "Standard Room",
      price: 120,
    },
    createdAt: "2025-01-15T12:30:00",
    updatedAt: "2025-01-16T16:45:00",
  },
  {
    id: "h5i6j7k8-7890-1121-3141-516171819203",
    checkInTime: "2025-03-05T16:00:00",
    checkOutTime: "2025-03-07T10:00:00",
    numAdults: 3,
    numChildren: 2,
    confirmationCode: "CONF24680",
    user: {
      id: "user789",
      name: "Michael Johnson",
    },
    room: {
      id: "room303",
      type: "Family Suite",
      price: 300,
    },
    createdAt: "2025-02-01T09:00:00",
    updatedAt: "2025-02-02T13:30:00",
  },
  {
    id: "i7j8k9l0-8901-2131-4151-617181920304",
    checkInTime: "2025-04-01T14:30:00",
    checkOutTime: "2025-04-05T11:30:00",
    numAdults: 2,
    numChildren: 0,
    confirmationCode: "CONF13579",
    user: {
      id: "user101",
      name: "Emily Davis",
    },
    room: {
      id: "room407",
      type: "Luxury Suite",
      price: 400,
    },
    createdAt: "2025-03-10T11:00:00",
    updatedAt: "2025-03-15T14:00:00",
  },
  {
    id: "j9k0l1m2-9012-3141-5161-718192030405",
    checkInTime: "2025-05-10T12:00:00",
    checkOutTime: "2025-05-12T10:00:00",
    numAdults: 4,
    numChildren: 2,
    confirmationCode: "CONF97531",
    user: {
      id: "user202",
      name: "David Brown",
    },
    room: {
      id: "room509",
      type: "Penthouse Suite",
      price: 500,
    },
    createdAt: "2025-04-01T08:00:00",
    updatedAt: "2025-04-05T12:00:00",
  },
];

export const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [searchCode, setSearchCode] = useState("");
  const [filteredBooking, setFilteredBooking] = useState(null);
  const [error, setError] = useState("");

  // Fetch all bookings on component mount
  useEffect(() => {
    // axios
    //   .get("/api/bookings")
    //   .then((response) => {
    //     setBookings(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching bookings:", error);
    //     setError("Failed to load bookings. Please try again.");
    //   });
    setBookings(data);
  }, []);

  // Handle search
  const handleSearch = () => {
    if (!searchCode) {
      setError("Please enter a confirmation code.");
      return;
    }

    axios
      .get(`/api/bookings/search?confirmationCode=${searchCode}`)
      .then((response) => {
        setFilteredBooking(response.data);
        setError("");
      })
      .catch((error) => {
        console.error("Error searching booking:", error);
        setError("No booking found with the provided confirmation code.");
        setFilteredBooking(null);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 ">
      <h1 className="text-3xl font-bold text-center mb-6">My Bookings</h1>

      {/* Search Box */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Enter Confirmation Code"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
        />
        <button onClick={handleSearch} className="px-6 py-2 bg-black text-white rounded-r-lg hover:bg-gray-800 transition">
          Search
        </button>
      </div>

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {/* Filtered Booking */}
      {filteredBooking && (
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">Booking Details</h2>
          <p>
            <strong>Confirmation Code:</strong> {filteredBooking.confirmationCode}
          </p>
          <p>
            <strong>Check-In:</strong> {new Date(filteredBooking.checkInTime).toLocaleString()}
          </p>
          <p>
            <strong>Check-Out:</strong> {new Date(filteredBooking.checkOutTime).toLocaleString()}
          </p>
          <p>
            <strong>Total Guests:</strong> {filteredBooking.numAdults + filteredBooking.numChildren}
          </p>
          <p>
            <strong>Room ID:</strong> {filteredBooking.room?.id || "N/A"}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[77%] mx-auto">
        {bookings.map((booking) => {
          return <BookingCard booking={booking} />;
        })}
      </div>
    </div>
  );
};
