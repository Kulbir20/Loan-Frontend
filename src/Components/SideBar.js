import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdPolicy } from "react-icons/md";
import {
  ChartNoAxesCombined,
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

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(localStorage.getItem("activeMenu") || "Home");
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const currentNavItem = navItems.find((item) => item.path === location.pathname);
    if (currentNavItem) {
      setActiveMenu(currentNavItem.text);
      localStorage.setItem("activeMenu", currentNavItem.text); 
    }
  }, [location.pathname]); 

  const onLogout = () => {
    const confirm=window.confirm("Are You Sure To Logout")
    if(confirm)
    {
      localStorage.removeItem("token");
      localStorage.removeItem("activeMenu"); 
      navigate("/");
    }
  };

  const navItems = [
    { icon: <Home />, text: "Home", path: "/home" },
    { icon: <Users />, text: "List of Users", path: "/loanusers" },
    { icon: <HandCoins />, text: "Loan Offers", path: "/offers" },
    { icon: <Landmark />, text: "Loan Requests", path: "/loanrequest" },
    { icon: <ChartNoAxesCombined />, text: "Daily Report", path: "/dailyreport" },
    { icon: <CircleHelp />, text: "Help Center", path: "/helpcenter" },
    { icon: <ReceiptText />, text: "Terms & Conditions", path: "/terms" },
    { icon: <MailQuestion />, text: "FAQ", path: "/faq" },
    { icon: <Logs />, text: "Blogs", path: "/blogs" },
    { icon: <MessageCircleMore />, text: "Feedback", path: "/feedback" },
    { icon: <MdPolicy />, text: "Policies", path: "/policies" },
    { icon: <LogOut />, text: "Logout", onClick: onLogout },
  ];

  return (
    <div className="flex min-h-screen">
      <div
        className={`min-h-screen bg-[#FFF6F7] border border-black shadow-2xl text-[#E21D27] p-4 flex flex-col transition-all duration-1000 ${
          collapsed ? "w-16<Users/>" : "w-62"
        }`}
        onMouseEnter={() => setCollapsed(false)}
        onMouseLeave={() => setCollapsed(true)}
      >
        <h1 className={`text-xl font-bold mb-6 ${collapsed ? "hidden" : "block"}`}>
          Admin Panel
        </h1>

        <nav className="flex flex-col gap-2">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              icon={item.icon}
              text={item.text}
              onClick={() => {
                if (item.onClick) {
                  item.onClick();
                } else {
                  setActiveMenu(item.text);
                  localStorage.setItem("activeMenu", item.text); 
                  navigate(item.path);
                }
              }}
              collapsed={collapsed}
              isActive={activeMenu === item.text}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, onClick, collapsed, isActive }) => (
  <div
    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-200 
                ${isActive ? "bg-[#E21D27] text-white" : "hover:bg-[#E21D27] hover:text-white"}`}
    onClick={onClick}
  >
    {icon}
    {!collapsed && <span>{text}</span>}
  </div>
);

export default SideBar;
