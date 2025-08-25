import { NavLink } from "react-router-dom";
import "./navbar.css";




export default function Sidebar() {
  const PageData = [
    { id: 1, title: "Dashboard", path: "/", icon: "fas fa-tachometer-alt" },
    { id: 2, title: "Add Book", path: "/addbook", icon: "fas fa-plus" },
    { id: 3, title: "Books", path: "/book", icon: "fas fa-book" },
    { id: 4, title: "Members", path: "/member", icon: "fas fa-users" },
    { id: 5, title: "Login", path: "/login", icon: "fas fa-user" }
  ];

  return (
    <div>
      <div className="nav_header">
        <div className="nav_con">
     {/* <h5 style={{color:"white"}} >National Digital 
      Library </h5>
      <div className="left" style={{color:"whitesmoke"}}> <i class="ri-admin-fill"></i> Welcome Admin... </div> */} </div>
     
    <nav className="sidebar bg-white">
  <div className="profile-box">
    <i className="ri-user-settings-fill"></i>
    <div className="profile-text">
      <span className="admin-text">Admin</span>
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
    </div>
    
  );
}
