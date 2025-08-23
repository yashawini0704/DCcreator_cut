import React from 'react';
import { Film as FilmIcon, Music, Users, Heart } from 'lucide-react';
import FilmCard from './components/FilmCard';
import SongCard from './components/SongCard';
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-wide">Cast Your Vote</h2>
          <p className="text-gray-300 text-xl">Choose your favorite DC films and soundtrack pieces</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-slate-800/80 to-gray-800/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-2xl border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl mx-auto mb-3 shadow-lg shadow-cyan-500/30">
              <FilmIcon className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">{films.length}</div>
            <div className="text-gray-300">Films</div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/80 to-gray-800/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mx-auto mb-3 shadow-lg shadow-purple-500/30">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">{songs.length}</div>
            <div className="text-gray-300">Songs</div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/80 to-gray-800/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-2xl border border-white/10 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl mx-auto mb-3 shadow-lg shadow-emerald-500/30">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">{totalVotes}</div>
            <div className="text-gray-300">Your Votes</div>
          </div>
          
          <div className="bg-gradient-to-br from-slate-800/80 to-gray-800/80 backdrop-blur-lg rounded-2xl p-6 text-center shadow-2xl border border-white/10 hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl mx-auto mb-3 shadow-lg shadow-pink-500/30">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-white">{totalFavorites}</div>
            <div className="text-gray-300">Favorites</div>
          </div>
        </div>
      </div>

      {/* Films Section */}
      <section className="mb-16">
        <div className="flex items-center space-x-3 mb-8">
          <FilmIcon className="w-8 h-8 text-cyan-400 drop-shadow-lg" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent tracking-wide">Films</h2>
          <div className="text-gray-400 text-lg">
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
          <Music className="w-8 h-8 text-purple-400 drop-shadow-lg" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wide">Soundtrack</h2>
          <div className="text-gray-400 text-lg">
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
    </div>
  );
};

export default VotingPage;