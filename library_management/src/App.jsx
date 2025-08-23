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
<div style={{backgroundColor:"#72acea",width:"100%",height:"60px",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0px 50px"}}>
  <h5 style={{color:"white"}} >National Digital 
      Library </h5>
      <div className="left" style={{color:"whitesmoke"}}> <i class="ri-admin-fill"></i> Welcome Admin... </div>
</div>
<div style={{display:"flex",width:"100%",height:"100vh"}}>
  <div><Navbar/></div>
  <div style={{width:"100%",height:"100ch"}}><RoutesConfig /></div>
</div>





    </div>
  );
}
