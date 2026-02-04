import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-700 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="fa-solid fa-graduation-cap text-2xl"></i>
          <h1 className="text-xl font-bold">OSSSC Prep 2026</h1>
        </div>
        <a 
          href="https://www.osssc.gov.in" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs bg-white text-blue-700 px-3 py-1 rounded-full font-semibold hover:bg-blue-50 transition"
        >
          Official Site <i className="fa-solid fa-external-link-alt ml-1"></i>
        </a>
      </div>
    </header>
  );
};

export default Header;