-- Inserir perfil para o usuário existente que não tem perfil
INSERT INTO public.profiles (user_id, email, setor, is_admin, is_blocked) 
VALUES (
    '6856941f-6f59-4a51-adfb-f3e3b746640a', 
    'aragaocarlos603@gmail.com', 
    'varejo', 
    true, -- Fazendo admin para testes
    false
);

-- Verificar se inseriu corretamente
SELECT * FROM profiles WHERE email = 'aragaocarlos603@gmail.com';