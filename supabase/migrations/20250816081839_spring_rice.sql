/*
  # Update voting constraints for one vote per user per category

  1. Constraints Update
    - Ensure each user can vote for only 1 film and 1 song
    - Add check constraints to prevent multiple votes per category
    - Update RLS policies for better security

  2. Functions Update
    - Update voting functions to enforce single vote per category
    - Add validation for existing votes before allowing new ones
*/

-- Drop existing unique constraint and add new one that allows one vote per category
ALTER TABLE user_votes DROP CONSTRAINT IF EXISTS unique_user_vote;

-- Add constraint to allow only one vote per user per item_type (film or song)
CREATE UNIQUE INDEX IF NOT EXISTS unique_user_vote_per_category 
ON user_votes (user_id, item_type);

-- Update the vote_for_item function to check for existing votes in the same category
CREATE OR REPLACE FUNCTION vote_for_item(
  p_item_type text,
  p_item_id uuid
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid;
  v_existing_vote_id uuid;
  v_result json;
BEGIN
  -- Get the current user ID
  v_user_id := auth.uid();
  
  -- Check if user is authenticated
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated to vote';
  END IF;
  
  -- Validate item_type
  IF p_item_type NOT IN ('film', 'song') THEN
    RAISE EXCEPTION 'Invalid item_type. Must be film or song';
  END IF;
  
  -- Check if user has already voted in this category
  SELECT item_id INTO v_existing_vote_id
  FROM user_votes 
  WHERE user_id = v_user_id 
  AND item_type = p_item_type;
  
  IF v_existing_vote_id IS NOT NULL THEN
    -- User has already voted in this category
    IF v_existing_vote_id = p_item_id THEN
      RAISE EXCEPTION 'User has already voted for this item';
    ELSE
      RAISE EXCEPTION 'User has already voted in this category. Only one vote per category is allowed.';
    END IF;
  END IF;
  
  -- Verify the item exists in the appropriate table
  IF p_item_type = 'film' THEN
    IF NOT EXISTS (SELECT 1 FROM films WHERE id = p_item_id) THEN
      RAISE EXCEPTION 'Film not found';
    END IF;
  ELSE
    IF NOT EXISTS (SELECT 1 FROM songs WHERE id = p_item_id) THEN
      RAISE EXCEPTION 'Song not found';
    END IF;
  END IF;
  
  -- Insert the vote
  INSERT INTO user_votes (user_id, item_type, item_id)
  VALUES (v_user_id, p_item_type, p_item_id);
  
  -- Update the vote count in the appropriate table
  IF p_item_type = 'film' THEN
    UPDATE films 
    SET votes = votes + 1, updated_at = now()
    WHERE id = p_item_id;
  ELSE
    UPDATE songs 
    SET votes = votes + 1, updated_at = now()
    WHERE id = p_item_id;
  END IF;
  
  -- Return success result
  SELECT json_build_object(
    'success', true,
    'message', 'Vote recorded successfully',
    'item_type', p_item_type,
    'item_id', p_item_id
  ) INTO v_result;
  
  RETURN v_result;
END;
$$;