// src/components/WelcomeScreen.jsx
import React from "react";

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 h-screen">
      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16"
            viewBox="0 0 100 100"
          >
            <circle cx="50" cy="50" r="40" fill="#a8d5e5" />
            <path
              d="M65,55 C65,55 68,59 71,59 C74,59 77,56 77,56"
              stroke="#333"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="40" cy="45" r="3.5" fill="#333" />
            <circle cx="60" cy="45" r="3.5" fill="#333" />
            <path
              d="M30,35 L40,30 L50,35"
              stroke="#333"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M50,35 L60,30 L70,35"
              stroke="#333"
              strokeWidth="1.5"
              fill="none"
            />
            <path d="M50,55 L45,65 L55,65 Z" fill="#333" />
            <path
              d="M25,55 C25,70 35,80 50,80 C65,80 75,70 75,55 C75,40 65,25 50,25 C35,25 25,40 25,55 Z"
              stroke="#1e4e5f"
              strokeWidth="3"
              fill="none"
            />
            <path d="M75,65 L80,65 L85,70 L85,80 L75,80 Z" fill="#1e4e5f" />
          </svg>
        </div>
      </div>
      <button
        onClick={onStart}
        className="mt-6 w-full bg-emerald-400 hover:bg-emerald-500 text-black py-3 px-6 rounded-full text-lg font-medium transition-colors"
      >
        Let's Begin
      </button>
    </div>
  );
};

export default WelcomeScreen;
