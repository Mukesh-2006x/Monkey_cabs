import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/navbar";
import Home from "../screens/home";
import Rent from "../screens/rent";
import Business from "../screens/business";
import Login from "../screens/login";
import SignUp from "../screens/signin";
import useStore from "../store";

const AppRoutes = () => {
  const location = useLocation();
  const { user } = useStore();

  useEffect(() => {
    console.log("Current Page:", location.pathname);
  }, [location]);

  return (
    <>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/business" element={<Business />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
};

export default AppRoutes;
