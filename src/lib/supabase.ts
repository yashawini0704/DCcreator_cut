import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      films: {
        Row: {
          id: string;
          film_id: string;
          center: string;
          dc_film_url: string;
          votes: number;
          favorites: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          film_id: string;
          center: string;
          dc_film_url: string;
          votes?: number;
          favorites?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          film_id?: string;
          center?: string;
          dc_film_url?: string;
          votes?: number;
          favorites?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      songs: {
        Row: {
          id: string;
          song_id: string;
          center: string;
          dc_song_url: string;
          votes: number;
          favorites: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          song_id: string;
          center: string;
          dc_song_url: string;
          votes?: number;
          favorites?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          song_id?: string;
          center?: string;
          dc_song_url?: string;
          votes?: number;
          favorites?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_votes: {
        Row: {
          id: string;
          user_id: string;
          item_type: 'film' | 'song';
          item_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          item_type: 'film' | 'song';
          item_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          item_type?: 'film' | 'song';
          item_id?: string;
          created_at?: string;
        };
      };
      user_favorites: {
        Row: {
          id: string;
          user_id: string;
          item_type: 'film' | 'song';
          item_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          item_type: 'film' | 'song';
          item_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          item_type?: 'film' | 'song';
          item_id?: string;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          department: string | null;
          center: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          department?: string | null;
          center?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          department?: string | null;
          center?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};