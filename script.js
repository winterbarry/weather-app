const API_KEY = '8ZM5W7LHMJ5DXR2J88DT8L7WF';
const BASE_URL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

// fetch data
document.getElementById('location-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const location = document.getElementById('location-input').value.trim();
  if (!location) return;

  const url = `${BASE_URL}${encodeURIComponent(location)}?unitGroup=metric&key=${API_KEY}&contentType=json`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    const weatherData = await response.json();
    console.log(weatherData)
    displayWeather(weatherData);
  } catch (error) {
    document.getElementById('weather-display').innerHTML = `<p>Error: ${error.message}</p>`;
  }
});

function displayWeather(data) {
  const current = data.currentConditions;
  const html = `
    <h2>Weather for ${data.resolvedAddress}</h2>
    <p><strong>Temperature:</strong> ${current.temp}°C</p>
    <p><strong>Precipitation:</strong> ${current.precip} mm</p>
    <p><strong>Wind:</strong> ${current.windspeed} km/h</p>
    <p><strong>Humidity:</strong> ${current.humidity}%</p>
    <p><strong>Visibility:</strong> ${current.visibility} km</p>
  `;
  document.getElementById('weather-display').innerHTML = html;
}