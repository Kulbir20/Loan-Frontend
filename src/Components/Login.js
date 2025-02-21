import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const onlogin = async () => {
        try {
            var loginData = { email, pass };
            const resp = await axios.post("http://localhost:9000/api/user/login", loginData);
            if (resp.status === 200) {
                if(resp.data.result.Role==="admin")
                {
                    console.log("Login Successfully");
                    navigate('/sidebar');
                }
                else
                {
                    console.log("Restricted to Admin")
                }
                
            } else {
                console.log("Some error occurred");
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-b from-[#2e425b] to-[#182c45]">
            <div className="bg-white/20 bg-opacity-20 p-4 rounded-xl shadow-md flex flex-col gap-2 w-[22rem] text-center border border-white/30">
                <div className="text-white bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center text-2xl mx-auto">
                    A
                </div>
                <h4 className="text-white text-lg font-semibold">Admin Login</h4>
                <div className="text-left">
                    <p className="text-white">Enter Email</p>
                    <input 
                        type="email" 
                        name="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="w-full p-2 rounded-xl bg-white/20 text-white outline-none"
                    />
                </div>
                <div className="text-left">
                    <p className="text-white">Enter Password</p>
                    <input 
                        type="password" 
                        name="pass" 
                        value={pass} 
                        onChange={(e) => setPass(e.target.value)} 
                        required 
                        className="w-full p-2 rounded-md bg-white/20 text-white outline-none"
                    />
                </div>
                <div className="text-right text-sm mb-2">
                    <Link to="/forgotpass" className="text-white hover:underline hover:text-red-300">Forgot Password?</Link>
                </div>
                <button 
                    onClick={onlogin} 
                    className="bg-teal-500 text-white px-4 py-2 rounded-full text-lg font-bold hover:bg-teal-700 transition"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
