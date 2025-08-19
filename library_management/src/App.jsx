
import React, { useState } from "react";
import AdminLogin from "./screens/AdminLogin";
import Dashboard from "./screens/Dashboard";
import Books from "./screens/Books"

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {isAuthenticated ? (
  <div>
    <Dashboard onLogout={() => setIsAuthenticated(false)} />
    <Books />
  </div>
) : (
  <AdminLogin onLogin={() => setIsAuthenticated(true)} />
)}

    </div>
  );
}
