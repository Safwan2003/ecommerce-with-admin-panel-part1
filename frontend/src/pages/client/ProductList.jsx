import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedSort, setSelectedSort] = useState('default');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [selectedSearchAlgorithm, setSelectedSearchAlgorithm] = useState('default');

  useEffect(() => {
    axios.get('http://localhost:4000/api/product')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSearchAlgorithmChange = (e) => {
    setSelectedSearchAlgorithm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
    let sortedProducts = [...products];

    switch (e.target.value) {
      case 'bubbleSort':
        sortedProducts = bubbleSort([...products]);
        break;
      case 'selectionSort':
        sortedProducts = selectionSort([...products]);
        break;
      case 'heapSort':
        sortedProducts = heapSort([...products]);
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
  };

  const bubbleSort = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j].price > arr[j + 1].price) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  };

  const selectionSort = (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j].price < arr[minIndex].price) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
      }
    }
    return arr;
  };

  const heapSort = (arr) => {
    const buildMaxHeap = (arr) => {
      let n = arr.length;
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
      }
    };

    const heapify = (arr, n, i) => {
      let largest = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;

      if (left < n && arr[left].price > arr[largest].price) {
        largest = left;
      }

      if (right < n && arr[right].price > arr[largest].price) {
        largest = right;
      }

      if (largest !== i) {
        let temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        heapify(arr, n, largest);
      }
    };

    let n = arr.length;
    buildMaxHeap(arr);
    for (let i = n - 1; i > 0; i--) {
      let temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;
      heapify(arr, i, 0);
    }
    return arr;
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let result;

    switch (selectedSort) {
      case 'linearSearch':
        result = linearSearch(searchValue);
        break;
      case 'binarySearch':
        result = binarySearch(searchValue);
        break;
      default:
        break;
    }

    setSearchResult(result);
  };

  const linearSearch = (value) => {
    const foundProduct = products.find(product => product.productname.toLowerCase() === value.toLowerCase());
    return foundProduct ? foundProduct : 'Product not found';
  };

  const binarySearch = (value) => {
    let start = 0;
    let end = products.length - 1;
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      if (products[mid].productname.toLowerCase() === value.toLowerCase()) {
        return products[mid];
      } else if (products[mid].productname.toLowerCase() < value.toLowerCase()) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
    return 'Product not found';
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mt-4 mb-6">Product List</h2>
      <div className="mb-4 flex justify-between">
        <div>
          <label htmlFor="sortOptions" className="mr-2 font-semibold">Sort by:</label>
          <select
            id="sortOptions"
            value={selectedSort}
            onChange={handleSortChange}
            className="p-2 border rounded mr-4"
          >
            <option value="default">Select Sorting</option>
            <option value="bubbleSort">Bubble Sort</option>
            <option value="selectionSort">Selection Sort</option>
            <option value="heapSort">Heap Sort</option>
          </select>
        </div>
        <div>
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search product"
              className="p-2 border rounded mr-2"
            />
            <select
              value={selectedSearchAlgorithm}
              onChange={handleSearchAlgorithmChange}
              className="p-2 border rounded mr-2"
            >
            <option value="default">Select Search Algorithm</option>
            <option value="linearSearch">Linear Search</option>
            <option value="binarySearch">Binary Search</option>            </select>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">Search</button>
          </form>
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResult !== null && (
          <li className="bg-white shadow-md rounded-lg p-6">
            {searchResult === 'Product not found' ? (
              <p className="text-red-500">Product not found</p>
            ) : (
                <>
                <p className="text-lg font-bold">
                  {searchResult && searchResult.productname ? searchResult.productname : 'Product Name Unavailable'}
                </p>
                <p className="text-gray-600">
                  {searchResult && searchResult.description ? searchResult.description : 'Description Unavailable'}
                </p>
                <p className="text-green-500 font-semibold">
                  {searchResult && searchResult.price ? `$${searchResult.price}` : 'Price Unavailable'}
                </p>
                <p className="text-blue-400">
                  {searchResult && searchResult.category ? searchResult.category : 'Category Unavailable'}
                </p>
                <img
                  src={searchResult && searchResult.images ? searchResult.images : 'placeholder.jpg'}
                  className="mt-4"
                  alt={searchResult && searchResult.productname ? searchResult.productname : 'Product Image'}
                />
              </>
            )}
          </li>
        )}
        {searchResult === null && (
          products.map(product => (
            <li key={product._id} className="bg-white shadow-md rounded-lg p-6">
              {/* Display product details */}
              <Link to={`/product/${product._id}`} className="cursor-pointer">

              <p className="text-lg font-bold">
                {product.productname || 'Product Name Unavailable'}
              </p>
              <p className="text-gray-600">
                {product.description || 'Description Unavailable'}
              </p>
              <p className="text-green-500 font-semibold">
                {product.price ? `$${product.price}` : 'Price Unavailable'}
              </p>
              <p className="text-blue-400">
                {product.category || 'Category Unavailable'}
              </p>
              <img
                src={product.images || 'placeholder.jpg'}
                className="mt-4"
                alt={product.productname || 'Product Image'}
              />
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
          };
export default ProductList;
  