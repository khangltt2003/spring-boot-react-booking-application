import { Button } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full relative">
      <div className="absolute h-full w-full">
        <img
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1461696114087-397271a7aedc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"
          alt=""
        />
      </div>
      <div className="absolute bg-black/60 h-full w-full flex flex-col items-center justify-center ">
        <h1 className="text-6xl font-bold text-gray-200 mb-4">404</h1>
        <p className="text-lg text-gray-300 mb-6">Oops! The page you're looking for does not exist.</p>
        <Button color="white" onClick={() => navigate("/")}>
          Go Back Home
        </Button>
      </div>
    </div>
  );
};
