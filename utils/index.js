// pages/index.js

import React from 'react';
import ProductList from '../components/ProductList';

const products = [
  {
    id: 1,
    name: 'Sample Product 1',
    price: 19.99,
    image: 'https://via.placeholder.com/150', // Replace with actual image URLs
  },
  {
    id: 2,
    name: 'Sample Product 2',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Sample Product 3',
    price: 39.99,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Sample Product 4',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
  },
  // Add more products as needed
];

const HomePage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <ProductList products={products} />
    </div>
  );
};

export default HomePage;
