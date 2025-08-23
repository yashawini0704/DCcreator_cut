import React from 'react';
import { Film, Music, Trophy, User, LogOut } from 'lucide-react';
import { User as UserType } from '@supabase/supabase-js';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  currentView: 'voting' | 'results';
  onViewChange: (view: 'voting' | 'results') => void;
  user: UserType | null;
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, user, isAdmin, onLogin, onLogout }) => {

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
                <Music className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-wide">DC Creator's cut</h1>
          </div>
          
          <nav className="flex space-x-4">
            <button
              onClick={() => onViewChange('voting')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'voting'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30 transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 backdrop-blur-sm'
              }`}
            >
              Vote
            </button>
            {isAdmin && (
              <button
                onClick={() => onViewChange('results')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  currentView === 'results'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30 transform scale-105'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 backdrop-blur-sm'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>Results</span>
              </button>
            )}
          </nav>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-gray-100/80 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700 font-medium">{user.email}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 backdrop-blur-sm rounded-lg transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transform hover:scale-105"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;