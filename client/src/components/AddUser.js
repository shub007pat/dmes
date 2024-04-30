import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddUser() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const [roles, setRoles] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchRoles();
  }, []);
  
  const fetchRoles = async () => {
    try {
      const response = await axios.get('/api/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/register', formData);
      console.log('User registered:', response.data); // It's good to confirm the server's response
      navigate('/user-manager'); // Redirect to dashboard after adding user
    } catch (error) {
      // Enhanced error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error adding user:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error adding user: No response received', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error adding user:', error.message);
      }
    }
  };  

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout action here");
    navigate('/login');
  };

  return (
    <div className="container2">
      <header>
      <div onClick={() => navigate('/dashboard')} className="app-name">DMES</div>
          <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">Select a Role</option>
          {roles.map(role => (
            <option key={role._id} value={role.name}>{role.name}</option>
          ))}
        </select>
        <button type="submit">Add User</button>
      </form>
      <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
    </div>
  );
}

export default AddUser;
