/*
  # Create films table

  1. New Tables
    - `films`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `director` (text, not null)
      - `year` (integer, not null)
      - `poster_url` (text, nullable)
      - `votes` (integer, default 0)
      - `favorites` (integer, default 0)
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `films` table
    - Add policy for all users to read films
    - Add policy for authenticated users to update vote counts

  3. Indexes
    - Index on votes for ranking performance
*/

CREATE TABLE IF NOT EXISTS films (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  director text NOT NULL,
  year integer NOT NULL,
  poster_url text,
  votes integer DEFAULT 0 CHECK (votes >= 0),
  favorites integer DEFAULT 0 CHECK (favorites >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE films ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read films"
  ON films
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update films"
  ON films
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS films_votes_desc_idx ON films (votes DESC);
CREATE INDEX IF NOT EXISTS films_favorites_desc_idx ON films (favorites DESC);
CREATE INDEX IF NOT EXISTS films_year_idx ON films (year);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_films_updated_at
  BEFORE UPDATE ON films
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();