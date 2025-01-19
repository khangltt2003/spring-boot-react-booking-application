import React from "react";
import { Navbar, MobileNav, Typography, Button, IconButton, Card, Menu, MenuList, MenuHandler, MenuItem } from "@material-tailwind/react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import AuthContext from "../provider/auth-provider";

export function MyNavbar() {
  const { logout, user, isAuthenticated, isAdmin } = useContext(AuthContext);
  const [openNav, setOpenNav] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname || "/";

  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {[
        { href: "/", label: "Home" },
        { href: "/room", label: "Rooms" },
        { href: "/booking", label: "Booking" },
        ...(isAdmin() ? [{ href: "/admin", label: "Admin Dashboard" }] : []),
      ].map(({ href, label }) => (
        <Typography
          key={href}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal text-lg md:hover:scale-105 md:transition-all cursor-pointer"
          onClick={() => navigate(href)}
        >
          <span className="flex items-center">{label}</span>
        </Typography>
      ))}
    </ul>
  );

  return (
    <div className="sticky w-full z-10 top-0 max-h-[768px] shadow-sm shadow-blue-gray-600">
      <Navbar className="  h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 ">
        <div className="flex items-center justify-between text-blue-gray-900 md:w-[80%] mx-auto">
          <Typography variant="h1" as="a" href="/" className="mr-4 cursor-pointer py-1.5 font-bold text-2xl">
            <span>Roomzy</span>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              {isAuthenticated() ? (
                <Menu>
                  <MenuHandler>
                    <Typography className="mr-4 cursor-pointer py-1.5 font-semibold text-2xl">
                      <span>{user?.name}</span>
                      <i className="bx bxs-chevron-down"></i>
                    </Typography>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem>
                      <span className="text-black">Your Booking</span>
                    </MenuItem>
                    <MenuItem>
                      <span className="text-black">Your Profile</span>
                    </MenuItem>
                    <hr className="my-3" />
                    <MenuItem className="p-0">
                      <Button fullWidth={true} onClick={logout}>
                        Log Out
                      </Button>
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <a href={`/login?redirect=${currentPath}`}>
                    <Button variant="text" size="sm" className="hidden lg:inline-block">
                      <span className="text-sm">log In</span>
                    </Button>
                  </a>
                  <a href={`/signup?redirect=${currentPath}`}>
                    <Button variant="gradient" size="sm" className="hidden lg:inline-block">
                      <span className="text-sm">sign up</span>
                    </Button>
                  </a>
                </>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <a href="/login">
              <Button fullWidth variant="text" size="sm" className="">
                <span className="text-base">Log In</span>
              </Button>
            </a>

            <a href="/signup">
              <Button fullWidth variant="gradient" size="sm" className="">
                <span className="text-base">Sign Up</span>
              </Button>
            </a>
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}
