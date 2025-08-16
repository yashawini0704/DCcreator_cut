export interface Film {
  id: string;
  title: string;
  director: string;
  year: number;
  poster?: string;
  votes: number;
  favorites: number;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string;
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