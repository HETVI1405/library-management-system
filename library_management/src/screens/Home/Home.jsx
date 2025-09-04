import { useContext, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import RoutesConfig from "./../../Routes/AllRoutes.jsx";
import "./Home.css";
import { AuthorizationContext } from "../../Components/Context/ContentApi.jsx";
import AdminLogin from "../AdminLogin/AdminLogin.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../../features/membersSlice.js";

export default function Home() {
  const { admin } = useContext(AuthorizationContext);

  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const adminName = members.find((member) => member.email === admin)?.name || admin;

  return (
    <div style={{ display: "flex", overflow: "hidden" }}>
      <div style={{ height: "100vh" }}>
        <Navbar />
      </div>

      <div style={{ height: "100vh", width: "100%" }}>
        <div
          style={{
            backgroundColor: "#72acea",
            width: "100%",
            height: "60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 50px",
            position: "sticky",
            top: "0px",
          }}
        >
          <h5 style={{ color: "white" }}>National Digital Library</h5>
          <div className="left" style={{ color: "whitesmoke" }}>
            <i className="ri-admin-fill" style={{ marginRight: "5px" }}></i>
            Welcome {adminName}
          </div>
        </div>

        {!admin ? (
          <AdminLogin />
        ) : (
          <div style={{ width: "100%", height: "100vh", overflow: "auto" }}>
            <RoutesConfig />
          </div>
        )}
      </div>
    </div>
  );
}
