// Example React component to fetch and display products

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the backend
        axios.get('http://localhost:4000/api/product')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        <p>{product.productname}</p>
                        <p>Price: ${product.price}</p>
                        {/* Display other product details as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
