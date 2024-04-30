import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddModule() {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/module', formData);
            alert('Module added successfully!');
            navigate('/module-manager'); // Redirect back to module manager page
        } catch (error) {
            console.error('Error adding module:', error.response.data);
            alert('Failed to add module: ' + error.response.data.message);
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
            <h1>Add New Module</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Add Module</button>
            </form>
            <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
        </div>
    );
}

export default AddModule;
