import React from 'react';
import Product from './Product';

const ProductManagement = ({ products, deleteProduct, updateProduct }) => {
  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
    } catch (error) {
      console.error('Error deleting product:', error.message);
      // Handle error scenario
    }
  };

  const handleUpdate = async (productId, updatedData) => {
    try {
      await updateProduct(productId, updatedData);
    } catch (error) {
      console.error('Error updating product:', error.message);
      // Handle error scenario
    }
  };

  return (
    <div>
      <h2>Product Management</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              deleteProduct={handleDelete}
              updateProduct={handleUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
