import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditOrder() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [orderData, setOrderData] = useState({
        orderBy: '',
        shipTo: '',
        parts: [],
        status: ''
    });
    const [allParts, setAllParts] = useState([]);

    useEffect(() => {
        fetchOrderDetails();
        fetchAllParts();
    }, []);

    const fetchOrderDetails = async () => {
        try {
            const { data } = await axios.get(`/api/orders/${orderId}`);
            setOrderData(data);
        } catch (error) {
            console.error('Error fetching order details:', error);
            alert('Failed to load order data.');
        }
    };

    const fetchAllParts = async () => {
        try {
            const { data } = await axios.get('/api/parts');
            setAllParts(data);
        } catch (error) {
            console.error('Error fetching parts:', error);
        }
    };

    const handlePartSelection = (value, index, type) => {
        const list = [...orderData.parts];
        const selectedPart = allParts.find(part => part[type] === value);
        list[index] = {
            ...list[index],
            partSerialNo: selectedPart.partSerialNo,
            partName: selectedPart.partName,
            unitPrice: selectedPart.unitPrice,
            totalAmount: selectedPart.unitPrice * list[index].quantity
        };
        setOrderData({
            ...orderData,
            parts: list
        });
    };

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...orderData.parts];
        list[index][name] = name === 'quantity' ? parseInt(value, 10) : value;
        if (name === 'quantity') {
            list[index].totalAmount = list[index].unitPrice * parseInt(value, 10);
        }
        setOrderData({
            ...orderData,
            parts: list
        });
    };

    const handleRemoveClick = index => {
        const list = [...orderData.parts];
        list.splice(index, 1);
        setOrderData({
            ...orderData,
            parts: list
        });
    };

    const handleAddClick = () => {
        setOrderData({
            ...orderData,
            parts: [...orderData.parts, { partSerialNo: '', partName: '', quantity: 1, unitPrice: 0, totalAmount: 0 }]
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData({ ...orderData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`/api/orders/${orderId}`, orderData);
            alert('Order updated successfully!');
            navigate('/orders');
        } catch (error) {
            console.error('Error updating order:', error.response.data);
            alert('Failed to update order: ' + error.response.data.message);
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
            <h1>Edit Order</h1>
            <form onSubmit={handleSubmit}>
            <label>Ordered By:</label>
                <input
                    type="text"
                    name="orderBy"
                    value={orderData.orderBy}
                    onChange={handleChange}
                    required
                />

                <label>Ship To:</label>
                <input
                    type="text"
                    name="shipTo"
                    value={orderData.shipTo}
                    onChange={handleChange}
                    required
                />
                {orderData.parts.map((x, i) => {
                    return (
                        <div key={i}>
                            <label>Part Serial No:</label>
                            <select name="partSerialNo" value={x.partSerialNo} onChange={e => handlePartSelection(e.target.value, i, 'partSerialNo')}>
                                <option value="">Select Part Serial No</option>
                                {allParts.map(part => (
                                    <option key={part._id} value={part.partSerialNo}>{part.partSerialNo}</option>
                                ))}
                            </select>
                            <label>Part Name:</label>
                            <select name="partName" value={x.partName} onChange={e => handlePartSelection(e.target.value, i, 'partName')}>
                                <option value="">Select Part Name</option>
                                {allParts.map(part => (
                                    <option key={part._id} value={part.partName}>{part.partName}</option>
                                ))}
                            </select>
                            <label>Quantity:</label>
                            <input type="number" name="quantity" value={x.quantity} onChange={e => handleInputChange(e, i)} />
                            <label>Unit Price:</label>
                            <input type="number" name="unitPrice" value={x.unitPrice} onChange={handleChange} />
                            <label>Total Amount:</label>
                            <input type="number" name="totalAmount" value={x.totalAmount} readOnly />
                            {/*orderData.parts.length !== 1 && <button onClick={() => handleRemoveClick(i)}>Remove</button>*/}
                            {/*orderData.parts.length - 1 === i && <button onClick={handleAddClick}>Add More</button>*/}
                        </div>
                    );
                })}
                
                <label>Status:</label>
                <select name="status" value={orderData.status} onChange={handleChange}>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select>

                <button type="submit">Submit</button>
            </form>
            <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
        </div>
    );
}

export default EditOrder;
