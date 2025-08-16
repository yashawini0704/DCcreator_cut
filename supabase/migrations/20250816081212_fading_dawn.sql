/*
  # Update films table schema to match backend structure

  1. Schema Changes
    - Add `film_id` column (text, unique identifier like DCF1, DCF2, etc.)
    - Add `center` column (text, for location/center)
    - Add `dc_film_url` column (text, for Google Drive links)
    - Remove old columns: title, director, year, poster_url
    - Keep votes, favorites, created_at, updated_at

  2. Data Migration
    - Clear existing sample data
    - The new structure will be populated separately

  3. Security
    - Maintain existing RLS policies
    - Update indexes for new columns
*/

-- First, drop existing indexes that reference old columns
DROP INDEX IF EXISTS films_year_idx;

-- Add new columns to films table
DO $$
BEGIN
  -- Add film_id column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'films' AND column_name = 'film_id'
  ) THEN
    ALTER TABLE films ADD COLUMN film_id text UNIQUE;
  END IF;

  -- Add center column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'films' AND column_name = 'center'
  ) THEN
    ALTER TABLE films ADD COLUMN center text;
  END IF;

  -- Add dc_film_url column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'films' AND column_name = 'dc_film_url'
  ) THEN
    ALTER TABLE films ADD COLUMN dc_film_url text;
  END IF;
END $$;

-- Remove old columns that don't match the new structure
DO $$
BEGIN
  -- Drop title column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'films' AND column_name = 'title'
  ) THEN
    ALTER TABLE films DROP COLUMN title;
  END IF;

  -- Drop director column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'films' AND column_name = 'director'
  ) THEN
    ALTER TABLE films DROP COLUMN director;
  END IF;

  -- Drop year column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'films' AND column_name = 'year'
  ) THEN
    ALTER TABLE films DROP COLUMN year;
  END IF;

  -- Drop poster_url column if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'films' AND column_name = 'poster_url'
  ) THEN
    ALTER TABLE films DROP COLUMN poster_url;
  END IF;
END $$;

-- Clear existing sample data
DELETE FROM films;

-- Create new indexes for performance
CREATE INDEX IF NOT EXISTS films_film_id_idx ON films (film_id);
CREATE INDEX IF NOT EXISTS films_center_idx ON films (center);
CREATE INDEX IF NOT EXISTS films_votes_desc_idx ON films (votes DESC);
CREATE INDEX IF NOT EXISTS films_favorites_desc_idx ON films (favorites DESC);

-- Add constraints
ALTER TABLE films ALTER COLUMN film_id SET NOT NULL;
ALTER TABLE films ALTER COLUMN center SET NOT NULL;
ALTER TABLE films ALTER COLUMN dc_film_url SET NOT NULL;