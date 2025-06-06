import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import SignIn from "./auth/Signin";
import SignUp from "./auth/Signup";
import Destination from "./components/Destination";
import Home from "./components/HomePage";
import Hotel from "./components/Hotel";
import Hotels from "./components/Hotels";
import LandingPage from "./components/LandingPage";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import TravelPackage, { default as TravelPackages } from "./components/TravelPackage";
import ManageHotels from "./Good/ManageHotel";
import ManageTravelPackage from "./Good/ManageTravelPackage";
import DashboardLayout from "./Layout/DashboardLayout";
import UserLayout from "./Layout/UserLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/user" element={<UserLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="destination" element={<Destination />} />
          <Route path="travelpackages" element={<TravelPackages />} />
          <Route path="travelpackages/:id" element={<TravelPackage />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="hotels/:id" element={<Hotel />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="manage-hotels" element={<ManageHotels />} />
          <Route path="manage-packages" element={<ManageTravelPackage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
