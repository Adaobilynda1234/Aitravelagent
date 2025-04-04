import React, { useState } from "react";

const BookingForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    travelers: 1,
    flyingFrom: "",
    flyingTo: "",
    fromDate: "",
    toDate: "",
    budget: "",
  });

  const [errors, setErrors] = useState({
    flyingFrom: "",
    flyingTo: "",
    fromDate: "",
    toDate: "",
    budget: "",
  });

  const [touched, setTouched] = useState({
    flyingFrom: false,
    flyingTo: false,
    fromDate: false,
    toDate: false,
    budget: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate the field that just changed
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "flyingFrom":
        if (!value.trim()) {
          errorMessage = "Origin city is required";
        }
        break;
      case "flyingTo":
        if (!value.trim()) {
          errorMessage = "Destination city is required";
        } else if (value.trim() === formData.flyingFrom.trim()) {
          errorMessage = "Destination cannot be the same as origin";
        }
        break;
      case "fromDate":
        if (!value) {
          errorMessage = "Departure date is required";
        } else {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const selectedDate = new Date(value);
          if (selectedDate < today) {
            errorMessage = "Departure date cannot be in the past";
          }
        }
        // Re-validate toDate when fromDate changes
        if (formData.toDate) {
          const fromDate = new Date(value);
          const toDate = new Date(formData.toDate);
          if (toDate <= fromDate) {
            setErrors((prev) => ({
              ...prev,
              toDate: "Return date must be after departure date",
            }));
          } else {
            setErrors((prev) => ({
              ...prev,
              toDate: "",
            }));
          }
        }
        break;
      case "toDate":
        if (!value) {
          errorMessage = "Return date is required";
        } else if (formData.fromDate) {
          const fromDate = new Date(formData.fromDate);
          const toDate = new Date(value);
          if (toDate <= fromDate) {
            errorMessage = "Return date must be after departure date";
          }
        }
        break;
      case "budget":
        if (!value) {
          errorMessage = "Budget is required";
        } else if (isNaN(value) || Number(value) <= 0) {
          errorMessage = "Budget must be a positive number";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    return errorMessage === "";
  };

  const validateForm = () => {
    let isValid = true;
    const newTouched = {};

    // Mark all fields as touched
    Object.keys(formData).forEach((field) => {
      if (field !== "travelers") {
        newTouched[field] = true;
        const valid = validateField(field, formData[field]);
        if (!valid) isValid = false;
      }
    });

    setTouched((prev) => ({ ...prev, ...newTouched }));
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
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
      <form onSubmit={handleSubmit} noValidate>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-center font-medium text-gray-700 mb-1">
              Number of travelers
            </label>
            <div className="flex items-center border rounded-full overflow-hidden">
              <button
                type="button"
                onClick={decrementTravelers}
                className="p-2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mx-2"
                disabled={loading}
              >
                -
              </button>
              <span className="flex-1 text-center">{formData.travelers}</span>
              <button
                type="button"
                onClick={incrementTravelers}
                className="p-2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center mx-2"
                disabled={loading}
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-center font-medium text-gray-700 mb-1">
              Flying from
            </label>
            <input
              type="text"
              name="flyingFrom"
              value={formData.flyingFrom}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-full ${
                touched.flyingFrom && errors.flyingFrom ? "border-red-500" : ""
              }`}
              required
              disabled={loading}
            />
            {touched.flyingFrom && errors.flyingFrom && (
              <p className="mt-1 text-sm text-red-500">{errors.flyingFrom}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-center font-medium text-gray-700 mb-1">
              Flying to
            </label>
            <input
              type="text"
              name="flyingTo"
              value={formData.flyingTo}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-full ${
                touched.flyingTo && errors.flyingTo ? "border-red-500" : ""
              }`}
              required
              disabled={loading}
            />
            {touched.flyingTo && errors.flyingTo && (
              <p className="mt-1 text-sm text-red-500">{errors.flyingTo}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-center font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-full ${
                touched.fromDate && errors.fromDate ? "border-red-500" : ""
              }`}
              required
              disabled={loading}
            />
            {touched.fromDate && errors.fromDate && (
              <p className="mt-1 text-sm text-red-500">{errors.fromDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-center font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 border rounded-full ${
                touched.toDate && errors.toDate ? "border-red-500" : ""
              }`}
              required
              disabled={loading}
            />
            {touched.toDate && errors.toDate && (
              <p className="mt-1 text-sm text-red-500">{errors.toDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-center font-medium text-gray-700 mb-1">
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
                onBlur={handleBlur}
                className={`w-full pl-8 pr-4 py-2 border rounded-full ${
                  touched.budget && errors.budget ? "border-red-500" : ""
                }`}
                required
                disabled={loading}
              />
              {touched.budget && errors.budget && (
                <p className="mt-1 text-sm text-red-500">{errors.budget}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-400 hover:bg-emerald-500 text-black py-3 px-6 rounded-full text-lg font-medium transition-colors"
            disabled={loading}
          >
            {loading ? "Planning..." : "Plan my Trip!"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
