import { Routes, Route } from "react-router-dom";
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
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/loanusers" element={<ProtectedRoute><LoanUsers /></ProtectedRoute>} />
            <Route path="/userinfo/:id" element={<ProtectedRoute><UserInfo /></ProtectedRoute>} />
            <Route path="/sidebar" element={<ProtectedRoute><SideBar /></ProtectedRoute>}/>
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
    );
}

export default SiteRoutes
