import React, { useState } from "react";
import axios from "axios";

export default function Product() {

    const [name, setName] = useState("");
    const [sku, setSku] = useState("");
    const [category_id, setCategoryId] = useState("");
    const [price, setPrice] = useState("");
    const [discount_price, setDiscountPrice] = useState("");
    const [vat_percentage, setVatPercentage] = useState("");
    const [stock_quantity, setStockQuantity] = useState("");
    const [status, setStatus] = useState("active");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !sku || !category_id || !price) {
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
                category_id,
                price,
                discount_price,
                vat_percentage,
                stock_quantity,
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
                    value={category_id}
                    onChange={(e) => setCategoryId(Number(e.target.value))} />
                <br />

                <input
                    type="number"
                    placeholder="price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))} />
                <br />

                <input
                    type="number"
                    placeholder="Discount price"
                    value={discount_price}
                    onChange={(e) => setDiscountPrice(Number(e.target.value))} />
                <br />

                <input
                    type="number"
                    placeholder="Vat Percentage"
                    value={vat_percentage}
                    onChange={(e) => setVatPercentage(Number(e.target.value))} />
                <br />

                <input
                    type="number"
                    placeholder="Stock Quantity"
                    value={stock_quantity}
                    onChange={(e) => setStockQuantity(Number(e.target.value))} />
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