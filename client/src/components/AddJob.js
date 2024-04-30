import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddJob() {
    const [parts, setParts] = useState([]);
    const [operations, setOperations] = useState([]);
    const [orders, setOrders] = useState([]);  // State to hold the filtered orders
    const [job, setJob] = useState({
        partSerialNo: '',
        partName: '',
        dueDate: '',
        status: 'pending',
        operationStatus: '',
        orderNo: '',
        note: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchParts();
    }, []);

    const fetchParts = async () => {
        const { data } = await axios.get('/api/parts');
        setParts(data);
    };

    const handlePartChange = async (field, value) => {
        const selectedPart = parts.find(part => part[field] === value);
        if (!selectedPart) return;
        setJob({
            ...job,
            partSerialNo: selectedPart.partSerialNo,
            partName: selectedPart.partName
        });
        fetchOperations(selectedPart.partSerialNo);
        fetchOrders(selectedPart.partSerialNo);
    };

    const fetchOperations = async (partSerialNo) => {
        try {
            const response = await fetch(`/api/process-steps/operations/${partSerialNo}`);
            if (!response.ok) {
                throw new Error('Failed to fetch operations');
            }
            const data = await response.json();
            setOperations(data); // Assuming the endpoint returns an array of strings
        } catch (error) {
            console.error('Error fetching operations:', error);
            setOperations([]); // Handle error state appropriately
        }
    };

    const fetchOrders = async (partSerialNo) => {
        try {
            const response = await axios.get(`/api/orders/orderMatch/${partSerialNo}`);
            setOrders(response.data); // Assuming the API returns orders
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrders([]);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setJob({ ...job, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedJob = { ...job, status: job.status.charAt(0).toUpperCase() + job.status.slice(1).toLowerCase() };  // Ensure the case is correct
        console.log("Submitting job", updatedJob); // Log the job object to debug
        try {
            await axios.post('/api/jobs', updatedJob);
            navigate('/jobs');
        } catch (error) {
            console.error('Error adding job:', error.response ? error.response.data : error);
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
            <h1>Add Job</h1>
            <form onSubmit={handleSubmit}>
            <label>Part Serial No:</label>
                <select value={job.partSerialNo} onChange={e => handlePartChange('partSerialNo', e.target.value)} required>
                    <option value="">Select Part Serial No</option>
                    {parts.map(part => (
                        <option key={part._id} value={part.partSerialNo}>{part.partSerialNo}</option>
                    ))}
                </select>
                
                <label>Part Name:</label>
                <select value={job.partName} onChange={e => handlePartChange('partName', e.target.value)} required>
                    <option value="">Select Part Name</option>
                    {parts.map(part => (
                        <option key={part._id} value={part.partName}>{part.partName}</option>
                    ))}
                </select>
                
                <label>Due Date:</label>
                <input type="date" name="dueDate" value={job.dueDate} onChange={handleInputChange} required />

                <label>Status:</label>
                <select name="status" value={job.status} onChange={handleInputChange} required>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                </select>

                <label>Operation Status:</label>
                <select name="operationStatus" value={job.operationStatus} onChange={handleInputChange} required>
                    <option value="">Select Operation Status</option>
                    {operations.map((operation, index) => (
                        <option key={index} value={operation}>{operation}</option>
                    ))}
                </select>
                <label>Order No:</label>
                <select name="orderNo" value={job.orderNo} onChange={handleInputChange} required>
                    <option value="">Select Order</option>
                    {orders.map((order) => (
                        <option key={order._id} value={order.orderNo}>{order.orderNo}</option>
                    ))}
                </select>

                <label>Note:</label>
                <textarea name="note" value={job.note} onChange={handleInputChange}></textarea>

                <button type="submit">Add Job</button>
            </form>
            <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
        </div>
    );
}

export default AddJob;
