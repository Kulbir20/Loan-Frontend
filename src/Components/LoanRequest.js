import { useState } from "react";
import { Link } from "react-router";

const LoanRequest = () => {
    const chooseStatus = ["To Be Reviewed", "In Progress", "Approved", "Rejected"];
    const [selectedStatus, setSelectedStatus] = useState(chooseStatus[0]);

    return (
        <>
            <div className="container mt-4">
                <h1 className="text-center text-dark mb-8 text-4xl font-bold ml-10 -mt-2">
                    Loan Requests
                </h1>
                Filter by Status: <select
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
                            <tr className="table-row">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>{selectedStatus}</td>
                                <td><Link to="/viewdetails">View Details</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default LoanRequest;
