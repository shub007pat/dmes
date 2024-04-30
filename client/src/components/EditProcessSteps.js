import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProcessStep() {
    const { id } = useParams(); // Getting the ID from the URL
    const [parts, setParts] = useState([]);
    const [processStep, setProcessStep] = useState({
        mainPartSerialNo: '',
        mainPartName: '',
        steps: [],
        addedBy: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchParts();
        fetchProcessStep();
    }, []);

    const fetchParts = async () => {
        try {
            const { data } = await axios.get('/api/parts');
            setParts(data);
        } catch (error) {
            console.error('Error fetching parts:', error);
        }
    };

    const fetchProcessStep = async () => {
        try {
            const { data } = await axios.get(`/api/process-steps/${id}`);
            setProcessStep({
                mainPartSerialNo: data.mainPartSerialNo,
                mainPartName: data.mainPartName,
                steps: data.steps,
                addedBy: data.addedBy
            });
        } catch (error) {
            console.error('Error fetching process step:', error);
        }
    };

    const handleMainPartChange = (field, value) => {
        const selectedPart = parts.find(part => part[field] === value) || {};
        setProcessStep(prevState => ({
            ...prevState,
            mainPartSerialNo: selectedPart.partSerialNo || '',
            mainPartName: selectedPart.partName || '',
        }));
    };

    const handleStepTypeChange = (index, type) => {
        const updatedSteps = [...processStep.steps];
        updatedSteps[index] = { ...updatedSteps[index], type };
        setProcessStep({ ...processStep, steps: updatedSteps });
    };

    const handleStepDetailChange = (index, field, value) => {
        const updatedSteps = [...processStep.steps];
        if (field === 'partSerialNo' || field === 'partName') {
            const selectedPart = parts.find(part => part[field] === value) || {};
            updatedSteps[index] = {
                ...updatedSteps[index],
                partSerialNo: selectedPart.partSerialNo || '',
                partName: selectedPart.partName || '',
            };
        } else {
            updatedSteps[index] = { ...updatedSteps[index], [field]: value };
        }
        setProcessStep({ ...processStep, steps: updatedSteps });
    };

    const handleAddStep = () => {
        setProcessStep({
            ...processStep,
            steps: [...processStep.steps, { type: '', partSerialNo: '', partName: '', quantity: 0, operationDescription: '', units: '' }]
        });
    };

    const handleRemoveStep = (index) => {
        const updatedSteps = [...processStep.steps];
        updatedSteps.splice(index, 1);
        setProcessStep({ ...processStep, steps: updatedSteps });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`/api/process-steps/${id}`, processStep);
            alert('Process step updated successfully!');
            navigate('/process-steps');
        } catch (error) {
            console.error('Error updating process step:', error.response ? error.response.data : error);
            alert('Failed to update process step: ' + (error.response ? error.response.data.message : error.message));
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
            <h1>Edit Process Step</h1>
            <form onSubmit={handleSubmit}>
                <label>Main Part Serial No:</label>
                <select
                    value={processStep.mainPartSerialNo}
                    onChange={(e) => handleMainPartChange('partSerialNo', e.target.value)}
                    required
                >
                    <option value="">Select Part Serial No</option>
                    {parts.map((part) => (
                        <option key={part._id} value={part.partSerialNo}>
                            {part.partSerialNo}
                        </option>
                    ))}
                </select>

                <label>Main Part Name:</label>
                <select
                    value={processStep.mainPartName}
                    onChange={(e) => handleMainPartChange('partName', e.target.value)}
                    required
                >
                    <option value="">Select Part Name</option>
                    {parts.map((part) => (
                        <option key={part._id} value={part.partName}>
                            {part.partName}
                        </option>
                    ))}
                </select>

                {processStep.steps.map((step, index) => (
                    <div key={index}>
                        <label>Is this step a part or an operation?</label>
                        <select
                            name="type"
                            value={step.type}
                            onChange={(e) => handleStepTypeChange(index, e.target.value)}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="part">Part</option>
                            <option value="operation">Operation</option>
                        </select>

                        {step.type === 'part' && (
                            <>
                                <label>Part Serial No:</label>
                                <select
                                    value={step.partSerialNo}
                                    onChange={(e) => handleStepDetailChange(index, 'partSerialNo', e.target.value)}
                                    required
                                >
                                    <option value="">Select Part Serial No</option>
                                    {parts.map((part) => (
                                        <option key={part._id} value={part.partSerialNo}>
                                            {part.partSerialNo}
                                        </option>
                                    ))}
                                </select>
                                <label>Part Name:</label>
                                <select
                                    value={step.partName}
                                    onChange={(e) => handleStepDetailChange(index, 'partName', e.target.value)}
                                    required
                                >
                                    <option value="">Select Part Name</option>
                                    {parts.map((part) => (
                                        <option key={part._id} value={part.partName}>
                                            {part.partName}
                                        </option>
                                    ))}
                                </select>
                                <label>Quantity:</label>
                                <input
                                    type="number"
                                    value={step.quantity}
                                    onChange={(e) => handleStepDetailChange(index, 'quantity', e.target.value)}
                                    required
                                />
                            </>
                        )}

                        {step.type === 'operation' && (
                            <>
                                <label>Operation Description:</label>
                                <input
                                    type="text"
                                    value={step.operationDescription}
                                    onChange={(e) => handleStepDetailChange(index, 'operationDescription', e.target.value)}
                                    required
                                />
                                <label>Units:</label>
                                <input
                                    type="text"
                                    value={step.units}
                                    onChange={(e) => handleStepDetailChange(index, 'units', e.target.value)}
                                    required
                                />
                            </>
                        )}

                        <button type="button" onClick={() => handleRemoveStep(index)}>
                            Remove Step
                        </button>
                    </div>
                ))}

                <button type="button" onClick={handleAddStep}>
                    Add New Step
                </button>

                <label>Added By:</label>
                <input
                    type="text"
                    name="addedBy"
                    value={processStep.addedBy}
                    onChange={(e) => handleStepDetailChange(-1, 'addedBy', e.target.value)}
                    required
                />

                <button type="submit">
                    Submit Process Step
                </button>
            </form>
            <footer>
                ©Copyright 2024. Designed by Shubham.
            </footer>
        </div>
    );
}

export default EditProcessStep;
