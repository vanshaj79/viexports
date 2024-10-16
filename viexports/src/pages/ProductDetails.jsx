import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const product = products.find((product) => product.id === parseInt(id));
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Mock authentication state
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const navigate = useNavigate();

  const handleAddToCart = () => {
    setCartItems((prevItems) => [...prevItems, product]);
    alert(`${product.name} has been added to your cart!`);
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      // Prompt user to log in or sign up
      alert('Please log in or sign up to proceed with your purchase.');
      navigate('/login'); // Redirect to a login page
    } else {
      // Proceed to checkout
      navigate('/checkout', { state: { product } }); // Pass the product to checkout
    }
  };

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '300px', height: '300px' }}
      />
      <p><strong>Description:</strong> {product.description}</p>
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
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
};

export default ProductDetails;
