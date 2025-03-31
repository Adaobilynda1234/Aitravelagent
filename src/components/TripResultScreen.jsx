// src/components/TripResult.jsx
import React from "react";

const TripResult = ({ tripDetails, onBookFlight, onBookHotel }) => {
  const { dates, route, weather, flight, hotel } = tripDetails;

  // Format dates for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}th ${
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][date.getMonth()]
    } ${String(date.getFullYear()).slice(2)}`;
  };

  const startDateFormatted = formatDate(dates.start);
  const endDateFormatted = formatDate(dates.end);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center mb-4">Your Trip</h1>

      <div className="flex justify-between items-center">
        <div className="bg-emerald-100 py-2 px-4 rounded-full text-sm flex items-center">
          <span className="mr-1">→</span> {startDateFormatted}
        </div>
        <div className="bg-emerald-100 py-2 px-4 rounded-full text-sm flex items-center">
          {endDateFormatted} <span className="ml-1">←</span>
        </div>
      </div>

      <div className="bg-emerald-100 py-2 px-4 rounded-full text-center">
        {route}
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold">Weather</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p>{weather.description}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Flights</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p>{flight.recommendation}</p>
          <button
            onClick={onBookFlight}
            className="mt-3 w-full bg-emerald-400 hover:bg-emerald-500 text-black py-2 px-4 rounded-lg text-lg font-medium transition-colors"
          >
            Book
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="font-semibold">Hotel</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p>{hotel.recommendation}</p>
          <button
            onClick={onBookHotel}
            className="mt-3 w-full bg-emerald-400 hover:bg-emerald-500 text-black py-2 px-4 rounded-lg text-lg font-medium transition-colors"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripResult;
