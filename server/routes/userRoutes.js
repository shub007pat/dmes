const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'secret123'; // Make sure to define this in your .env file in production

router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const newUser = new User({ username, email, password, role });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/allUsers', async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.delete('/deleteUser/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(`Deleted user with ID: ${req.params.id}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Fetch a single user by ID
router.get('/getUser/:id', async (req, res) => {
  try {
      const user = await User.findById(req.params.id);
      if (!user) {
          return res.status(404).send('User not found');
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Update a user
router.put('/updateUser/:id', async (req, res) => {
  const { username, email, role } = req.body;
  try {
      const user = await User.findByIdAndUpdate(req.params.id, { username, email, role }, { new: true });
      if (!user) {
          return res.status(404).send('User not found');
      }
      res.json(user);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
});

module.exports = router;
