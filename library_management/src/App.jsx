import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar.jsx";
import RoutesConfig from "./Routes/AllRoutes.jsx";
import { FaRegUserCircle } from "react-icons/fa";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div style={{overflow:"hidden"}}>


{/* <div style={{ backgroundColor: "#72acea", width: "100%", height: "60px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0px 50px" }}>
        <h5 style={{ color: "white" }} >National Digital Library </h5>
        <div className="left" style={{ color: "whitesmoke" }}>
          <i class="ri-admin-fill"></i>
          Welcome Admin... </div>
      </div> */}

      <div  style={{display:"flex"}}>
        <div style={{height:"100vh"}}>
      <div><Navbar /></div>
      </div>



      <div style={{height:"100vh",width:"100%"}}>
        <div style={{ backgroundColor: "#72acea", width: "100%", height: "60px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0px 50px",position:"sticky" , top:"0px"}}>
        <h5 style={{ color: "white" }} >National Digital Library </h5>
        <div className="left" style={{ color: "whitesmoke" }}>
          <i class="ri-admin-fill"></i>
          Welcome Admin... </div>
      </div>
        <div style={{ width: "100%", height: "100vh" , overflow:"auto"}}><RoutesConfig /></div>
      </div>
      </div>







      {/* <div style={{ backgroundColor: "#72acea", width: "100%", height: "60px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0px 50px" }}>
        <h5 style={{ color: "white" }} >National Digital Library </h5>
        <div className="left" style={{ color: "whitesmoke" }}>
          <i class="ri-admin-fill"></i>
          Welcome Admin... </div>
      </div>
      <div style={{ display: "flex", width: "100%", height: "100vh" }}>
        <div><Navbar /></div>
        <div style={{ width: "100%", height: "100vh"}}><RoutesConfig /></div>
      </div> */}
    </div>
  );
}
