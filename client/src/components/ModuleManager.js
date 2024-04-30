import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ModuleManager() {
    const [modules, setModules] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async () => {
        try {
            const response = await axios.get('/api/module');
            setModules(response.data);
        } catch (error) {
            console.error('Error fetching modules:', error);
        }
    };

    const handleDelete = async (moduleId) => {
        if (window.confirm('Are you sure you want to delete this module?')) {
            try {
                await axios.delete(`/api/module/${moduleId}`);
                fetchModules(); // Refresh the list after deletion
            } catch (error) {
                console.error('Failed to delete module:', error);
            }
        }
    };

    const handleAddModule = () => {
        navigate('/add-module');
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
            <h1>Module Manager</h1>
            <button onClick={handleAddModule}>Add Module</button>
            <table>
                <thead>
                    <tr>
                        <th>Module ID</th>
                        <th>Module Name</th>
                        <th>Module Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {modules.map(module => (
                        <tr key={module._id}>
                            <td>{module._id}</td>
                            <td>{module.name}</td>
                            <td>{module.description}</td>
                            <td>
                                <button onClick={() => handleDelete(module._id)}>Delete</button>
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

export default ModuleManager;
