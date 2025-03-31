// src/services/apiServices.js

// OpenAI API service
export const getOpenAIRecommendation = async (tripData) => {
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-1106",
        messages: [
          {
            role: "system",
            content:
              "You are a travel agent assistant. Provide flight and hotel recommendations.",
          },
          {
            role: "user",
            content: `I need recommendations for a trip from ${tripData.flyingFrom} to ${tripData.flyingTo}. 
            Travel dates: ${tripData.fromDate} to ${tripData.toDate}.
            Number of travelers: ${tripData.travelers}.
            Budget: $${tripData.budget}.
            Please provide a flight recommendation (with airline and any layovers) and a hotel recommendation.`,
          },
        ],
        functions: [
          {
            name: "getTravelRecommendations",
            description:
              "Get flight and hotel recommendations based on trip details",
            parameters: {
              type: "object",
              properties: {
                flight: {
                  type: "object",
                  properties: {
                    recommendation: {
                      type: "string",
                      description:
                        "Flight recommendation with airline and layover information",
                    },
                  },
                  required: ["recommendation"],
                },
                hotel: {
                  type: "object",
                  properties: {
                    recommendation: {
                      type: "string",
                      description:
                        "Hotel recommendation with location information",
                    },
                  },
                  required: ["recommendation"],
                },
              },
              required: ["flight", "hotel"],
            },
          },
        ],
        function_call: { name: "getTravelRecommendations" },
      }),
    });

    const data = await response.json();
    const functionCall = data.choices[0].message.function_call;

    if (functionCall && functionCall.name === "getTravelRecommendations") {
      return JSON.parse(functionCall.arguments);
    }

    throw new Error("Failed to get recommendations from OpenAI");
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
};

// OpenWeather API service
export const getWeatherForecast = async (city) => {
  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  try {
    // Get coordinates for the city
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
        city
      )}&limit=1&appid=${API_KEY}`
    );
    const geoData = await geoResponse.json();

    if (!geoData || geoData.length === 0) {
      throw new Error(`Could not find coordinates for ${city}`);
    }

    const { lat, lon } = geoData[0];

    // Get weather forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    const forecastData = await forecastResponse.json();

    if (!forecastData || !forecastData.list) {
      throw new Error(`Could not get weather forecast for ${city}`);
    }

    // Calculate average min and max temperatures for the forecast period
    const temperatures = forecastData.list.map((item) => item.main.temp);
    const minTemp = Math.floor(Math.min(...temperatures));
    const maxTemp = Math.ceil(Math.max(...temperatures));

    return {
      description: `You can expect the weather to be quite mild. Low will be ${minTemp}° and high will be ${maxTemp}°`,
    };
  } catch (error) {
    console.error("Error calling OpenWeather API:", error);
    throw error;
  }
};
