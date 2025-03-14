import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoanUsers from "./LoanUsers";
import UserInfo from "./UserInfo";
import Login from "./Login";
import SideBar from "./SideBar";
import LoanOffers from "./LoanOffers";
import Offers from "./Offers";
import LoanRequest from "./LoanRequest";
import ViewDetails from "./ViewDetails";
import HelpCenter from "./HelpCenter";
import Terms from "./Terms";
import FAQ from "./FAQ";
import Blogs from "./Blogs";
import Feedback from "./Feedback";
import Policies from "./Policies";
import ProtectedRoute from "./ProtectedRoute";
import { useEffect, useState } from "react";
import ContentManager from "./ContentManager";
import Home from "./Home";
import DailyReport from "./DailyReport";
import ManageNotification from "./ManageNotification";

const SiteRoutes = () => {
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token"));

    useEffect(() => {
        setIsAuthenticated(localStorage.getItem("token")); 
    }, [location]);

    if (!isAuthenticated && location.pathname !== "/") {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex">
            {isAuthenticated && <SideBar />}
            <div className="flex-1">
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} />

                    <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
                    <Route path="/loanusers" element={<ProtectedRoute><LoanUsers /></ProtectedRoute>} />
                    <Route path="/userinfo/:id" element={<ProtectedRoute><UserInfo /></ProtectedRoute>} />
                    <Route path="/loanoffers" element={<ProtectedRoute><LoanOffers /></ProtectedRoute>} />
                    <Route path="/offers" element={<ProtectedRoute><Offers /></ProtectedRoute>} />
                    <Route path="/loanrequest" element={<ProtectedRoute><LoanRequest /></ProtectedRoute>} />
                    <Route path="/viewdetails/:userId" element={<ProtectedRoute><ViewDetails /></ProtectedRoute>} />
                    <Route path="/helpcenter" element={<ProtectedRoute><HelpCenter /></ProtectedRoute>} />
                    <Route path="/terms" element={<ProtectedRoute><Terms /></ProtectedRoute>} />
                    <Route path="/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
                    <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
                    <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
                    <Route path="/policies" element={<ProtectedRoute><Policies /></ProtectedRoute>} />
                    <Route path="/dailyreport" element={<ProtectedRoute><DailyReport /></ProtectedRoute>} />
                    <Route path="/content-manager" element={<ProtectedRoute><ContentManager /></ProtectedRoute>} />
                    <Route path="/manage-notification" element={<ProtectedRoute><ManageNotification/></ProtectedRoute>} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </div>
    );
};

export default SiteRoutes;
