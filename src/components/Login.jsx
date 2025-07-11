import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email === "" || !password === "") {
            alert("please fill all fields");
            return;
        }

        if (!email.includes("@") && !email.includes(".")) {
            alert("please enter a valid email");
            return;
        }

        if (password.length < 6) {
            alert("password must be at least 6 characters long");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login", {
                email, password,
            });

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                alert("Login successful");
                navigate("/dashboard");
            } else {
                alert(response.data.message);
            }
            console.log(response.data);


        } catch (error) {
            console.error(error);
            if (error.reponse && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("login failed. please try again.")
            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />


                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    );
}
