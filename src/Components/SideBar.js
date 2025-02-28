import { useState } from "react";
import { MdPolicy } from "react-icons/md";
import {
  CircleHelp,
  HandCoins,
  Home,
  Landmark,
  LogOut,
  Logs,
  MailQuestion,
  MessageCircleMore,
  ReceiptText,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`min-h-screen bg-gradient-to-b from-[#2e425b] to-[#182c45] text-white p-4 flex flex-col transition-all duration-300 ${
          collapsed ? `w-16{<Users/>}` : "w-66"
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
            onClick={() => navigate("/home")}
            collapsed={collapsed}
          />
          <NavItem
            icon={<Users />}
            text="List of Users"
            onClick={() => navigate("/loanusers")}
            collapsed={collapsed}
          />
          <NavItem
            icon={<HandCoins />}
            text="Loan Offers"
            onClick={() => navigate("/offers")}
            collapsed={collapsed}
          />
          <NavItem
            icon={<Landmark />}
            text="Loan Requests"
            onClick={() => navigate("/loanrequest")}
            collapsed={collapsed}
          />
          <NavItem
            icon={<CircleHelp />}
            text="Help Center"
            onClick={() => navigate("/helpcenter")}
            collapsed={collapsed}
          />
          <NavItem
            icon={<ReceiptText />}
            text="Terms & Conditions"
            onClick={() => navigate("/terms")}
            collapsed={collapsed}
          />
          <NavItem
            icon={<MailQuestion />}
            text="FAQ"
            onClick={() => navigate("/faq")}
            collapsed={collapsed}
          />
          <NavItem
            icon={<Logs />}
            text="Blogs"
            onClick={() => navigate("/blogs")}
            collapsed={collapsed}
          />
          <NavItem
            icon={<MessageCircleMore />}
            text="Feedback"
            onClick={() => navigate("/feedback")}
            collapsed={collapsed}
          />
          <NavItem
            icon={<MdPolicy />}
            text="Policies"
            onClick={() => navigate("/policies")}
            collapsed={collapsed}
          />
          <NavItem
            icon={<LogOut />}
            text="Logout"
            onClick={onLogout}
            collapsed={collapsed}
          />
        </nav>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, onClick, collapsed }) => (
  <div
    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-800`}
    onClick={onClick}
  >
    {icon}
    {!collapsed && <span>{text}</span>}
  </div>
);

export default SideBar;

