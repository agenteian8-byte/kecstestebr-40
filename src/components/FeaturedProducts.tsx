import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Eye, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { supabasePublic as supabase } from '@/integrations/supabase/publicClient';
import { useAuth } from '@/hooks/useAuth';
import ProductDetail from '@/components/ProductDetail';

interface Product {
  id: string;
  name: string;
  description?: string;
  price_varejo: number;
  price_revenda: number;
  image_url?: string;
  sku?: string;
  is_featured?: boolean;
}

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { profile } = useAuth();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      console.log('🌟 Fetching featured products...');
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true);

      if (error) {
        console.error('❌ Error fetching featured products:', error);
        // Try to get any products if featured query fails
        const { data: fallbackData } = await supabase
          .from('products')
          .select('*')
          .limit(8);
        setProducts(fallbackData || []);
      } else {
        console.log('✅ Featured products loaded:', data?.length || 0);
        setProducts(data || []);
      }
    } catch (error) {
      console.error('❌ Error:', error);
      // Final fallback - try to load any products
      try {
        const { data: fallbackData } = await supabase
          .from('products')
          .select('*')
          .limit(8);
        setProducts(fallbackData || []);
      } catch (finalError) {
        console.error('❌ Final fallback failed:', finalError);
        setProducts([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppContact = (product?: Product) => {
    const phoneNumber = '558534833373';
    const message = product 
      ? `Olá! Gostaria de saber mais sobre o produto: ${product.name} (SKU: ${product.sku})`
      : 'Olá! Gostaria de saber mais sobre os produtos da KECINFORSTORE.';
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

  const getPrice = (product: Product) => {
    return profile?.setor === 'revenda' ? product.price_revenda : product.price_varejo;
  };

  const productsPerPage = 2;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Produtos em destaque
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Os produtos mais desejados com os melhores preços e qualidade garantida
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
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
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Produtos em destaque
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Em breve novos produtos em destaque
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Produtos em destaque
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Os produtos mais desejados com os melhores preços e qualidade garantida
          </p>
        </div>

        <div className="relative">
          {/* Navigation buttons - only show if more than 2 products */}
          {products.length > 2 && (
            <div className="flex justify-center gap-4 mb-6">
              <Button
                variant="outline"
                className="bg-white/80 hover:bg-white shadow-lg"
                onClick={prevPage}
              >
                ← Anterior
              </Button>
              <Button
                variant="outline"
                className="bg-white/80 hover:bg-white shadow-lg"
                onClick={nextPage}
              >
                Próximo →
              </Button>
            </div>
          )}
          
          <div className="space-y-4">
            {currentProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                <div className="flex">
                  <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0" onClick={() => handleProductClick(product)}>
                    <img 
                      src={product.image_url || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop'} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      Em Destaque
                    </Badge>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-3 right-3 bg-white/80 hover:bg-white text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {product.sku && (
                      <Badge className="absolute bottom-3 right-3 bg-blue-500 text-white text-xs">
                        {product.sku}
                      </Badge>
                    )}
                  </div>

                  <CardContent className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg md:text-xl text-foreground mb-3 cursor-pointer hover:text-primary transition-colors" 
                          onClick={() => handleProductClick(product)}>
                        {product.name}
                      </h3>
                      
                      {product.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                          {product.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl md:text-3xl font-bold text-primary">
                          R$ {getPrice(product).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                        {profile?.setor === 'revenda' && (
                          <div className="text-sm text-green-600 font-medium">
                            Preço Revenda
                          </div>
                        )}
                      </div>

                      <Button 
                        className="bg-gradient-primary hover:opacity-90 font-semibold px-8"
                        onClick={() => handleWhatsAppContact(product)}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Consultar
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination dots - only show if more than 2 products */}
          {products.length > 2 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentPage ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                  }`}
                  onClick={() => setCurrentPage(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ProductDetail 
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={closeProductDetail}
      />
    </section>
  );
};

export default FeaturedProducts;
