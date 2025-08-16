import React from 'react';
import { Heart, Star, Clock, Disc } from 'lucide-react';
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
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative">
      {rank && (
        <div className="absolute top-4 right-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
            rank === 1 ? 'bg-yellow-500 text-slate-900' :
            rank === 2 ? 'bg-gray-400 text-slate-900' :
            rank === 3 ? 'bg-amber-600 text-white' :
            'bg-slate-600 text-white'
          }`}>
            {rank}
          </div>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-xl font-bold text-white line-clamp-2 flex-1 mr-4">{song.title}</h3>
        <span className="text-xs text-slate-400 font-mono bg-slate-700 px-2 py-1 rounded shrink-0">
          {song.id}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-slate-300">
          <Disc className="w-4 h-4" />
          <span className="text-sm">{song.artist}</span>
        </div>
        {song.album && (
          <div className="text-sm text-slate-400 ml-6">{song.album}</div>
        )}
        <div className="flex items-center space-x-2 text-slate-300">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{song.duration}</span>
        </div>
      </div>

      {showResults && (
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">Votes: {song.votes}</span>
            <span className="text-slate-300">Favorites: {song.favorites}</span>
          </div>
        </div>
      )}

      {!showResults && (
        <div className="flex space-x-3">
          <button
            onClick={() => onVote(song.id)}
            disabled={hasVoted}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
              hasVoted
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-600 text-slate-900'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>{hasVoted ? 'Voted' : 'Vote'}</span>
          </button>
          
          <button
            onClick={() => onToggleFavorite(song.id)}
            className={`px-4 py-3 rounded-lg transition-colors ${
              isFavorited
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SongCard;