-- Create a security definer function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_current_user_admin()
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  );
$$;

-- Drop the existing contacts SELECT policy
DROP POLICY IF EXISTS "Admins can view contacts" ON public.contacts;

-- Create a new, more secure SELECT policy using the security definer function
CREATE POLICY "Admins can view contacts" ON public.contacts
  FOR SELECT 
  USING (public.is_current_user_admin());

-- Add a comment to document the security improvement
COMMENT ON FUNCTION public.is_current_user_admin() IS 'Security definer function to check admin status without RLS conflicts';