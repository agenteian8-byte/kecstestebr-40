-- Add is_blocked column to profiles table
ALTER TABLE public.profiles ADD COLUMN is_blocked boolean NOT NULL DEFAULT false;

-- Update RLS policy to prevent blocked users from viewing anything
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id AND is_blocked = false);

-- Create policy for admins to manage all profiles
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

-- Create function to create user with admin permissions
CREATE OR REPLACE FUNCTION public.admin_create_user(
  user_email text,
  user_password text,
  user_setor text DEFAULT 'varejo',
  user_phone text DEFAULT NULL
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_user_id uuid;
  result json;
BEGIN
  -- Check if current user is admin
  IF NOT EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() 
    AND is_admin = true
  ) THEN
    RAISE EXCEPTION 'Acesso negado: apenas administradores podem criar usuários';
  END IF;

  -- Create the user profile (user will be created by trigger)
  INSERT INTO public.profiles (user_id, email, setor, phone, is_blocked)
  VALUES (gen_random_uuid(), user_email, user_setor, user_phone, false)
  RETURNING user_id INTO new_user_id;

  result := json_build_object(
    'success', true,
    'user_id', new_user_id,
    'message', 'Usuário criado com sucesso'
  );

  RETURN result;
EXCEPTION
  WHEN OTHERS THEN
    RETURN json_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;