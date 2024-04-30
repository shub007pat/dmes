import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditUser() {
    const { userId } = useParams();  // Get userId from URL parameters
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        role: ''
    });

    const [roles, setRoles] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
        fetchRoles();
    }, []);
    
    const fetchRoles = async () => {
        try {
            const { data } = await axios.get('/api/roles');
            setRoles(data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };
    

    // Fetch user data from the server
    const fetchUser = async () => {
        try {
            const response = await axios.get(`/api/getUser/${userId}`);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('Failed to load user data.');
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logout action here");
        navigate('/login');
      };

    // Handle form submission to update the user
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`/api/updateUser/${userId}`, userData);
            alert('User updated successfully!');
            navigate('/user-manager'); // Redirect to users listing page after update
        } catch (error) {
            console.error('Error updating user:', error.response.data);
            alert('Failed to update user: ' + error.response.data.message);
        }
    };

    return (
        <div className="container2">
      <header>
      <div onClick={() => navigate('/dashboard')} className="app-name">DMES</div>
          <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
            <h1>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select name="role" value={userData.role} onChange={handleChange} required>
                        <option value="">Select a Role</option>
                        {roles.map(role => (
                            <option key={role._id} value={role.name}>{role.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Update User</button>
            </form>
            <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
        </div>
    );
}

export default EditUser;
