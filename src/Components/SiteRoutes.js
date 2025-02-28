import { Routes, Route, useLocation, Navigate } from "react-router-dom";
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

const SiteRoutes = () => {
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem('token');  // Check if the user is authenticated

    return (
        <>
            {/* If the user is not authenticated, render the Login route */}
            {!isAuthenticated ? (
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            ) : (
                // If the user is authenticated, render Sidebar and protected routes
                <div className="flex">
                    {/* Sidebar always visible if user is authenticated */}
                    <SideBar />

                    <div className="flex-1">
                        <Routes location={location}>
                            {/* Protected Routes */}
                            <Route path="/home" element={<ProtectedRoute><h2>Welcome Admin</h2></ProtectedRoute>} />
                            <Route path="/loanusers" element={<ProtectedRoute><LoanUsers /></ProtectedRoute>} />
                            <Route path="/userinfo/:id" element={<ProtectedRoute><UserInfo /></ProtectedRoute>} />
                            <Route path="/loanoffers" element={<ProtectedRoute><LoanOffers /></ProtectedRoute>} />
                            <Route path="/offers" element={<ProtectedRoute><Offers /></ProtectedRoute>} />
                            <Route path="/loanrequest" element={<ProtectedRoute><LoanRequest /></ProtectedRoute>} />
                            <Route path="/viewdetails/:UserId" element={<ViewDetails />} />
                            <Route path="/helpcenter" element={<ProtectedRoute><HelpCenter /></ProtectedRoute>} />
                            <Route path="/terms" element={<ProtectedRoute><Terms /></ProtectedRoute>} />
                            <Route path="/faq" element={<ProtectedRoute><FAQ /></ProtectedRoute>} />
                            <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
                            <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
                            <Route path="/policies" element={<ProtectedRoute><Policies /></ProtectedRoute>} />
                        </Routes>
                    </div>
                </div>
            )}
        </>
    );
};

export default SiteRoutes;
