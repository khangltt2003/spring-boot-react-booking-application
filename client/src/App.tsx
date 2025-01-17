import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/home";
import { Booking } from "./pages/booking";
import { MainLayout } from "./components/main-layout";
import { RoomsList } from "./pages/room";
import { Login } from "./components/auth/login";
import { Register } from "./components/auth/signup";
import { AuthLayout } from "./components/auth/auth-layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Register />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/room" element={<RoomsList />} />
          <Route path="/booking" element={<Booking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
