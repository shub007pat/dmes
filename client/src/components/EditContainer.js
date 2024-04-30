import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditContainer() {
    const { id } = useParams(); // This will come from the URL
    const [containerData, setContainerData] = useState({
        containerNumber: '',
        containerType: '',
        status: '',
        addedBy: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchContainerData = async () => {
            try {
                const response = await axios.get(`/api/containers/${id}`);
                setContainerData(response.data);
            } catch (error) {
                console.error('Error fetching container data:', error);
            }
        };

        fetchContainerData();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setContainerData({ ...containerData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`/api/containers/${id}`, containerData);
            alert('Container updated successfully!');
            navigate('/container'); // Adjust the route as necessary
        } catch (error) {
            console.error('Error updating container:', error.response?.data || error.message);
            alert('Failed to update container: ' + (error.response?.data.message || error.message));
        }
    };

    return (
        <div className="container2">
            <header>
                <div onClick={() => navigate('/dashboard')} className="app-name">DMES</div>
                <button onClick={() => navigate('/login')} className="logout-button">Logout</button>
            </header>
            <h1>Edit Container</h1>
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
                © 2024. Designed by Shubham.
            </footer>
        </div>
    );
}

export default EditContainer;
