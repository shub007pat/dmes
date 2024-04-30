import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Inventory() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/inventory');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = items.filter(item =>
    item.partSerialNo.includes(searchTerm) || item.partName.includes(searchTerm)
  );

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`/api/inventory/${id}`);
        fetchItems();  // Re-fetch the items after deletion
        alert('Item deleted successfully!');
      } catch (error) {
        console.error('Failed to delete the item:', error);
      }
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
      <h1>Inventory</h1>
      <input type="text" placeholder="Search by Serial No or Part Name" value={searchTerm} onChange={handleSearchChange} />
      <button onClick={() => navigate('/add-inventory')}>Add Inventory</button>
      <table>
        <thead>
          <tr>
            <th>Part Serial No</th>
            <th>Part Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Location</th>
            <th>Container No</th>
            <th>Status</th>
            <th>Add Date</th>
            <th>Added By</th>
            <th>Supplier</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={index}>
              <td>{item.partSerialNo}</td>
              <td>{item.partName}</td>
              <td>{item.quantity}</td>
              <td>{item.unitPrice}</td>
              <td>{item.location}</td>
              <td>{item.containerNo}</td>
              <td>{item.status}</td>
              <td>{new Date(item.addDate).toLocaleDateString()}</td>
              <td>{item.addedBy}</td>
              <td>{item.supplier}</td>
              <td>
                <button onClick={() => navigate(`/edit-inventory/${item._id}`)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
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

export default Inventory;
