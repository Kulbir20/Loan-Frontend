import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate=useNavigate();

    const onlogin = async () => {
        try {
            var loginData = { email, pass }
            const resp = await axios.post("http://localhost:9000/api/user/login", loginData)
            if (resp.status === 200) {
                // if(resp.data.role==='admin')
                console.log(resp)
                console.log("Login Succesfully")
                navigate('/loanusers')
            }
            else {
                console.log("some error Occured")
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
            <div className="container1">
                <div className="loginform">
                    <div className="logo"><h3>A</h3></div>
                    <h4>Admin Login</h4>
                    <div className="email">
                        <p>Enter Email</p>
                        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
                        </div>
                    <div className="pass">
                        <p>Enter Password</p>
                        <input type="password" name="pass" value={pass} onChange={(e) => setPass(e.target.value)} required /><br /></div>
                    <div className="forgot">
                        <Link to="/forgotpass">Forgot Password?</Link>
                    </div>
                    <button onClick={onlogin}>Login</button></div></div>
        </>
    )
}
export default Login