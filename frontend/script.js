const API_URL="mini-weather-api-server.vercel.app/weather?city=";
document.getElementById("getWeather").addEventListener("click", async () => {
    const city = document.getElementById("city").value;
    if (!city) return alert("Please enter a city name");

    try {
        const response = await fetch(`${API_URL}${city}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById("weather-result").innerHTML = `<p>${data.error}</p>`;
        } else {
            document.getElementById("weather-result").innerHTML = `
                <h3>${data.city}</h3>
                <p>Temperature: ${data.temperature}°C</p>
                <p>Feels Like: ${data.feels_like}°C</p>
                <p>Humidity: ${data.humidity}%</p>
                <p>Description: ${data.description}</p>
            `;
        }
    } catch (error) {
        document.getElementById("weather-result").innerHTML = `<p>Failed to fetch data</p>`;
    }
});