
import React from 'react';
import { AppView, UserTag } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setView: (view: AppView) => void;
  title: string;
  darkMode: boolean;
  toggleDarkMode: () => void;
  userTag?: UserTag;
  points?: number;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView, title, darkMode, toggleDarkMode, userTag, points }) => {
  const getTagColor = (tag: UserTag) => {
    switch (tag) {
      case 'Book Starter': return 'bg-green-500';
      case 'Helpful Reader': return 'bg-blue-500';
      case 'Campus Contributor': return 'bg-purple-500';
      case 'Study Hero': return 'bg-orange-500';
      case 'Book Champion': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white dark:bg-gray-900 shadow-2xl relative transition-colors duration-200">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-blue-600 dark:bg-blue-800 text-white p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {activeView !== 'home' && activeView !== 'verify' && (
            <button onClick={() => setView('home')} className="mr-2">
              <i className="fas fa-chevron-left text-lg"></i>
            </button>
          )}
          <div className="flex flex-col">
            <h1 className="text-xl font-bold leading-tight">NeedBook</h1>
            {userTag && (
              <div className="flex items-center space-x-1">
                <span className={`w-2 h-2 rounded-full ${getTagColor(userTag)} animate-pulse`}></span>
                <span className="text-[10px] font-bold tracking-tight opacity-90">{userTag} • {points} pts</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setView('buddy')}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${activeView === 'buddy' ? 'bg-white text-blue-600' : 'hover:bg-blue-700 dark:hover:bg-blue-900'}`}
            title="Ask Buddy"
          >
            <i className="fas fa-robot text-lg"></i>
          </button>
          <button 
            onClick={toggleDarkMode}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
            title="Toggle Dark Mode"
          >
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
          </button>
          <button className="relative" onClick={() => setView('rewards')}>
            <i className="fas fa-trophy text-xl text-yellow-300"></i>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 dark:bg-gray-900">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex justify-around p-2 z-50 transition-colors duration-200">
        <NavItem 
          icon="fas fa-home" 
          label="Home" 
          active={activeView === 'home'} 
          onClick={() => setView('home')} 
        />
        <NavItem 
          icon="fas fa-plus-circle" 
          label="Request" 
          active={activeView === 'request'} 
          onClick={() => setView('request')} 
        />
        <NavItem 
          icon="fas fa-tags" 
          label="List" 
          active={activeView === 'list'} 
          onClick={() => setView('list')} 
        />
        <NavItem 
          icon="fas fa-search" 
          label="Matches" 
          active={activeView === 'matches'} 
          onClick={() => setView('matches')} 
        />
        <NavItem 
          icon="fas fa-medal" 
          label="Rewards" 
          active={activeView === 'rewards'} 
          onClick={() => setView('rewards')} 
        />
      </nav>
    </div>
  );
};

const NavItem: React.FC<{ icon: string; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center p-2 space-y-1 transition-colors ${active ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}
  >
    <i className={`${icon} text-lg`}></i>
    <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
  </button>
);

export default Layout;
