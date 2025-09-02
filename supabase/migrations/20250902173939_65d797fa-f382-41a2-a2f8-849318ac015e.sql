-- Drop the previous failed migration approach and create demo users properly
-- First, let's use the edge function to create users

-- For now, let's ensure the user_profiles table can handle the demo users
-- Create a simple function to create demo profiles when users are created
CREATE OR REPLACE FUNCTION create_demo_profiles()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- This will be populated by the edge function
  RETURN;
END;
$$;