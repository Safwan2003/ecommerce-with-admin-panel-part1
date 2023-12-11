import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductManagement from './ProductManagement';
import CreateProduct from './CreateProduct';
import { useCookies } from 'react-cookie';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['token']);
  const [adminname, setadminname] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/admindashboard");
      } else {
        try {
          const response = await axios.post(
            "http://localhost:4000/api/admin",
            {},
            { withCredentials: true }
          );
          const { status, admin } = response.data;
          console.log('Admin API Response:', response.data); // Log the API response

          if (status) {
            setadminname(admin);
            alert(`Hello ${admin}`);
          } else {
            removeCookie("token");
            navigate("/admindashboard");
          }
        } catch (error) {
          removeCookie("token");
          navigate("/admindashboard");
        }
      }
    };
    verifyCookie();
  }, [cookies.token, navigate, removeCookie]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/product');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addProduct = async (productData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/product', productData);
      setProducts([...products, response.data]);
      // Optionally show success message or perform any UI updates
    } catch (error) {
      console.error('Error adding product:', error.message);
      // Handle error scenario
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:4000/api/product/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
      // Optionally show success message or perform any UI updates
    } catch (error) {
      console.error('Error deleting product:', error.message);
      // Handle error scenario
    }
  };

  const updateProduct = async (productId, updatedData) => {
    try {
      await axios.put(`http://localhost:4000/api/product/${productId}`, updatedData);
      const updatedProducts = products.map((product) =>
        product._id === productId ? { ...product, ...updatedData } : product
      );
      setProducts(updatedProducts);
      // Optionally show success message or perform any UI updates
    } catch (error) {
      console.error('Error updating product:', error.message);
      // Handle error scenario
    }
  };

  const logout = () => {
    removeCookie("token");
    navigate("/adminsignin");
  };

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl mb-4">Admin Dashboard</h1>
      <h4>
        Welcome <span>{adminname}</span>
      </h4>
      <div className="bg-white rounded shadow p-4 mb-6">
        <CreateProduct addProduct={addProduct} admin={adminname} />
        <ProductManagement
          products={products}
          deleteProduct={deleteProduct}
          updateProduct={updateProduct}
        />
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
