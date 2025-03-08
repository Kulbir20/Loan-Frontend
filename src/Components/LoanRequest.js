import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LoanRequest = () => {
    const chooseStatus = ["All", "To Be Reviewed", "In Progress", "Approved", "Rejected"];
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [loandata, setLoanData] = useState([]);

    const fetchLoanUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const resp = await axios.get(`http://localhost:9000/api/user/loanusers`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (resp.status === 200) {
                console.log("Loan Applications Found");
                setLoanData(resp.data.data);
            } else {
                console.log("No Loan Application Found");
                setLoanData([]);
            }
        } catch (err) {
            console.error("Error fetching loan users:", err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchLoanUsers();
    }, []);

    const filteredLoans = selectedStatus === "All" 
        ? loandata 
        : loandata.filter((loan) => loan.status === selectedStatus);

    return (
        <div className=" mx-auto p-4 bg-[#FFF6F7] px-4 h-screen">
            <h1 className="text-center text-dark mb-6 text-2xl sm:text-4xl font-bold">
                Loan Requests
            </h1>

            <div className="grid gap-4 justify-center items-center mb-4">
                <label className="text-lg font-medium">Filter by Status:</label>
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="border border-black sm:w-44 h-10 rounded-lg px-3 cursor-pointer"
                >
                    {chooseStatus.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>

           
            <div className="overflow-x-auto w-full">
                <table className="w-full min-w-max border border-black bg-white rounded-lg table-auto">
                    <thead className="bg-[#242224] text-[#FFFFFF] text-center text-sm sm:text-base">
                        <tr>
                            <th className="px-3 py-2 border border-white">S.No</th>
                            <th className="px-3 py-2 border border-white">Full Name</th>
                            <th className="px-3 py-2 border border-white">Number</th>
                            <th className="px-3 py-2 border border-white">Email</th>
                            <th className="px-3 py-2 border border-white">Status</th>
                            <th className="px-3 py-2 border border-white">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center text-sm sm:text-base">
                        {filteredLoans.length > 0 ? (
                            filteredLoans.map((loan, index) => (
                                <tr key={loan.id} className="border-t">
                                    <td className="px-3 py-2 border border-black">{index + 1}</td>
                                    <td className="px-3 py-2 border border-black">{loan.UserId?.FullName || "N/A"}</td>
                                    <td className="px-3 py-2 border border-black">{loan.UserId?.ContactNumber || "N/A"}</td>
                                    <td className="px-3 py-2 border border-black">{loan.UserId?.Email || "N/A"}</td>
                                    <td className="px-3 py-2 border border-black">{loan.status || "N/A"}</td>
                                    <td className="px-3 py-2 border border-black">
                                        <Link to={`/viewdetails/${loan._id}`} className="text-blue-500 underline">
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-4">No Loan Requests Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LoanRequest;
