import { Button, Card, CardBody, CardHeader, Input, Typography } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../provider/auth-provider";
import axios from "axios";
import { useNavigate } from "react-router";
import { Loading } from "../Loading";

const TABLE_HEAD = ["Room ID", "Price", "Type", "Check In Time", "Check Out Time", "Confirmation Code", "Adults", "Chilren", ""];

export const BookingDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth) {
      const getBookings = async () => {
        setIsLoading(true);
        const res = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_BASE_URL}/bookings`,
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setBookings(res.data.bookings);
        setIsLoading(false);
      };
      getBookings();
    }
  }, []);

  const handleUpdate = async (bookingId) => {
    try {
      const res = await axios({
        method: "PUT",
        url: `${import.meta.env.VITE_API_BASE_URL}/bookings/${bookingId}`,
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
        data: {
          /* updated booking data */
        },
      });
      console.log("Booking updated:", res.data);
      alert("Booking updated successfully!");
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_API_BASE_URL}/bookings/${bookingId}`,
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
      alert("Booking deleted successfully!");
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  return (
    <Card className="h-[550px] w-full overflow-hidden">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <Typography variant="h5" color="blue-gray">
                  <span>Bookings Dashboard</span>
                </Typography>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full md:w-72">
                  <Input label="Search" icon={<i className="bx bx-search-alt-2"></i>} />
                </div>
                <Button color="green" className="flex items-center " size="sm">
                  Add
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-auto px-0 h-[500px] w-[1000px]">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70 ">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bookings?.map(({ id, checkInTime, checkOutTime, confirmationCode, numAdults, numChilren, room }) => (
                  <tr key={id} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal underline cursor-pointer"
                        onClick={() => navigate(`/room/${room.id}`)}
                      >
                        {room.id}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {room.price}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {room.type}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {checkInTime}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {checkOutTime}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {confirmationCode}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {numAdults}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {numChilren}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center items-center gap-4">
                        <Button color="blue" onClick={() => navigate(`/booking/${id}`)}>
                          View
                        </Button>
                        <Button color="amber" onClick={() => handleUpdate(id)}>
                          Update
                        </Button>
                        <Button color="red" onClick={() => handleDelete(id)}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </>
      )}
    </Card>
  );
};
