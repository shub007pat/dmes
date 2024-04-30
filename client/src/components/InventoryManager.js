import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const InventoryManager = () => {
  const navigate = useNavigate();

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
      <h1>Inventory Manager</h1>
      <div className="tile-container2">
        <Link className="dashboard-tile" to="/parts">Parts</Link>
        <Link className="dashboard-tile" to="/inventory">Inventory</Link>
        <Link className="dashboard-tile" to="/container">Container</Link>
        <Link className="dashboard-tile" to="/warehouse">Warehouse</Link>
      </div>
      <footer>
        ©Copyright 2024. Designed by Shubham.
      </footer>
    </div>
  );
};

export default InventoryManager;
