import React, { useState } from 'react';

const Product = ({ product, deleteProduct, updateProduct }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleUpdate = () => {
    updateProduct(product._id, editedProduct);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditedProduct({ ...product });
    setIsEditing(false);
  };

  return (
    <tr>
      <td>{isEditing ? <input type="text" name="productname" value={editedProduct.productname} onChange={handleInputChange} /> : product.productname}</td>
      <td>{isEditing ? <input type="number" name="price" value={editedProduct.price} onChange={handleInputChange} /> : product.price}</td>
      <td>
        {isEditing ? (
          <>
            <button onClick={handleUpdate}>Save</button>
            <button onClick={cancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => deleteProduct(product._id)}>Delete</button>
          </>
        )}
      </td>
    </tr>
  );
};

export default Product;
