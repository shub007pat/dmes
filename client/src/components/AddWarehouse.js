import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddWarehouse() {
  const [warehouseData, setWarehouseData] = useState({
    warehouseNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    addedBy: '', // This should be set from user context or another method to identify the user
    status: 'Empty', // Default status
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setWarehouseData({ ...warehouseData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/warehouses', warehouseData);
      alert('Warehouse added successfully!');
      navigate('/warehouse'); // Adjust as needed for your route
    } catch (error) {
      console.error('Error adding warehouse:', error.response?.data || error.message);
      alert('Failed to add warehouse: ' + (error.response?.data.message || error.message));
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="container2">
    <header>
        <div onClick={() => navigate('/dashboard')} className="app-name">DMES</div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
    </header>
      <h1>Add Warehouse</h1>
      <form onSubmit={handleSubmit}>
        <label>Warehouse Number:</label>
        <input
          type="text"
          name="warehouseNumber"
          value={warehouseData.warehouseNumber}
          onChange={handleInputChange}
          required
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={warehouseData.address}
          onChange={handleInputChange}
          required
        />

        <label>City:</label>
        <input
          type="text"
          name="city"
          value={warehouseData.city}
          onChange={handleInputChange}
          required
        />

        <label>State:</label>
        <input
          type="text"
          name="state"
          value={warehouseData.state}
          onChange={handleInputChange}
          required
        />

        <label>Pincode:</label>
        <input
          type="text"
          name="pincode"
          value={warehouseData.pincode}
          onChange={handleInputChange}
          required
        />

        <label>Added By:</label>
        <input
          type="text"
          name="addedBy"
          value={warehouseData.addedBy}
          onChange={handleInputChange}
          required
        />

        <label>Status:</label>
        <select
          name="status"
          value={warehouseData.status}
          onChange={handleInputChange}
          required
        >
          <option value="Empty">Empty</option>
          <option value="Full">Full</option>
          <option value="Closed">Closed</option>
        </select>

        <button type="submit">Add Warehouse</button>
      </form>
      <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
    </div>
  );
}

export default AddWarehouse;
