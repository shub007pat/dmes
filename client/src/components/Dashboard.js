import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout action here");
    navigate('/login');
  };

  return (
    <div className="container">
      <header>
        <div className="app-name">DMES</div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
      <h1>Dashboard</h1>
      <div className="tile-container2">
        <Link className="dashboard-tile" to="/inventory-manager">Inventory Manager</Link>
        <Link className="dashboard-tile" to="/production">Production</Link>
        <Link className="dashboard-tile" to="/shipping">Shipping</Link>
        <Link className="dashboard-tile" to="/admin">Admin</Link>
      </div>
      <footer>
        ©Copyright 2024. Designed by Shubham.
      </footer>
    </div>
  );
};

export default Dashboard;
