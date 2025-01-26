import { Button, Card, CardBody, CardHeader, Input, Typography, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../provider/auth-provider";
import axios from "axios";
import { Loading } from "../Loading";
import { useNavigate } from "react-router";

const TABLE_HEAD = ["Type", "Price", "Description", ""];

export const RoomDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    image: null,
    type: "",
    price: "",
    description: "",
  });
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (auth) {
      const getRooms = async () => {
        setIsLoading(true);
        const res = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_BASE_URL}/rooms`,
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setRooms(res.data.rooms);
        setIsLoading(false);
      };
      getRooms();
    }
  }, [auth]);

  const handleAddRoom = async () => {
    try {
      const formData = new FormData();
      formData.append("photo", newRoom.image);
      formData.append("type", newRoom.type);
      formData.append("price", newRoom.price);
      formData.append("description", newRoom.description);
      const res = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/rooms`,
        data: formData,
        headers: {
          Authorization: `Bearer ${auth?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 201) {
        setRooms((prevRooms) => [...prevRooms, res.data.room]);
        setIsModalOpen(false);
        setNewRoom({ image: null, type: "", price: "", description: "" });
      }
    } catch (error) {
      console.error("Failed to add room:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      // Redirect to an update form or handle inline editing
      navigate(`/update-room/${id}`);
    } catch (error) {
      console.error("Failed to update room:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_API_BASE_URL}/rooms/${id}`,
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      if (res.status === 200) {
        // Remove the deleted room from state
        setRooms((prevRooms) => prevRooms.filter((room) => room.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete room:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewRoom((prev) => ({ ...prev, image: e.target.files[0] }));
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
                  <span>Rooms Dashboard</span>
                </Typography>
              </div>
              <div className="flex w-full shrink-0 gap-2 md:w-max">
                <div className="w-full md:w-72">
                  <Input label="Search" icon={<i className="bx bx-search-alt-2"></i>} />
                </div>
                <Button color="green" className="flex items-center" size="sm" onClick={() => setIsModalOpen(true)}>
                  Add
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody className="overflow-auto px-0 h-[500px]">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rooms?.map(({ id, type, price, description }) => (
                  <tr key={id} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {type}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {price}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {description}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center items-center gap-4">
                        <Button color="blue" onClick={() => navigate(`/room/${id}`)}>
                          View
                        </Button>
                        <Button color="amber" onClick={() => navigate(`/update-room/${id}`)}>
                          Update
                        </Button>
                        <Button color="red">Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </>
      )}

      <Dialog open={isModalOpen} handler={setIsModalOpen} size="sm">
        <DialogHeader>Add New Room</DialogHeader>
        <DialogBody divider>
          <div className="space-y-4">
            <Input type="text" name="type" label="Type" value={newRoom.type} onChange={handleInputChange} />
            <Input type="number" name="price" label="Price" value={newRoom.price} onChange={handleInputChange} />
            <Input type="textarea" name="description" label="Description" value={newRoom.description} onChange={handleInputChange} />
            <Input type="file" name="image" label="Upload Image" onChange={handleImageChange} />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setIsModalOpen(false)} className="mr-2">
            Cancel
          </Button>
          <Button color="green" onClick={handleAddRoom}>
            Add Room
          </Button>
        </DialogFooter>
      </Dialog>
    </Card>
  );
};
