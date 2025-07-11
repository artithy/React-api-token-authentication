import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Registration() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === "" || password === "") {
            alert("Please fill all fields.");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) { // Corrected email validation
            alert("Please enter a valid email.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/registration", {
                email, password,
            });
            console.log(response.data);
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("Registration failed. Please try again.");
            }
        }
    };

    return (
        // Main container div for centering and background
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                // Form styling: background, padding, shadow, border-radius, max-width, margin-auto, flex for children
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col items-center space-y-4"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Register</h2>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    // Input field styling: full width, padding, border, border-radius, focus outline
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    // Input field styling
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    type="submit"
                    // Button styling: full width, background, text color, padding, border-radius, hover effect
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Register
                </button>

                <p className="mt-4 text-gray-600">
                    Already registered?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </form>


        </div>
    );
}