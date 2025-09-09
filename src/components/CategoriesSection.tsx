import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Smartphone, 
  Home, 
  Shirt, 
  Sparkles, 
  Dumbbell, 
  Book, 
  Gamepad2,
  Car,
  Package,
  Monitor,
  Cpu,
  Zap
} from "lucide-react";
import { supabasePublic as supabase } from '@/integrations/supabase/publicClient';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface CategoriesSectionProps {
  onCategorySelect?: (categorySlug: string) => void;
}

// Icon mapping for different categories
const getCategoryIcon = (slug: string) => {
  const iconMap: { [key: string]: any } = {
    'hardware': Cpu,
    'processadores': Cpu,
    'monitores': Monitor,
    'gamer': Gamepad2,
    'fontes-atx': Zap,
    'impressoras-leitores': Package,
    'produtos-diversos': Package,
    'produtos-populares': Sparkles,
  };
  return iconMap[slug] || Package;
};

const getCategoryColor = (index: number) => {
  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-green-100 text-green-600",
    "bg-purple-100 text-purple-600",
    "bg-pink-100 text-pink-600",
    "bg-orange-100 text-orange-600",
    "bg-indigo-100 text-indigo-600",
    "bg-red-100 text-red-600",
    "bg-yellow-100 text-yellow-600",
  ];
  return colors[index % colors.length];
};

const CategoriesSection = ({ onCategorySelect }: CategoriesSectionProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('Categories error:', error);
        setCategories([]);
      } else {
        setCategories(data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categorySlug: string, e?: React.MouseEvent) => {
    try {
      console.log('🏷️ Category clicked:', categorySlug);
      e?.preventDefault();
      e?.stopPropagation();
      
      if (onCategorySelect) {
        console.log('📝 Calling onCategorySelect with:', categorySlug);
        onCategorySelect(categorySlug);
      }
      
      // Scroll to products section with a slight delay to ensure state update
      setTimeout(() => {
        try {
          console.log('📍 Looking for main section...');
          const productSection = document.querySelector('main');
          console.log('📍 Found main section:', !!productSection);
          
          if (productSection) {
            // Check if smooth scrolling is supported
            if ('scrollBehavior' in document.documentElement.style) {
              productSection.scrollIntoView({ behavior: 'smooth' });
            } else {
              // Fallback for older mobile browsers
              window.scrollTo(0, productSection.offsetTop);
            }
          } else {
            console.warn('⚠️ Main section not found, trying alternative scroll');
            // Fallback: scroll to a reasonable position
            window.scrollTo(0, window.innerHeight);
          }
        } catch (scrollError) {
          console.warn('⚠️ Scroll error (non-critical):', scrollError);
          // Fallback scroll without smooth behavior for mobile compatibility
          try {
            window.scrollTo(0, window.innerHeight);
          } catch (fallbackError) {
            console.warn('⚠️ Even fallback scroll failed:', fallbackError);
          }
        }
      }, 150);
    } catch (error) {
      console.error('❌ Category click error:', error);
      // Ensure the category still gets selected even if scroll fails
      if (onCategorySelect) {
        try {
          onCategorySelect(categorySlug);
        } catch (selectError) {
          console.error('❌ Category select also failed:', selectError);
        }
      }
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore nossas categorias
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-3 sm:p-6 text-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gray-200 animate-pulse mx-auto mb-2 sm:mb-4" />
                  <div className="h-3 sm:h-4 bg-gray-200 animate-pulse rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore nossas categorias
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Encontre exatamente o que você procura em nossa ampla variedade de produtos
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 sm:gap-4">
          {categories.map((category, index) => {
            const IconComponent = getCategoryIcon(category.slug);
            const colorClass = getCategoryColor(index);
            
            return (
              <Card 
                key={category.id} 
                className="group cursor-pointer hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm"
                onClick={(e) => handleCategoryClick(category.slug, e)}
              >
                <CardContent className="p-3 sm:p-6 text-center">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full ${colorClass} flex items-center justify-center mx-auto mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <h3 className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors leading-tight">
                    {category.name}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;