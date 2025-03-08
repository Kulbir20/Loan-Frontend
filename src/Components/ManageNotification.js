import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ManageNotification = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [user, setUser] = useState("");
    const [type, setType] = useState("push");
    const [scheduleTime, setScheduleTime] = useState(new Date());
    const [repeat, setRepeat] = useState("one-time");
    const [notifications, setNotifications] = useState([
        {
            title: "Test Notification 1",
            message: "Message for test notification",
            user: "User1",
            type: "push",
            scheduleTime: new Date().toLocaleString(),
            repeat: "one-time",
            status: "Scheduled"
        },
        {
            title: "Test Notification 2",
            message: "Another test notification",
            user: "User2",
            type: "app",
            scheduleTime: new Date().toLocaleString(),
            repeat: "daily",
            status: "Scheduled"
        }
    ]);
    const [filter, setFilter] = useState("All");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = () => {
        const formattedDate = scheduleTime.toLocaleString();
        const newNotification = {
            title,
            message,
            user,
            type,
            scheduleTime: formattedDate,
            repeat,
            status: "Scheduled"
        };
        setNotifications([...notifications, newNotification]);
        setTitle("");
        setMessage("");
        setUser("");
        setType("push");
        setScheduleTime(new Date());
        setRepeat("one-time");
        setIsModalOpen(false);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) => {
                    const scheduledTime = new Date(notification.scheduleTime);
                    if (scheduledTime <= now && notification.status === "Scheduled") {
                        return { ...notification, status: "Sent" };
                    }
                    return notification;
                })
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const sendNotification = (index) => {
        setNotifications((prevNotifications) => {
            return prevNotifications.map((notif, i) =>
                i === index ? { ...notif, status: "Sent" } : notif
            );
        });
        setFilter("Sent");
    };

    const filteredNotifications = notifications.filter(notification => {
        if (filter === "All") return true;
        return notification.status === filter;
    });

    return (
        <div className="w-full h-full max-w-6xl bg-[#FFF6F7] mx-auto p-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h1 className="text-black text-2xl md:text-4xl font-bold mb-2 md:mb-0">{filter} Notifications</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#242224] text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
                >
                    Schedule Notification
                </button>
            </div>

            <div className="mb-4">
                <select 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)} 
                    className="w-full p-2 border border-black rounded-lg bg-[#242224] text-white"
                >
                    <option value="All">All</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Sent">Sent</option>
                </select>
            </div>

            <div className="w-full max-w-6xl overflow-x-auto">
                <table className="w-full border border-black shadow-lg rounded-lg text-xs md:text-sm">
                <thead className="bg-[#242224] text-white">
    <tr>
        <th className="p-2 border border-white">User</th>
        <th className="p-2 border border-white">Title</th>
        <th className="p-2 border border-white">Message</th>
        <th className="p-2 border border-white">Type</th>
        <th className="p-2 border border-white">Repeat</th>
        <th className="p-2 border border-white">Scheduled Time</th>
        <th className="p-2 border border-white">Status</th>
        {filter === "Scheduled" && <th className="p-2 border border-white">Actions</th>}
    </tr>
</thead>
<tbody>
{filteredNotifications.length === 0 ? (
    <tr>
        <td colSpan="8" className="text-center py-4">No Notifications Found</td>
    </tr>
) : (
    filteredNotifications.map((notification, index) => (
        <tr key={index} className="text-center border border-black">
            <td className="p-2 border border-black">{notification.user}</td>
            <td className="p-2 border border-black">{notification.title}</td>
            <td className="p-2 border border-black">{notification.message}</td>
            <td className="p-2 border border-black">{notification.type}</td>
            <td className="p-2 border border-black">{notification.repeat}</td>
            <td className="p-2 border border-black">{notification.scheduleTime}</td>
            <td className="p-2 border border-black">{notification.status}</td>
            {filter === "Scheduled" && (
                <td className="p-2 border border-black">
                    <button 
                        onClick={() => sendNotification(index)}
                        className="bg-[#242224] text-white px-2 py-1 rounded hover:scale-105 transition"
                    >
                        Send Now
                    </button>
                </td>
            )}
        </tr>
    ))
)}
</tbody>

                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-96">
                        <h2 className="text-xl font-bold text-center mb-4">Create Notification</h2>
                        <input
                            type="text"
                            placeholder="User"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            className="w-full p-2 border border-black rounded-lg mb-3"
                        />
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border border-black rounded-lg mb-3"
                        />
                        <textarea
                            placeholder="Message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full p-2 border border-black rounded-lg mb-3"
                        />
                        <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-2 border border-black rounded-lg mb-3">
                            <option value="app">In App Notification</option>
                            <option value="push">Push Notification</option>
                        </select>
                        <DatePicker
                            selected={scheduleTime}
                            onChange={(date) => setScheduleTime(date)}
                            showTimeSelect
                            dateFormat="Pp"
                            className="w-full p-2 border border-black rounded-lg mb-3"
                        />
                        <select value={repeat} onChange={(e) => setRepeat(e.target.value)} className="w-full p-2 border border-black rounded-lg mb-3">
                            <option value="one-time">One-time</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                        <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                            Schedule
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageNotification;
