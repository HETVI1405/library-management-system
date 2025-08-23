import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar.jsx";
import RoutesConfig from "./Routes/AllRoutes.jsx";
// import AddBooks from "./screens/AddBooks/AddBook.jsx"
// import Books from "./screens/Books/Books.jsx"

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
    //  <Books /> 
    // <AddBooks />

    //     </div>
    <div>
      {/* {isAuthenticated ? (
  <div>
    <Dashboard onLogout={() => setIsAuthenticated(false)} />
    <Books />
  </div>
) : (
  <AdminLogin onLogin={() => setIsAuthenticated(true)} />
)} */}

{/* <Dashboard /> */}
{/* <Books /> */}
<Navbar/>
<RoutesConfig />


    </div>
  );
}
