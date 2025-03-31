// src/components/BookingForm.jsx
import React, { useState } from "react";

const BookingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    travelers: 1,
    flyingFrom: "New York City",
    flyingTo: "Paris",
    fromDate: "2023-11-24",
    toDate: "2023-12-05",
    budget: 5000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const incrementTravelers = () => {
    setFormData((prev) => ({ ...prev, travelers: prev.travelers + 1 }));
  };

  const decrementTravelers = () => {
    if (formData.travelers > 1) {
      setFormData((prev) => ({ ...prev, travelers: prev.travelers - 1 }));
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of travellers
            </label>
            <div className="flex items-center border rounded-full overflow-hidden">
              <button
                type="button"
                onClick={decrementTravelers}
                className="p-2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mx-2"
              >
                -
              </button>
              <span className="flex-1 text-center">{formData.travelers}</span>
              <button
                type="button"
                onClick={incrementTravelers}
                className="p-2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mx-2"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Flying from
            </label>
            <input
              type="text"
              name="flyingFrom"
              value={formData.flyingFrom}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Flying to
            </label>
            <input
              type="text"
              name="flyingTo"
              value={formData.flyingTo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                $
              </span>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2 border rounded-full"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-400 hover:bg-emerald-500 text-black py-3 px-6 rounded-full text-lg font-medium transition-colors"
          >
            Plan my Trip!
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
