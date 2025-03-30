// services/openaiService.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getOpenAITripSuggestion(tripDetails) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful travel assistant providing personalized trip suggestions."
        },
        {
          role: "user",
          content: `Provide a personalized trip suggestion for a trip from ${tripDetails.fromCity} to ${tripDetails.toCity} 
          between ${tripDetails.fromDate} and ${tripDetails.toDate} with a budget of $${tripDetails.budget}. 
          Include recommendations for activities, dining, and must-visit locations.`
        }
      ]
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    return "Unable to generate trip suggestion at the moment.";
  }
}