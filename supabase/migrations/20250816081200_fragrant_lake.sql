/*
  # Update songs table schema to match backend structure

  1. Schema Changes
    - Add `song_id` column (text, unique identifier like DCSO1, DCSO2, etc.)
    - Add `center` column (text, for location/center like TNP, KOLLU, KAUP, etc.)
    - Add `dc_song_url` column (text, for Google Drive/Suno links)
    - Remove old columns that don't match: title, artist, album, duration
    - Keep votes, favorites, created_at, updated_at

  2. Data Migration
    - Clear existing sample data
    - The new structure will be populated separately

  3. Security
    - Maintain existing RLS policies
    - Update indexes for new columns
*/

-- First, drop existing indexes that reference old columns
DROP INDEX IF EXISTS songs_artist_idx;

-- Add new columns to songs table
DO $$
BEGIN
  -- Add song_id column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'songs' AND column_name = 'song_id'
  ) THEN
    ALTER TABLE songs ADD COLUMN song_id text UNIQUE;
  END IF;

  -- Add center column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'songs' AND column_name = 'center'
  ) THEN
    ALTER TABLE songs ADD COLUMN center text;
  END IF;

  -- Add dc_song_url column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'songs' AND column_name = 'dc_song_url'
  ) THEN
    ALTER TABLE songs ADD COLUMN dc_song_url text;
  END IF;
END $$;

-- Remove old columns that don't match the new structure
DO $$
BEGIN
  -- Drop title column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'songs' AND column_name = 'title'
  ) THEN
    ALTER TABLE songs DROP COLUMN title;
  END IF;

  -- Drop artist column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'songs' AND column_name = 'artist'
  ) THEN
    ALTER TABLE songs DROP COLUMN artist;
  END IF;

  -- Drop album column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'songs' AND column_name = 'album'
  ) THEN
    ALTER TABLE songs DROP COLUMN album;
  END IF;

  -- Drop duration column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'songs' AND column_name = 'duration'
  ) THEN
    ALTER TABLE songs DROP COLUMN duration;
  END IF;
END $$;

-- Clear existing sample data
DELETE FROM songs;

-- Create new indexes for performance
CREATE INDEX IF NOT EXISTS songs_song_id_idx ON songs (song_id);
CREATE INDEX IF NOT EXISTS songs_center_idx ON songs (center);
CREATE INDEX IF NOT EXISTS songs_votes_desc_idx ON songs (votes DESC);
CREATE INDEX IF NOT EXISTS songs_favorites_desc_idx ON songs (favorites DESC);

-- Add constraints
ALTER TABLE songs ALTER COLUMN song_id SET NOT NULL;
ALTER TABLE songs ALTER COLUMN center SET NOT NULL;
ALTER TABLE songs ALTER COLUMN dc_song_url SET NOT NULL;