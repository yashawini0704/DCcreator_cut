import React from 'react';
import { Heart, Star, Calendar, User } from 'lucide-react';
import { Film } from '../types';

interface FilmCardProps {
  film: Film;
  hasVoted: boolean;
  isFavorited: boolean;
  onVote: (filmId: string) => void;
  onToggleFavorite: (filmId: string) => void;
  showResults?: boolean;
  rank?: number;
}

const FilmCard: React.FC<FilmCardProps> = ({
  film,
  hasVoted,
  isFavorited,
  onVote,
  onToggleFavorite,
  showResults = false,
  rank,
}) => {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {rank && (
        <div className="absolute top-4 left-4 z-10">
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
      
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={film.poster}
          alt={film.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-white line-clamp-2">{film.film_id}</h3>
          <span className="text-xs text-slate-400 font-mono bg-slate-700 px-2 py-1 rounded">
            {film.center}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-300">
              <User className="w-4 h-4" />
              <span className="text-sm">Center: {film.center}</span>
            </div>
            <a
              href={film.dc_film_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-400 hover:text-amber-300 underline"
            >
              View Film
            </a>
          </div>
        </div>

        {showResults && (
          <div className="mb-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300">Votes: {film.votes}</span>
              <span className="text-slate-300">Favorites: {film.favorites}</span>
            </div>
          </div>
        )}

        {!showResults && (
          <div className="flex space-x-3">
            <button
              onClick={() => onVote(film.id)}
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
              onClick={() => onToggleFavorite(film.id)}
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
    </div>
  );
};

export default FilmCard;