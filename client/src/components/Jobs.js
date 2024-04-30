import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [filter, setFilter] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get('/api/jobs');
            setJobs(response.data);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/jobs/${id}`);
            fetchJobs(); // refresh the list
        } catch (error) {
            console.error('Failed to delete job:', error);
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
            <h1>Jobs Management</h1>
            <input
                type="text"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                placeholder="Search jobs..."
            />
            <button onClick={() => navigate('/add-job')}>Add Job</button>
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.filter(job => job.partName.toLowerCase().includes(filter.toLowerCase()) || job.partSerialNo.includes(filter)).map((job) => (
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
                            <td>
                                <button onClick={() => navigate(`/edit-job/${job._id}`)}>Edit</button>
                                <button onClick={() => handleDelete(job._id)}>Delete</button>
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

export default JobsPage;