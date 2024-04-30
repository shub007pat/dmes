import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProcessStep() {
    const [parts, setParts] = useState([]); // For dropdowns in form
    const [processSteps, setProcessSteps] = useState([]); // All steps loaded from the server
    const [filter, setFilter] = useState(''); // Search filter
    const navigate = useNavigate();

    useEffect(() => {
        fetchParts();
        fetchProcessSteps();
    }, []);

    const fetchParts = async () => {
        try {
            const { data } = await axios.get('/api/parts');
            setParts(data);
        } catch (error) {
            console.error('Error fetching parts:', error);
        }
    };

    const fetchProcessSteps = async () => {
        try {
            const { data } = await axios.get('/api/process-steps');
            setProcessSteps(data);
        } catch (error) {
            console.error('Error fetching process steps:', error);
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredSteps = processSteps.filter(step =>
        step.mainPartName.toLowerCase().includes(filter.toLowerCase()) ||
        step.mainPartSerialNo.toLowerCase().includes(filter.toLowerCase())
    );

    const renderTableData = () => {
        return filteredSteps.map(step => (
            <tr key={step._id}>
                <td>{step.mainPartSerialNo}</td>
                <td>{step.mainPartName}</td>
                <td>{step.addedBy}</td>
                <td>
                    {step.steps.map((s, index) => (
                        <div key={index}>
                            {s.type === 'part' ? `${s.partSerialNo} - ${s.quantity} units` : `${s.operationDescription} - ${s.units}`}
                        </div>
                    ))}
                </td>
                <td>
                    <button onClick={() => navigate(`/edit-process-steps/${step._id}`)}>Edit</button>
                    <button onClick={() => deleteProcessStep(step._id)}>Delete</button>
                </td>
            </tr>
        ));
    };

    const deleteProcessStep = async (id) => {
        try {
            await axios.delete(`/api/process-steps/${id}`);
            fetchProcessSteps(); // Refresh list after delete
        } catch (error) {
            console.error('Failed to delete process step:', error);
        }
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
            <h1>Process Steps</h1>
            <input
                type="text"
                value={filter}
                onChange={handleFilterChange}
                placeholder="Search by Part Serial No or Name"
            />
            <button onClick={() => navigate('/add-process-steps')}>Add Part</button>
            <table>
                <thead>
                    <tr>
                        <th>Main Part Serial No</th>
                        <th>Main Part Name</th>
                        <th>Added By</th>
                        <th>Steps</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableData()}
                </tbody>
            </table>
            <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
        </div>
    );
}

export default ProcessStep;
