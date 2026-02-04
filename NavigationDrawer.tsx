import React from 'react';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
  activeView: string;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ isOpen, onClose, onNavigate, activeView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-home' },
    { id: 'syllabus', label: 'Syllabus & Reader', icon: 'fa-book-open' },
    { id: 'mocktest', label: 'Mock Test Engine', icon: 'fa-edit' },
    { id: 'predicted', label: 'Predicted Papers (AI)', icon: 'fa-wand-magic-sparkles' },
    { id: 'updates', label: 'Latest Updates', icon: 'fa-bell' },
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-slate-900 text-white z-50 shadow-2xl drawer-transition transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <i className="fa-solid fa-graduation-cap text-xl"></i>
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">OSSSC Master</h2>
              <p className="text-xs text-slate-400">2026 Edition</p>
              <p className="text-[10px] text-slate-500 font-medium mt-1">Developed by Asim Mohanty</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl transition-all ${
                activeView === item.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-6`}></i>
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-6 border-t border-slate-800">
          <p className="text-center text-xs text-slate-500">Version 2.0.2 (Beta)</p>
        </div>
      </div>
    </>
  );
};