import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("token"); // Check if token exists

    if (!isAuthenticated) {
        return <Navigate to="/" replace />; // Redirect to login page if not authenticated
    }

    return children;
};

export default ProtectedRoute;
