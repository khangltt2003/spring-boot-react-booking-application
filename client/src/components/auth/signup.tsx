import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { data, useNavigate } from "react-router";

export function Register() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    password1: "",
    phoneNumber: "",
    name: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    name: "",
    message: "",
  });

  const [message, setMessage] = useState(null);

  const [loading, setLoading] = useState(false);
  const handlOnChange = (e) => {
    setErrors(null);
    setRegisterData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async () => {
    if (!registerData.email || !registerData.password || !registerData.password || !registerData.phoneNumber) return;

    if (registerData.password !== registerData.password1) {
      setErrors((prev) => {
        return { ...prev, password: "password does not match" };
      });
      return;
    }

    try {
      setLoading(true);
      await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        data: registerData,
      });

      setMessage("registerd successfully");
      setTimeout(() => {
        return navigate("/login");
      }, 2000);
    } catch (e) {
      console.log(e);
      if (e.response.data.errors) {
        setErrors(e.response.data.errors);
      } else if (e.response.data.message) {
        setErrors((prev) => {
          return { ...prev, message: e.response.data.message };
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-full w-full">
      <div className="absolute h-full w-full">
        <img
          className="h-full w-full"
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt=""
        />
      </div>
      <div className="absolute h-full w-full flex-1 flex justify-center items-center bg-black/40">
        <Card className="w-96  bg-white/90 focus-within:bg-white hover:bg-white/95">
          <CardHeader variant="gradient" color="gray" className="mb-4 grid h-28 place-items-center">
            <Typography variant="h3" color="white">
              <span>Roomzy</span>
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <div>
              <Input label="Email" size="lg" name="email" onChange={handlOnChange} />
              {errors?.email && <span className="text-sm text-red-500">{errors.email}</span>}
            </div>
            <div>
              <Input label="Full Name" size="lg" name="name" onChange={handlOnChange} />
              {errors?.name && <span className="text-sm text-red-500">{errors.name}</span>}
            </div>
            <div>
              <Input label="Phone Number" size="lg" name="phoneNumber" onChange={handlOnChange} />
              {errors?.phoneNumber && <span className="text-sm text-red-500">{errors.phoneNumber}</span>}
            </div>
            <div>
              <Input label="Password" size="lg" name="password" onChange={handlOnChange} />
              {errors?.password && <span className="text-sm text-red-500">{errors.password}</span>}
            </div>
            <div>
              <Input label="Retype Password" size="lg" name="password1" onChange={handlOnChange} />
              {errors?.password && <span className="text-sm text-red-500">{errors.password}</span>}
            </div>
            <div className="flex justify-center">
              {errors?.message && <span className="text-sm text-red-500">{errors.message}</span>}
              {message && <span className="text-sm text-green-500">{message}</span>}
            </div>
          </CardBody>

          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth loading={loading} onClick={handleSubmit}>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Returning User?
              <Typography as="a" href="/login" variant="small" color="blue-gray" className="ml-1 font-bold">
                Log in
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
