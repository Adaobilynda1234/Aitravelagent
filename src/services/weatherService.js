// services/weatherService.js
export async function getWeatherForecast(city, date) {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
  
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    
    // Find forecast for the specified date
    const forecast = data.list.find(item => item.dt_txt.startsWith(date));
    
    return {
      description: forecast.weather[0].description,
      tempMin: Math.round(forecast.main.temp_min),
      tempMax: Math.round(forecast.main.temp_max)
    };
  } catch (error) {
    console.error('Weather API error:', error);
    return {
      description: 'mild',
      tempMin: 10,
      tempMax: 25
    };
  }
}