const express = require('express');
const router = express.Router();
const ProcessSteps = require('../models/ProcessSteps');
const web3 = require('../web3/initWeb3');
const contractABI = require('../build/contracts/ProcessStepRegistry.json');
const contractAddress = '0xC85f2d6C51eC55384410d8a7FAD35D465D674903'; // Replace with your contract's address

const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

// Get all process steps
router.get('/', async (req, res) => {
    try {
        const processSteps = await ProcessSteps.find();
        res.json(processSteps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const processStep = await ProcessSteps.findById(req.params.id);
        if (!processStep) {
            return res.status(404).json({ message: 'Process step not found' });
        }
        res.json(processStep);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new process step
router.post('/', async (req, res) => {
    try {
        const { mainPartSerialNo, mainPartName, steps, addedBy } = req.body;
        const newProcessStep = new ProcessSteps({
            mainPartSerialNo,
            mainPartName,
            steps,
            addedBy
        });

        await newProcessStep.save();

        const formattedSteps = steps.map(step => {
            return {
                stepType: step.type,
                partSerialNo: step.partSerialNo,
                partName: step.partName,
                quantity: step.quantity,
                operationDescription: step.operationDescription,
                units: step.units
            };
        });

        const accounts = await web3.eth.getAccounts();
        await contract.methods.addProcessStep(
            newProcessStep._id.toString(),
            newProcessStep.mainPartSerialNo,
            newProcessStep.mainPartName,
            formattedSteps,
            newProcessStep.addedBy
        ).send({ from: accounts[0], gas: 500000 });

        res.status(201).json(newProcessStep);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a process step
router.put('/:id', async (req, res) => {
    try {
        const updatedProcessSteps = await ProcessSteps.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProcessSteps);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// API endpoint to fetch operations for a specific part by mainPartSerialNo
router.get('/operations/:partSerialNo', async (req, res) => {
    const { partSerialNo } = req.params;
    try {
        const processStep = await ProcessSteps.findOne({ mainPartSerialNo: partSerialNo });
        if (!processStep) {
            return res.status(404).json({ message: "No process steps found for this part serial number." });
        }

        // Transform the steps array into the desired string format
        const stepsList = processStep.steps.map(step => {
            if (step.type === 'part') {
                return `${step.partSerialNo} - ${step.quantity} units`; // Customize format here if needed
            } else {
                return `${step.operationDescription} - ${step.units}`;
            }
        });

        res.json(stepsList);
    } catch (error) {
        console.log("Error fetching operations:", error);
        res.status(500).json({ message: "Error fetching operations: " + error.message });
    }
});




// Delete a process step
router.delete('/:id', async (req, res) => {
    try {
        await ProcessSteps.findByIdAndDelete(req.params.id);
        res.status(200).send('Process Step deleted');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
