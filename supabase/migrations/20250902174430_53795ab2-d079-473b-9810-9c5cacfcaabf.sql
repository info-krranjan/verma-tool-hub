-- Fix the security warning by setting proper search_path
CREATE OR REPLACE FUNCTION create_demo_profiles()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- This will be populated by the edge function
  RETURN;
END;
$$;