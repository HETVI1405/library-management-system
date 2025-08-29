import { Route, Routes } from "react-router-dom";
import Dashboard from "../screens/Dashboard/Dashboard";
import AddBooks from "../screens/AddBooks/AddBook";
import Books from "../screens/Books/Books";
import AdminLogin from "../screens/AdminLogin/AdminLogin";
import EditBook from "../screens/editBook/editBook";
import Members from "../screens/Members/Members";
import BooksDescription from "../screens/Books/BooksDescription";
import ProtectedRoute from "../screens/Auth/ProtectedRoute";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/addbook" element={<ProtectedRoute><AddBooks /></ProtectedRoute>} />
      <Route path="/book" element={<ProtectedRoute><Books /></ProtectedRoute>} />
      <Route path="/editbook/:id" element={<ProtectedRoute><EditBook /></ProtectedRoute>} />
      <Route path="/member" element={<ProtectedRoute><Members /></ProtectedRoute>} />
      <Route path="/books/:id" element={<ProtectedRoute><BooksDescription /></ProtectedRoute>} />
    </Routes>
  );
}
