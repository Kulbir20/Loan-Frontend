import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onLogin = async () => {
        try {
            const loginData = { email, password }; 
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
        <div className="w-full h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-b from-[#2e425b] to-[#182c45]">
            {/* Left Section - Image */}
            <div className="flex items-center justify-center ">
                <img 
                    src="/images/mexmon.png" 
                    alt="Logo" 
                    className="max-w-[70%] md:max-w-[60%] lg:max-w-[70%] h-auto hover:scale-105"
                />
            </div>

            {/* Right Section - Login Form */}
            <div className="flex flex-col items-center justify-center p-8 ">
                <div className="bg-white/20 bg-opacity-20 p-6 rounded-xl shadow-md flex flex-col gap-4 w-96 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center border border-white/30">
                
                <div className=" text-white ml-36 bg-[#E21D27] text-center rounded-full w-12 h-12 flex items-center justify-center text-2xl">
                    A
                </div>
                <h4 className="text-white text-lg sm:text-xl font-semibold ">Admin Login</h4>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <div className="text-left w-full max-w-sm mt-1">
                    <label className="text-white">Enter Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email" 
                        required 
                        className="w-full p-3 rounded-xl mt-3 border border-black outline-none placeholder:text-black"
                    />
                </div>
                <div className="text-left w-full max-w-sm mt-1">
                    <label className="text-white">Enter Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        placeholder="Enter Your Password"
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="w-full p-3 rounded-xl mt-3 border border-black outline-none placeholder:text-black"
                    />
                </div>
                <button 
                    onClick={onLogin} 
                    className="bg-[#242224] text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-[#E21D27] transition mt-3 w-full max-w-sm"
                >
                    Login
                </button>
            </div></div>
        </div>
    );
};

export default Login;
