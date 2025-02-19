import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoanUsers from "./LoanUsers";
import UserInfo from "./UserInfo";
import Login from "./Login";

const SiteRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/loanusers" element={<LoanUsers />} />
            <Route path="/userinfo/:id" element={<UserInfo />} />
        </Routes>
    );
}

export default SiteRoutes
