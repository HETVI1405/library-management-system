// import { NavLink } from "react-router-dom";
// import "./navbar.css";
// import { AuthorizationContext } from "../Context/ContentApi";
// import { useContext } from "react";

// export default function Navbar() {
//   const { admin } = useContext(AuthorizationContext);
//   const isAdmin = admin === "admin123@gmail.com";

//   const PageData = [
//   { id: 1, title: "Dashboard", path: "/", icon: "fas fa-tachometer-alt" },
//   isAdmin && { id: 2, title: "Add Book", path: "/addbook", icon: "fas fa-plus" },
//   { id: 3, title: "Books", path: "/book", icon: "fas fa-book" },
//   { id: 4, title: "Members", path: "/member", icon: "fas fa-users" },
//   { id: 5, title: "Login", path: "/login", icon: "fas fa-user" },
// ].filter(Boolean);

//   return (
//     <div>
//       <nav className="sidebar bg-white">
//         <div className="profile-box">
//           <i className="ri-user-settings-fill"></i>
//           <div className="profile-text">
//             <span className="admin-text">Admin</span>
//             <span className="status">● Online</span>
//           </div>
//         </div>

//         <div className="sidebar-sticky">
//           <div className="list-group list-group-flush">
//             {PageData.map((el) => (
//               <NavLink
//                 key={el.id}
//                 to={el.path}
//                 className={({ isActive }) =>
//                   "list-group-item list-group-item-action py-2 ripple" +
//                   (isActive ? " active" : "")
//                 }
//               >
//                 <i className={`${el.icon} fa-fw me-3`}></i>
//                 <span>{el.title}</span>
//               </NavLink>
//             ))}
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }



import { useContext, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";

import { FaTachometerAlt, FaPlus, FaBook, FaUsers, FaSignOutAlt, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { AuthorizationContext } from "../Context/ContentApi";

export default function Navbar() {

  const { admin } = useContext(AuthorizationContext);
  const isAdmin = admin === "admin123@gmail.com";

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const PageData = [
    { id: 1, title: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    isAdmin && { id: 2, title: "Add Book", path: "/addbook", icon: <FaPlus /> },
    { id: 3, title: "Books", path: "/book", icon: <FaBook /> },
    isAdmin
      ? { id: 4, title: "Members", path: "/member", icon: <FaUsers /> }
      : { id: 4, title: "Profile", path: "/profile", icon: <FaUsers /> },
    isAdmin && { id: 7, title: "Issues", path: "/issue", icon: <FaRegCheckCircle /> },
    admin
      ? { id: 6, title: "Logout", path: "/login", icon: <FaSignOutAlt /> }
      : { id: 5, title: "Login", path: "/login", icon: <FaUser /> },
  ].filter(Boolean);


  return (
    <div className="layout">
      {/* Top Navbar */}
      <nav className="top-navbar">

        <button className="toggle-btn" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>




      </nav>


      <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-menu">


          {PageData.map((el, index) => (
            <NavLink
              key={index}
              to={el.path}
              className={({ isActive }) =>
                "menu-item" + (isActive ? " active" : "")
              }
            >
              <span className="icon">{el.icon}</span>
              <span className="title" style={{ fontSize: "18px", margin: "-3%" }}>
                {el.title}
              </span>
            </NavLink>
          ))}

        </div>
      </aside>
    </div>
  );
}


