/*
  # Create voting helper functions

  1. Functions
    - `vote_for_item()` - Handles voting logic with vote count updates
    - `toggle_favorite()` - Handles favorite toggle with count updates
    - `get_user_votes()` - Get all votes for a user
    - `get_user_favorites()` - Get all favorites for a user

  2. Security
    - Functions run with SECURITY DEFINER
    - Proper validation and error handling
*/

-- Function to handle voting for films or songs
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
  
  -- Check if user has already voted for this item
  IF EXISTS (
    SELECT 1 FROM user_votes 
    WHERE user_id = v_user_id 
    AND item_type = p_item_type 
    AND item_id = p_item_id
  ) THEN
    RAISE EXCEPTION 'User has already voted for this item';
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

-- Function to toggle favorites
CREATE OR REPLACE FUNCTION toggle_favorite(
  p_item_type text,
  p_item_id uuid
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid;
  v_is_favorited boolean;
  v_result json;
BEGIN
  -- Get the current user ID
  v_user_id := auth.uid();
  
  -- Check if user is authenticated
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated to favorite items';
  END IF;
  
  -- Validate item_type
  IF p_item_type NOT IN ('film', 'song') THEN
    RAISE EXCEPTION 'Invalid item_type. Must be film or song';
  END IF;
  
  -- Check if item is already favorited
  SELECT EXISTS (
    SELECT 1 FROM user_favorites 
    WHERE user_id = v_user_id 
    AND item_type = p_item_type 
    AND item_id = p_item_id
  ) INTO v_is_favorited;
  
  IF v_is_favorited THEN
    -- Remove from favorites
    DELETE FROM user_favorites 
    WHERE user_id = v_user_id 
    AND item_type = p_item_type 
    AND item_id = p_item_id;
    
    -- Decrease favorite count
    IF p_item_type = 'film' THEN
      UPDATE films 
      SET favorites = GREATEST(favorites - 1, 0), updated_at = now()
      WHERE id = p_item_id;
    ELSE
      UPDATE songs 
      SET favorites = GREATEST(favorites - 1, 0), updated_at = now()
      WHERE id = p_item_id;
    END IF;
    
    v_result := json_build_object(
      'success', true,
      'action', 'removed',
      'message', 'Removed from favorites'
    );
  ELSE
    -- Add to favorites
    INSERT INTO user_favorites (user_id, item_type, item_id)
    VALUES (v_user_id, p_item_type, p_item_id);
    
    -- Increase favorite count
    IF p_item_type = 'film' THEN
      UPDATE films 
      SET favorites = favorites + 1, updated_at = now()
      WHERE id = p_item_id;
    ELSE
      UPDATE songs 
      SET favorites = favorites + 1, updated_at = now()
      WHERE id = p_item_id;
    END IF;
    
    v_result := json_build_object(
      'success', true,
      'action', 'added',
      'message', 'Added to favorites'
    );
  END IF;
  
  RETURN v_result;
END;
$$;

-- Function to get user votes
CREATE OR REPLACE FUNCTION get_user_votes(p_user_id uuid DEFAULT NULL)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid;
  v_result json;
BEGIN
  -- Use provided user_id or current authenticated user
  v_user_id := COALESCE(p_user_id, auth.uid());
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User ID required';
  END IF;
  
  -- Get user votes grouped by item_type
  SELECT json_build_object(
    'films', COALESCE(film_votes.votes, '[]'::json),
    'songs', COALESCE(song_votes.votes, '[]'::json)
  ) INTO v_result
  FROM (
    SELECT json_agg(item_id) as votes
    FROM user_votes 
    WHERE user_id = v_user_id AND item_type = 'film'
  ) film_votes
  CROSS JOIN (
    SELECT json_agg(item_id) as votes
    FROM user_votes 
    WHERE user_id = v_user_id AND item_type = 'song'
  ) song_votes;
  
  RETURN v_result;
END;
$$;

-- Function to get user favorites
CREATE OR REPLACE FUNCTION get_user_favorites(p_user_id uuid DEFAULT NULL)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid;
  v_result json;
BEGIN
  -- Use provided user_id or current authenticated user
  v_user_id := COALESCE(p_user_id, auth.uid());
  
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'User ID required';
  END IF;
  
  -- Get user favorites grouped by item_type
  SELECT json_build_object(
    'films', COALESCE(film_favorites.favorites, '[]'::json),
    'songs', COALESCE(song_favorites.favorites, '[]'::json)
  ) INTO v_result
  FROM (
    SELECT json_agg(item_id) as favorites
    FROM user_favorites 
    WHERE user_id = v_user_id AND item_type = 'film'
  ) film_favorites
  CROSS JOIN (
    SELECT json_agg(item_id) as favorites
    FROM user_favorites 
    WHERE user_id = v_user_id AND item_type = 'song'
  ) song_favorites;
  
  RETURN v_result;
END;
$$;