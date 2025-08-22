import React from 'react';
import { Film as FilmIcon, Music, Trophy, TrendingUp } from 'lucide-react';
import FilmCard from './FilmCard';
import SongCard from './SongCard';
import { Film, Song } from '../types';

interface ResultsPageProps {
  films: Film[];
  songs: Song[];
}

const ResultsPage: React.FC<ResultsPageProps> = ({ films, songs }) => {
  const sortedFilms = [...films].sort((a, b) => b.votes - a.votes);
  const sortedSongs = [...songs].sort((a, b) => b.votes - a.votes);
  
  const totalFilmVotes = films.reduce((sum, film) => sum + film.votes, 0);
  const totalSongVotes = songs.reduce((sum, song) => sum + song.votes, 0);
  const totalVotes = totalFilmVotes + totalSongVotes;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-xl">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-700 to-purple-700 bg-clip-text text-transparent tracking-wide">Competition Results</h1>
        </div>
        <p className="text-gray-600 text-xl">Live rankings based on community votes</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl mx-auto mb-3 shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-800">{totalVotes}</div>
          <div className="text-gray-600">Total Votes</div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-3 shadow-lg">
            <FilmIcon className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-800">{totalFilmVotes}</div>
          <div className="text-gray-600">Film Votes</div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 text-center shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl mx-auto mb-3 shadow-lg">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-800">{totalSongVotes}</div>
          <div className="text-gray-600">Song Votes</div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Films Results */}
        <section>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <FilmIcon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent tracking-wide">Films Leaderboard</h2>
          </div>
          
          <div className="space-y-6">
            {sortedFilms.map((film, index) => (
              <div key={film.id} className="relative">
                <FilmCard
                  film={film}
                  hasVoted={false}
                  isFavorited={false}
                  onVote={() => {}}
                  onToggleFavorite={() => {}}
                  showResults={true}
                  rank={index + 1}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Songs Results */}
        <section>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg">
              <Music className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-purple-700 bg-clip-text text-transparent tracking-wide">Songs Leaderboard</h2>
          </div>
          
          <div className="space-y-6">
            {sortedSongs.map((song, index) => (
              <div key={song.id} className="relative">
                <SongCard
                  song={song}
                  hasVoted={false}
                  isFavorited={false}
                  onVote={() => {}}
                  onToggleFavorite={() => {}}
                  showResults={true}
                  rank={index + 1}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Winners Spotlight */}
      {(sortedFilms[0]?.votes > 0 || sortedSongs[0]?.votes > 0) && (
        <section className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-4 tracking-wide">🏆 Current Winners 🏆</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sortedFilms[0]?.votes > 0 && (
              <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 backdrop-blur-xl rounded-3xl p-8 border border-yellow-400/30 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-orange-600 mb-2">Best Film</div>
                  <div className="text-4xl font-bold text-gray-800">{sortedFilms[0].film_id}</div>
                  <div className="text-gray-600">from {sortedFilms[0].center}</div>
                  <div className="text-orange-600 font-semibold mt-2">{sortedFilms[0].votes} votes</div>
                </div>
              </div>
            )}
            
            {sortedSongs[0]?.votes > 0 && (
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-purple-600 mb-2">Best Song</div>
                  <div className="text-4xl font-bold text-gray-800">{sortedSongs[0].song_id}</div>
                  <div className="text-gray-600">from {sortedSongs[0].center}</div>
                  <div className="text-purple-600 font-semibold mt-2">{sortedSongs[0].votes} votes</div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      </div>
    </div>
  );
};

export default ResultsPage;