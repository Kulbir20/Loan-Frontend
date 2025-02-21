import axios from "axios";
import { useEffect, useState } from "react";
import { Card,} from "react-bootstrap";
import { useParams } from "react-router";

const ViewDetails = () => {
    const { UserId } = useParams();
    const [userdetails, setUserDetails] = useState(null);

    const fetchDetails = async () => {
        try {
            const resp = await axios.get(`http://localhost:9000/api/user/userdetails/${UserId}`);
            if (resp.status === 200) {
                console.log(resp.data.details);
                setUserDetails(resp.data.details);
            } else {
                console.log("User Details not Found");
            }
        } catch (err) {
            console.log("Network error", err);
        }
    };

    useEffect(() => {
        if (UserId) {
            fetchDetails();
        }
    }, [UserId]);

    if (!userdetails) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <Card className="shadow-lg w-full min-h-screen">
                <Card.Body>
                    <Card.Title className="fs-5">
                        <h1>Applicant Details</h1>
                    </Card.Title>
                    <Card.Text className="fs-5 text-left">
                        <strong>First Name: </strong>{userdetails.UserId?.FirstName || "N/A"}<br />
                        <strong>Last Name: </strong>{userdetails.UserId?.LastName || "N/A"}<br />
                        <strong>Email: </strong>{userdetails.UserId?.Email || "N/A"}<br />
                        <strong>Phone Number: </strong>{userdetails.UserId?.ContactNumber || "N/A"}<br />
                        <strong>PAN Card: </strong>{userdetails.UserId?.PanCard || "N/A"}<br />
                        <strong>Adhaar Card: </strong>{userdetails.UserId?.AdhaarCard || "N/A"}<br />
                        <strong>Bank Account No: </strong>{userdetails.BankAccNo || "N/A"}<br />
                        <strong>IFSC Code: </strong>{userdetails.IfscCode || "N/A"}<br />
                        <strong>Account Holder Name: </strong>{userdetails.AccountHolderName || "N/A"}<br />
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
