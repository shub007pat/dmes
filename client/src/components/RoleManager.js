import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RoleManager() {
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();

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

    const handleDelete = async (roleId) => {
        if (window.confirm('Are you sure you want to delete this role?')) {
            try {
                await axios.delete(`/api/roles/${roleId}`);
                fetchRoles(); // Refresh the list after deletion
            } catch (error) {
                console.error('Failed to delete role:', error);
            }
        }
    };

    const handleAddRole = () => {
        navigate('/add-role');
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
            <h1>Role Manager</h1>
            <button onClick={handleAddRole}>Add Role</button>
            <table>
                <thead>
                    <tr>
                        <th>Role Name</th>
                        <th>Modules</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map(role => (
                        <tr key={role._id}>
                            <td>{role.name}</td>
                            <td>{role.modules.map(module => module.name).join(', ')}</td>
                            <td>
                            <button onClick={() => navigate(`/edit-role/${role._id}`)}>Edit</button>
                                <button onClick={() => handleDelete(role._id)}>Delete</button>
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

export default RoleManager;
