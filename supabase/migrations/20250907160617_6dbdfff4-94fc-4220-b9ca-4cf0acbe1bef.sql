-- Create policy for admins to manage all profiles
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;

CREATE POLICY "Admins can manage all profiles" 
ON public.profiles 
FOR ALL 
USING (EXISTS ( 
  SELECT 1 
  FROM profiles 
  WHERE user_id = auth.uid() 
  AND is_admin = true 
));

-- Update products RLS to check if user is blocked
DROP POLICY IF EXISTS "Users can view products based on sector" ON public.products;

CREATE POLICY "Users can view products based on sector" 
ON public.products 
FOR SELECT 
USING (
  -- Allow anonymous users to see all products
  (auth.uid() IS NULL) OR
  -- Allow non-blocked users to see products based on sector
  (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() 
      AND is_blocked = false
    ) AND 
    (setor = 'both' OR setor = (
      SELECT setor FROM profiles WHERE user_id = auth.uid()
    ))
  )
);