-- Fix RLS policies that are blocking data access

-- Drop and recreate the problematic policies
DROP POLICY IF EXISTS "Users can view products based on sector" ON public.products;

-- Create a simpler policy that allows viewing products for all users
CREATE POLICY "Users can view products" 
ON public.products 
FOR SELECT 
USING (
  -- Allow anonymous users to see all products
  (auth.uid() IS NULL) OR
  -- Allow authenticated users to see products based on sector (if they have a profile)
  (setor = 'both' OR 
   setor = COALESCE((
     SELECT p.setor FROM profiles p WHERE p.user_id = auth.uid() AND p.is_blocked = false
   ), 'varejo'))
);

-- Fix the profiles policy to allow users to view their own profile even if they are new
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Make sure categories are viewable by everyone
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON public.categories;

CREATE POLICY "Categories are viewable by everyone" 
ON public.categories 
FOR SELECT 
USING (true);