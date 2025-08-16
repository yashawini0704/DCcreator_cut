/*
  # Create songs table

  1. New Tables
    - `songs`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `artist` (text, not null)
      - `album` (text, nullable)
      - `duration` (text, not null)
      - `votes` (integer, default 0)
      - `favorites` (integer, default 0)
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `songs` table
    - Add policy for all users to read songs
    - Add policy for authenticated users to update vote counts

  3. Indexes
    - Index on votes for ranking performance
*/

CREATE TABLE IF NOT EXISTS songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  artist text NOT NULL,
  album text,
  duration text NOT NULL,
  votes integer DEFAULT 0 CHECK (votes >= 0),
  favorites integer DEFAULT 0 CHECK (favorites >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read songs"
  ON songs
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update songs"
  ON songs
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS songs_votes_desc_idx ON songs (votes DESC);
CREATE INDEX IF NOT EXISTS songs_favorites_desc_idx ON songs (favorites DESC);
CREATE INDEX IF NOT EXISTS songs_artist_idx ON songs (artist);

-- Create trigger for updated_at
CREATE TRIGGER update_songs_updated_at
  BEFORE UPDATE ON songs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();