import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserInfo = () => {
    const { id } = useParams();  
    const [user, setUser] = useState(null);

    const fetchUserData = async () => {
        try {
            const resp = await axios.get(`http://localhost:9000/api/user/userinfo/${id}`);
            if (resp.status === 200) {
                setUser(resp.data.result);
            } else {
                setUser(null);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [id]);

    if (!user) {
        return (
            <div className="container text-center mt-5">
                <h2 className="text-light">Loading user data...</h2>
            </div>
        );
    }

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <Card className="user-info-card shadow-lg user-card" >
                <Card.Body>
                    <Card.Title className="fw-bold fs-5 ">
                        {user.FirstName} {user.LastName}
                    </Card.Title>
                    <Card.Text className="fs-6">
                        <strong>Email: </strong>{user.Email}<br />
                        <strong>Phone: </strong>{user.ContactNumber}<br />
                        <strong>PAN Card: </strong>{user.PanCard}<br />
                        <strong>Adhaar Card: </strong>{user.AdhaarCard}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default UserInfo;
