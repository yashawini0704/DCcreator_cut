import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Film, Song } from '../types';

export const useVoting = (userId: string | undefined) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [userVotes, setUserVotes] = useState<{ films: Set<string>; songs: Set<string> }>({
    films: new Set(),
    songs: new Set(),
  });
  const [userFavorites, setUserFavorites] = useState<{ films: Set<string>; songs: Set<string> }>({
    films: new Set(),
    songs: new Set(),
  });
  const [loading, setLoading] = useState(true);

  // Fetch films and songs
  const fetchData = async () => {
    try {
      const [filmsResponse, songsResponse] = await Promise.all([
        supabase.from('films').select('*').order('film_id'),
        supabase.from('songs').select('*').order('song_id'),
      ]);

      if (filmsResponse.error) throw filmsResponse.error;
      if (songsResponse.error) throw songsResponse.error;

      setFilms(filmsResponse.data || []);
      setSongs(songsResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch user votes and favorites
  const fetchUserData = async () => {
    if (!userId) {
      setUserVotes({ films: new Set(), songs: new Set() });
      setUserFavorites({ films: new Set(), songs: new Set() });
      return;
    }

    try {
      const [votesResponse, favoritesResponse] = await Promise.all([
        supabase
          .from('user_votes')
          .select('item_type, item_id')
          .eq('user_id', userId),
        supabase
          .from('user_favorites')
          .select('item_type, item_id')
          .eq('user_id', userId),
      ]);

      if (votesResponse.error) throw votesResponse.error;
      if (favoritesResponse.error) throw favoritesResponse.error;

      const votes = { films: new Set<string>(), songs: new Set<string>() };
      const favorites = { films: new Set<string>(), songs: new Set<string>() };

      votesResponse.data?.forEach((vote) => {
        if (vote.item_type === 'film') {
          votes.films.add(vote.item_id);
        } else {
          votes.songs.add(vote.item_id);
        }
      });

      favoritesResponse.data?.forEach((favorite) => {
        if (favorite.item_type === 'film') {
          favorites.films.add(favorite.item_id);
        } else {
          favorites.songs.add(favorite.item_id);
        }
      });

      setUserVotes(votes);
      setUserFavorites(favorites);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchData(), fetchUserData()]);
      setLoading(false);
    };

    loadData();
  }, [userId]);

  const voteForItem = async (itemType: 'film' | 'song', itemId: string) => {
    if (!userId) {
      throw new Error('You must be signed in to vote');
    }

    try {
      const { data, error } = await supabase.rpc('vote_for_item', {
        p_item_type: itemType,
        p_item_id: itemId,
      });

      if (error) throw error;

      // Update local state
      if (itemType === 'film') {
        setUserVotes(prev => ({
          ...prev,
          films: new Set([...prev.films, itemId])
        }));
        setFilms(prev => prev.map(film => 
          film.id === itemId ? { ...film, votes: film.votes + 1 } : film
        ));
      } else {
        setUserVotes(prev => ({
          ...prev,
          songs: new Set([...prev.songs, itemId])
        }));
        setSongs(prev => prev.map(song => 
          song.id === itemId ? { ...song, votes: song.votes + 1 } : song
        ));
      }

      return data;
    } catch (error) {
      console.error('Error voting:', error);
      throw error;
    }
  };

  const toggleFavorite = async (itemType: 'film' | 'song', itemId: string) => {
    if (!userId) {
      throw new Error('You must be signed in to favorite items');
    }

    try {
      const { data, error } = await supabase.rpc('toggle_favorite', {
        p_item_type: itemType,
        p_item_id: itemId,
      });

      if (error) throw error;

      // Update local state
      const isCurrentlyFavorited = itemType === 'film' 
        ? userFavorites.films.has(itemId)
        : userFavorites.songs.has(itemId);

      if (itemType === 'film') {
        const newFavorites = new Set(userFavorites.films);
        if (isCurrentlyFavorited) {
          newFavorites.delete(itemId);
        } else {
          newFavorites.add(itemId);
        }
        setUserFavorites(prev => ({ ...prev, films: newFavorites }));
        setFilms(prev => prev.map(film => 
          film.id === itemId 
            ? { ...film, favorites: isCurrentlyFavorited ? film.favorites - 1 : film.favorites + 1 }
            : film
        ));
      } else {
        const newFavorites = new Set(userFavorites.songs);
        if (isCurrentlyFavorited) {
          newFavorites.delete(itemId);
        } else {
          newFavorites.add(itemId);
        }
        setUserFavorites(prev => ({ ...prev, songs: newFavorites }));
        setSongs(prev => prev.map(song => 
          song.id === itemId 
            ? { ...song, favorites: isCurrentlyFavorited ? song.favorites - 1 : song.favorites + 1 }
            : song
        ));
      }

      return data;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  };

  return {
    films,
    songs,
    userVotes,
    userFavorites,
    loading,
    voteForFilm: (filmId: string) => voteForItem('film', filmId),
    voteForSong: (songId: string) => voteForItem('song', songId),
    toggleFilmFavorite: (filmId: string) => toggleFavorite('film', filmId),
    toggleSongFavorite: (songId: string) => toggleFavorite('song', songId),
    refetch: () => Promise.all([fetchData(), fetchUserData()]),
  };
};