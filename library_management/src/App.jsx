import React, { useState } from "react";
import Dashboard from "./screens/Dashboard/Dashboard";
import Books from "./screens/Books/Books"
import AddBooks from "./screens/AddBooks/AddBook.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {/* {isAuthenticated ? (
  <div>
    <Dashboard onLogout={() => setIsAuthenticated(false)} />
    <Books />
  </div>
) : (
  <AdminLogin onLogin={() => setIsAuthenticated(true)} />
)} */}

{ <Dashboard /> }
{ <Books /> }
<AddBooks />

    </div>
  );
}
