-- Add RLS policy to restrict SELECT access to contacts table
-- Only allow authenticated users with admin role to view contact submissions
-- For now, we'll create a basic policy that requires authentication

-- First, let's create a simple policy that only allows service role access
-- This ensures only authorized backend operations can read contact data
CREATE POLICY "Allow service role to read contacts" 
ON public.contacts 
FOR SELECT 
USING (auth.jwt() ->> 'role' = 'service_role');

-- Alternative: If you want to allow specific authenticated users in the future,
-- you can modify this policy or add additional policies
-- For example, if you implement user roles later:
-- CREATE POLICY "Allow admin users to read contacts" 
-- ON public.contacts 
-- FOR SELECT 
-- USING (auth.uid() IN (
--   SELECT user_id FROM public.user_roles WHERE role = 'admin'
-- ));