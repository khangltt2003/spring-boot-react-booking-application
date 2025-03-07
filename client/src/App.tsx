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
import { Profile } from "./pages/profile";
import { UserBooking } from "./pages/user-booking";
import PrivateRoute from "./components/private-route";
import { AdminRoute } from "./components/admin-route";
import { AdminDashboard } from "./pages/admin-dashboarrd";

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

            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/user-booking" element={<UserBooking />} />
            </Route>
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
