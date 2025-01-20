import { Button, Card, CardBody, CardHeader, Input, Typography } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../provider/auth-provider";
import axios from "axios";

const TABLE_HEAD = ["Name", "Role", "Email", "Phone Number", ""];

export function UserDashboard() {
  const [users, setUsers] = useState([]);
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    if (auth) {
      const getUsers = async () => {
        const res = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_BASE_URL}/users`,
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });
        setUsers(res.data.users);
      };
      getUsers();
    }
  }, []);

  return (
    <Card className="h-[550px] w-full overflow-hidden">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              <span>User Dashboard</span>
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
      <CardBody className="overflow-auto px-0 h-[500px]">
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
            {users?.map(({ name, role, email, phoneNumber }, index) => (
              <tr key={name} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {name}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {role}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {email}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {phoneNumber}
                  </Typography>
                </td>
                <td className="p-4">
                  <div className="flex justify-center items-center gap-4">
                    <Button color="blue">View</Button>
                    <Button color="amber">Update</Button>
                    <Button color="red">Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
