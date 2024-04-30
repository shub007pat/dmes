const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',  // This should match the URL of your frontend application
    optionsSuccessStatus: 200  // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
app.use(cors(corsOptions));  // Use CORS with the options
  
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log(err));

  // Import user routes
const userRoutes = require('./routes/userRoutes');

// Use user routes with '/api' base path
app.use('/api', userRoutes);

const inventoryRoutes = require('./routes/inventoryRoutes');

app.use('/api/inventory', inventoryRoutes);

const moduleRoutes = require('./routes/moduleRoutes');

app.use('/api/module', moduleRoutes);

const rolesRoutes = require('./routes/rolesRoutes');

app.use('/api/roles', rolesRoutes);

const ordersRoutes = require('./routes/ordersRoutes');

app.use('/api/orders', ordersRoutes);

const processStepsRoutes = require('./routes/processStepsRoutes');

app.use('/api/process-steps', processStepsRoutes);

const partsRoutes = require('./routes/partsRoutes');

app.use('/api/parts', partsRoutes);

const jobRoutes = require('./routes/jobRoutes');

app.use('/api/jobs', jobRoutes);

const containerRoutes = require('./routes/containerRoutes');
// ... other imports

// ... other app.use middleware
app.use('/api/containers', containerRoutes);

const warehouseRoutes = require('./routes/warehouseRoutes');

app.use('/api/warehouses', warehouseRoutes);

const shiftManagerRoutes = require('./routes/shiftManagerRoutes');
app.use('/api/shift-managers', shiftManagerRoutes);

const trackingRoutes = require('./routes/trackingRoutes');
app.use('/api/tracking', trackingRoutes);


// Basic route
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
