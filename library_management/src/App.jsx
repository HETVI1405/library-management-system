import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Home from "./screens/Home/Home";
import { AuthorizationContext } from "./Components/Context/ContentApi";

export default function App() {
  const { admin } = useContext(AuthorizationContext);
  const isAdmin = admin === "admin123@gmail.com";

  return (
    <Home />
  );
}



// import React, { useContext } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./screens/Home/Home";
// import AdminLogin from "./screens/AdminLogin/AdminLogin";
// import { AuthorizationContext } from "./Components/Context/ContentApi";

// export default function App() {
//   const { admin } = useContext(AuthorizationContext);
//   const isAdmin = admin === "admin123@gmail.com";

//   return (
//     <Routes>
//       {/* Default route */}
//       <Route path="/" element={
//         isAdmin ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
//       } />

//       {/* Login page */}
//       <Route path="/login" element={<AdminLogin />} />

//       {/* Home page (admin only) */}
//       <Route path="/home" element={
//         isAdmin ? <Home /> : <Navigate to="/login" replace />
//       } />
//     </Routes>
//   );
// }
