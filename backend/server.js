const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Vehicle = require('./models/Vehicle');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/remote-king', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Example route: Get all vehicles
app.get('/api/vehicles', async (req, res) => {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
});

// Example route: Add a vehicle
app.post('/api/vehicles', async (req, res) => {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));