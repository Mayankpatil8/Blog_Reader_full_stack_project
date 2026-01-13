import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash",   // ✅ USE THIS MODEL
    contents: prompt,
  });

  return response.text;
}

export default main;
