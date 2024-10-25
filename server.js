// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// API route to fetch weather data for a given city
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
