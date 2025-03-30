// components/WelcomeScreen.jsx
import React from 'react';

function WelcomeScreen({ onBegin }) {
  return (
    <div className="text-center">
      <div className="mb-8">
        <svg width="200" height="200" className="mx-auto">
          <circle cx="100" cy="100" r="90" fill="#E6F2F2" />
          <path d="M100 60 L80 100 L120 100 Z" fill="#4A90E2" /> {/* Cat ears */}
          <circle cx="90" cy="90" r="10" fill="white" /> {/* Left eye */}
          <circle cx="110" cy="90" r="10" fill="white" /> {/* Right eye */}
          <circle cx="100" cy="120" r="30" fill="#4A90E2" /> {/* Body */}
        </svg>
      </div>
      <button 
        onClick={onBegin}
        className="bg-green-500 text-white px-8 py-3 rounded-full text-lg hover:bg-green-600 transition"
      >
        Let's Begin
      </button>
    </div>
  );
}

export default WelcomeScreen;