import React from 'react';
import { Film, Music, Trophy } from 'lucide-react';

interface HeaderProps {
  currentView: 'voting' | 'results';
  onViewChange: (view: 'voting' | 'results') => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-amber-400" />
              <Music className="w-8 h-8 text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">DC Creator Cut</h1>
          </div>
          
          <nav className="flex space-x-4">
            <button
              onClick={() => onViewChange('voting')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'voting'
                  ? 'bg-amber-500 text-slate-900'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Vote
            </button>
            <button
              onClick={() => onViewChange('results')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                currentView === 'results'
                  ? 'bg-amber-500 text-slate-900'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Results</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;