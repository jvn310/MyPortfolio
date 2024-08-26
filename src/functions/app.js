function showAlert(message, type = 'danger') {
    const alertContainer = document.getElementById("alert-container");
    const alertMessage = document.getElementById("alert-message");

    alertMessage.textContent = message;
    alertContainer.className = '';
    alertContainer.classList.add(type); 
    alertContainer.style.display = 'block';

    // Hide the alert after 5 seconds
    setTimeout(() => {
        alertContainer.style.display = 'none';
    }, 5000);
}

document.addEventListener("DOMContentLoaded", function() {
    const requestLocationButton = document.getElementById("request-location-button");
    requestLocationButton.addEventListener("click", requestLocation);
});

function requestLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather, handleError, {
            enableHighAccuracy: true,
            timeout: 30000, 
            maximumAge: 0    
        });
    } else {
        getWeatherByIP();
    }
}

function getWeatherByIP() {
    fetch('https://ip-api.com/json')
        .then(response => response.json())
        .then(data => {
            const lat = data.lat;
            const lon = data.lon;
            fetchWeatherAndLocation(lat, lon);
        })
        .catch(error => {
            showAlert("Error fetching the IP data.", "danger");
            console.error("Error fetching the IP data: ", error);
        });
}

function showWeather(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetchWeatherAndLocation(lat, lon);
}

function fetchWeatherAndLocation(lat, lon) {
    fetch(`http://localhost:3000/location?lat=${lat}&lon=${lon}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(locationData => {
            const { streetName, town } = locationData;

            fetch(`http://localhost:3000/weather?lat=${lat}&lon=${lon}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(weatherData => {
                    showWeatherData(weatherData, streetName, town);
                })
                .catch(error => {
                    showAlert("Error fetching the weather data.", "danger");
                    console.error("Error fetching the weather data: ", error);
                });
        })
        .catch(error => {
            showAlert("Error fetching the location data.", "danger");
            console.error("Error fetching the location data: ", error);
        });
}


function showWeatherData(data, streetName, town) {
    const weatherDescription = data.weather[0].description;
    let weatherEmoji = "";

    if (weatherDescription.includes("clear")) {
        weatherEmoji = "☀️";
    } else if (weatherDescription.includes("clouds")) {
        weatherEmoji = "☁️";
    } else if (weatherDescription.includes("rain")) {
        weatherEmoji = "🌧️";
    } else if (weatherDescription.includes("thunderstorm")) {
        weatherEmoji = "⛈️";
    } else if (weatherDescription.includes("snow")) {
        weatherEmoji = "❄️";
    } else if (weatherDescription.includes("mist") || weatherDescription.includes("fog")) {
        weatherEmoji = "🌫️";
    } else {
        weatherEmoji = "🌈";
    }

    const weatherInfo = `
        <h2>Weather Details ${weatherEmoji}</h2>
        <p><strong>📍 Location:</strong> ${streetName}, ${town}</p>
        <p><strong>🌡️ Temperature:</strong> ${Math.round(data.main.temp)}°C</p>
        <p><strong>🤒 Feels Like:</strong> ${Math.round(data.main.feels_like)}°C</p>
        <p><strong> ${weatherEmoji} Weather:</strong> ${weatherDescription}</p>
        <p><strong>💧 Humidity:</strong> ${Math.round(data.main.humidity)}%</p>
        <p><strong>💨 Wind Speed:</strong> ${Math.round(data.wind.speed * 3.6)} km/h</p>
        <p><strong>🌬️ Pressure:</strong> ${data.main.pressure} mBar</p>
    `;
    document.getElementById("weatherInfo").innerHTML = weatherInfo;
    // Show the modal
    document.getElementById("weather-modal").style.display = "block";
}

function handleError(error) {
    const errorMsg = {
        [error.PERMISSION_DENIED]: "You denied access to location.",
        [error.POSITION_UNAVAILABLE]: "Location information is unavailable.",
        [error.TIMEOUT]: "The request to get access your location timed out.",
        [error.UNKNOWN_ERROR]: "An unknown error occurred."
    };
    showAlert(errorMsg[error.code] || "An unknown error occurred.", "danger");
}

// Close the modal when the user clicks the close button
document.querySelector(".close").onclick = function() {
    document.getElementById("weather-modal").style.display = "none";
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target == document.getElementById("weather-modal")) {
        document.getElementById("weather-modal").style.display = "none";
    }
}
