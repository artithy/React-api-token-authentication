import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Logout({ token, setToken, showMessage }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post("http://127.0.0.1:8001/api/logout", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setToken(null);
                if (showMessage) {
                    showMessage("Logged out successfully", 'success');
                }
                navigate("/login");
            })
            .catch((error) => {
                if (showMessage) {
                    showMessage(error.response?.data?.message || "Logout failed", 'error');
                }
                setToken(null);
                navigate("/login");
            });
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            >
                Logout
            </button>
        </div>
    );
}

export default Logout;
