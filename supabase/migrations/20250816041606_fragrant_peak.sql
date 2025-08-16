/*
  # Create user_votes table

  1. New Tables
    - `user_votes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `item_type` (text, 'film' or 'song')
      - `item_id` (uuid, references films.id or songs.id)
      - `created_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `user_votes` table
    - Users can only read their own votes
    - Users can only insert their own votes
    - Prevent duplicate votes with unique constraint

  3. Constraints
    - Unique constraint on (user_id, item_type, item_id)
    - Check constraint on item_type
*/

CREATE TABLE IF NOT EXISTS user_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type text NOT NULL CHECK (item_type IN ('film', 'song')),
  item_id uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add unique constraint to prevent duplicate votes
ALTER TABLE user_votes 
ADD CONSTRAINT unique_user_vote 
UNIQUE (user_id, item_type, item_id);

-- Enable Row Level Security
ALTER TABLE user_votes ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own votes"
  ON user_votes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own votes"
  ON user_votes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own votes"
  ON user_votes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS user_votes_user_id_idx ON user_votes (user_id);
CREATE INDEX IF NOT EXISTS user_votes_item_type_item_id_idx ON user_votes (item_type, item_id);
CREATE INDEX IF NOT EXISTS user_votes_created_at_idx ON user_votes (created_at DESC);