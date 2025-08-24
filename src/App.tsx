import React, { useState } from 'react';
import Header from './components/Header';
import VotingPage from './components/VotingPage';
import ResultsPage from './components/ResultsPage';
import AuthModal from './components/AuthModal';
import { useAuth } from './hooks/useAuth';
import { useVoting } from './hooks/useVoting';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'voting' | 'results'>('voting');
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const { user, isAdmin, login, logout } = useAuth();
  const {
    films,
    songs,
    userVotes,
    userFavorites,
    voteForFilm,
    voteForSong,
    toggleFilmFavorite,
    toggleSongFavorite,
    loading
  } = useVoting(user);

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await login(email, password);
      if (result.error) {
        throw new Error(result.error.message);
      }
      setShowAuthModal(false);
    } catch (error) {
      throw error; // Re-throw to let AuthModal handle the error display
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentView('voting');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header
        user={user}
        isAdmin={isAdmin}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogin={() => setShowAuthModal(true)}
        onLogout={handleLogout}
      />
      
      {currentView === 'voting' ? (
        <VotingPage
          films={films}
          songs={songs}
          userVotes={userVotes}
          userFavorites={userFavorites}
          onVoteFilm={voteForFilm}
          onVoteSong={voteForSong}
          onToggleFilmFavorite={toggleFilmFavorite}
          onToggleSongFavorite={toggleSongFavorite}
        />
      ) : (
        <ResultsPage
          films={films}
          songs={songs}
        />
      )}
      
      {showAuthModal && (
        <AuthModal
          onLogin={handleLogin}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
};

export default App;