import React from 'react';
import { Heart, Star, ExternalLink, Music } from 'lucide-react';
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
    <div className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 rounded-xl p-6 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-1 relative border border-gray-700">
      {rank && (
        <div className="absolute top-4 right-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg ${
            rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-900' :
            rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-slate-900' :
            rank === 3 ? 'bg-gradient-to-br from-amber-600 to-orange-600 text-white' :
            'bg-gradient-to-br from-gray-600 to-gray-700 text-white'
          }`}>
            {rank}
          </div>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-bold text-white tracking-wide flex-1 mr-4">{song.song_id}</h3>
        <span className="text-xs text-amber-400 font-mono bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 shrink-0">
          {song.center}
        </span>
      </div>
      
      <div className="mb-6">
        <a
          href={song.dc_song_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors group"
        >
          <Music className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Play Song</span>
        </a>
      </div>

      {showResults && (
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-gray-300 text-sm">Votes: {song.votes}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-400" />
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
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              hasVoted
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white cursor-not-allowed shadow-lg'
                : 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-900 shadow-lg hover:shadow-amber-500/30 transform hover:scale-105'
            }`}
          >
            <Star className="w-5 h-5" />
            <span className="font-semibold">{hasVoted ? 'Voted' : 'Vote'}</span>
          </button>
          
          <button
            onClick={() => onToggleFavorite(song.id)}
            className={`px-4 py-3 rounded-lg transition-all duration-200 shadow-lg ${
              isFavorited
                ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white shadow-red-500/30'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white'
            } transform hover:scale-105`}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SongCard;