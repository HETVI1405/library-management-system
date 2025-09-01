// // // import { NavLink } from "react-router-dom";
// // // import "./navbar.css";




// // // export default function Sidebar() {
// // //   const PageData = [
// // //     { id: 1, title: "Dashboard", path: "/", icon: "fas fa-tachometer-alt" },
// // //     { id: 2, title: "Add Book", path: "/addbook", icon: "fas fa-plus" },
// // //     { id: 3, title: "Books", path: "/book", icon: "fas fa-book" },
// // //     { id: 4, title: "Members", path: "/member", icon: "fas fa-users" },
// // //     { id: 5, title: "Login", path: "/login", icon: "fas fa-user" },
   

// // //   ];
// // //    const { logout } = useAuth();

// // //   return (
// // //     <div>
// // //       <div className="nav_header">
// // //         <div className="nav_con">

// // //     </div >

// // //      </div>

     
// // //     <nav className="sidebar bg-white">
// // //   <div className="profile-box">
// // //     <i className="ri-user-settings-fill"></i>
// // //     <div className="profile-text">
// // //       <span className="admin-text">Admin</span>
// // //       <span className="status">● Online</span>
// // //     </div>
// // //   </div>

// // //   <div className="sidebar-sticky">
// // //     <div className="list-group list-group-flush">
// // //       {PageData.map((el) => (
// // //         <NavLink
// // //           key={el.id}
// // //           to={el.path}
// // //           className={({ isActive }) =>
// // //             "list-group-item list-group-item-action py-2 ripple" +
// // //             (isActive ? " active" : "")
// // //           }
// // //         >
// // //           <i className={`${el.icon} fa-fw me-3`}></i>
// // //           <span>{el.title}</span>
// // //         </NavLink>
// // //       ))}
// // //     </div>
// // //   </div>
// // // </nav>

// // //     </div>
 
    
// // //   );
// // // }
// // import { NavLink } from "react-router-dom";
// // import "./navbar.css";
// // import { useAuth } from "../../screens/Auth/AuthContext";   
// // import { logout } from "../../features/authSlice";

// // export default function Navbar() {
// //   const PageData = [
// //     { id: 1, title: "Dashboard", path: "/", icon: "fas fa-tachometer-alt" },
// //     { id: 2, title: "Add Book", path: "/addbook", icon: "fas fa-plus" },
// //     { id: 3, title: "Books", path: "/book", icon: "fas fa-book" },
// //     { id: 4, title: "Members", path: "/member", icon: "fas fa-users" },
    
// //   ];

// // //  const { logout } = useAuth();

// //   return (
// //     <div>
// //       <div className="nav_header">
// //         <div className="nav_con"></div>
// //       </div>

// //       <nav className="sidebar bg-white">
// //         <div className="profile-box">
// //           <i className="ri-user-settings-fill"></i>
// //           <div className="profile-text">
// //             <span className="admin-text">Admin</span>
// //             <span className="status">● Online</span>
// //           </div>
// //         </div>

// //         <div className="sidebar-sticky">
// //           <div className="list-group list-group-flush">
// //             {PageData.map((el) => (
// //               <NavLink
// //                 key={el.id}
// //                 to={el.path}
// //                 className={({ isActive }) =>
// //                   "list-group-item list-group-item-action py-2 ripple" +
// //                   (isActive ? " active" : "")
// //                 }
// //               >
// //                 <i className={`${el.icon} fa-fw me-3`}></i>
// //                 <span>{el.title}</span>
// //               </NavLink>
// //             ))}

            
// //             <button
// //               // onClick={logout}
// //               className="list-group-item list-group-item-action py-2 ripple logout-btn"
// //               style={{ border: "none", background: "transparent", textAlign: "left" }}
// //             >
// //               <i className="fas fa-sign-out-alt fa-fw me-3"></i>
// //               <span>Logout</span>
// //             </button>
// //           </div>
// //         </div>
// //       </nav>
// //     </div>
// //   );
// // }
// import { NavLink } from "react-router-dom";
// import "./navbar.css";

//
// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <nav style={{ padding: "10px", backgroundColor: "#222", color: "#fff" }}>
   
       
   
//       <button onClick={handleLogout}>Logout</button>
//     </nav>
//   );
// }
import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    window.location.reload();
  };

  const PageData = [
    { id: 1, title: "Dashboard", path: "/dashboard", icon: "fas fa-tachometer-alt" },
    { id: 2, title: "Add Book", path: "/addbook", icon: "fas fa-plus" },
    { id: 3, title: "Books", path: "/book", icon: "fas fa-book" },
    { id: 4, title: "Members", path: "/member", icon: "fas fa-users" },
  ];

  return (
    <nav className="sidebar bg-white">
      {/* Profile Box */}
      <div className="profile-box">
        <i className="ri-user-settings-fill"></i>
        <div className="profile-text">
          <span className="admin-text">Admin</span>
          <span className="status">● Online</span>
        </div>
      </div>

      {/* Sidebar Links */}
      <div className="sidebar-sticky">
        <div className="list-group list-group-flush">
          {PageData.map((el) => (
            <NavLink
              key={el.id}
              to={el.path}
              className={({ isActive }) =>
                `list-group-item list-group-item-action py-2 ripple ${
                  isActive ? "active" : ""
                }`
              }
            >
              <i className={`${el.icon} fa-fw me-3`}></i>
              <span>{el.title}</span>
            </NavLink>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="list-group-item list-group-item-action py-2 ripple logout-btn"
            style={{
              border: "none",
              background: "transparent",
              textAlign: "left",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <i className="fas fa-sign-out-alt fa-fw"></i>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
