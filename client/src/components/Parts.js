import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Parts() {
    const [parts, setParts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchParts();
    }, []);

    const fetchParts = async () => {
        try {
            const response = await axios.get('/api/parts');
            setParts(response.data);
        } catch (error) {
            console.error('Error fetching parts:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this part?')) {
            try {
                await axios.delete(`/api/parts/${id}`);
                fetchParts(); // Refresh the list after deletion
            } catch (error) {
                console.error('Failed to delete part:', error);
            }
        }
    };

    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logout action here");
        navigate('/login');
      };

    const filteredParts = parts.filter(part => part.partSerialNo.includes(searchTerm) || part.partName.includes(searchTerm));

    return (
        <div className="container">
            <header>
            <div onClick={() => navigate('/dashboard')} className="app-name">DMES</div>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
            <h1>Parts</h1>
            <input type="text" placeholder="Search Parts" onChange={e => setSearchTerm(e.target.value)} />
            <button onClick={() => navigate('/add-part')}>Add Part</button>
            <table>
                <thead>
                    <tr>
                        <th>Part Serial No</th>
                        <th>Part Name</th>
                        <th>Length</th>
                        <th>Width</th>
                        <th>Unit Price</th>
                        <th>Add Date</th>
                        <th>Added By</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredParts.map(part => (
                        <tr key={part._id}>
                            <td>{part.partSerialNo}</td>
                            <td>{part.partName}</td>
                            <td>{part.length}</td>
                            <td>{part.width}</td>
                            <td>${part.unitPrice.toFixed(2)}</td>
                            <td>{new Date(part.addDate).toLocaleDateString()}</td>
                            <td>{part.addedBy}</td>
                            <td>
                                <button onClick={() => navigate(`/edit-part/${part._id}`)}>Edit</button>
                                <button onClick={() => handleDelete(part._id)}>Delete</button>
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

export default Parts;
