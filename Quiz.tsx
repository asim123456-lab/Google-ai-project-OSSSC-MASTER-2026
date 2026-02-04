import React, { useState, useEffect } from 'react';
import { Question, Subject, TestResult, QuizMode } from '../types';
import { MOCK_QUESTIONS } from '../constants';
import TestReview from './TestReview';

interface QuizProps {
  subject: Subject | null;
  mode: QuizMode;
  questions?: Question[]; // Optional direct injection (for AI papers)
  onClose: () => void;
  onComplete: (result: TestResult) => void;
}

const Quiz: React.FC<QuizProps> = ({ subject, mode, questions: injectedQuestions, onClose, onComplete }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({}); // Map qIndex -> selectedOption
  const [showResult, setShowResult] = useState(false);
  const [resultData, setResultData] = useState<TestResult | null>(null);
  const [viewingReview, setViewingReview] = useState(false);
  
  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    let qList: Question[] = [];

    if (injectedQuestions && injectedQuestions.length > 0) {
      qList = [...injectedQuestions]; // Create a copy
    } else {
      if (mode === 'Subject' && subject) {
        qList = MOCK_QUESTIONS.filter(q => q.subject === subject);
      } else {
        // Full pool for Prelim/Main
        qList = [...MOCK_QUESTIONS]; 
      }
    }

    // CRITICAL: Fisher-Yates Shuffle for true randomization on every attempt
    for (let i = qList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [qList[i], qList[j]] = [qList[j], qList[i]];
    }

    // If Mode is 'Preliminary' (100 Marks/Questions) or 'Main', we ensure we hit the target count.
    let targetCount = qList.length;
    if (mode === 'Preliminary') targetCount = 100;
    if (mode === 'Main') targetCount = 200; // Increased from 180 to 200
    
    // For Subject specific, we now allow up to 100 questions as requested
    if (mode === 'Subject' && targetCount > 100) targetCount = 100; 

    // Simulation logic to fill up to targetCount if we don't have enough mock questions
    // This ensures user always gets the requested number of questions even if DB is small
    if (qList.length > 0 && qList.length < targetCount) {
      const originalPool = [...qList];
      while (qList.length < targetCount) {
        // Pick random from original pool to fill gaps for the simulation
        const randomQ = originalPool[Math.floor(Math.random() * originalPool.length)];
        // Create a copy with a new temporary ID to allow unique key rendering
        const duplicateQ = { ...randomQ, id: `${randomQ.id}_sim_${qList.length}` };
        qList.push(duplicateQ);
      }
    } else if (qList.length > targetCount) {
      // If we have MORE questions than needed, we slice the RANDOMIZED list
      // This ensures "different questions every time" as requested because we shuffled first
      qList = qList.slice(0, targetCount);
    }
    
    setQuestions(qList);

    // Set Timer: 
    // Preliminary: 100 Qs -> 1.5 Hours (90 mins)
    // Main: 200 Qs -> 3 Hours (180 mins)
    let durationSeconds = qList.length * 60; // Default 1 min/question
    if (mode === 'Preliminary') durationSeconds = 90 * 60; // 1.5 Hours
    if (mode === 'Main') durationSeconds = 180 * 60; // 3 Hours for 200 Qs (Speed test)

    setTimeLeft(durationSeconds);

  }, [subject, mode, injectedQuestions]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showResult && questions.length > 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft, showResult, questions]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleOptionSelect = (idx: number) => {
    // Practice Mode: Lock answer once selected to show Red/Green feedback
    if (answers[currentQIndex] !== undefined) return;

    setSelectedOption(idx);
    setAnswers(prev => ({ ...prev, [currentQIndex]: idx }));
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      // Restore selection if already answered
      const nextAnswer = answers[currentQIndex + 1];
      setSelectedOption(nextAnswer !== undefined ? nextAnswer : null);
    }
  };

  const handleSkip = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      const nextAnswer = answers[currentQIndex + 1];
      setSelectedOption(nextAnswer !== undefined ? nextAnswer : null);
    }
  };

  const handlePrev = () => {
    if (currentQIndex > 0) {
      setCurrentQIndex(prev => prev - 1);
      const prevAnswer = answers[currentQIndex - 1];
      setSelectedOption(prevAnswer !== undefined ? prevAnswer : null);
    }
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    let wrong = 0;

    questions.forEach((q, idx) => {
      const userAns = answers[idx];
      if (userAns !== undefined) {
        if (userAns === q.correctAnswer) {
          correct++;
        } else {
          wrong++;
        }
      }
    });

    // 0.33 Negative Marking Logic
    const rawScore = (correct * 1) - (wrong * 0.33);
    const finalScore = Math.max(0, parseFloat(rawScore.toFixed(2)));

    const result: TestResult = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      score: finalScore,
      totalQuestions: questions.length,
      correctCount: correct,
      wrongCount: wrong,
      mode: mode,
      subject: subject || undefined,
      questions: questions, // Snapshotted questions
      userAnswers: answers   // Saved answers
    };

    setResultData(result);
    onComplete(result);
    setShowResult(true);
  };

  if (questions.length === 0) return <div className="p-10 text-center text-white">Loading Test...</div>;

  if (showResult && resultData) {
    if (viewingReview) {
      return (
        <TestReview 
          data={resultData} 
          onClose={onClose} 
        />
      );
    }

    // Reuse the UI logic for immediate result view
    return (
      <div className="fixed inset-0 bg-slate-900 z-50 overflow-y-auto">
        <div className="p-6 max-w-2xl mx-auto">
          <div className="bg-slate-800 rounded-2xl p-8 text-center mb-6 border border-slate-700">
             <i className="fa-solid fa-award text-5xl text-yellow-500 mb-4"></i>
             <h2 className="text-2xl font-bold text-white mb-2">Test Submitted!</h2>
             <div className="text-6xl font-black text-blue-500 mb-2">{resultData.score}</div>
             <p className="text-slate-400 mb-6">Total Marks / {questions.length}</p>
             
             <div className="grid grid-cols-3 gap-4 mb-6">
               <div className="bg-green-900/30 p-3 rounded-lg border border-green-800">
                 <div className="text-2xl font-bold text-green-400">{resultData.correctCount}</div>
                 <div className="text-xs text-green-300">Correct</div>
               </div>
               <div className="bg-red-900/30 p-3 rounded-lg border border-red-800">
                 <div className="text-2xl font-bold text-red-400">{resultData.wrongCount}</div>
                 <div className="text-xs text-red-300">Wrong</div>
               </div>
               <div className="bg-slate-700/50 p-3 rounded-lg border border-slate-600">
                 <div className="text-2xl font-bold text-slate-300">{questions.length - (resultData.correctCount + resultData.wrongCount)}</div>
                 <div className="text-xs text-slate-400">Skipped</div>
               </div>
             </div>

             <div className="space-y-3">
               <button 
                onClick={() => setViewingReview(true)} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold transition flex items-center justify-center"
               >
                 <i className="fa-solid fa-list-check mr-2"></i> Review Answers & Explanations
               </button>
               
               <button onClick={onClose} className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-bold transition">
                 Return to Dashboard
               </button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQIndex];
  const isAnswered = answers[currentQIndex] !== undefined;

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col h-full text-white">
      {/* Header */}
      <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
        <div>
          <h2 className="font-bold text-sm text-slate-300 uppercase tracking-wide">{mode} Test</h2>
          <div className="text-xs text-slate-500">Negative Marking: 0.33</div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-slate-700 px-3 py-1 rounded-full text-sm font-mono text-yellow-400">
            <i className="fa-regular fa-clock mr-2"></i>{formatTime(timeLeft)}
          </div>
          <button onClick={handleSubmitQuiz} className="text-sm bg-green-600 px-3 py-1 rounded hover:bg-green-700 transition">
            Submit
          </button>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full">
        <div className="mb-4 flex justify-between text-sm text-slate-400">
          <span>Question {currentQIndex + 1} of {questions.length}</span>
          <span>{subject || 'Mixed'}</span>
        </div>

        <div className="text-lg font-medium mb-6 leading-relaxed">
          {currentQ.question}
        </div>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = answers[currentQIndex] === idx;
            const isCorrect = currentQ.correctAnswer === idx;
            
            let btnClass = "border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-750";
            let markerClass = "border-slate-600 text-slate-500";
            let icon = null;

            if (isAnswered) {
              if (isCorrect) {
                // Show Correct (Green)
                btnClass = "border-green-500 bg-green-900/20 text-green-100";
                markerClass = "border-green-400 text-green-400";
                icon = <i className="fa-solid fa-check text-green-400"></i>;
              } else if (isSelected) {
                // Show Wrong Selected (Red)
                btnClass = "border-red-500 bg-red-900/20 text-red-100";
                markerClass = "border-red-400 text-red-400";
                icon = <i className="fa-solid fa-xmark text-red-400"></i>;
              } else {
                 // Other options
                 btnClass = "border-slate-800 bg-slate-800/50 text-slate-600 opacity-60";
              }
            } else if (selectedOption === idx) {
               // Temporary selection (though currently we lock immediately)
               btnClass = "border-blue-500 bg-blue-900/20 text-blue-200";
               markerClass = "border-blue-400 text-blue-400";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${btnClass}`}
              >
                <div className="flex items-center">
                  <span className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 text-xs shrink-0 ${markerClass}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </div>
                {icon}
              </button>
            );
          })}
        </div>
        
        {/* Explanation Box (Visible after answering) */}
        {isAnswered && (
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl animate-fade-in">
            <h4 className="text-blue-400 font-bold text-xs uppercase mb-1">OSSSC Master's Note:</h4>
            <p className="text-blue-100 text-sm">{currentQ.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="bg-slate-800 p-4 border-t border-slate-700">
        <div className="flex justify-between items-center max-w-2xl mx-auto gap-4">
          <button 
            onClick={handlePrev} 
            disabled={currentQIndex === 0}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition ${currentQIndex === 0 ? 'text-slate-600 cursor-not-allowed bg-slate-900' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
          >
            <i className="fa-solid fa-chevron-left mr-2 text-xs"></i> Prev
          </button>
          
          <button 
            onClick={handleSkip}
            disabled={currentQIndex === questions.length - 1}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition ${currentQIndex === questions.length - 1 ? 'hidden' : 'bg-slate-700 text-yellow-400 hover:bg-slate-600'}`}
          >
            Skip <i className="fa-solid fa-forward ml-2 text-xs"></i>
          </button>

          <button 
            onClick={handleNext}
            className="flex-1 px-4 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition"
          >
             {currentQIndex === questions.length - 1 ? 'Finish' : <>Next <i className="fa-solid fa-chevron-right ml-2 text-xs"></i></>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;