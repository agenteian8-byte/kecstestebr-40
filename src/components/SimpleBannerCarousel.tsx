import { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { supabase } from '@/integrations/supabase/client';

interface Banner {
  id: string;
  title: string;
  image_url: string;
  link_url?: string;
  is_active: boolean;
  order_position: number;
}

const BannerCarousel = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      console.log('Fetching banners...');
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .eq('is_active', true)
        .order('order_position', { ascending: true });

      console.log('Banners result:', { data, error });

      if (error) {
        console.error('Banners error:', error);
        setBanners([]);
      } else {
        setBanners(data || []);
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-80 bg-gray-200 animate-pulse rounded-lg mb-8"></div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="w-full h-80 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-8 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl font-bold mb-2">KECINFORSTORE</h2>
          <p className="text-xl">Seus produtos de informática</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-8">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem key={banner.id}>
              <div className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden bg-gray-100">
                {banner.link_url ? (
                  <a href={banner.link_url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={banner.image_url}
                      alt={banner.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="eager"
                    />
                  </a>
                ) : (
                  <img
                    src={banner.image_url}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                )}
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                    {banner.title}
                  </h2>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {banners.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;