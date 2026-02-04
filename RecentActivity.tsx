import React from 'react';
import { TestResult } from '../types';

interface RecentActivityProps {
  history: TestResult[];
  onReview: (test: TestResult) => void;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ history, onReview }) => {
  if (history.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
        <i className="fa-solid fa-history text-2xl mb-2 text-gray-300"></i>
        <p>No tests taken yet. Start practicing!</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <i className="fa-solid fa-clock-rotate-left mr-2 text-blue-500"></i> Recent Activity
      </h2>
      <div className="space-y-3">
        {history.slice(0, 5).map((test) => (
          <button 
            key={test.id} 
            onClick={() => onReview(test)}
            className="w-full text-left flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition group"
          >
            <div>
              <p className="font-semibold text-gray-800 text-sm group-hover:text-blue-600">{test.subject || test.mode}</p>
              <p className="text-xs text-gray-500">{test.date}</p>
            </div>
            <div className="flex items-center">
              <div className={`text-sm font-bold mr-3 ${test.score > (test.totalQuestions / 2) ? 'text-green-600' : 'text-orange-500'}`}>
                {test.score} / {test.totalQuestions}
              </div>
              <i className="fa-solid fa-chevron-right text-xs text-gray-300 group-hover:text-blue-400"></i>
            </div>
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-gray-400 mt-3">Click on a test to review answers</p>
    </div>
  );
};

export default RecentActivity;