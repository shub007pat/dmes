import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Container() {
  const [containers, setContainers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContainers();
  }, [search]);

  const fetchContainers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/containers', {
        params: { search }
      });
      setContainers(response.data);
    } catch (error) {
      console.error('Error fetching containers:', error);
    }
    setLoading(false);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const deleteContainer = async id => {
    if (window.confirm('Are you sure you want to delete this container?')) {
        try {
            await axios.delete(`/api/containers/${id}`);
            // Filter out the deleted container without needing to refetch all containers
            setContainers(containers.filter(container => container._id !== id));
        } catch (error) {
            console.error('Error deleting container:', error);
        }
    }
};


  return (
    <div className="container">
            <header>
            <div onClick={() => navigate('/dashboard')} className="app-name">DMES</div>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
      <h1>Container Management</h1>
      <input
        type="text"
        placeholder="Search containers..."
        value={search}
        onChange={handleSearchChange}
      />
      <button onClick={() => navigate('/add-container')}>Add Container</button>
      <table>
        <thead>
          <tr>
            <th>Container Number</th>
            <th>Container Type</th>
            <th>Added Date</th>
            <th>Added By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="6">Loading...</td></tr>
          ) : (
            containers.map((container) => (
              <tr key={container._id}>
                <td>{container.containerNumber}</td>
                <td>{container.containerType}</td>
                <td>{new Date(container.addedDate).toLocaleDateString()}</td>
                <td>{container.addedBy}</td>
                <td>{container.status}</td>
                <td>
                  <button onClick={() => navigate(`/edit-container/${container._id}`)}>Edit</button> 
                  <button onClick={() => deleteContainer(container._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
    </div>
  );
}

export default Container;
