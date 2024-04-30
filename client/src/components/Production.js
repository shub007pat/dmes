import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Production = () => {
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
      <h1>Production</h1>
      <div className="tile-container2">
        <Link className="dashboard-tile" to="/jobs">Jobs</Link>
        <Link className="dashboard-tile" to="/process-steps">Process Steps</Link>
        <Link className="dashboard-tile" to="/shift-manager">Shift Manager</Link>
        <Link className="dashboard-tile" to="/production-history">Production History</Link>
      </div>
      <footer>
        ©Copyright 2024. Designed by Shubham.
      </footer>
    </div>
  );
};

export default Production;
