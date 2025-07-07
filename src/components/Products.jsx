import axios from "axios";
import { useEffect, useState } from "react";


export default function Products() {

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/products");
            setProducts(response.data.products);

        }
        catch (error) {
            console.error("failed", error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <>

            <table>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Discount Price</th>
                        <th>VAT Percentage</th>
                        <th>Selling price</th>
                        <th>Stock Quantity</th>
                        <th>Status</th>
                        <th>Created At</th>

                    </tr>
                </thead>
                <tbody>

                    {products.map((product) => {
                        const sellingPrice = (parseFloat(product.discount_price) * parseFloat(product.vat_percentage) / 100) + parseFloat(product.discount_price);
                        return (
                            <tr >
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.category_name}</td>
                                <td>${product.price}</td>
                                <td>${product.discount_price}</td>
                                <td>{product.vat_percentage}%</td>
                                <td>${sellingPrice}</td>
                                <td>{product.stock_quantity}</td>
                                <td>{product.status}</td>
                                <td>{product.created_at}</td>

                            </tr>
                        )
                    })}



                </tbody>
            </table>
        </>
    );
}