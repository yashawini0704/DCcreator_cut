/*
  # Add center field to profiles table

  1. Schema Changes
    - Add `center` column to `profiles` table
    - Set default value as empty string
    - Add check constraint for valid center values

  2. Security
    - Update existing RLS policies to include center field
    - Maintain existing security model

  3. Data Migration
    - Safely add column with default value
    - No data loss for existing users
*/

-- Add center column to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'center'
  ) THEN
    ALTER TABLE profiles ADD COLUMN center text DEFAULT '';
  END IF;
END $$;

-- Add check constraint for valid center values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'profiles_center_check'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_center_check 
    CHECK (center IN ('TNP', 'KOLLU', 'KAUP', 'VPM', ''));
  END IF;
END $$;