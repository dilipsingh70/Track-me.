
import { GoogleGenAI } from "@google/genai";

// FIX: Initialize GoogleGenAI with process.env.API_KEY directly and remove unnecessary check, per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

type ProgressData = {
    date: string;
    maxWeight: number;
    totalVolume: number;
    maxReps: number;
};

export const analyzeProgress = async (exerciseName: string, data: ProgressData[]): Promise<string> => {
    const model = 'gemini-2.5-flash';
    
    const dataString = data.map(d => 
        `On ${d.date}: Max Weight: ${d.maxWeight}kg, Max Reps: ${d.maxReps}, Total Volume: ${d.totalVolume}kg`
    ).join('\n');

    const prompt = `
        You are a helpful and encouraging fitness coach. Analyze the user's workout progress for the exercise "${exerciseName}".
        Provide brief, actionable feedback.
        - Comment on their consistency and progression in weight and reps.
        - Identify any potential plateaus.
        - Suggest one or two tips for improvement (e.g., varying rep ranges, improving form, or a nutrition tip).
        - Keep the tone positive and motivating.
        - The response should be concise, around 3-4 short paragraphs.

        Here is the user's data:
        ${dataString}
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to get analysis from AI service.");
    }
};
