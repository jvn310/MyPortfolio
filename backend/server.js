const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/css', express.static(path.join(__dirname, 'src/css')));
app.use('/js', express.static(path.join(__dirname, 'src/js')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/weather', async (req, res) => {
    const { lat, lon } = req.query;
    const weatherApiKey = process.env.API_KEY_2;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`;

    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.get('/location', async (req, res) => {
    const { lat, lon } = req.query;
    const geocodingApiKey = process.env.API_KEY_1;
    const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${geocodingApiKey}`;

    try {
        const response = await fetch(geocodingUrl);
        const data = await response.json();
        const results = data.results[0];
        const streetName = results.components.road || "Unknown Street";
        const town = results.components.town || results.components.city || "Unknown Town";
        res.json({ streetName, town });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch location data' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
