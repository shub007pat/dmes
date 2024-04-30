import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditPart() {
  const [formData, setFormData] = useState({
    partSerialNo: '',
    partName: '',
    quantity: '',
    location: '',
    containerNo: '',
    status: '',
    addDate: '',
    addedBy: '',
    supplier: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  const [allParts, setAllParts] = useState([]);

  useEffect(() => {
    fetchItem();
    fetchAllParts();
  }, []);

  const fetchItem = async () => {
        try {
            const { data } = await axios.get(`/api/inventory/${id}`);
            const item = data;
            // Format the addDate for the date input
            item.addDate = new Date(item.addDate).toISOString().split('T')[0];
            setFormData(data);
        } catch (error) {
            console.error('Error fetching inventory details:', error);
            alert('Failed to load inventory data.');
        }
    };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/inventory/${id}`, formData);
      alert('Inventory updated successfully!');
      navigate('/inventory'); // Redirect back to inventory page after update
    } catch (error) {
      console.error('Failed to update inventory:', error.response ? error.response.data : 'Server Error');
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
      <h1>Edit Inventory</h1>
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

        <button type="submit">Update Inventory</button>
      </form>
      <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
    </div>
  );
}

export default EditPart;
