import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams(); // Access the product ID from URL params
  const [product, setProduct] = useState(null); // State to store the product details

  useEffect(() => {
    // Fetch the product details using the product ID
    axios.get(`http://localhost:4000/api/product/${id}`)
      .then(response => {
        setProduct(response.data); // Update product state with fetched data
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [id]); // Fetch data whenever the product ID changes

  // If product data is being fetched, display a loading message
  if (!product) {
    return <div>Loading...</div>;
  }

  // Function to handle checkout button click
  const handleCheckout = () => {
    alert('Successfully checked out!');
    // Perform any other checkout-related actions here
  };

  // Display product details once fetched
  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{product.productname || 'Product Name Unavailable'}</h2>
          <p className="text-gray-600 mb-4">{product.description || 'Description Unavailable'}</p>
          <p className="text-green-500 font-semibold mb-2">{product.price ? `$${product.price}` : 'Price Unavailable'}</p>
          <p className="text-blue-400 mb-4">{product.category || 'Category Unavailable'}</p>
          <img
            src={product.images || 'placeholder.jpg'}
            className="w-full rounded-lg"
            alt={product.productname || 'Product Image'}
          />
          <button onClick={handleCheckout} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
