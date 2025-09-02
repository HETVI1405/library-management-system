import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import Home from "./screens/Home/Home";
import AdminLogin from "./screens/AdminLogin/AdminLogin";
import { AuthorizationContext } from "./Components/Context/ContentApi";
import RoutesConfig from "./Routes/AllRoutes";

export default function App() {
  const { admin } = useContext(AuthorizationContext);
  const navigate = useNavigate();


  console.log(admin)
  // Redirect based on admin state
  useEffect(() => {
    if (admin) {
      // navigate("/home");
      <NavLink to="/home" />
    } else {
      // navigate("/login");
      <NavLink to="/Login" />
    }
  }, [admin, navigate]);

  return (
    <Home />
  );
}
