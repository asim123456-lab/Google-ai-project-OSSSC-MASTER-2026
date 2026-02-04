import { GoogleGenAI } from "@google/genai";
import { Question, Subject } from "../types";

// Failsafe API Key retrieval to prevent runtime crashes on Netlify/Browsers
const getApiKey = (): string => {
  let key = '';
  
  // Method 1: Vite / Netlify Environment Variables (Standard)
  try {
    // Fix: Cast import.meta to any to avoid TS error 'Property env does not exist on type ImportMeta'
    const meta = import.meta as any;
    if (meta && meta.env && meta.env.VITE_API_KEY) {
      key = meta.env.VITE_API_KEY;
    }
  } catch (e) {
    // Ignore ReferenceErrors
  }

  // Method 2: Global Window Object (Fallback for direct injection)
  if (!key) {
    try {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.VITE_API_KEY) {
         // @ts-ignore
         key = window.VITE_API_KEY;
      }
    } catch (e) {}
  }

  // Method 3: Process.env (Fallback for older build tools)
  if (!key) {
    try {
      if (typeof process !== 'undefined' && process.env) {
        if (process.env.REACT_APP_API_KEY) key = process.env.REACT_APP_API_KEY;
        if (process.env.VITE_API_KEY) key = process.env.VITE_API_KEY;
        if (process.env.API_KEY) key = process.env.API_KEY;
      }
    } catch (e) {}
  }

  return key;
};

const apiKey = getApiKey();

// Initialize AI only if key exists to prevent immediate crash
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Helper to let the UI know if the app is ready
export const hasValidApiKey = (): boolean => !!apiKey;

// Use the recommended model for text tasks
const MODEL_NAME = 'gemini-3-flash-preview';

// Cache for system instruction
const SYSTEM_INSTRUCTION = `You are 'OSSSC Master', the ultimate authority on Odisha Sub-ordinate Staff Selection Commission exams (RI, ARI, AMIN, PEO, Forest Guard) for 2026.
Your tone is professional, strict, encouraging, and highly focused on accuracy. You do not waste words.
When generating questions, they must be challenging and strictly adhere to the OSSSC exam pattern (Odisha context is crucial for GK).
When answering doubts, explain concepts clearly like a senior professor.
When asked for questions, output STRICT JSON format compatible with the app's structure.
Focus on the 2026 Syllabus: 1/3 Negative Marking logic is applied by the app, but you provide the questions.
Difficulty: Moderate to High. Ensure variety in topics within the subject.`;

export const generateAIResponse = async (prompt: string): Promise<string> => {
  if (!ai) return "⚠️ Configuration Error: API Key missing. Please set 'VITE_API_KEY' in Netlify Environment Variables.";

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME, 
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + " Provide short, helpful explanations for doubts."
      }
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Connection Error: Unable to reach AI services. Please check your internet connection and API key quotas.";
  }
};

export const generatePredictedPaper = async (subject: Subject, count: number = 100): Promise<Question[]> => {
  if (!ai) {
    console.warn("API Key missing. Cannot generate paper.");
    return [];
  }

  // Optimized prompt for large batch generation with Random Seed to ensure uniqueness
  const prompt = `Act as 'OSSSC Master'. Generate ${count} unique, high-quality multiple-choice questions for OSSSC ${subject} subject.
  Cover different topics from the 2026 syllabus. Ensure questions are not repetitive.
  Random Seed: ${Math.random()}_${Date.now()}
  Return ONLY a JSON array. Do not use Markdown code blocks. Keep JSON compact.
  Format:
  [
    {
      "id": "ai_unique_id",
      "question": "Question text",
      "options": ["Op1", "Op2", "Op3", "Op4"],
      "correctAnswer": 0,
      "explanation": "Short explanation",
      "subject": "${subject}"
    }
  ]`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
         responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) return [];
    
    // Parse JSON
    const questions = JSON.parse(text);
    // Add isAiGenerated flag
    return questions.map((q: any, idx: number) => ({
      ...q,
      id: `ai_${subject}_${Date.now()}_${idx}`,
      isAiGenerated: true,
      subject: subject
    }));

  } catch (error) {
    console.error(`Predicted Paper Error (${subject}):`, error);
    return [];
  }
};

export const generateFullMockPaper = async (onProgress?: (msg: string) => void): Promise<Question[]> => {
  if (!ai) {
    if(onProgress) onProgress("Error: API Key Missing in Settings.");
    return [];
  }

  const distribution = [
     { subject: Subject.GeneralStudies, count: 20 },
     { subject: Subject.Mathematics, count: 15 },
     { subject: Subject.LogicalReasoning, count: 15 },
     { subject: Subject.English, count: 15 },
     { subject: Subject.Odia, count: 15 },
     { subject: Subject.Computer, count: 20 }
  ];

  const allQuestions: Question[] = [];

  try {
     const promises = distribution.map(async (d) => {
        if(onProgress) onProgress(`OSSSC Master is preparing ${d.subject}...`);
        return await generatePredictedPaper(d.subject, d.count);
     });

     const results = await Promise.all(promises);
     results.forEach(qs => allQuestions.push(...qs));
     
  } catch (e) {
    console.error("Full Mock Generation Error", e);
  }

  // Shuffle the final combined list using Fisher-Yates for better AI randomness
  for (let i = allQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
  }

  return allQuestions;
};