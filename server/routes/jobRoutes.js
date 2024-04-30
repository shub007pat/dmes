const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

// Helper function to generate unique Job No
async function generateJobNo() {
    const job = await Job.findOne().sort({ _id: -1 });
    if (!job) return "JOB1001";
    const number = parseInt(job.jobNo.replace('JOB', '')) + 1;
    return 'JOB' + number;
}

// POST to add a new job
router.post('/', async (req, res) => {
    try {
        const jobNo = await generateJobNo();
        const newJob = new Job({ ...req.body, jobNo });
        console.log(newJob);
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        console.log(error); // Log the complete error
        res.status(400).json({ message: "Error creating job: " + error.message });
    }
});


// GET all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find({});
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT to update a job
router.put('/:id', async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET all completed jobs
router.get('/completed', async (req, res) => {
    try {
        const completedJobs = await Job.find({ status: 'Completed' });
        res.json(completedJobs);
    } catch (error) {
        console.error("Error fetching completed jobs:", error);
        res.status(500).json({ message: "Error fetching completed jobs: " + error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({ message: "Error fetching job: " + error.message });
    }
});




// DELETE a job
router.delete('/:id', async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;