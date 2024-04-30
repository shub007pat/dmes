import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPart() {
  const [formData, setFormData] = useState({
    partSerialNo: '',
    partName: '',
    quantity: '',
    location: '',
    containerNo: '',
    status: '',
    addDate: new Date().toISOString().split('T')[0],
    addedBy: '',
    supplier: ''
  });
  const [allParts, setAllParts] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
        fetchAllParts();
    }, []);

  const fetchAllParts = async () => {
    try {
        const { data } = await axios.get('/api/parts');
        setAllParts(data);
    } catch (error) {
        console.error('Error fetching parts:', error);
    }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePartSelection = (value, type) => {
    const selectedPart = allParts.find(part => part[type] === value);
    setFormData({
        ...formData,
        partSerialNo: selectedPart.partSerialNo,
        partName: selectedPart.partName
    });
};

const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout action here");
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/inventory', formData);
      alert('Inventory added successfully!');
      navigate('/inventory'); // Redirect to inventory page
    } catch (error) {
      console.error('Failed to add inventory:', error.response ? error.response.data : 'Server Error');
    }
  };

  return (
    <div className="container2">
      <header>
          <div onClick={() => navigate('/dashboard')} className="app-name">DMES</div>
          <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <h1>Add Inventory</h1>
      <form onSubmit={handleSubmit}>
        <label>Part Serial No:</label>
        <select name="partSerialNo" value={formData.partSerialNo} onChange={e => handlePartSelection(e.target.value, 'partSerialNo')}>
            <option value="">Select Part Serial No</option>
            {allParts.map(part => (
                <option key={part._id} value={part.partSerialNo}>{part.partSerialNo}</option>
            ))}
        </select>
        <label>Part Name:</label>
        <select name="partName" value={formData.partName} onChange={e => handlePartSelection(e.target.value, 'partName')}>
            <option value="">Select Part Name</option>
            {allParts.map(part => (
                <option key={part._id} value={part.partName}>{part.partName}</option>
            ))}
        </select>

        <label>Quantity:</label>
        <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />

        <label>Location:</label>
        <input name="location" value={formData.location} onChange={handleChange} required />

        <label>Container No:</label>
        <input name="containerNo" value={formData.containerNo} onChange={handleChange} required />

        <label>Status:</label>
        <input name="status" value={formData.status} onChange={handleChange} required />

        <label>Add Date:</label>
        <input type="date" name="addDate" value={formData.addDate} onChange={handleChange} required />

        <label>Added By:</label>
        <input name="addedBy" value={formData.addedBy} onChange={handleChange} required />

        <label>Supplier:</label>
        <input name="supplier" value={formData.supplier} onChange={handleChange} required />

        <button type="submit">Add Inventory</button>
      </form>
      <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
    </div>
  );
}

export default AddPart;
