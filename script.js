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
    <p><em>${generateWeatherDescription(current)}</em></p>
  `;

  document.getElementById('weather-display').innerHTML = html;
  updateBackgroundColor(current.temp);
}


function updateBackgroundColor(tempCelsius) {
  let color;

  if (tempCelsius <= 10) {
    color = '#001f3f'; 
  } else if (tempCelsius <= 21) {
    color = '#7FDBFF'; 
  } else if (tempCelsius <= 30) {
    color = '#0074D9'; 
  } else if (tempCelsius <= 40) {
    color = '#FFDC00'; 
  } else {
    color = '#FF851B'; 
  }

  document.body.style.backgroundColor = color;
}

function generateWeatherDescription(current) {
  const { temp, precip, windspeed, humidity, visibility } = current;
  let messages = [];

  // temperature descriptions
  if (temp >= 40) {
    messages.push("It's extremely hot!");
  } else if (temp >= 30) {
    messages.push("It's quite warm.");
  } else if (temp >= 20) {
    messages.push("The temperature is moderate.");
  } else if (temp >= 10) {
    messages.push("It's a bit cool.");
  } else {
    messages.push("It's cold outside.");
  }

  // precipitation descriptions
  if (precip > 10) {
    messages.push("Heavy precipitation is occurring.");
  } else if (precip > 0) {
    messages.push("Light precipitation is occurring.");
  } else {
    messages.push("No precipitation at the moment.");
  }

  // windspeed descriptions
  if (windspeed > 50) {
    messages.push("Strong winds are blowing.");
  } else if (windspeed > 20) {
    messages.push("Moderate winds are present.");
  } else {
    messages.push("Winds are light.");
  }

  // humidity descriptions
  if (humidity > 80) {
    messages.push("High humidity levels.");
  } else if (humidity < 30) {
    messages.push("Low humidity levels.");
  } else {
    messages.push("Comfortable humidity levels.");
  }

  // visibility descriptions
  if (visibility < 2) {
    messages.push("Visibility is very poor. Travel with caution.");
  } else if (visibility < 5) {
    messages.push("Visibility is limited.");
  } else if (visibility < 10) {
    messages.push("Visibility is decent.");
  } else {
    messages.push("Visibility is excellent.");
  }

  return messages.join(' ');
}

