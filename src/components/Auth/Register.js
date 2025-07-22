import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosConfig';
import './Register.css'; 

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/users/register', {
        name,
        email,
        password,
        role
      });
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/login');  // Navigate to login page when Cancel is clicked
  };

  return (
    <div className="container">
      <h1 className="title">Register</h1>
      <form onSubmit={handleRegister} className="register-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div className="form-group">
          <label>Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="register-button">Register</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Register;