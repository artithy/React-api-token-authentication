import React, { useState } from "react";
import axios from "axios";


export default function Category() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("please login first");
            return;
        }

        if (!name) {
            alert("please enter a category name");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/category", {
                token,
                name,
                description,
            });

            console.log(response.data);
            alert(response.data.message);

            if (response.data.success) {
                setName("");
                setDescription("");
            }
        } catch (error) {
            console.error(error);
            alert("category creation failed. please try again");
        }
    }

    return (
        <>
            <h1>Create Category</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />


                <textarea
                    placeholder="Category Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}

                ></textarea>

                <br />

                <button type="submit">Add Category</button>
            </form>
        </>
    );
}