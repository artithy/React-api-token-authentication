import React, { useState } from "react";
import axios from "axios";

export default function Product() {

    const [name, setName] = useState("");
    const [sku, setSku] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [price, setPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [vatPercentage, setVatPercentage] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");
    const [status, setStatus] = useState("active");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !sku || !categoryId || !price) {
            alert("please fill all fields");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token || token.length < 64) {
            alert("please login first");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/product", {
                token,
                name,
                sku,
                categoryId,
                price,
                discountPrice,
                vatPercentage,
                stockQuantity,
                status,

            });
            console.log(response.data);
            alert(response.data.message);

            if (response.data.success) {
                setName("");
                setSku("");
                setCategoryId("");
                setPrice("");
                setDiscountPrice("");
                setVatPercentage("");
                setStockQuantity("");
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert("product creation failed. please try again.");
            }
        }
    }


    return (
        <>
            <h2>Add Product</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <br />

                <input
                    type="text"
                    placeholder="SKU"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)} />
                <br />

                <input
                    type="number"
                    placeholder="Category ID"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)} />
                <br />

                <input
                    type="number"
                    placeholder="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
                <br />

                <input
                    type="number"
                    placeholder="Discount price"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)} />
                <br />

                <input
                    type="number"
                    placeholder="Vat Percentage"
                    value={vatPercentage}
                    onChange={(e) => setVatPercentage(e.target.value)} />
                <br />

                <input
                    type="number"
                    placeholder="Stock Quantity"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)} />
                <br />

                <select value={status} onChange={(e) => setStatus(e.target.value)} >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select><br />

                <button type="Submit">Add Product</button>
            </form>
        </>
    );
}