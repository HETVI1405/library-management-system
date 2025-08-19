// import React from "react";
// import Dashboard from "../src/screens/Dashboard";


// export default function App() {
//   return (
//     <div>
  
//       <Dashboard />
//     </div>
//   );
// }
import React, { useState } from "react";
import AdminLogin from "./screens/AdminLogin";
import Dashboard from "./screens/Dashboard";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {isAuthenticated ? (
        <Dashboard onLogout={() => setIsAuthenticated(false)} />
      ) : (
        <AdminLogin onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}
