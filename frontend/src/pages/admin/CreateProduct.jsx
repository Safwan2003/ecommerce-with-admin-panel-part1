import React, { useState } from 'react';

// Sample class for OOP demonstration
class Product {
  constructor(productname, price, description, category, images) {
    this.productname = productname;
    this.price = price;
    this.description = description;
    this.category = category;
    this.images = images;
  }

  // Sample method for OOP demonstration
  getProductDetails() {
    return `${this.productname} - $${this.price}`;
  }
}

const CreateProduct = ({ addProduct, admin }) => {
  const [productData, setProductData] = useState({
    productname: '',
    price: 0,
    description: '',
    category: '',
    images: [], // For image upload functionality
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const uploadedImages = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = () => {
        uploadedImages.push(reader.result); // Adding the result to the end of the array
        if (uploadedImages.length === files.length) {
          setProductData({ ...productData, images: uploadedImages });
        }
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Append admin name to productData
    const productWithAdmin = { ...productData, admin: admin };

    // Use OOP concepts by creating an instance of the Product class
    const newProduct = new Product(
      productWithAdmin.productname,
      productWithAdmin.price,
      productWithAdmin.description,
      productWithAdmin.category,
      productWithAdmin.images
    );

   
    // Add the new product using the provided addProduct function
    addProduct(newProduct);

    setProductData({
      productname: '',
      price: 0,
      description: '',
      category: '',
      images: [],
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-semibold mb-4">Create Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="productname"
          value={productData.productname}
          onChange={handleInputChange}
          placeholder="Product Name"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full mb-3 p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          placeholder="Category"
          className="w-full mb-3 p-2 border rounded"
        />
        {/* Image upload functionality */}
        <input
          type="file"
          name="images"
          onChange={handleImageUpload}
          multiple
          accept="image/*"
          className="w-full mb-3 p-2 border rounded"
        />
        {/* Add a preview for uploaded images if needed */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
