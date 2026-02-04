import React, { useState, useEffect } from 'react';
import { NavigationDrawer } from './components/NavigationDrawer';
import Quiz from './components/Quiz';
import StudyReader from './components/StudyReader';
import PredictedPaper from './components/PredictedPaper';
import TestReview from './components/TestReview';
import RecentActivity from './components/RecentActivity';
import { QuizMode, TestResult } from './types';
import { LATEST_UPDATES } from './constants';
import { hasValidApiKey } from './services/geminiService';

const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [quizConfig, setQuizConfig] = useState<{mode: QuizMode, subject: any} | null>(null);
  const [isConfigured, setIsConfigured] = useState(true);
  
  // History and Review State
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);
  const [reviewData, setReviewData] = useState<TestResult | null>(null);

  useEffect(() => {
    // Check if the environment is correctly set up on mount
    setIsConfigured(hasValidApiKey());
  }, []);

  const handleQuizComplete = (result: TestResult) => {
    setTestHistory(prev => [result, ...prev]);
    setQuizConfig(null);
  };

  // Router-like switch
  const renderContent = () => {
    switch(activeView) {
      case 'dashboard':
        return <Dashboard 
          onStartQuiz={(mode) => setQuizConfig({mode, subject: null})} 
          onNavigate={setActiveView} 
          history={testHistory}
          onReview={setReviewData}
        />;
      case 'syllabus':
        return <StudyReader />;
      case 'mocktest':
        return <Dashboard 
          onStartQuiz={(mode) => setQuizConfig({mode, subject: null})} 
          onNavigate={setActiveView} 
          history={testHistory}
          onReview={setReviewData}
        />; 
      case 'predicted':
        return <PredictedPaper />;
      case 'updates':
        return <UpdatesView />;
      default:
        return <Dashboard 
          onStartQuiz={(mode) => setQuizConfig({mode, subject: null})} 
          onNavigate={setActiveView} 
          history={testHistory}
          onReview={setReviewData}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* App Bar */}
      <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center px-4 justify-between sticky top-0 z-30">
        <button onClick={() => setIsDrawerOpen(true)} className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-white">
          <i className="fa-solid fa-bars text-xl"></i>
        </button>
        <h1 className="font-bold text-lg">OSSSC Master</h1>
        <div className="w-10"></div> {/* Spacer for center alignment */}
      </header>

      {/* Env Config Warning Banner */}
      {!isConfigured && (
        <div className="bg-yellow-600 text-white p-3 text-xs text-center font-bold sticky top-16 z-20 shadow-lg">
          <div className="flex items-center justify-center gap-2">
            <i className="fa-solid fa-triangle-exclamation text-lg"></i>
            <div className="flex flex-col">
              <span>Setup Required: API Key Missing.</span>
              <span className="font-normal opacity-90">Go to Netlify Site Settings &gt; Environment variables and add <code className="bg-black/20 px-1 rounded">VITE_API_KEY</code></span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Drawer */}
      <NavigationDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        onNavigate={setActiveView}
        activeView={activeView}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      {/* Quiz Modal Overlay */}
      {quizConfig && (
        <Quiz 
          subject={null} 
          mode={quizConfig.mode}
          onClose={() => setQuizConfig(null)}
          onComplete={handleQuizComplete} 
        />
      )}

      {/* Review Modal Overlay */}
      {reviewData && (
        <TestReview 
          data={reviewData}
          onClose={() => setReviewData(null)}
        />
      )}
    </div>
  );
};

// Sub-components for cleaner App.tsx
const Dashboard: React.FC<{
  onStartQuiz: (mode: QuizMode) => void, 
  onNavigate: (view: string) => void,
  history: TestResult[],
  onReview: (test: TestResult) => void
}> = ({ onStartQuiz, onNavigate, history, onReview }) => (
  <div className="p-4 space-y-6">
    {/* Welcome Card */}
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-2">Welcome, Aspirant!</h2>
      <p className="opacity-80 text-sm mb-6 max-w-xs">Your goal is OSSSC 2026. Start your preparation with our premium mock tests.</p>
      <div className="flex space-x-3">
        <button 
          onClick={() => onNavigate('syllabus')}
          className="bg-white text-blue-700 px-4 py-2 rounded-lg font-bold text-sm shadow hover:bg-blue-50 transition"
        >
          Start Reading
        </button>
        <button 
          onClick={() => onStartQuiz('Preliminary')}
          className="bg-blue-900/40 border border-blue-400/30 text-white px-4 py-2 rounded-lg font-bold text-sm backdrop-blur-sm hover:bg-blue-900/60 transition"
        >
          100 Marks Test
        </button>
      </div>
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-1 gap-4">
      <button 
        onClick={() => onStartQuiz('Main')}
        className="p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-blue-500 transition group text-left flex items-center space-x-4"
      >
        <div className="w-12 h-12 rounded-full bg-orange-900/50 flex items-center justify-center group-hover:bg-orange-600 transition shrink-0">
          <i className="fa-solid fa-file-pen text-orange-400 text-xl group-hover:text-white"></i>
        </div>
        <div>
          <h3 className="font-bold text-slate-200 text-lg">Main Mock Test</h3>
          <p className="text-sm text-slate-500">Full Length • 200 Marks • 3 Hours</p>
        </div>
        <div className="flex-1 text-right">
           <i className="fa-solid fa-chevron-right text-slate-600 group-hover:text-white transition"></i>
        </div>
      </button>
    </div>

    {/* Stats / Recent */}
    <RecentActivity history={history} onReview={onReview} />
  </div>
);

const UpdatesView: React.FC = () => (
  <div className="p-4">
    <h2 className="text-xl font-bold mb-4">Latest Notifications</h2>
    <div className="space-y-4">
      {LATEST_UPDATES.map(u => (
        <div key={u.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
           <div className="flex justify-between items-start mb-2">
             {u.isNew && <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">New</span>}
             <span className="text-xs text-slate-500">{u.date}</span>
           </div>
           <h3 className="font-semibold text-slate-200 mb-2">{u.title}</h3>
           <a href="#" className="text-blue-400 text-sm hover:underline">Download PDF <i className="fa-solid fa-arrow-right ml-1"></i></a>
        </div>
      ))}
      
      <div className="mt-6 pt-6 border-t border-slate-800 text-center">
        <a 
          href="https://www.osssc.gov.in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-slate-400 hover:text-white transition"
        >
          <span>Visit Official Website</span>
          <i className="fa-solid fa-external-link-alt text-xs"></i>
        </a>
      </div>
    </div>
  </div>
);

export default App;