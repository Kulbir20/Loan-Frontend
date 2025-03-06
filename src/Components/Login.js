import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onLogin = async () => {
        try {
            const loginData = {  email, password }; 
            const resp = await axios.post("http://localhost:5000/api/admin/adminlogin", loginData);

            if (resp.status === 200 && resp.data.token && resp.data.admin) {
                const { token, admin } = resp.data;

                if (admin.role === "admin") {
                    console.log("Login Successfully");
                    localStorage.setItem("token", token); 
                    navigate('/home');
                } else {
                    setError("Access restricted to Admins only.");
                }
            } else {
                setError("Invalid response from server.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-b from-[#2e425b] to-[#182c45]">
            <div className="bg-white/20 bg-opacity-20 p-6 rounded-xl shadow-md flex flex-col gap-4 w-[22rem] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center border border-white/30">
                <div className="text-white bg-[#E21D27] rounded-full w-12 h-12 flex items-center justify-center text-2xl mx-auto">
                    A
                </div>
                <h4 className="text-white text-lg sm:text-xl font-semibold">Admin Login</h4>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <div className="text-left">
                    <p className="text-white">Enter Email</p>
                    <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="w-full p-3 sm:p-4 rounded-xl bg-white/20 text-white outline-none"
                    />
                </div>
                <div className="text-left">
                    <p className="text-white">Enter Password</p>
                    <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="w-full p-3 sm:p-4 rounded-xl bg-white/20 text-white outline-none"
                    />
                </div>
                <button 
                    onClick={onLogin} 
                    className="bg-[#242224] text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-[#E21D27] transition mt-3"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
