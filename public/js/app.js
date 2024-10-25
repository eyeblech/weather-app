// public/js/app.js
async function fetchWeather(city) {
    const cityName = city || document.getElementById('city-input').value;
    if (!cityName) return;

    try {
        const response = await fetch(`/weather?city=${cityName}`);
        const data = await response.json();
        
        if (data && data.weather) {
            const weatherInfo = `
                <h2>Weather in ${data.name}</h2>
                <p>${getWeatherIcon(data.weather[0].icon)} ${data.weather[0].description}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            document.getElementById('weather-info').innerHTML = weatherInfo;
            document.body.style.backgroundImage = getBackground(data.weather[0].icon);
        } else {
            document.getElementById('weather-info').innerText = "City not found!";
        }
    } catch (error) {
        document.getElementById('weather-info').innerText = "Error fetching data";
    }
}

function getWeatherIcon(iconCode) {
    const icons = {
        "01d": "☀️", "01n": "🌑", "02d": "🌤️", "02n": "☁️",
        "03d": "☁️", "03n": "☁️", "04d": "☁️", "04n": "☁️",
        "09d": "🌧️", "09n": "🌧️", "10d": "🌦️", "10n": "🌧️",
        "11d": "⛈️", "11n": "⛈️", "13d": "❄️", "13n": "❄️",
        "50d": "🌫️", "50n": "🌫️"
    };
    return icons[iconCode] || "🌍";
}

function getBackground(iconCode) {
    const backgrounds = {
        "01d": "linear-gradient(45deg, #FFDD00, #FBB034)",
        "01n": "linear-gradient(45deg, #001DFF, #4A7AFF)",
        "02d": "linear-gradient(45deg, #FFA400, #FF5700)",
        "09d": "linear-gradient(45deg, #B6FBFF, #83A4D4)"
    };
    return backgrounds[iconCode] || "linear-gradient(45deg, #83a4d4, #b6fbff)";
}
