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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Trophy className="w-12 h-12 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">Competition Results</h1>
        </div>
        <p className="text-gray-600 text-lg">Live rankings based on community votes</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-lg mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalVotes}</div>
          <div className="text-gray-600">Total Votes</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-3">
            <FilmIcon className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalFilmVotes}</div>
          <div className="text-gray-600">Film Votes</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-3">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalSongVotes}</div>
          <div className="text-gray-600">Song Votes</div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Films Results */}
        <section>
          <div className="flex items-center space-x-3 mb-8">
            <FilmIcon className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Films Leaderboard</h2>
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
            <Music className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Songs Leaderboard</h2>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">🏆 Current Winners 🏆</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sortedFilms[0]?.votes > 0 && (
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl p-8 border border-blue-500/30">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-blue-600 mb-2">Best Film</div>
                  <div className="text-4xl font-bold text-gray-900">{sortedFilms[0].film_id}</div>
                  <div className="text-gray-600">from {sortedFilms[0].center}</div>
                  <div className="text-blue-600 font-semibold mt-2">{sortedFilms[0].votes} votes</div>
                </div>
              </div>
            )}
            
            {sortedSongs[0]?.votes > 0 && (
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/30">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-purple-400 mb-2">Best Song</div>
                  <div className="text-4xl font-bold text-gray-900">{sortedSongs[0].song_id}</div>
                  <div className="text-gray-600">from {sortedSongs[0].center}</div>
                  <div className="text-purple-400 font-semibold mt-2">{sortedSongs[0].votes} votes</div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResultsPage;