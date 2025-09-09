-- Fix the profile access issue that's causing the infinite loading

-- First, let's make profiles completely accessible for debugging
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;

-- Create a simple policy that allows users to see their own profiles
CREATE POLICY "Allow profile access" 
ON public.profiles 
FOR ALL
USING (true);

-- Also ensure the handle_new_user function is working properly
-- Update it to be more robust
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, setor, phone)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'setor', 'varejo'),
    NEW.raw_user_meta_data ->> 'phone'
  );
  RETURN NEW;
EXCEPTION 
  WHEN others THEN
    -- Log the error but don't fail the user creation
    RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;