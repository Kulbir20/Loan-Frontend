import axios from "axios";
import { useEffect, useState } from "react";
import { Card,} from "react-bootstrap";
import { useParams } from "react-router";

const ViewDetails = () => {
    const { userId } = useParams();
    const [userdetails, setUserDetails] = useState(null);

    const fetchDetails = async () => {
        try {
          const resp = await axios.get(`http://localhost:5000/api/admin/view-loan/${userId}`);
          console.log(resp.data);  
          if (resp.status === 200) {
            console.log("Requests data:", resp.data.loanApplications);
            setUserDetails(resp.data.loanApplications);
          } else {
            console.log("User Details not Found");
          }
        } catch (err) {
          console.log("Network error", err);
        }
      };
      

    useEffect(() => {
        if (userId) {
            fetchDetails();
        }
    }, [userId]);

    if (!userdetails) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container bg-[#FFF6F7] mt-4 h-full">
            <Card className="shadow-lg w-full min-h-screen">
                <Card.Body>
                    <Card.Title className="fs-6">
                        <h1>Applicant Details</h1>
                    </Card.Title>
                    <Card.Text className="fs-6 text-left">
                        <strong>Full Name: </strong>{userdetails.userId?.fullName || "N/A"}<br />
                        <strong>Email: </strong>{userdetails.userId?.email || "N/A"}<br />
                        <strong>Phone Number: </strong>{userdetails.userId?.phoneNumber || "N/A"}<br />
                        <strong>PAN Card: </strong>{userdetails.userId?.panNumber || "N/A"}<br />
                        <strong>Adhaar Card: </strong>{userdetails.userId?.aadharNumber || "N/A"}<br />
                        <strong>Bank Account No: </strong>{userdetails.userId?.bankDetails?.accountNumber || "N/A"}<br />
                        <strong>IFSC Code: </strong>{userdetails.userId?.bankDetails?.ifscCode || "N/A"}<br />
                        <strong>Account Holder Name: </strong>{userdetails.userId?.bankDetails?.accountHolderName || "N/A"}<br />
                    </Card.Text>
                    <Card.Title className="fs-5">
                        <h1>Submited Documents</h1>
                    </Card.Title>

                    <Card.Text className="fs-5 text-left">
                        <strong>Pan Card: </strong>{userdetails.PanCard || "N/A"}<br />
                        <strong>Salary Slip: </strong>{userdetails.SalarySlip || "N/A"}<br />
                        <strong>Bank PassBook: </strong>{userdetails.BankPassbook || "N/A"}<br />
                    </Card.Text>

                </Card.Body>
            </Card>
        </div>
    );
};

export default ViewDetails;
