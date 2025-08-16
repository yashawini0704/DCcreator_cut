import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import VotingPage from './components/VotingPage';
import ResultsPage from './components/ResultsPage';
import { Film, Song, UserVotes, UserFavorites } from './types';
import { films as initialFilms, songs as initialSongs } from './data/mockData';

function App() {
  const [currentView, setCurrentView] = useState<'voting' | 'results'>('voting');
  const [films, setFilms] = useState<Film[]>(initialFilms);
  const [songs, setSongs] = useState<Song[]>(initialSongs);
  const [userVotes, setUserVotes] = useState<UserVotes>({
    films: new Set(),
    songs: new Set(),
  });
  const [userFavorites, setUserFavorites] = useState<UserFavorites>({
    films: new Set(),
    songs: new Set(),
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedFilms = localStorage.getItem('dcCreatorCut_films');
    const savedSongs = localStorage.getItem('dcCreatorCut_songs');
    const savedVotes = localStorage.getItem('dcCreatorCut_userVotes');
    const savedFavorites = localStorage.getItem('dcCreatorCut_userFavorites');

    if (savedFilms) {
      setFilms(JSON.parse(savedFilms));
    }
    if (savedSongs) {
      setSongs(JSON.parse(savedSongs));
    }
    if (savedVotes) {
      const votes = JSON.parse(savedVotes);
      setUserVotes({
        films: new Set(votes.films),
        songs: new Set(votes.songs),
      });
    }
    if (savedFavorites) {
      const favorites = JSON.parse(savedFavorites);
      setUserFavorites({
        films: new Set(favorites.films),
        songs: new Set(favorites.songs),
      });
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('dcCreatorCut_films', JSON.stringify(films));
  }, [films]);

  useEffect(() => {
    localStorage.setItem('dcCreatorCut_songs', JSON.stringify(songs));
  }, [songs]);

  useEffect(() => {
    localStorage.setItem('dcCreatorCut_userVotes', JSON.stringify({
      films: Array.from(userVotes.films),
      songs: Array.from(userVotes.songs),
    }));
  }, [userVotes]);

  useEffect(() => {
    localStorage.setItem('dcCreatorCut_userFavorites', JSON.stringify({
      films: Array.from(userFavorites.films),
      songs: Array.from(userFavorites.songs),
    }));
  }, [userFavorites]);

  const handleVoteFilm = (filmId: string) => {
    if (!userVotes.films.has(filmId)) {
      setFilms(prev => prev.map(film => 
        film.id === filmId ? { ...film, votes: film.votes + 1 } : film
      ));
      setUserVotes(prev => ({
        ...prev,
        films: new Set([...prev.films, filmId])
      }));
    }
  };

  const handleVoteSong = (songId: string) => {
    if (!userVotes.songs.has(songId)) {
      setSongs(prev => prev.map(song => 
        song.id === songId ? { ...song, votes: song.votes + 1 } : song
      ));
      setUserVotes(prev => ({
        ...prev,
        songs: new Set([...prev.songs, songId])
      }));
    }
  };

  const handleToggleFilmFavorite = (filmId: string) => {
    const newFavorites = new Set(userFavorites.films);
    if (newFavorites.has(filmId)) {
      newFavorites.delete(filmId);
      setFilms(prev => prev.map(film => 
        film.id === filmId ? { ...film, favorites: Math.max(0, film.favorites - 1) } : film
      ));
    } else {
      newFavorites.add(filmId);
      setFilms(prev => prev.map(film => 
        film.id === filmId ? { ...film, favorites: film.favorites + 1 } : film
      ));
    }
    setUserFavorites(prev => ({
      ...prev,
      films: newFavorites
    }));
  };

  const handleToggleSongFavorite = (songId: string) => {
    const newFavorites = new Set(userFavorites.songs);
    if (newFavorites.has(songId)) {
      newFavorites.delete(songId);
      setSongs(prev => prev.map(song => 
        song.id === songId ? { ...song, favorites: Math.max(0, song.favorites - 1) } : song
      ));
    } else {
      newFavorites.add(songId);
      setSongs(prev => prev.map(song => 
        song.id === songId ? { ...song, favorites: song.favorites + 1 } : song
      ));
    }
    setUserFavorites(prev => ({
      ...prev,
      songs: newFavorites
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      {currentView === 'voting' ? (
        <VotingPage
          films={films}
          songs={songs}
          userVotes={userVotes}
          userFavorites={userFavorites}
          onVoteFilm={handleVoteFilm}
          onVoteSong={handleVoteSong}
          onToggleFilmFavorite={handleToggleFilmFavorite}
          onToggleSongFavorite={handleToggleSongFavorite}
        />
      ) : (
        <ResultsPage films={films} songs={songs} />
      )}
    </div>
  );
}

export default App;