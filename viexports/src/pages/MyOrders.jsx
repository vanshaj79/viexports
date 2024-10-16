import React from 'react';

const MyOrders = () => {
  const orders = JSON.parse(localStorage.getItem('orders')) || []; // Get orders from local storage

  return (
    <div>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <strong>Product:</strong> {order.productName} <br />
              <strong>Size:</strong> {order.size} <br />
              <strong>Quantity:</strong> {order.quantity} <br />
              <strong>Price:</strong> ${order.price} <br />
              <strong>Date:</strong> {order.date} <br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
