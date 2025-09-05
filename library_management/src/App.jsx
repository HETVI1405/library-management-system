import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Home from "./screens/Home/Home";
import { AuthorizationContext } from "./Components/Context/ContentApi";

export default function App() {
  const { admin } = useContext(AuthorizationContext);
  return (
    <Home />
  );
}