import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import Cart from './pages/Cart';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // State to manage cart items

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      fetch('/products.json')
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          localStorage.setItem('products', JSON.stringify(data));
        })
        .catch((error) => console.error('Error fetching products:', error));
    }

    // Load previous orders from local storage on app load
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    if (storedOrders.length > 0) {
      console.log("Previous Orders:", storedOrders);
    }
  }, []);

  // Function to add product to cart
  const addToCart = (product, quantity) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      // If item already in cart, update the quantity
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      // If item not in cart, add it
      setCart((prevCart) => [...prevCart, { ...product, quantity }]);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage products={products} setCart={setCart} addToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetails products={products} addToCart={addToCart} />} />
        <Route path="/checkout" element={<Checkout products={products} setProducts={setProducts} cart={cart} setCart={setCart} />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
};

export default App;
