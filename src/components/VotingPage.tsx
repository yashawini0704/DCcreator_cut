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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-700 to-purple-700 bg-clip-text text-transparent mb-4 tracking-wide">Cast Your Vote</h2>
          <p className="text-gray-600 text-xl">Choose your favorite DC films and soundtrack pieces</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-3 shadow-lg">
              <FilmIcon className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{films.length}</div>
            <div className="text-gray-600">Films</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mx-auto mb-3 shadow-lg">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{songs.length}</div>
            <div className="text-gray-600">Songs</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl mx-auto mb-3 shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{totalVotes}</div>
            <div className="text-gray-600">Your Votes</div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl mx-auto mb-3 shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-800">{totalFavorites}</div>
            <div className="text-gray-600">Favorites</div>
          </div>
        </div>
      </div>

      {/* Films Section */}
      <section className="mb-16">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
            <FilmIcon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent tracking-wide">Films</h2>
          <div className="text-gray-600 text-lg font-medium">
            {hasVotedForFilm ? '(✓ Voted)' : '(Choose 1 film)'}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {films.map((film) => (
            <FilmCard
              key={film.id}
              film={film}
              hasVoted={hasVotedForFilm}
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
          <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
            <Music className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-purple-700 bg-clip-text text-transparent tracking-wide">Soundtrack</h2>
          <div className="text-gray-600 text-lg font-medium">
            {hasVotedForSong ? '(✓ Voted)' : '(Choose 1 song)'}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              hasVoted={hasVotedForSong}
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