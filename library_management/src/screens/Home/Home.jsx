import { useContext, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import RoutesConfig from "./../../Routes/AllRoutes.jsx";
import "./Home.css";
import { AuthorizationContext } from "../../Components/Context/ContentApi.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../../features/membersSlice.js";

export default function Home() {
  const { admin } = useContext(AuthorizationContext); // admin holds the logged-in email
  const { members } = useSelector((state) => state.members);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  // Find the logged-in user's name by matching email
  const userName =
    members.find((el) => el.email === admin)?.name || admin || "Guest";

  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ height: "100vh" }}>
        <Navbar />
      </div>

      {/* Main content area */}
      <div style={{ height: "100vh", width: "100%" }}>
        {/* Top bar */}
        <div
          style={{
            backgroundColor: "#02162bff",
            width: "100%",
            height: "60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 20px",
            position: "sticky",
            top: "0px",
            zIndex: 100,
          }}
        >
          <h5 style={{ color: "white" }}>National Digital Library</h5>
          <div className="left" style={{ color: "whitesmoke", marginRight: "3%" }}>
            <div className="profile" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <i className="ri-user-settings-fill" style={{ fontSize: "22px" }}></i>
              <div className="profile-info" style={{ lineHeight: 1 }}>
                <span className="admin-text" style={{ fontSize: "15px",marginBottom:"5px" }}>
                  {userName}
                </span>
                <span className="status" style={{ fontSize: "12px", color: "#4CAF50" }}>
                  ● Online
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Routes */}
        <div style={{ width: "100%", height: "calc(100vh - 60px)", overflow: "auto" }}>
          <RoutesConfig />
        </div>
      </div>
    </div>
  );
}
