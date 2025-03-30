// components/TripResultScreen.jsx
import React, { useState, useEffect } from 'react';
import { getOpenAITripSuggestion } from '../services/openaiService';
import { getWeatherForecast } from '../services/weatherService';

function TripResultScreen({ tripDetails }) {
  const [tripSuggestion, setTripSuggestion] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        // Fetch OpenAI trip suggestion
        const aiSuggestion = await getOpenAITripSuggestion(tripDetails);
        setTripSuggestion(aiSuggestion);

        // Fetch weather forecast
        const weather = await getWeatherForecast(tripDetails.toCity, tripDetails.fromDate);
        setWeatherForecast(weather);
      } catch (error) {
        console.error('Error fetching trip details:', error);
      }
    };

    fetchTripDetails();
  }, [tripDetails]);

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4">
      <div className="flex justify-between text-sm text-gray-500">
        <span>{tripDetails.fromDate}</span>
        <span>{tripDetails.toDate}</span>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold">{tripDetails.fromCity} → {tripDetails.toCity}</h2>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Weather</h3>
        {weatherForecast ? (
          <p>
            You can expect the weather to be {weatherForecast.description}, 
            Low {weatherForecast.tempMin}°, High {weatherForecast.tempMax}°
          </p>
        ) : (
          <p>Loading weather information...</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span>Flights</span>
          <button className="bg-green-500 text-white px-4 py-2 rounded-full">
            Book with Delta
          </button>
        </div>

        <div className="flex justify-between items-center">
          <span>Hotel</span>
          <button className="bg-green-500 text-white px-4 py-2 rounded-full">
            Book Premiere Hotel
          </button>
        </div>
      </div>

      {tripSuggestion && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">AI Trip Suggestion</h3>
          <p>{tripSuggestion}</p>
        </div>
      )}
    </div>
  );
}

export default TripResultScreen;