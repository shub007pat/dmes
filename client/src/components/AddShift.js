import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddShift() {
    const [shiftData, setShiftData] = useState({
        name: '',
        start: '',
        end: '',
        status: 'Active', // Default status, adjust based on your needs
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setShiftData({ ...shiftData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/shift-managers', {
                ...shiftData,
                shiftTime: { start: new Date(shiftData.start), end: new Date(shiftData.end) }
            });
            alert('Shift added successfully!');
            navigate('/shift-manager'); // Redirect to the shift manager page or wherever appropriate
        } catch (error) {
            console.error('Error adding shift:', error.response?.data || error.message);
            alert('Failed to add shift: ' + (error.response?.data.message || error.message));
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
            <h1>Add Shift</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={shiftData.name}
                    onChange={handleInputChange}
                    required
                />

                <label>Start Time:</label>
                <input
                    type="datetime-local"
                    name="start"
                    value={shiftData.start}
                    onChange={handleInputChange}
                    required
                />

                <label>End Time:</label>
                <input
                    type="datetime-local"
                    name="end"
                    value={shiftData.end}
                    onChange={handleInputChange}
                    required
                />

                <label>Status:</label>
                <select
                    name="status"
                    value={shiftData.status}
                    onChange={handleInputChange}
                    required
                >
                    <option value="Started">Started</option>
                    <option value="Completed">Completed</option>
                </select>

                <button type="submit">Add Shift</button>
            </form>
            <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
        </div>
    );
}

export default AddShift;
