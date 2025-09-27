// weather.js
const apiKey = "807a58c6b25711f127d258ed4d1c9779";
const city = "Accra";
const countryCode = "GH"; // Ghana
const units = "metric"; // Celsius for Ghana

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=${units}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&units=${units}&appid=${apiKey}`;

// Format timestamp to hh:mm
function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ----------------------
// Fetch Current Weather
// ----------------------
async function fetchCurrentWeather() {
  try {
    const response = await fetch(currentWeatherUrl);
    const data = await response.json();

    // Update main weather panel if it exists
    const weatherDiv = document.getElementById("weather");
    if (weatherDiv) {
      weatherDiv.innerHTML = `
        <p><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
                alt="${data.weather[0].description}"></p>
        <p><strong>${Math.round(data.main.temp)}°C</strong></p>
        <p>${data.weather[0].description}</p>
        <p>High: ${Math.round(data.main.temp_max)}°C | Low: ${Math.round(data.main.temp_min)}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Sunrise: ${formatTime(data.sys.sunrise)}</p>
        <p>Sunset: ${formatTime(data.sys.sunset)}</p>
      `;
    }

    // Always update header icon temperature
    const tempLabel = document.querySelector(".temp-label");
    if (tempLabel) {
      tempLabel.textContent = `${Math.round(data.main.temp)}°C`;
    }

  } catch (error) {
    console.error("Error fetching current weather:", error);
  }
}

// ----------------------
// Fetch 3-Day Forecast
// ----------------------
async function fetchForecast() {
  try {
    const response = await fetch(forecastUrl);
    const data = await response.json();

    const forecastDiv = document.getElementById("forecast");
    if (!forecastDiv) return; // Skip if not present

    forecastDiv.innerHTML = "";

    // Group by day and pick midday forecast
    const forecastByDay = {};
    data.list.forEach(entry => {
      const date = new Date(entry.dt_txt);
      const day = date.toLocaleDateString("en-US", { weekday: "long" });

      if (!forecastByDay[day] && date.getHours() === 12) {
        forecastByDay[day] = entry;
      }
    });

    // Get the next 3 days
    const days = Object.keys(forecastByDay).slice(0, 3);

    days.forEach(day => {
      const entry = forecastByDay[day];
      forecastDiv.innerHTML += `
        <div class="forecast-day">
          <p><strong>${day}</strong></p>
          <p><img src="https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png" 
                  alt="${entry.weather[0].description}"></p>
          <p>${Math.round(entry.main.temp)}°C</p>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error fetching forecast:", error);
  }
}

// ----------------------
// Initialize
// ----------------------
fetchCurrentWeather();
fetchForecast();


// spotlight.js (kept here since you pasted both in one file)

// ----------------------
// Mobile nav toggle
// ----------------------
const menuBtn = document.getElementById("menuBtn");
const navList = document.getElementById("navList");

if (menuBtn && navList) {
  menuBtn.addEventListener("click", () => {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!expanded));
    navList.classList.toggle("show");
  });
}

// ----------------------
// Membership helpers
// ----------------------
function getMembershipClass(level) {
  if (level === 3) return "gold";
  if (level === 2) return "silver";
  return "member";
}

function getMembershipLabel(level) {
  if (level === 3) return "Gold";
  if (level === 2) return "Silver";
  return "Member";
}
