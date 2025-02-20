import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoanUsers from "./LoanUsers";
import UserInfo from "./UserInfo";
import Login from "./Login";
import SideBar from "./SideBar";
import LoanOffers from "./LoanOffers";
import Offers from "./Offers";
import LoanRequest from "./LoanRequest";

const SiteRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/loanusers" element={<LoanUsers />} />
            <Route path="/userinfo/:id" element={<UserInfo />} />
            <Route path="/sidebar" element={<SideBar />} />
            <Route path="/loanoffers" element={<LoanOffers/>} />
            <Route path="/offers" element={<Offers/>} />
            <Route path="/loanrequest" element={<LoanRequest/>} />
            
        </Routes>
    );
}

export default SiteRoutes
