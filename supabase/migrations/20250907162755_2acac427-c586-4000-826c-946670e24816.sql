-- Reconstrução completa do banco de dados
-- Primeiro, vamos limpar e recriar as tabelas com estrutura simples

-- Drop existing tables and policies
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.products CASCADE; 
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.banners CASCADE;

-- Recriar tabela de categorias (simples)
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Recriar tabela de produtos (simples)
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price_varejo DECIMAL(10,2) NOT NULL DEFAULT 0,
  price_revenda DECIMAL(10,2) NOT NULL DEFAULT 0,
  image_url TEXT,
  sku TEXT,
  category_id UUID REFERENCES public.categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Recriar tabela de banners (simples)
CREATE TABLE public.banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT,
  is_active BOOLEAN DEFAULT true,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Recriar tabela de profiles (simples)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  setor TEXT NOT NULL DEFAULT 'varejo',
  is_admin BOOLEAN DEFAULT false,
  is_blocked BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS mas com políticas muito simples
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas extremamente simples - todos podem ver tudo
CREATE POLICY "Enable read access for all users" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.products FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.banners FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON public.profiles FOR SELECT USING (true);

-- Inserir dados de teste
INSERT INTO public.categories (name, slug, description) VALUES
('Gamer', 'gamer', 'Produtos para gamers'),
('Processadores', 'processadores', 'CPUs e processadores'),
('Hardware', 'hardware', 'Componentes de hardware');

INSERT INTO public.products (name, description, price_varejo, price_revenda, image_url, sku, category_id) VALUES
('Notebook Gamer Acer', 'Notebook para jogos com placa de vídeo dedicada', 2500.00, 2200.00, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop', 'NB001', (SELECT id FROM categories WHERE slug = 'gamer')),
('Mouse Gamer RGB', 'Mouse gamer com iluminação RGB', 150.00, 120.00, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop', 'MG001', (SELECT id FROM categories WHERE slug = 'gamer')),
('Teclado Mecânico', 'Teclado mecânico para jogos', 300.00, 250.00, 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop', 'TM001', (SELECT id FROM categories WHERE slug = 'gamer')),
('Processador Intel i7', 'Processador Intel Core i7 12ª geração', 1800.00, 1600.00, 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=400&fit=crop', 'CPU001', (SELECT id FROM categories WHERE slug = 'processadores'));

INSERT INTO public.banners (title, image_url, is_active, order_position) VALUES
('Promoção Notebooks', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&h=400&fit=crop', true, 1),
('Gaming Week', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=400&fit=crop', true, 2);