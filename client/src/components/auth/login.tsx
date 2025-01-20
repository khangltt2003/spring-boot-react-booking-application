import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button } from "@material-tailwind/react";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import AuthContext from "../provider/auth-provider";

export function Login() {
  const authContext = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const redirectURL = searchParams.get("redirect") || "/";
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    setError(null);
    setLoginData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async () => {
    if (!loginData.email || !loginData.password) return;

    try {
      setLoading(true);
      authContext.login(loginData.email, loginData.password);
      if (redirectURL === "/login" || redirectURL === "/signup") return navigate("/");
      return navigate(redirectURL);
    } catch (e) {
      setError(e.response.data.message);
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
        <Card className="w-96 bg-white/90 focus-within:bg-white hover:bg-white">
          <CardHeader variant="gradient" color="gray" className="mb-4 grid h-28 place-items-center">
            <Typography variant="h3" color="white">
              <span>Roomzy</span>
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" size="lg" name="email" value={loginData.email} onChange={handleOnChange} />
            <Input label="Password" size="lg" name="password" value={loginData.password} onChange={handleOnChange} />

            <div className="flex justify-center">
              <Typography variant="small" color="red">
                <span>{error}</span>
              </Typography>
            </div>
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>

          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={handleSubmit} loading={loading}>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography as="a" href="/signup" variant="small" color="blue-gray" className="ml-1 font-bold">
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
