import { Route, Routes } from 'react-router-dom';
import Dashboard from '../screens/Dashboard/Dashboard';
import AddBooks from '../screens/AddBooks/AddBook';
import Books from '../screens/Books/Books';
import AdminLogin from '../screens/AdminLogin/AdminLogin';
import EditBook from '../screens/editBook/editBook';
import Members from '../screens/Members/Members';
import Home from '../screens/Home/Home';
import { useContext } from 'react';
import { AuthorizationContext } from '../Components/Context/ContentApi';

export default function RoutesConfig() {

  const { admin } = useContext(AuthorizationContext);
  const isAdmin = admin === "admin123@gmail.com";

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {isAdmin ? <Route path="/addbook" element={<AddBooks />} /> : null}
      <Route path="/book" element={<Books />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/editbook/:id" element={<EditBook />} />
      <Route path="/member" element={<Members />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}