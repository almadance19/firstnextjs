// pages/index.js

import React from 'react';
import ProductList from '@/components/Productlist';



const products = [
    {
      id: 1,
      name: 'Fullpass',
      price: 19.99,
      image: 'https://via.placeholder.com/150',
      URL: 'https://buy.stripe.com/9AQ02h0seavj7lefZ0',
    },
    {
      id: 2,
      name: 'Marathon Pass',
      price: 29.99,
      image: 'https://via.placeholder.com/150',
      URL: 'https://buy.stripe.com/9AQ8yNdf0fPD4928wz',
    },
    {
      id: 3,
      name: 'Partypass',
      price: 39.99,
      image: 'https://via.placeholder.com/150',
      URL: 'https://book.stripe.com/bIY8yNb6S6f3eNG3cd',
    },
    {
      id: 4,
      name: 'Sample Product 4',
      price: 49.99,
      image: 'https://via.placeholder.com/150',
      URL: 'https://book.stripe.com/bIY8yNb6S6f3eNG3cd',
    },
    // Add more products as needed
  ];
  
console.log("products", products);

const ProductPage= () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <ProductList products={products} />
    </div>
  );
};

export default ProductPage;