import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ShiftManager() {
    const [shifts, setShifts] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchShifts();
    }, []);

    const fetchShifts = async () => {
        try {
            const response = await axios.get('/api/shift-managers');
            setShifts(response.data);
        } catch (error) {
            console.error('Failed to fetch shifts:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/shift-managers/${id}`);
            setShifts(shifts.filter(shift => shift._id !== id));  // Update UI
            alert('Shift deleted successfully!');
        } catch (error) {
            console.error('Failed to delete shift:', error);
            alert('Failed to delete shift');
        }
    };

    const handleSearch = event => {
        setSearch(event.target.value.toLowerCase());
    };

    const filteredShifts = shifts.filter(shift => 
        shift.name.toLowerCase().includes(search) || 
        shift.status.toLowerCase().includes(search)
    );

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
            <h1>Shift Manager</h1>
            <input
                type="text"
                placeholder="Search by Name or Status..."
                value={search}
                onChange={handleSearch}
                style={{ marginBottom: '20px', padding: '10px' }}
            />
            <button onClick={() => navigate(`/add-shift`)}>Add Shift</button>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredShifts.map(shift => (
                        <tr key={shift._id}>
                            <td>{shift.name}</td>
                            <td>{new Date(shift.shiftTime.start).toLocaleTimeString()}</td>
                            <td>{new Date(shift.shiftTime.end).toLocaleTimeString()}</td>
                            <td>{shift.status}</td>
                            <td>
                                <button onClick={() => navigate(`/edit-shift/${shift._id}`)}>Edit</button>
                                <button onClick={() => handleDelete(shift._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ShiftManager;
