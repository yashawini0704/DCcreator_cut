/*
  # Create user_favorites table

  1. New Tables
    - `user_favorites`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `item_type` (text, 'film' or 'song')
      - `item_id` (uuid, references films.id or songs.id)
      - `created_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `user_favorites` table
    - Users can only manage their own favorites
    - Prevent duplicate favorites with unique constraint

  3. Constraints
    - Unique constraint on (user_id, item_type, item_id)
    - Check constraint on item_type
*/

CREATE TABLE IF NOT EXISTS user_favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type text NOT NULL CHECK (item_type IN ('film', 'song')),
  item_id uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add unique constraint to prevent duplicate favorites
ALTER TABLE user_favorites 
ADD CONSTRAINT unique_user_favorite 
UNIQUE (user_id, item_type, item_id);

-- Enable Row Level Security
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own favorites"
  ON user_favorites
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON user_favorites
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON user_favorites
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS user_favorites_user_id_idx ON user_favorites (user_id);
CREATE INDEX IF NOT EXISTS user_favorites_item_type_item_id_idx ON user_favorites (item_type, item_id);
CREATE INDEX IF NOT EXISTS user_favorites_created_at_idx ON user_favorites (created_at DESC);