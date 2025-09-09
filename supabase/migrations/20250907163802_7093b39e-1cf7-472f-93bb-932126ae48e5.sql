-- Adicionar políticas de INSERT e UPDATE para profiles para permitir criação automática de perfis
CREATE POLICY "Allow authenticated users to insert their own profile" ON public.profiles 
FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow authenticated users to update their own profile" ON public.profiles 
FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);