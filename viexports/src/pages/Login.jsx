import React from 'react';

const Login = () => {
  const handleLogin = () => {
    // Mock authentication logic
    alert('Logged in successfully!');
    // Redirect back to the previous page or main page
    window.location.href = '/'; // This will refresh the page, you can use navigate from react-router
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
