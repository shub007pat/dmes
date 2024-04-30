import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Shipping = () => {
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
      <h1>Shipping</h1>
      <div className="tile-container2">
        <Link className="dashboard-tile" to="/orders">Orders</Link>
        <Link className="dashboard-tile" to="/packing">Packing</Link>
        <Link className="dashboard-tile" to="/shipping-labels">Shipping Labels</Link>
        <Link className="dashboard-tile" to="/tracking">Tracking</Link>
      </div>
      <footer>
        ©Copyright 2024. Designed by Shubham.
      </footer>
    </div>
  );
};

export default Shipping;
