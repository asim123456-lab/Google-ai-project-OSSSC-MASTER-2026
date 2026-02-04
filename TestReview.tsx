import React from 'react';
import { TestResult } from '../types';

interface TestReviewProps {
  data: TestResult;
  onClose: () => void;
}

const TestReview: React.FC<TestReviewProps> = ({ data, onClose }) => {
  const { questions, userAnswers, score, totalQuestions, correctCount, wrongCount } = data;

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 p-4 border-b border-slate-700 sticky top-0 z-10 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-700 text-slate-300">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="font-bold text-white text-sm">Test Review</h2>
            <p className="text-xs text-slate-400">{data.date} • {data.mode}</p>
          </div>
        </div>
        <div className="text-xl font-bold text-blue-400">
          {score} <span className="text-xs text-slate-500">/ {totalQuestions}</span>
        </div>
      </div>

      <div className="flex-1 p-4 max-w-3xl mx-auto w-full">
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
           <div className="bg-green-900/20 p-3 rounded-lg border border-green-800 text-center">
             <div className="text-xl font-bold text-green-400">{correctCount}</div>
             <div className="text-[10px] uppercase text-green-300 tracking-wider">Correct</div>
           </div>
           <div className="bg-red-900/20 p-3 rounded-lg border border-red-800 text-center">
             <div className="text-xl font-bold text-red-400">{wrongCount}</div>
             <div className="text-[10px] uppercase text-red-300 tracking-wider">Wrong</div>
           </div>
           <div className="bg-slate-700/30 p-3 rounded-lg border border-slate-600 text-center">
             <div className="text-xl font-bold text-slate-300">{totalQuestions - (correctCount + wrongCount)}</div>
             <div className="text-[10px] uppercase text-slate-400 tracking-wider">Unattempted</div>
           </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {questions.map((q, idx) => {
            const userAns = userAnswers[idx];
            const isCorrect = userAns === q.correctAnswer;
            const isSkipped = userAns === undefined;
            
            let borderClass = "border-slate-700";
            let bgClass = "bg-slate-800";
            let statusIcon = <span className="text-slate-500 text-xs"><i className="fa-solid fa-minus mr-1"></i> Skipped</span>;
            
            if (!isSkipped) {
              if (isCorrect) {
                borderClass = "border-green-600";
                bgClass = "bg-green-900/10";
                statusIcon = <span className="text-green-500 text-xs font-bold"><i className="fa-solid fa-check mr-1"></i> Correct</span>;
              } else {
                borderClass = "border-red-600";
                bgClass = "bg-red-900/10";
                statusIcon = <span className="text-red-500 text-xs font-bold"><i className="fa-solid fa-xmark mr-1"></i> Wrong</span>;
              }
            }

            return (
              <div key={idx} className={`p-4 rounded-xl border ${borderClass} ${bgClass} relative overflow-hidden`}>
                <div className="flex justify-between items-start mb-3">
                  <span className="inline-block bg-slate-900 text-slate-400 text-xs px-2 py-1 rounded mb-2">Q.{idx + 1}</span>
                  {statusIcon}
                </div>
                
                <h3 className="font-medium text-slate-200 mb-4">{q.question}</h3>
                
                <div className="space-y-2 mb-4">
                  {q.options.map((opt, optIdx) => {
                    let optStyle = "border-slate-700 text-slate-400 opacity-60";
                    let icon = null;

                    if (optIdx === q.correctAnswer) {
                      optStyle = "border-green-500 bg-green-500/10 text-green-400 font-semibold opacity-100";
                      icon = <i className="fa-solid fa-check ml-2"></i>;
                    } else if (optIdx === userAns) {
                      optStyle = "border-red-500 bg-red-500/10 text-red-400 font-semibold opacity-100";
                      icon = <i className="fa-solid fa-xmark ml-2"></i>;
                    }

                    return (
                      <div key={optIdx} className={`p-2 rounded border text-sm flex justify-between items-center ${optStyle}`}>
                        <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                        {icon}
                      </div>
                    );
                  })}
                </div>

                <div className="bg-slate-900/60 p-3 rounded-lg text-xs border border-slate-700">
                  <p className="text-blue-400 font-bold mb-1">Explanation:</p>
                  <p className="text-slate-300">{q.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default TestReview;