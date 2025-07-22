import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');   
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send email and password to the backend
      const response = await axiosInstance.post('/api/authenticate', { email, password });

      console.log('Response:', response);  // Log the full response for debugging

      // Check for 'token', 'userId', and 'role' in the response
      if (response.data && response.data.token && response.data.userId && response.data.role) {
        // Store the JWT token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);  // Store the userId in localStorage
        localStorage.setItem('role', response.data.role);  // Store the user role in localStorage
        console.log('Token stored:', response.data.token);
        console.log('User ID stored:', response.data.userId);
        console.log('User Role stored:', response.data.role);
      } else {
        console.error('Token, User ID, or Role not found in response:', response.data);
        alert('Login failed. Token, User ID, or Role not found.');
        return;
      }

      // Notify user of successful login and navigate to the books page
      alert('Login successful!');
      navigate('/books');  // Redirect to the books page after login
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container">
      <h1 className="title">LIBRARY MANAGEMENT SYSTEM</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <p>Don't have an account? <a href="/register">Register here</a></p>
      </form>
    </div>
  );
};

export default Login;