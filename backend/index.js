require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));

const API_KEY = process.env.WEATHER_API_KEY;

app.get("/weather", async (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ error: "City is required" });

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = response.data;
        const weatherInfo = {
            city: data.name,
            temperature: data.main.temp,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            description: data.weather[0].description,
        };
        
        res.json(weatherInfo);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));