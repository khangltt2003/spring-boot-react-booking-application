import React from "react";
import { Button, IconButton, Input, Popover, PopoverContent, PopoverHandler, Typography } from "@material-tailwind/react";
import { useParams, useSearchParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
const reviews = [
  { name: "Alice", rating: 5, comment: "Amazing stay! Highly recommend." },
  { name: "Bob", rating: 4, comment: "Great experience, but room service was a bit slow." },
  { name: "Charlie", rating: 5, comment: "Perfect for a weekend getaway!" },
];

export const RoomDetail = () => {
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { roomId } = useParams();
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();
  const [numAdult, setNumAdult] = useState(1);
  const [numChildren, setNumChildren] = useState(0);

  useEffect(() => {
    const getRoom = async () => {
      setIsLoading(true);
      const res = await axios({
        method: "GET",
        url: `${import.meta.env.VITE_API_BASE_URL}/rooms/${roomId}`,
      });
      setRoom({ ...res.data.room, reviews });
      setIsLoading(false);
    };

    getRoom();
  }, []);

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

              <div className="bg-white  flex flex-col items-center justify-start gap-4 border border-gray-200 rounded-lg p-6 shadow-lg shadow-blue-gray-600">
                <p className="text-3xl font-semibold text-black mb-4">${room.price.toFixed(2)}/night</p>

                <h2 className="text-lg font-bold mb-1">Ready to book?</h2>

                <div className="w-full">
                  <p className="mb-2">Check In Date:</p>
                  <Popover placement="bottom">
                    <PopoverHandler>
                      <Input label="Select a Date" onChange={() => null} value={checkInDate ? format(checkInDate, "PPP") : ""} />
                    </PopoverHandler>
                    <PopoverContent>
                      <DayPicker
                        mode="single"
                        selected={checkInDate}
                        onSelect={setCheckInDate}
                        showOutsideDays
                        className="border-0"
                        classNames={{
                          caption: "flex justify-center py-2 mb-4 relative items-center",
                          caption_label: "text-sm font-medium text-gray-900",
                          nav: "flex items-center",
                          nav_button: "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                          nav_button_previous: "absolute left-1.5",
                          nav_button_next: "absolute right-1.5",
                          table: "w-full border-collapse",
                          head_row: "flex font-medium text-gray-900",
                          head_cell: "m-0.5 w-9 font-normal text-sm",
                          row: "flex w-full mt-2",
                          cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                          day: "h-9 w-9 p-0 font-normal",
                          day_range_end: "day-range-end",
                          day_selected: "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                          day_today: "rounded-md bg-gray-200 text-gray-900",
                          day_outside:
                            "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                          day_disabled: "text-gray-500 opacity-50",
                          day_hidden: "invisible",
                        }}
                        components={{
                          IconLeft: ({ ...props }) => <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />,
                          IconRight: ({ ...props }) => <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />,
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="w-full">
                  <p className="mb-2">Check Out Date:</p>
                  <Popover placement="bottom">
                    <PopoverHandler>
                      <Input label="Select a Date" onChange={() => null} value={checkOutDate ? format(checkOutDate, "PPP") : ""} />
                    </PopoverHandler>
                    <PopoverContent>
                      <DayPicker
                        mode="single"
                        selected={checkOutDate}
                        onSelect={setCheckOutDate}
                        showOutsideDays
                        className="border-0"
                        classNames={{
                          caption: "flex justify-center py-2 mb-4 relative items-center",
                          caption_label: "text-sm font-medium text-gray-900",
                          nav: "flex items-center",
                          nav_button: "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                          nav_button_previous: "absolute left-1.5",
                          nav_button_next: "absolute right-1.5",
                          table: "w-full border-collapse",
                          head_row: "flex font-medium text-gray-900",
                          head_cell: "m-0.5 w-9 font-normal text-sm",
                          row: "flex w-full mt-2",
                          cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                          day: "h-9 w-9 p-0 font-normal",
                          day_range_end: "day-range-end",
                          day_selected: "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                          day_today: "rounded-md bg-gray-200 text-gray-900",
                          day_outside:
                            "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                          day_disabled: "text-gray-500 opacity-50",
                          day_hidden: "invisible",
                        }}
                        components={{
                          IconLeft: ({ ...props }) => <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />,
                          IconRight: ({ ...props }) => <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />,
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="w-80">
                  <Typography variant="p" color="blue-gray" className="mb-1 font-medium">
                    <span>Number of Adults</span>
                  </Typography>
                  <div className="relative w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="absolute left-2.5 top-2.5 h-5 w-5 text-slate-600"
                    >
                      <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"></path>
                    </svg>
                    <Input
                      type="number"
                      value={numAdult}
                      onChange={(e) => setNumAdult(Number(e.target.value))}
                      className="!border-t-blue-gray-200 pl-10 placeholder:text-blue-gray-300 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                    />
                    <div className="absolute right-1 top-1 flex gap-0.5">
                      <IconButton size="sm" className="rounded" onClick={() => setNumAdult((cur) => (cur === 1 ? 1 : cur - 1))}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                          <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                        </svg>
                      </IconButton>
                      <IconButton size="sm" className="rounded" onClick={() => setNumAdult((cur) => cur + 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                          <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                        </svg>
                      </IconButton>
                    </div>
                  </div>
                </div>

                <div className="w-80">
                  <Typography variant="p" color="blue-gray" className="mb-1 font-medium">
                    <span>Number of Chilren</span>
                  </Typography>
                  <div className="relative w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="absolute left-2.5 top-2.5 h-5 w-5 text-slate-600"
                    >
                      <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"></path>
                    </svg>
                    <Input
                      type="number"
                      value={numChildren}
                      onChange={(e) => setNumChildren(Number(e.target.value))}
                      className="!border-t-blue-gray-200 pl-10 placeholder:text-blue-gray-300 placeholder:opacity-100  focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "min-w-0",
                      }}
                    />
                    <div className="absolute right-1 top-1 flex gap-0.5">
                      <IconButton size="sm" className="rounded" onClick={() => setNumChildren((cur) => (cur === 0 ? 0 : cur - 1))}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                          <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                        </svg>
                      </IconButton>
                      <IconButton size="sm" className="rounded" onClick={() => setNumChildren((cur) => cur + 1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                          <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                        </svg>
                      </IconButton>
                    </div>
                  </div>
                </div>
                <Button className="w-full mb-4" color="green">
                  Book Now
                </Button>
                <p className="text-sm text-gray-500">Secure your stay with just a few clicks.</p>
              </div>
            </div>

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
