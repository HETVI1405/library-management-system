// import { useState } from "react";
// import "./Layout.css";

// export default function Layout({ children }) {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div className="layout">
//       <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
//         <button onClick={() => setCollapsed(!collapsed)} className="toggle-btn">
//           ☰
//         </button>
//         <ul>
//           <li>Dashboard</li>
//           <li>Add Book</li>
//           <li>Books</li>
//           <li>Members</li>
//           <li>Login</li>
//         </ul>
//       </div>

//       <div className="main-content">{children}</div>
//     </div>
//   );
// }
// import Navbar from "../Navbar/Navbar";
// import Sidebar from "../Navbar/Slidebar";
// import "./Layout.css";

// export default function Layout({ children }) {
//   return (
//     <div className="layout">
//       <Navbar />
//       <div className="layout-body">
//         <Sidebar />
//         <main className="main-content">{children}</main>
//       </div>
//     </div>
//   );
// }
