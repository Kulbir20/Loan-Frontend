import { Navigate } from "react-router-dom";
import SideBar from "./SideBar";

const ProtectedRoute = () => {
    const token = localStorage.getItem("token"); // Get token from localStorage

    return token ? <SideBar/> : <Navigate to="/login" />;
};

export default ProtectedRoute;
