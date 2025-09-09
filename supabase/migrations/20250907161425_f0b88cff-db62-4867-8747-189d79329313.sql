-- Simplify RLS policies to avoid infinite recursion and loading issues

-- Drop and recreate products policy with simpler logic
DROP POLICY IF EXISTS "Users can view products" ON public.products;

CREATE POLICY "Products are viewable by everyone" 
ON public.products 
FOR SELECT 
USING (true);

-- Simplify profiles policy
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Ensure categories policy is simple
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON public.categories;

CREATE POLICY "Categories are viewable by everyone" 
ON public.categories 
FOR SELECT 
USING (true);

-- Ensure banners policy is simple  
DROP POLICY IF EXISTS "Banners are viewable by everyone" ON public.banners;

CREATE POLICY "Banners are viewable by everyone" 
ON public.banners 
FOR SELECT 
USING (is_active = true);