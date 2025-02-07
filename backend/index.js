require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = process.env.WEATHER_API_KEY;

app.get("/api/weather", async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: "City is required" });

    try {
        const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
        );
        const data = response.data;

        const weatherInfo = {
            city: data.location.name,
            temperature: data.current.temp_c,
            feels_like: data.current.feelslike_c,
            humidity: data.current.humidity,
            mode: data.current.condition.text
        };
        
        res.json(weatherInfo);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));