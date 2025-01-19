import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
      setRole(JSON.parse(storedAuth).role);
      const getUser = async () => {
        const res = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_API_BASE_URL}/users/get-current-user`,
          headers: {
            Authorization: `Bearer ${JSON.parse(storedAuth).token}`,
          },
        });
        setUser(res.data.user);
      };

      getUser();
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios({
      method: "POST",
      url: `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      data: { email, password },
    });

    localStorage.setItem("auth", JSON.stringify({ token: response.data.token, role: response.data.role, userId: response.data.userId }));
    window.location.reload();
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    window.location.reload();
  };

  const isAuthenticated = () => auth !== null;

  const isAdmin = () => role === "admin";

  const data = {
    login,
    logout,
    user,
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
