-- Add featured products support
ALTER TABLE products ADD COLUMN is_featured boolean DEFAULT false;

-- Create policies for admin management
CREATE POLICY "Admins can insert products" 
ON products 
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

CREATE POLICY "Admins can update products" 
ON products 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

CREATE POLICY "Admins can delete products" 
ON products 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

-- Create policies for admin profile management
CREATE POLICY "Admins can update all profiles" 
ON profiles 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.user_id = auth.uid() 
    AND p.is_admin = true
  )
);

CREATE POLICY "Admins can delete profiles" 
ON profiles 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.user_id = auth.uid() 
    AND p.is_admin = true
  )
);

-- Create policies for banner management
CREATE POLICY "Admins can insert banners" 
ON banners 
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

CREATE POLICY "Admins can update banners" 
ON banners 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

CREATE POLICY "Admins can delete banners" 
ON banners 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

-- Create policies for category management
CREATE POLICY "Admins can insert categories" 
ON categories 
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

CREATE POLICY "Admins can update categories" 
ON categories 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);

CREATE POLICY "Admins can delete categories" 
ON categories 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  )
);