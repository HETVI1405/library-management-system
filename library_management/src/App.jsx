import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar.jsx";
import RoutesConfig from "./Routes/AllRoutes.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    //     <div>
    //       {isAuthenticated ? (
    //   <div>
    //     <Dashboard onLogout={() => setIsAuthenticated(false)} />
    //     <Books />
    //   </div>
    // ) : (
    //   <AdminLogin onLogin={() => setIsAuthenticated(true)} />
    // )}

    //  <Dashboard /> 
    // <Books/> 
    // <AddBooks />

    //     </div>
    <div>
      <Navbar />
      <hr />
      <RoutesConfig/>
    </div>
  );
}
