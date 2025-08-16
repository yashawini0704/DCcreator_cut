import React from 'react';
import { Film as FilmIcon, Music, Users, Heart } from 'lucide-react';
import FilmCard from './FilmCard';
import SongCard from './SongCard';
import { Film, Song, UserVotes, UserFavorites } from '../types';

interface VotingPageProps {
  films: Film[];
  songs: Song[];
  userVotes: UserVotes;
  userFavorites: UserFavorites;
  onVoteFilm: (filmId: string) => void;
  onVoteSong: (songId: string) => void;
  onToggleFilmFavorite: (filmId: string) => void;
  onToggleSongFavorite: (songId: string) => void;
}

const VotingPage: React.FC<VotingPageProps> = ({
  films,
  songs,
  userVotes,
  userFavorites,
  onVoteFilm,
  onVoteSong,
  onToggleFilmFavorite,
  onToggleSongFavorite,
}) => {
  const totalVotes = userVotes.films.size + userVotes.songs.size;
  const totalFavorites = userFavorites.films.size + userFavorites.songs.size;
  
  // Check if user has voted in each category
  const hasVotedForFilm = userVotes.films.size > 0;
  const hasVotedForSong = userVotes.songs.size > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Cast Your Vote</h2>
          <p className="text-slate-300 text-lg">Choose your favorite DC films and soundtrack pieces</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-3">
              <FilmIcon className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">{films.length}</div>
            <div className="text-slate-300">Films</div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-3">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">{songs.length}</div>
            <div className="text-slate-300">Songs</div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-amber-500 rounded-lg mx-auto mb-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">{totalVotes}</div>
            <div className="text-slate-300">Your Votes</div>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-500 rounded-lg mx-auto mb-3">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">{totalFavorites}</div>
            <div className="text-slate-300">Favorites</div>
          </div>
        </div>
      </div>

      {/* Films Section */}
      <section className="mb-16">
        <div className="flex items-center space-x-3 mb-8">
          <FilmIcon className="w-8 h-8 text-amber-400" />
          <h2 className="text-3xl font-bold text-white">Films</h2>
          <div className="text-slate-400">
            {hasVotedForFilm ? '(✓ Voted)' : '(Choose 1 film)'}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {films.map((film) => (
            <FilmCard
              key={film.id}
              film={film}
              hasVoted={userVotes.films.has(film.id)}
              isFavorited={userFavorites.films.has(film.id)}
              onVote={onVoteFilm}
              onToggleFavorite={onToggleFilmFavorite}
            />
          ))}
        </div>
      </section>

      {/* Songs Section */}
      <section>
        <div className="flex items-center space-x-3 mb-8">
          <Music className="w-8 h-8 text-amber-400" />
          <h2 className="text-3xl font-bold text-white">Soundtrack</h2>
          <div className="text-slate-400">
            {hasVotedForSong ? '(✓ Voted)' : '(Choose 1 song)'}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              hasVoted={userVotes.songs.has(song.id)}
              isFavorited={userFavorites.songs.has(song.id)}
              onVote={onVoteSong}
              onToggleFavorite={onToggleSongFavorite}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default VotingPage;