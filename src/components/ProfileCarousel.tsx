import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProfileCarousel = () => {
  const [images, setImages] = useState<{ name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Create autoplay plugin instance with 3 second delay
  const autoplay = Autoplay({
    delay: 3000, // 3 seconds between slides
    stopOnInteraction: true, // stops auto-playing when user interacts
    stopOnMouseEnter: true, // stops auto-playing on mouse enter
  });

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.storage
          .from('profile_pictures')
          .list();
        
        if (error) {
          console.error('Error fetching profile pictures:', error);
          return;
        }

        // Filter only image files
        const imageFiles = data?.filter(file => 
          file.name.match(/\.(jpg|jpeg|png|gif)$/i)
        ) || [];

        setImages(imageFiles);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full aspect-square bg-muted/20 animate-pulse rounded-lg" />
    );
  }

  if (images.length === 0) {
    return (
      <div className="w-full aspect-square bg-muted/20 flex items-center justify-center rounded-lg">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <Carousel 
      className="w-full aspect-square relative" 
      opts={{ 
        loop: true,
      }}
      plugins={[autoplay]}
    >
      <CarouselContent>
        {images.map((image, index) => {
          const imageUrl = supabase.storage
            .from('profile_pictures')
            .getPublicUrl(image.name);
          
          const finalUrl = imageUrl.data.publicUrl;

          return (
            <CarouselItem key={index}>
              <div className="w-full aspect-square relative overflow-hidden rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-1">
                <div className="w-full h-full rounded-lg overflow-hidden border-2 border-muted dark:border-muted/50">
                  <img
                    src={finalUrl}
                    alt={`Profile ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
};

export default ProfileCarousel;