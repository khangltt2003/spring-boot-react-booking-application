import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/home";
import { Booking } from "./pages/booking";
import { MainLayout } from "./components/main-layout";
import { RoomsList } from "./pages/room";
import { Login } from "./components/auth/login";
import { Register } from "./components/auth/signup";
import { RoomDetail } from "./pages/room-detail";
import { NotFound } from "./components/not-found/not-found";
import { AuthProvider } from "./components/provider/auth-provider";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/room" element={<RoomsList />} />
            <Route path="/room/:roomId" element={<RoomDetail />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
