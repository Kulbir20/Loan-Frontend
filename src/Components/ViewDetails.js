import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify";

const ViewDetails = () => {
    const { userId } = useParams();
    const [userdetails, setUserDetails] = useState(null);
    const [chooseStatus] = useState(["Active", "Pending", "Closed"]); 
    const [selectedStatus, setSelectedStatus] = useState("");
    const [loading, setLoading] = useState(true);
    
    const fetchDetails = async () => {
        try {
            setLoading(true)
            const resp = await axios.get(`http://localhost:5000/api/admin/view-loan/${userId}`);
            if (resp.status === 200) {
                console.log("Loan applications data:", resp.data.loanApplications);
                setUserDetails(resp.data.loanApplications);
                setSelectedStatus(resp.data.loanApplications.status); 
            } else {
                console.log("User Details not Found");
            }
        } catch (err) {
            console.log("Network error", err);
        }
        finally
        {
            setLoading(false)
        }
    };

    useEffect(() => {
        if (userId) {
            fetchDetails();
        }
    }, [userId]);

    const handleStatusChange = async () => {
        console.log("Selected Status:", selectedStatus);

        if (!selectedStatus) {
            toast.error("Please select a valid status.");
            return;
        }

        try {
            const resp = await axios.put(
                `http://localhost:5000/api/admin/update-loan-status/${userdetails._id}`,
                { status: selectedStatus }
            );

            if (resp.status === 200) {
                toast.success("Status updated successfully");
            } else {
                toast.error("Error updating status");
            }
        } catch (err) {
            
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message); 
            } else {
                toast.error("Error while updating status");
            }
        }
    };

    if (loading || !userdetails) {
        return(
        <div className="flex flex-row text-center justify-center relative top-60 gap-2">
          <div className="w-4 h-4 rounded-full bg-[#E21D27] animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-[#E21D27] animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-[#E21D27] animate-bounce [animation-delay:-.5s]"></div>
        </div>)
      }

    return (
        <div className="container bg-[#FFF6F7] mt-4 h-full">
            <Card className="shadow-lg w-full">
                <Card.Body>
                    <Card.Title className="fs-6">
                        <h1>Applicant Details</h1>
                    </Card.Title>
                    <Card.Text className="fs-6 text-left">
                        <strong>Full Name: </strong>{userdetails.userId?.fullName || "N/A"}<br />
                        <strong>Email: </strong>{userdetails.userId?.email || "N/A"}<br />
                        <strong>Phone Number: </strong>{userdetails.userId?.phoneNumber || "N/A"}<br />
                        <strong>PAN Card: </strong>{userdetails.userId?.panNumber || "N/A"}<br />
                        <strong>Aadhar Card: </strong>{userdetails.userId?.aadharNumber || "N/A"}<br />
                        <strong>Bank Account No: </strong>{userdetails.userId?.bankDetails?.accountNumber || "N/A"}<br />
                        <strong>IFSC Code: </strong>{userdetails.userId?.bankDetails?.ifscCode || "N/A"}<br />
                        <strong>Account Holder Name: </strong>{userdetails.userId?.bankDetails?.accountHolderName || "N/A"}<br />
                        <strong>Application Id: </strong>{userdetails.applicationId || "N/A"}<br />
                        <strong>Credit Score: </strong>{userdetails.creditScore || "N/A"}<br />
                        <strong>Interest Rate: </strong>{userdetails.interestRate || "N/A"}<br />
                        <strong>Total Amount: </strong>{userdetails.principalAmount || "N/A"}<br />
                    </Card.Text>

                    <Card.Title className="fs-5">
                        <h1>Submitted Documents</h1>
                    </Card.Title>

                    <Card.Text className="fs-5 text-left">
                        <strong>PAN Card: </strong>{userdetails.PanCard || "N/A"}<br />
                        <strong>Salary Slip: </strong>{userdetails.SalarySlip || "N/A"}<br />
                        <strong>Bank PassBook: </strong>{userdetails.BankPassbook || "N/A"}<br />
                    </Card.Text><br/>

                    <Card.Text className="fs-5 mb-4 text-left w-full">
                        <h4 className="mb-3">Update Loan Status:</h4>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="border bg-[#242224] text-white border-black h-10 rounded-lg px-3 cursor-pointer w-full text-base"
                        >
                            <option value="">Choose Status</option>
                            {chooseStatus.map((status, index) => (
                                <option key={index} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </Card.Text>

                    <Card.Text>
                        <button
                            onClick={handleStatusChange}
                            className="bg-[#242224] text-white px-4 py-2 rounded-lg "
                            disabled={!selectedStatus}  
                        >
                            Update Status
                        </button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ViewDetails;
