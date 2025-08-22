import React from 'react';
import { Heart, Star, Music } from 'lucide-react';
import { Song } from '../types';

interface SongCardProps {
  song: Song;
  hasVoted: boolean;
  isFavorited: boolean;
  onVote: (songId: string) => void;
  onToggleFavorite: (songId: string) => void;
  showResults?: boolean;
  rank?: number;
}

const SongCard: React.FC<SongCardProps> = ({
  song,
  hasVoted,
  isFavorited,
  onVote,
  onToggleFavorite,
  showResults = false,
  rank,
}) => {
  return (
    <div className="group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20 hover:border-purple-300/50">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
      
      {rank && (
        <div className="absolute top-6 right-6 z-10">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg shadow-xl backdrop-blur-sm border-2 ${
            rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white border-yellow-300 shadow-yellow-500/50' :
            rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white border-gray-200 shadow-gray-400/50' :
            rank === 3 ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white border-orange-300 shadow-orange-500/50' :
            'bg-gradient-to-br from-slate-400 to-gray-600 text-white border-slate-300 shadow-slate-500/50'
          }`}>
            {rank}
          </div>
        </div>
      )}
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-purple-700 bg-clip-text text-transparent tracking-wide flex-1 mr-4">
            {song.song_id}
          </h3>
          <span className="text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg shrink-0">
            {song.center}
          </span>
        </div>
        
        <div className="mb-8">
          <a
            href={song.dc_song_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-all duration-300 group/link font-medium"
          >
            <Music className="w-5 h-5 group-hover/link:scale-110 group-hover/link:rotate-12 transition-transform duration-300" />
            <span>Play Song</span>
          </a>
        </div>

        {showResults && (
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between bg-gray-50/80 backdrop-blur-sm rounded-2xl p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Votes: {song.votes}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700 font-medium">Favorites: {song.favorites}</span>
              </div>
            </div>
          </div>
        )}

        {!showResults && (
          <div className="flex space-x-4">
            <button
              onClick={() => onVote(song.id)}
              disabled={hasVoted}
              className={`flex-1 flex items-center justify-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg ${
                hasVoted
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white cursor-not-allowed shadow-emerald-500/30'
                  : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95'
              }`}
            >
              <Star className="w-5 h-5" />
              <span>{hasVoted ? 'Voted' : 'Vote'}</span>
            </button>
            
            <button
              onClick={() => onToggleFavorite(song.id)}
              className={`px-6 py-4 rounded-2xl transition-all duration-300 shadow-lg ${
                isFavorited
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-400 hover:to-red-400 text-white shadow-pink-500/30 hover:shadow-pink-500/50'
                  : 'bg-gray-100/80 hover:bg-gray-200/80 text-gray-600 hover:text-gray-800 backdrop-blur-sm border border-gray-200/50 hover:border-pink-300/50'
              } transform hover:scale-105 active:scale-95`}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SongCard;