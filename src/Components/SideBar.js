import { useState } from "react";
import { HandCoins, Home, Landmark, Users } from "lucide-react";
import LoanUsers from "./LoanUsers"; 
import Offers from "./Offers";
import LoanRequest from "./LoanRequest";

const SideBar = () => {
  const [activeScreen, setActiveScreen] = useState("home"); 
  const [collapsed, setCollapsed] = useState(true); 

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`min-h-screen bg-gradient-to-b from-[#2e425b] to-[#182c45] text-white p-4 flex flex-col transition-all duration-300 ${
          collapsed ? `w-16{<Users/>}` : "w-64"
        }`}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
      >
        <h1 className={`text-xl font-bold mb-6 ${collapsed ? "hidden" : "block"}`}>
          Admin Panel
        </h1>

        <nav className="flex flex-col gap-2">
          <NavItem
            icon={<Home />}
            text="Home"
            onClick={() => setActiveScreen("home")}
            isActive={activeScreen === "home"}
            collapsed={collapsed}
          />
          <NavItem
            icon={<Users />}
            text="List of Users"
            onClick={() => setActiveScreen("users")}
            isActive={activeScreen === "users"}
            collapsed={collapsed}
          />
          <NavItem
            icon={<HandCoins />}
            text="Loan Offers"
            onClick={() => setActiveScreen("offers")}
            isActive={activeScreen === "offers"}
            collapsed={collapsed}
          />
          <NavItem
            icon={<Landmark />}
            text="Loan Requests"
            onClick={() => setActiveScreen("requests")}
            isActive={activeScreen === "requests"}
            collapsed={collapsed}
          />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ">
        {activeScreen === "home" && <h2 className="text-2xl font-bold">Welcome Admin</h2>}
        {activeScreen === "users" && <LoanUsers />}
        {activeScreen === "offers" && <Offers />}
        {activeScreen === "requests" && <LoanRequest />}
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, onClick, isActive, collapsed }) => (
  <div
    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
      isActive ? "bg-gray-700" : "hover:bg-gray-800"
    }`}
    onClick={onClick}
  >
    {icon}
    {!collapsed && <span>{text}</span>}
  </div>
);

export default SideBar;
