import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useResolvedPath } from 'react-router-dom';

function UserManager() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/allUsers');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`/api/deleteUser/${userId}`);
                fetchUser(); // Refresh the list after deletion
            } catch (error) {
                console.error('Failed to delete user:', error);
            }
        }
    };
    

    const handleAddUser = () => {
        navigate('/add-user');
    };

    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logout action here");
        navigate('/login');
      };

    return (
        <div className="container">
            <header>
            <div onClick={() => navigate('/dashboard')} className="app-name">DMES</div>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
            <h1>User Manager</h1>
            <button onClick={handleAddUser}>Add User</button>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>User Name</th>
                        <th>User Email</th>
                        <th>User Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => navigate(`/edit-user/${user._id}`)}>Edit</button>
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
        </div>
    );
}

export default UserManager;
