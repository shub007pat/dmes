import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Warehouse() {
  const [warehouses, setWarehouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const fetchWarehouses = async () => {
    try {
      const response = await axios.get('/api/warehouses');
      setWarehouses(response.data);
    } catch (error) {
      console.error('Error fetching warehouses:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredWarehouses = warehouses.filter(warehouse =>
    warehouse.warehouseNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/warehouses/${id}`);
      fetchWarehouses(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting warehouse:', error);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="container">
            <header>
            <div onClick={() => navigate('/dashboard')} className="app-name">DMES</div>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
      <h1>Warehouse</h1>
      <input
        type="text"
        placeholder="Search by Warehouse Number..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button onClick={() => navigate('/add-warehouse')}>Add Warehouse</button>
      <table>
        <thead>
          <tr>
            <th>Warehouse Number</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Pincode</th>
            <th>Added Date</th>
            <th>Added By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredWarehouses.map((warehouse) => (
            <tr key={warehouse._id}>
              <td>{warehouse.warehouseNumber}</td>
              <td>{warehouse.address}</td>
              <td>{warehouse.city}</td>
              <td>{warehouse.state}</td>
              <td>{warehouse.pincode}</td>
              <td>{new Date(warehouse.addedDate).toLocaleDateString()}</td>
              <td>{warehouse.addedBy}</td>
              <td>{warehouse.status}</td>
              <td>
                <button onClick={() => navigate(`/edit-warehouse/${warehouse._id}`)}>Edit</button> 
                <button onClick={() => handleDelete(warehouse._id)}>Delete</button>
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

export default Warehouse;
