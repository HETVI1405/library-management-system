// // import { Route, Routes } from "react-router-dom";
// // import Dashboard from "../screens/Dashboard/Dashboard";
// // import AddBooks from "../screens/AddBooks/AddBook";
// // import Books from "../screens/Books/Books";
// // import AdminLogin from "../screens/AdminLogin/AdminLogin";
// // import EditBook from "../screens/editBook/editBook";
// // import Members from "../screens/Members/Members";
// // import BooksDescription from "../screens/Books/BooksDescription";
// // import ProtectedRoute from "../screens/Auth/ProtectedRoute";

// // export default function RoutesConfig() {
// //   return (
// //     <Routes>
// //       <Route path="/login" element={<AdminLogin />} />
// //       <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
// //       <Route path="/addbook" element={<ProtectedRoute><AddBooks /></ProtectedRoute>} />
// //       <Route path="/book" element={<ProtectedRoute><Books /></ProtectedRoute>} />
// //       <Route path="/editbook/:id" element={<ProtectedRoute><EditBook /></ProtectedRoute>} />
// //       <Route path="/member" element={<ProtectedRoute><Members /></ProtectedRoute>} />
// //       <Route path="/books/:id" element={<ProtectedRoute><BooksDescription /></ProtectedRoute>} />
// //     </Routes>
// //   );
// // }
// import { Route, Routes } from "react-router-dom";
// import Dashboard from "../screens/Dashboard/Dashboard";
// import AddBooks from "../screens/AddBooks/AddBook";
// import Books from "../screens/Books/Books";
// import AdminLogin from "../screens/AdminLogin/AdminLogin";
// import EditBook from "../screens/editBook/editBook";
// import Members from "../screens/Members/Members";
// import BooksDescription from "../screens/Books/BooksDescription";
// import ProtectedRoute from "../screens/Auth/ProtectedRoute";
// import Navbar from "../components/Navbar/Navbar";

// export default function RoutesConfig() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/login" element={<AdminLogin />} />
//         <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//         <Route path="/addbook" element={<ProtectedRoute><AddBooks /></ProtectedRoute>} />
//         <Route path="/book" element={<ProtectedRoute><Books /></ProtectedRoute>} />
//         <Route path="/editbook/:id" element={<ProtectedRoute><EditBook /></ProtectedRoute>} />
//         <Route path="/member" element={<ProtectedRoute><Members /></ProtectedRoute>} />
//         <Route path="/books/:id" element={<ProtectedRoute><BooksDescription /></ProtectedRoute>} />
//       </Routes>
//     </>
//   );
// }
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Components
import Navbar from "../Components/Navbar/Navbar";

// Import Screens
import Dashboard from "../screens/Dashboard/Dashboard";
import AddBook from "../screens/AddBooks/AddBook";
import Books from "../screens/Books/Books";
import Members from "../screens/Members/Members";
import BooksDescription from "../screens/Books/BooksDescription";

export default function AllRoutes() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Books Pages */}
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BooksDescription />} />

        {/* Add Book Page */}
        <Route path="/add-book" element={<AddBook />} />

        {/* Members Page */}
        <Route path="/members" element={<Members />} />

        {/* 404 Page */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}
