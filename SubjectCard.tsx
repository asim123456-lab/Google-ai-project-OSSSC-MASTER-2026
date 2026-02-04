import React from 'react';
import { Subject } from '../types';

interface SubjectCardProps {
  subject: Subject;
  icon: string;
  color: string;
  onClick: () => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, icon, color, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-100 w-full`}
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color} text-white mb-3 text-2xl`}>
        <i className={icon}></i>
      </div>
      <h3 className="font-semibold text-gray-800 text-center">{subject}</h3>
      <span className="text-xs text-gray-500 mt-1">Tap to practice</span>
    </button>
  );
};

export default SubjectCard;