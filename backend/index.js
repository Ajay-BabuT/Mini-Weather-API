require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = process.env.WEATHER_API_KEY;

const weatherConditions = {
    0: "Unknown",
    1000: "Clear",
    1100: "Mostly Clear",
    1101: "Partly Cloudy",
    1102: "Mostly Cloudy",
    1001: "Cloudy",
    2000: "Fog",
    2100: "Light Fog",
    4000: "Drizzle",
    4001: "Rain",
    4200: "Light Rain",
    4201: "Heavy Rain",
    5000: "Snow",
    5001: "Flurries",
    5100: "Light Snow",
    5101: "Heavy Snow",
    6000: "Freezing Drizzle",
    6001: "Freezing Rain",
    6200: "Light Freezing Rain",
    6201: "Heavy Freezing Rain",
    7000: "Ice Pellets",
    7101: "Heavy Ice Pellets",
    7102: "Light Ice Pellets",
    8000: "Thunderstorm"
};

app.get("/api/weather", async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: "City is required" });

    try {
        const response = await axios.get(
            `https://api.tomorrow.io/v4/weather/realtime?location=${city}&apikey=${API_KEY}`
        );
        const data = response.data.data.values;
        const weatherInfo = {
            city: city,
            temperature: data.temperature,
            average: data.temperatureApparent,
            humidity: data.humidity,
            mode: weatherConditions[data.weatherCode] || "Unknown"
        };
        
        res.json(weatherInfo);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));