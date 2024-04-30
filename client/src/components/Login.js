import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      localStorage.setItem('token', response.data.token); // Save token to local storage
      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <div className="container">
            <header>
                <div className="app-name">DMES</div>
            </header>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
      <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
    </div>
  );
}

export default Login;
