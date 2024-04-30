import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddContainer() {
  const [containerData, setContainerData] = useState({
    containerNumber: '',
    containerType: 'box', // default value, assuming 'box' is one of your types
    status: 'ok', // default status
    addedBy: '', // You'll need to handle user context or input
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContainerData({ ...containerData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/containers', containerData);
      alert('Container added successfully!');
      navigate('/container'); // Adjust the route as necessary
    } catch (error) {
      console.error('Error adding container:', error.response?.data || error.message);
      alert('Failed to add container: ' + (error.response?.data.message || error.message));
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
      <h1>Add Container</h1>
      <form onSubmit={handleSubmit}>
        <label>Container Number:</label>
        <input
          type="text"
          name="containerNumber"
          value={containerData.containerNumber}
          onChange={handleInputChange}
          required
        />

        <label>Container Type:</label>
        <select
          name="containerType"
          value={containerData.containerType}
          onChange={handleInputChange}
          required
        >
          <option value="box">Box</option>
          <option value="pallet box">Pallet Box</option>
          <option value="bag">Bag</option>
          <option value="basket">Basket</option>
          <option value="bin">Bin</option>
        </select>

        <label>Status:</label>
        <select
          name="status"
          value={containerData.status}
          onChange={handleInputChange}
          required
        >
          <option value="ok">OK</option>
          <option value="defective">Defective</option>
        </select>

        <label>Added By:</label>
        <input
          type="text"
          name="addedBy"
          value={containerData.addedBy}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Add Container</button>
      </form>
      <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
    </div>
  );
}

export default AddContainer;
