// src/components/WelcomeScreen.jsx
import React from "react";
import cat from "../assets/cat.jpg";

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 h-screen">
      <div>
        <img src={cat} alt="Cat" className="w-16 h-16 rounded-full" />
      </div>
      <div>
        <button
          onClick={onStart}
          className="mt-6 w-full bg-emerald-400 hover:bg-emerald-500 text-black py-3 px-6 rounded-full text-lg font-medium transition-colors"
        >
          Let's Begin
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
