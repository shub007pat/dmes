import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ProductionHistory() {
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchCompletedJobs();
    }, []);

    const fetchCompletedJobs = async () => {
        try {
            const response = await axios.get('/api/jobs/completed');
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching completed jobs:', error);
            alert('Failed to fetch completed jobs.');
        }
    };

    const handleSearch = (event) => {
        setSearch(event.target.value.toLowerCase());
    };

    const filteredJobs = jobs.filter(job => 
        job.jobNo.toLowerCase().includes(search) || 
        job.partName.toLowerCase().includes(search)
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
            <h1>Production History</h1>
            <input
                type="text"
                placeholder="Search by Job No or Part Name..."
                value={search}
                onChange={handleSearch}
                style={{ marginBottom: '20px', width: '100%', padding: '10px' }}
            />
            <table>
                <thead>
                    <tr>
                        <th>Job No</th>
                        <th>Part Serial No</th>
                        <th>Part Name</th>
                        <th>Add Date</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Operation Status</th>
                        <th>Order No</th>
                        <th>Note</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredJobs.map(job => (
                        <tr key={job._id}>
                            <td>{job.jobNo}</td>
                            <td>{job.partSerialNo}</td>
                            <td>{job.partName}</td>
                            <td>{new Date(job.addDate).toLocaleDateString()}</td>
                            <td>{new Date(job.dueDate).toLocaleDateString()}</td>
                            <td>{job.status}</td>
                            <td>{job.operationStatus}</td>
                            <td>{job.orderNo}</td>
                            <td>{job.note}</td>
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

export default ProductionHistory;
