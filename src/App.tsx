import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VotingPage from './components/VotingPage';
import ResultsPage from './components/ResultsPage';
import AuthModal from './components/AuthModal';
import { useAuth } from './hooks/useAuth';
import { useVoting } from './hooks/useVoting';

function App() {
  const [currentView, setCurrentView] = useState<'voting' | 'results'>('voting');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { 
    films, 
    songs, 
    userVotes, 
    userFavorites, 
    loading: votingLoading, 
    voteForItem, 
    toggleFavorite 
  } = useVoting(user?.id);


  // Redirect non-admin users away from results page
  useEffect(() => {
    if (currentView === 'results' && !isAdmin) {
      setCurrentView('voting');
    }
  }, [currentView, isAdmin]);

  const handleVoteFilm = async (filmId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    try {
      await voteForItem('film', filmId);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleVoteSong = async (songId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    try {
      await voteForItem('song', songId);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleToggleFilmFavorite = async (filmId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    try {
      await toggleFavorite('film', filmId);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleToggleSongFavorite = async (songId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    try {
      await toggleFavorite('song', songId);
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (authLoading || votingLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-white text-xl font-medium">Loading...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView}
        user={user}
        onAuthClick={() => setShowAuthModal(true)}
      />
      
      {currentView === 'voting' ? (
        <VotingPage
          films={films}
          songs={songs}
          userVotes={userVotes}
          userFavorites={userFavorites}
          onVoteFilm={handleVoteFilm}
          onVoteSong={handleVoteSong}
          onToggleFilmFavorite={handleToggleFilmFavorite}
          isAdmin={isAdmin}
          onToggleSongFavorite={handleToggleSongFavorite}
        />
      ) : (
        <ResultsPage films={films} songs={songs} />
      )}
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
}

export default App;