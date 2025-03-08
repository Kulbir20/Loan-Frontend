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
    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState("All");

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
            const updatedNotifications = prevNotifications.map((notif, i) => 
                i === index ? { ...notif, status: "Sent" } : notif
            );
            return updatedNotifications;
        });
        setFilter("Sent");
    };

    const filteredNotifications = notifications.filter(notification => {
        if (filter === "All") return true;
        return notification.status === filter;
    });

    return (
        <div className="flex flex-col lg:flex-row items-start justify-center h-full bg-[#FFF6F7] p-4 lg:p-6 space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="w-full lg:w-72 p-4 bg-white shadow-lg rounded-xl border border-gray-300">
                <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Schedule Notification</h2>
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
            </div>
            <div className="flex-1 p-2 bg-white shadow-lg rounded-xl border border-gray-300 overflow-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 text-center flex-1 ml-24">{filter} Notifications</h2>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)} className="p-2 border border-black rounded-lg mt-2 sm:mt-0">
                        <option value="All">All</option>
                        <option value="Scheduled">Scheduled</option>
                        <option value="Sent">Sent</option>
                    </select>
                </div>
                {filteredNotifications.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden text-sm md:text-base">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="p-2 border border-gray-300">User</th>
                                    <th className="p-2 border border-gray-300">Title</th>
                                    <th className="p-2 border border-gray-300">Message</th>
                                    <th className="p-2 border border-gray-300">Type</th>
                                    <th className="p-2 border border-gray-300">Repeat</th>
                                    <th className="p-2 border border-gray-300">Scheduled Time</th>
                                    <th className="p-2 border border-gray-300">Status</th>
                                    {filter !== "Sent" && <th className="p-2 border border-gray-300">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredNotifications.map((notification, index) => (
                                    <tr key={index} className="text-center border-t border-gray-300">
                                        <td className="p-2 border border-gray-300">{notification.user}</td>
                                        <td className="p-2 border border-gray-300">{notification.title}</td>
                                        <td className="p-2 border border-gray-300">{notification.message}</td>
                                        <td className="p-2 border border-gray-300">{notification.type}</td>
                                        <td className="p-2 border border-gray-300">{notification.repeat}</td>
                                        <td className="p-2 border border-gray-300">{notification.scheduleTime}</td>
                                        <td className="p-2 border border-gray-300">{notification.status}</td>
                                        {notification.status !== "Sent" && (
                                            <td className="p-2 border border-gray-300">
                                                <button onClick={() => sendNotification(index)} className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700">
                                                    Send Now
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : <p className="text-center">No notifications found.</p>}
            </div>
        </div>
    );
};

export default ManageNotification;
