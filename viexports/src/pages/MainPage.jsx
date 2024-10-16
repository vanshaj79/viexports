import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MainPage = ({products,setCart}) => {
    const handleAddToCart = (product) => {
        setCart((prevCart) => {
          const existingProduct = prevCart.find((item) => item.id === product.id);
          if (existingProduct) {
            // If product already in cart, update quantity
            return prevCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          // Add new product to cart
          return [...prevCart, { ...product, quantity: 1 }];
        });
        alert(`${product.name} added to cart!`);
      };
  return (
    <div>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
        <h1>Available Products</h1>
        <Link to="/cart" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1.5rem' }}>
        Go To Cart
        </Link>
        <Link to="/my-orders" style={{ textDecoration: 'none', color: '#007bff', fontSize: '1.5rem' }}>
          My Orders
        </Link>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              margin: '10px',
              padding: '10px',
              width: '300px'
            }}
          >
            {/* Link to the product details page */}
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '200px' }}
              />
              <h2>{product.name}</h2>
            </Link>
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Rating:</strong> {product.rating} ★</p>
            <h4>Available Sizes</h4>
            <ul>
              {product.sizes.map((sizeObj, idx) => (
                <li key={idx}>
                  Size: {sizeObj.size}, Quantity: {sizeObj.quantity}
                </li>
              ))}
            </ul>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default MainPage;
