import { NavLink } from "react-router-dom";
import "./navbar.css";
import { AuthorizationContext } from "../Context/ContentApi";
import { useContext } from "react";

export default function Navbar() {
  const { admin } = useContext(AuthorizationContext);
  const isAdmin = admin === "admin123@gmail.com";

  const PageData = [
    { id: 1, title: "Dashboard", path: "/", icon: "fas fa-tachometer-alt" },
    isAdmin && { id: 2, title: "Add Book", path: "/addbook", icon: "fas fa-plus" },
    { id: 3, title: "Books", path: "/book", icon: "fas fa-book" },
     isAdmin && { id: 4, title: "Members", path: "/member", icon: "fas fa-users" },
    admin ? { id: 6, title: "Logout", path: "/login", icon: "fas fa-sign-out-alt" } : { id: 5, title: "Login", path: "/login", icon: "fas fa-user" },
    { id: 7, title: "Issued Books", path: "/issues:id", icon: "fas fa-book-reader" }

    ].filter(Boolean);

  return (
    <div>
      <nav className="sidebar bg-white">
        <div className="profile-box">
          <i className="ri-user-settings-fill"></i>
          <div className="profile-text">
            <span className="admin-text">{isAdmin ? "Admin" : "User"}</span>
            <span className="status">● Online</span>
          </div>
        </div>

        <div className="sidebar-sticky">
          <div className="list-group list-group-flush">
            {PageData.map((el) => (
              <NavLink
                key={el.id}
                to={el.path}
                className={({ isActive }) =>
                  "list-group-item list-group-item-action py-2 ripple" +
                  (isActive ? " active" : "")
                }
              >
                <i className={`${el.icon} fa-fw me-3`}></i>
                <span>{el.title}</span> 
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
