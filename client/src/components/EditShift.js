import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditShift() {
    const { id } = useParams();
    const [shiftData, setShiftData] = useState({
        name: '',
        start: '',
        end: '',
        status: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchShiftData();
    }, []);

    const fetchShiftData = async () => {
        try {
            const response = await axios.get(`/api/shift-managers/${id}`);
            const { name, shiftTime, status } = response.data;
            setShiftData({
                name,
                start: shiftTime.start.slice(0, 16), // Slice to fit the datetime-local input format
                end: shiftTime.end.slice(0, 16), // Slice to fit the datetime-local input format
                status
            });
        } catch (error) {
            console.error('Failed to fetch shift data:', error);
            alert('Failed to fetch shift details.');
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setShiftData({ ...shiftData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`/api/shift-managers/${id}`, {
                ...shiftData,
                shiftTime: { start: new Date(shiftData.start), end: new Date(shiftData.end) }
            });
            alert('Shift updated successfully!');
            navigate('/shift-manager'); // Adjust the route as necessary
        } catch (error) {
            console.error('Error updating shift:', error.response?.data || error.message);
            alert('Failed to update shift: ' + (error.response?.data.message || error.message));
        }
    };

    const handleLogout = () => {
        console.log("Logout action here");
        navigate('/login');
    };

    return (
        <div className="container2">
            <header>
                <div onClick={() => navigate('/dashboard')} className="app-name">DMES</div>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
            <h1>Edit Shift</h1>
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

                <button type="submit">Update Shift</button>
            </form>
            <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
        </div>
    );
}

export default EditShift;
