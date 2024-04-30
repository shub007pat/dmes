import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function Admin() {
    const handleLogout = () => {
        // Implement logout logic here
        console.log("Logout action here");
        navigate('/login');
      };

    const navigate = useNavigate();
    return (
        <div className="container">
      <header>
        <div onClick={() => navigate('/dashboard')} className="app-name">DMES</div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </header>
            <h1>Admin Dashboard</h1>
            <div className="tile-container-wrapper">
                <div className="tile-container2">
                    <Link className="dashboard-tile" to="/user-manager">User Manager</Link>
                    <Link className="dashboard-tile" to="/module-manager">Module Manager</Link>
                    <Link className="dashboard-tile" to="/role-manager">Role Manager</Link>
                </div>
            </div>
            <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
        </div>
    );
}

export default Admin;