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
            const resp = await axios.get(`http://localhost:9000/api/user/loanusers`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            if (resp.status === 200) {
                console.log("Loan Applications Found");
                console.log(resp.data.data);
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

    // Apply filtering only if a specific status is selected
    const filteredLoans = selectedStatus === "All" 
        ? loandata 
        : loandata.filter((loan) => loan.status === selectedStatus);

    return (
        <div className="container mt-4">
            <h1 className="text-center text-dark mb-8 text-4xl font-bold ml-10 -mt-2">
                Loan Requests
            </h1>

            <label className="mr-2">Filter by Status:</label>
            <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-black w-44 ml-1.5 h-8 rounded-lg px-3 mb-4"
            >
                {chooseStatus.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>

            <div className="table-responsive">
                <table className="table table-striped table-hover table-bordered custom-table">
                    <thead className="table-dark text-center">
                        <tr>
                            <th>Serial No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Number</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLoans.length > 0 ? (
                            filteredLoans.map((loan, index) => (
                                <tr key={loan.id} className="text-center">
                                    <td>{index + 1}</td>
                                    <td>{loan.UserId?.FirstName || "N/A"}</td>
                                    <td>{loan.UserId?.LastName || "N/A"}</td>
                                    <td>{loan.UserId?.ContactNumber || "N/A"}</td>
                                    <td>{loan.UserId?.Email || "N/A"}</td>
                                    <td>{selectedStatus || "N/A"}</td>
                                    <td>
                                        <Link to={`/viewdetails/${loan._id}`} className="text-blue-500 underline">
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No Loan Requests Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LoanRequest;
