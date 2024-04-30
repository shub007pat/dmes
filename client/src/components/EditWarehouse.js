import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditWarehouse() {
  const { id } = useParams(); // Get the warehouse ID from the URL
  const [warehouseData, setWarehouseData] = useState({
    warehouseNumber: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    addedBy: '',
    status: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the warehouse data when the component mounts
    const fetchWarehouseData = async () => {
      try {
        const response = await axios.get(`/api/warehouses/${id}`);
        setWarehouseData(response.data);
      } catch (error) {
        console.error('Error fetching warehouse data:', error);
      }
    };

    fetchWarehouseData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setWarehouseData({ ...warehouseData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`/api/warehouses/${id}`, warehouseData);
      alert('Warehouse updated successfully!');
      navigate('/warehouse'); // Redirect to the warehouse list or appropriate route
    } catch (error) {
      console.error('Error updating warehouse:', error.response?.data || error.message);
      alert('Failed to update warehouse: ' + (error.response?.data.message || error.message));
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
      <h1>Edit Warehouse</h1>
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
          // This field may not need to be editable depending on your application's requirements
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

        <button type="submit">Update Warehouse</button>
      </form>
      <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
    </div>
  );
}

export default EditWarehouse;
