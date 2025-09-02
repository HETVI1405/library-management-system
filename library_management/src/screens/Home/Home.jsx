import { useContext } from "react";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import RoutesConfig from "./../../Routes/AllRoutes.jsx";
import "./Home.css"
import { AuthorizationContext } from "../../Components/Context/ContentApi.jsx";

export default function Home() {

    const {admin} = useContext(AuthorizationContext)

    return (
        <div style={{ display: "flex", overflow: "hidden" }}>
            <div style={{ height: "100vh" }}>
                <div><Navbar /></div>
            </div>



            <div style={{ height: "100vh", width: "100%", }}>
                <div style={{ backgroundColor: "#72acea", width: "100%", height: "60px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0px 50px", position: "sticky", top: "0px" }}>
                    <h5 style={{ color: "white" }} >National Digital Library </h5>
                    <div className="left" style={{ color: "whitesmoke" }}>
                        <i class="ri-admin-fill"></i>
                        Welcome {admin} </div>
                </div>
                <div style={{ width: "100%", height: "100vh", overflow: "auto" }}><RoutesConfig /></div>
            </div>
        </div>
    )
}
