import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Correctly use `useNavigate` here

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      // Store JWT in session storage
      sessionStorage.setItem('token', response.data.token);
      
      console.log('Login successful');
      alert('Login Successful');
      
      // Redirect to homepage
      navigate('/');
    } catch (error) {
      alert('Login failed! Please enter correct details.');
      console.error('Login failed:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <p>Access your account here.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter the Email'
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter the Passsword'
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
  