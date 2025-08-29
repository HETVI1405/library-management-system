import { Route, Routes } from 'react-router-dom';
import Dashboard from '../screens/Dashboard/Dashboard';
import AddBooks from '../screens/AddBooks/AddBook';
import Books from '../screens/Books/Books';
import AdminLogin from '../screens/AdminLogin/AdminLogin';
import EditBook from '../screens/editBook/editBook';
import Members from '../screens/Members/Members';
import BooksDescription from "../screens/Books/BooksDescription";


export default function RoutesConfig() {
  return (
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/addbook" element={<AddBooks />} />
      <Route path="/book" element={<Books />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/editbook/:id" element={<EditBook />} />
      <Route path="/member" element={<Members />} />
      <Route path="/books/:id" element={<BooksDescription />} />
    </Routes>
  );
}