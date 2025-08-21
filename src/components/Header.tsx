import React from 'react';
import { Film, Music, Trophy, User, LogOut } from 'lucide-react';
import { User as UserType } from '@supabase/supabase-js';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  currentView: 'voting' | 'results';
  onViewChange: (view: 'voting' | 'results') => void;
  user: UserType | null;
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, user, onAuthClick }) => {
  const { signOut } = useAuth();

  const isAdmin = user?.email === 'admin@gmail.com';

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-blue-600" />
              <Music className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">DC Creator Cut</h1>
          </div>
          
          <nav className="flex space-x-4">
            <button
              onClick={() => onViewChange('voting')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentView === 'voting'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Vote
            </button>
            {isAdmin && (
              <button
                onClick={() => onViewChange('results')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  currentView === 'results'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
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
                <div className="flex items-center space-x-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
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