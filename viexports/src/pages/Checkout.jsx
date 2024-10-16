import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = ({ products, setProducts, cart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  const [selectedSize, setSelectedSize] = useState('');
  const [quantityToOrder, setQuantityToOrder] = useState(1);

  const handleConfirmOrder = () => {
    if (selectedSize) {
      const orderDetails = {
        productId: product.id,
        productName: product.name,
        size: selectedSize,
        quantity: quantityToOrder,
        price: product.price,
        date: new Date().toLocaleString(),
      };
  
      // Retrieve existing orders from local storage
      const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
      existingOrders.push(orderDetails); // Add new order to existing orders
  
      // Save updated orders to local storage
      localStorage.setItem('orders', JSON.stringify(existingOrders));
  
      // Update product quantities as before
      const updatedProducts = products.map((prod) => {
        if (prod.id === product.id) {
          return {
            ...prod,
            sizes: prod.sizes.map((sizeObj) => {
              if (sizeObj.size === selectedSize) {
                return {
                  ...sizeObj,
                  quantity: sizeObj.quantity - quantityToOrder,
                };
              }
              return sizeObj;
            }),
          };
        }
        return prod;
      });
  
      // Save updated products back to local storage and state
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts); // Update local state
  
      alert(`Order placed successfully! ${quantityToOrder} x ${product.name} (Size: ${selectedSize})`);
      navigate('/'); // Redirect to main page
    } else {
      alert('Please select a size before confirming the order.');
    }
  };

  if (!product) {
    return <h2>No product selected for checkout.</h2>;
  }

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Product: {product.name}</h2>
      <p>Price: ${product.price}</p>

      <h4>Select Size</h4>
      <select onChange={(e) => setSelectedSize(e.target.value)} value={selectedSize}>
        <option value="">Select a size</option>
        {product.sizes.map((sizeObj, idx) => (
          <option key={idx} value={sizeObj.size}>
            {sizeObj.size} (Available: {sizeObj.quantity})
          </option>
        ))}
      </select>

      <h4>Quantity</h4>
      <input
        type="number"
        min="1"
        max={product.sizes.find(sizeObj => sizeObj.size === selectedSize)?.quantity || 0}
        value={quantityToOrder}
        onChange={(e) => {
          const newQuantity = Math.max(1, Math.min(e.target.value, product.sizes.find(sizeObj => sizeObj.size === selectedSize)?.quantity));
          setQuantityToOrder(newQuantity);
        }}
      />

      <button onClick={handleConfirmOrder}>Confirm Order</button>
    </div>
  );
};

export default Checkout;
