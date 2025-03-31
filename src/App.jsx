// src/App.jsx
import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import BookingForm from "./components/BookingForm";
import TripResult from "./components/TripResultScreen";
import {
  getOpenAIRecommendation,
  getWeatherForecast,
} from "./services/apiServices";

function App() {
  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [tripDetails, setTripDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStart = () => {
    setCurrentScreen("booking");
  };

  const handlePlanTrip = async (formData) => {
    try {
      setLoading(true);
      setError(null);

      // Call the APIs in parallel for better performance
      const [weatherData, recommendationData] = await Promise.all([
        getWeatherForecast(formData.flyingTo),
        getOpenAIRecommendation(formData),
      ]);

      const tripData = {
        dates: {
          start: formData.fromDate,
          end: formData.toDate,
        },
        route: `${formData.flyingFrom} → ${formData.flyingTo}`,
        weather: weatherData,
        flight: recommendationData.flight,
        hotel: recommendationData.hotel,
      };

      setTripDetails(tripData);
      setCurrentScreen("result");
    } catch (error) {
      console.error("Error planning trip:", error);
      setError("Failed to plan your trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = (type) => {
    alert(`${type} is booked!`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {currentScreen === "welcome" && <WelcomeScreen onStart={handleStart} />}

        {currentScreen === "booking" && (
          <BookingForm onSubmit={handlePlanTrip} loading={loading} />
        )}

        {currentScreen === "result" && tripDetails && (
          <TripResult
            tripDetails={tripDetails}
            onBookFlight={() => handleBooking("Flight")}
            onBookHotel={() => handleBooking("Hotel")}
          />
        )}

        {error && (
          <div className="p-4 bg-red-100 text-red-700 text-center">{error}</div>
        )}
      </div>
    </div>
  );
}

export default App;
