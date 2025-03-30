// App.jsx
import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import BookingForm from './components/BookingForm';
import TripResultScreen from './components/TripResultScreen';

function App() {
  const [screen, setScreen] = useState('welcome');
  const [tripDetails, setTripDetails] = useState(null);

  const handleBegin = () => {
    setScreen('booking');
  };

  const handlePlanTrip = async (formData) => {
    setTripDetails(formData);
    setScreen('results');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {screen === 'welcome' && <WelcomeScreen onBegin={handleBegin} />}
      {screen === 'booking' && <BookingForm onPlanTrip={handlePlanTrip} />}
      {screen === 'results' && <TripResultScreen tripDetails={tripDetails} />}
    </div>
  );
}

export default App;