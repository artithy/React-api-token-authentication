import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    async function fetchUserData() {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/profile", {
                params: { token: token },
            });
            setEmail(response.data.user.email);
        } catch (error) {
            alert("Failed to fetch user data. Please try again.");
            localStorage.removeItem("token");
            navigate("/login");
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || token.length < 64) {
            alert("Please login first");
            navigate("/login");
            return;
        }


        fetchUserData();
    }, [navigate]);



    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.post("http://127.0.0.1:8000/api/logout", { token: token });
            localStorage.removeItem("token");
            alert("Logged out successfully");
            navigate("/login");
        } catch (error) {
            alert("Logout failed, please try again.");
        }
    };

    return (
        <>
            <h2>Welcome to Dashboard</h2>
            <p>You are logged in as {email || "Loading..."}</p>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}
