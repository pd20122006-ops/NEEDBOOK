
import React from 'react';
import { AppView, UserTag, Language } from '../types';
import { translations } from '../translations';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setView: (view: AppView) => void;
  title: string;
  darkMode: boolean;
  toggleDarkMode: () => void;
  userTag?: UserTag;
  points?: number;
  language: Language;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, setView, title, darkMode, toggleDarkMode, userTag, points, language }) => {
  const t = translations[language];

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
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {activeView !== 'home' && activeView !== 'verify' && (
            <button onClick={() => setView('home')} className="mr-2 text-gray-400">
              <i className="fas fa-chevron-left text-lg"></i>
            </button>
          )}
          <div className="flex flex-col">
            <Logo size={28} variant="full" />
            {userTag && (
              <div className="flex items-center space-x-1 mt-0.5 ml-1">
                <span className={`w-1.5 h-1.5 rounded-full ${getTagColor(userTag)}`}></span>
                <span className="text-[9px] font-black tracking-tight text-gray-400 uppercase">{userTag} • {points} pts</span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setView('buddy')}
            className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${activeView === 'buddy' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-gray-100'}`}
            title={t.buddy}
          >
            <i className="fas fa-robot text-lg"></i>
          </button>
          <button 
            onClick={toggleDarkMode}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-100 transition-colors"
            title="Toggle Dark Mode"
          >
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 dark:bg-gray-900">
        <div className="px-4 pt-4">
           <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2">{title}</h2>
        </div>
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-100 dark:border-gray-700 flex justify-around p-2 pb-4 z-50 transition-colors duration-200">
        <NavItem 
          icon="fas fa-home" 
          label={t.home} 
          active={activeView === 'home'} 
          onClick={() => setView('home')} 
        />
        <NavItem 
          icon="fas fa-plus-circle" 
          label={t.request} 
          active={activeView === 'request'} 
          onClick={() => setView('request')} 
        />
        <NavItem 
          icon="fas fa-tags" 
          label={t.list} 
          active={activeView === 'list'} 
          onClick={() => setView('list')} 
        />
        <NavItem 
          icon="fas fa-search" 
          label={t.matches} 
          active={activeView === 'matches'} 
          onClick={() => setView('matches')} 
        />
        <NavItem 
          icon="fas fa-medal" 
          label={t.rewards} 
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
    className={`flex flex-col items-center p-2 space-y-1 transition-all rounded-xl ${active ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}
  >
    <i className={`${icon} text-lg`}></i>
    <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
  </button>
);

export default Layout;
