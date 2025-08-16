export interface Film {
  id: string;
  film_id: string;
  center: string;
  dc_film_url: string;
  votes: number;
  favorites: number;
}

export interface Song {
  id: string;
  song_id: string;
  center: string;
  dc_song_url: string;
  votes: number;
  favorites: number;
}

export interface UserVotes {
  films: Set<string>;
  songs: Set<string>;
}

export interface UserFavorites {
  films: Set<string>;
  songs: Set<string>;
}