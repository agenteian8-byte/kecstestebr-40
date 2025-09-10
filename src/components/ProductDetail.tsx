import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ShoppingCart, ZoomIn, ZoomOut, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Product {
  id: string;
  name: string;
  description?: string;
  price_varejo: number;
  price_revenda: number;
  image_url?: string;
  sku?: string;
  category?: {
    name: string;
    slug: string;
  };
}

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetail = ({ product, isOpen, onClose }: ProductDetailProps) => {
  const [imageZoom, setImageZoom] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const { profile } = useAuth();

  if (!product) return null;

  const getPrice = () => {
    if (!profile || profile.setor === 'varejo') {
      return product.price_varejo;
    }
    return product.price_revenda;
  };

  const getPriceLabel = () => {
    if (!profile || profile.setor === 'varejo') {
      return 'Varejo';
    }
    return 'Revenda';
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = '558534833373';
    const message = `Olá! Gostaria de saber mais sobre o produto: ${product.name} (SKU: ${product.sku || 'N/A'})`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
  };

  const toggleImageZoom = () => {
    setImageZoom(!imageZoom);
    if (!imageZoom) {
      setZoomLevel(1);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              {product.name}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative bg-muted rounded-lg overflow-hidden">
                <img
                  src={product.image_url || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop'}
                  alt={product.name}
                  className="w-full h-80 object-cover cursor-zoom-in"
                  onClick={toggleImageZoom}
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/80 hover:bg-white"
                    onClick={toggleImageZoom}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </div>
                {product.category && (
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    {product.category.name}
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {product.sku && (
                    <Badge variant="outline" className="text-sm">
                      SKU: {product.sku}
                    </Badge>
                  )}
                  <Badge variant="secondary" className="text-sm">
                    {getPriceLabel()}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">
                    R$ {getPrice().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>

                {product.description && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Descrição</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Informações do Produto</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div>Categoria: {product.category?.name || 'Não especificada'}</div>
                    {product.sku && <div>Código: {product.sku}</div>}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-primary hover:opacity-90 font-semibold"
                  onClick={handleWhatsAppContact}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Consultar Preço
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full bg-green-500 hover:bg-green-600 text-white border-green-500"
                  onClick={handleWhatsAppContact}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp Vendas
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Zoom Modal */}
      {imageZoom && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
          onClick={toggleImageZoom}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] overflow-hidden">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                disabled={zoomLevel <= 1}
                className="bg-white/90 hover:bg-white text-black"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                disabled={zoomLevel >= 3}
                className="bg-white/90 hover:bg-white text-black"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleImageZoom();
                }}
                className="bg-white/90 hover:bg-white text-black"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative overflow-auto max-h-[90vh] max-w-[90vw] flex items-center justify-center">
              <img
                src={product.image_url || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop'}
                alt={product.name}
                className="transition-transform duration-200 cursor-move"
                style={{ 
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center',
                  maxWidth: 'none',
                  maxHeight: 'none'
                }}
                onClick={(e) => e.stopPropagation()}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
