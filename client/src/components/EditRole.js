import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditRole() {
    const { roleId } = useParams();
    const navigate = useNavigate();
    const [modules, setModules] = useState([]);
    const [roleData, setRoleData] = useState({
        name: '',
        modules: []
    });

    useEffect(() => {
        fetchRoleData();
        fetchModules();
    }, [roleId]);

    const fetchRoleData = async () => {
        try {
            const response = await axios.get(`/api/roles/${roleId}`);
            setRoleData({
                name: response.data.name,
                modules: response.data.modules.map(mod => mod._id)
            });
        } catch (error) {
            console.error('Error fetching role:', error);
        }
    };

    const fetchModules = async () => {
        try {
            const response = await axios.get('/api/module');
            setModules(response.data);
        } catch (error) {
            console.error('Error fetching modules:', error);
        }
    };

    const handleChange = (event) => {
        setRoleData({
            ...roleData,
            name: event.target.value
        });
    };

    const handleModuleChange = (moduleId) => {
        setRoleData(prev => ({
            ...prev,
            modules: prev.modules.includes(moduleId)
                ? prev.modules.filter(id => id !== moduleId)
                : [...prev.modules, moduleId]
        }));
    };

    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logout action here");
        navigate('/login');
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`/api/roles/${roleId}`, roleData);
            alert('Role updated successfully!');
            navigate('/role-manager'); // Redirect back to role manager page
        } catch (error) {
            console.error('Error updating role:', error.response.data);
            alert('Failed to update role: ' + error.response.data.message);
        }
    };

    return (
        <div className="container2">
      <header>
      <div onClick={() => navigate('/dashboard')} className="app-name">DMES</div>
          <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
            <h1>Edit Role</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Role Name:</label>
                    <input
                        type="text"
                        value={roleData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Assign Modules:</label>
                    {modules.map(module => (
                        <div class="checkbox-container" key={module._id}>
                        <input
                            type="checkbox" id="myCheckbox" 
                            checked={roleData.modules.includes(module._id)}
                            onChange={() => handleModuleChange(module._id)}
                        />
                        <label for="myCheckbox">{module.name}</label>
                    </div>
                    ))}
                </div>
                <button type="submit">Update Role</button>
            </form>
            <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
        </div>
    );
}

export default EditRole;
