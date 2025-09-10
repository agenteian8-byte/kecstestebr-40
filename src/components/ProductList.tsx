import { useEffect, useState } from 'react';
import { supabasePublic as supabase } from '@/integrations/supabase/publicClient';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ShoppingCart, Eye } from 'lucide-react';
import ProductDetail from '@/components/ProductDetail';
import { useAuth } from '@/hooks/useAuth';

interface Product {
  id: string;
  name: string;
  description?: string;
  price_varejo: number;
  price_revenda: number;
  image_url?: string;
  sku?: string;
}

interface ProductListProps {
  searchTerm?: string;
  selectedCategory?: string;
}

const ProductList = ({ searchTerm, selectedCategory }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { profile } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      console.log('🛍️ Starting product fetch...');
      console.log('🔍 Filters - Search:', searchTerm, 'Category:', selectedCategory);
      setLoading(true);
      
      let query = supabase
        .from('products')
        .select(`
          *,
          categories!inner(name, slug)
        `)
        .order('created_at', { ascending: false });

      // Apply category filter
      if (selectedCategory && selectedCategory !== 'all') {
        console.log('🏷️ Applying category filter:', selectedCategory);
        query = query.eq('categories.slug', selectedCategory);
      }

      // Apply search filter
      if (searchTerm && searchTerm.trim() !== '') {
        console.log('🔍 Applying search filter:', searchTerm);
        query = query.ilike('name', `%${searchTerm.trim()}%`);
      }

      console.log('📡 Executing query...');
      const { data, error } = await query;

      if (error) {
        console.error('❌ Products error:', error.message);
        // If join fails, try simple query without categories
        console.log('🔄 Retrying with simple query...');
        const { data: simpleData, error: simpleError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (simpleError) {
          console.error('❌ Simple query also failed:', simpleError.message);
          setProducts([]);
        } else {
          console.log('✅ Products loaded via simple query:', simpleData?.length || 0);
          setProducts(simpleData || []);
        }
      } else {
        console.log('✅ Products loaded successfully:', data?.length || 0);
        console.log('📊 Applied filters - Category:', selectedCategory, 'Search:', searchTerm);
        setProducts(data || []);
      }
    } catch (error) {
      console.error('❌ Fetch error:', error);
      // Fallback to simple query
      try {
        console.log('🔄 Trying fallback query...');
        const { data: fallbackData } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        console.log('✅ Fallback query success:', fallbackData?.length || 0);
        setProducts(fallbackData || []);
      } catch (fallbackError) {
        console.error('❌ Fallback error:', fallbackError);
        setProducts([]);
      }
    } finally {
      console.log('🏁 Product fetch complete');
      setLoading(false);
    }
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = '5511999999999';
    const message = 'Olá! Gostaria de saber mais sobre os produtos da KECINFORSTORE.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const closeProductDetail = () => {
    setIsDetailOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Carregando produtos...</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="w-full h-48 bg-gray-200 animate-pulse" />
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-6 bg-gray-200 animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  console.log('Rendering products:', products.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          {searchTerm || selectedCategory !== 'all' ? `Produtos (${products.length})` : `Todos os Produtos (${products.length})`}
        </h2>
        <Button
          onClick={handleWhatsAppContact}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          WhatsApp Vendas
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
          <p className="text-gray-600">Verifique sua conexão ou tente novamente.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
              <div className="relative" onClick={() => handleProductClick(product)}>
                <img 
                  src={product.image_url || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop'} 
                  alt={product.name}
                  className="w-full h-32 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.sku && (
                  <Badge className="absolute top-2 right-2 bg-blue-500 text-white text-xs">
                    {product.sku}
                  </Badge>
                )}
                <Button
                  size="icon"
                  className="absolute top-2 left-2 bg-white/80 hover:bg-white text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="p-3 md:p-4">
                <h3 className="font-semibold mb-2 line-clamp-2 text-sm md:text-base cursor-pointer hover:text-primary" 
                    onClick={() => handleProductClick(product)}>
                  {product.name}
                </h3>
                
                {product.description && (
                  <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-2 hidden md:block">
                    {product.description}
                  </p>
                )}

                <div className="mb-3 md:mb-4">
                  <div className="text-lg md:text-xl font-bold text-blue-600">
                    R$ {(profile?.setor === 'revenda' ? product.price_revenda : product.price_varejo)?.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) || '0,00'}
                  </div>
                  {profile?.setor === 'revenda' && (
                    <div className="text-xs text-green-600 font-medium">
                      Preço Revenda
                    </div>
                  )}
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm h-8 md:h-10"
                  onClick={handleWhatsAppContact}
                >
                  <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  Consultar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ProductDetail 
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={closeProductDetail}
      />
    </div>
  );
};

export default ProductList;