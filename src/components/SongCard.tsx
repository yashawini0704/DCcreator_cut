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
    <div className="group relative bg-gradient-to-br from-slate-800/90 via-gray-800/90 to-slate-900/90 backdrop-blur-lg rounded-2xl p-6 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:-translate-y-2 border border-white/10 hover:border-purple-500/30">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
      
      {rank && (
        <div className="absolute top-4 right-4 z-10">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-2xl backdrop-blur-sm border-2 ${
            rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-900 border-yellow-300 shadow-yellow-500/50' :
            rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-slate-900 border-gray-200 shadow-gray-400/50' :
            rank === 3 ? 'bg-gradient-to-br from-amber-600 to-orange-600 text-white border-orange-400 shadow-orange-500/50' :
            'bg-gradient-to-br from-slate-600 to-gray-700 text-white border-slate-400 shadow-slate-500/50'
          }`}>
            {rank}
          </div>
        </div>
      )}
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent tracking-wide flex-1 mr-4">
            {song.song_id}
          </h3>
          <span className="text-xs font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent bg-purple-400/10 px-3 py-1 rounded-full border border-purple-400/30 backdrop-blur-sm shrink-0">
            {song.center}
          </span>
        </div>
        
        <div className="mb-6">
          <a
            href={song.dc_song_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-all duration-300 group/link"
          >
            <Music className="w-4 h-4 group-hover/link:scale-110 group-hover/link:rotate-12 transition-transform duration-300" />
            <span className="text-sm font-medium">Play Song</span>
          </a>
        </div>

        {showResults && (
          <div className="mb-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300 text-sm">Votes: {song.votes}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-pink-400" />
                <span className="text-gray-300 text-sm">Favorites: {song.favorites}</span>
              </div>
            </div>
          </div>
        )}

        {!showResults && (
          <div className="flex space-x-3">
            <button
              onClick={() => onVote(song.id)}
              disabled={hasVoted}
              className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                hasVoted
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white cursor-not-allowed shadow-lg shadow-emerald-500/30'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95'
              }`}
            >
              <Star className="w-5 h-5" />
              <span>{hasVoted ? 'Voted' : 'Vote'}</span>
            </button>
            
            <button
              onClick={() => onToggleFavorite(song.id)}
              className={`px-4 py-3 rounded-xl transition-all duration-300 shadow-lg ${
                isFavorited
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-400 hover:to-red-400 text-white shadow-pink-500/30 hover:shadow-pink-500/50'
                  : 'bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white backdrop-blur-sm border border-white/10 hover:border-pink-400/30'
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