import React, { useState } from 'react';
import { Subject, Question } from '../types';
import { generatePredictedPaper, generateFullMockPaper } from '../services/geminiService';
import Quiz from './Quiz';

const PredictedPaper: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[] | null>(null);
  const [quizMode, setQuizMode] = useState<"Subject" | "Preliminary">("Subject");
  const [selectedSub, setSelectedSub] = useState<Subject | null>(null);

  const handleGenerateSubject = async (subject: Subject) => {
    setSelectedSub(subject);
    setQuizMode("Subject");
    setLoading(true);
    setLoadingMsg(`AI is generating 100 ${subject} questions as OSSSC Master...`);
    // Increased to 100 questions per subject as requested
    const questions = await generatePredictedPaper(subject, 100); 
    setGeneratedQuestions(questions);
    setLoading(false);
  };

  const handleGenerateFullMock = async () => {
    setSelectedSub(null); // Mixed
    setQuizMode("Preliminary");
    setLoading(true);
    setLoadingMsg("AI is generating full mock test papers...");
    
    // Pass a callback to update status (optional based on service implementation)
    const questions = await generateFullMockPaper((msg) => setLoadingMsg(msg));
    
    setGeneratedQuestions(questions);
    setLoading(false);
  };

  if (generatedQuestions) {
    return (
      <Quiz 
        subject={selectedSub}
        mode={quizMode === "Preliminary" ? "Preliminary" : "Subject"}
        questions={generatedQuestions}
        onClose={() => setGeneratedQuestions(null)}
        onComplete={() => {}} 
      />
    );
  }

  return (
    <div className="p-6">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 mb-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">AI Predicted Papers</h2>
          <p className="opacity-90 text-sm mb-4">
            Gemini AI acts as OSSSC Master to analyze the 2026 syllabus and generate high-yield questions instantly.
          </p>
          
          <button 
            onClick={handleGenerateFullMock}
            disabled={loading}
            className="mt-4 bg-white text-violet-700 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-violet-50 transition flex items-center"
          >
            {loading && quizMode === "Preliminary" ? (
              <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Generating Full Paper...</>
            ) : (
              <><i className="fa-solid fa-layer-group mr-2"></i> Generate Full Mock (100 Qs)</>
            )}
          </button>
        </div>
        <i className="fa-solid fa-wand-magic-sparkles absolute -right-4 -bottom-4 text-9xl opacity-20"></i>
      </div>

      <h3 className="text-white font-bold mb-4">Subject Practice Sets (100 Qs):</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.values(Subject).map((sub) => (
          <button
            key={sub}
            onClick={() => handleGenerateSubject(sub)}
            disabled={loading}
            className={`bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-violet-500 transition text-left group ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-200 font-semibold text-sm group-hover:text-violet-400">{sub}</span>
              {loading && selectedSub === sub ? (
                <i className="fa-solid fa-circle-notch fa-spin text-violet-500"></i>
              ) : (
                <i className="fa-solid fa-arrow-right text-slate-600 group-hover:text-violet-500"></i>
              )}
            </div>
          </button>
        ))}
      </div>
      
      {loading && (
        <div className="mt-8 text-center p-6 bg-slate-800 rounded-xl border border-slate-700">
          <i className="fa-solid fa-robot text-4xl text-violet-500 mb-4 animate-bounce"></i>
          <h4 className="text-white font-bold text-lg mb-1">OSSSC Master is Working...</h4>
          <p className="text-violet-300 text-sm animate-pulse">{loadingMsg || "Analyzing patterns..."}</p>
          <p className="text-xs text-slate-500 mt-2">Generating questions based on 2026 patterns. Please wait...</p>
        </div>
      )}
    </div>
  );
};

export default PredictedPaper;