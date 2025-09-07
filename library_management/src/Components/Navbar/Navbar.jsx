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


