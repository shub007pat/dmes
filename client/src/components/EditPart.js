import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditPart() {
  const [formData, setFormData] = useState({
    partSerialNo: '',
    partName: '',
    length: '',
    width: '',
    unitPrice: '',
    addedBy: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`/api/parts/${id}`);
        const item = response.data;
        // Format the addDate for the date input
        item.addDate = new Date(item.addDate).toISOString().split('T')[0];
        setFormData(item);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/parts/${id}`, formData);
      alert('Part updated successfully!');
      navigate('/parts'); // Redirect back to inventory page after update
    } catch (error) {
      console.error('Failed to update part:', error.response ? error.response.data : 'Server Error');
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
      <h1>Edit Part</h1>
      <form onSubmit={handleSubmit}>
        <label>Part Serial No:</label>
        <input name="partSerialNo" value={formData.partSerialNo} onChange={handleChange} required />

        <label>Part Name:</label>
        <input name="partName" value={formData.partName} onChange={handleChange} required />

        <label>Length:</label>
        <input type="number" name="length" value={formData.length} onChange={handleChange} required />

        <label>Width:</label>
        <input type="number" name="width" value={formData.width} onChange={handleChange} required />

        <label>Unit Price:</label>
        <input type="number" name="unitPrice" value={formData.unitPrice} onChange={handleChange} required />

        <label>Added By:</label>
        <input name="addedBy" value={formData.addedBy} onChange={handleChange} required />

        <button type="submit">Update Part</button>
      </form>
      <footer>
        ©Copyright 2024. Designed by Shubham.
      </footer>
    </div>
  );
}

export default EditPart;
