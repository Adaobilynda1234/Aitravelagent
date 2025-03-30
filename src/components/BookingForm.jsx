// components/BookingForm.jsx
import React, { useState } from 'react';

function BookingForm({ onPlanTrip }) {
  const [travelers, setTravelers] = useState(1);
  const [fromCity, setFromCity] = useState('New York City');
  const [toCity, setToCity] = useState('Paris');
  const [fromDate, setFromDate] = useState('2023-11-24');
  const [toDate, setToDate] = useState('2023-12-05');
  const [budget, setBudget] = useState(5000);

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlanTrip({
      travelers,
      fromCity,
      toCity,
      fromDate,
      toDate,
      budget
    });
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <button 
            type="button" 
            onClick={() => setTravelers(Math.max(1, travelers - 1))}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            -
          </button>
          <span>{travelers} Traveler{travelers !== 1 ? 's' : ''}</span>
          <button 
            type="button" 
            onClick={() => setTravelers(travelers + 1)}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            +
          </button>
        </div>

        <input 
          type="text" 
          value={fromCity}
          onChange={(e) => setFromCity(e.target.value)}
          placeholder="Flying from"
          className="w-full px-4 py-2 border rounded"
        />

        <input 
          type="text" 
          value={toCity}
          onChange={(e) => setToCity(e.target.value)}
          placeholder="Flying to"
          className="w-full px-4 py-2 border rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          <input 
            type="date" 
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <input 
            type="date" 
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <input 
          type="number" 
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Budget"
          className="w-full px-4 py-2 border rounded"
        />

        <button 
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-full hover:bg-green-600 transition"
        >
          Plan my Trip!
        </button>
      </form>
    </div>
  );
}

export default BookingForm;