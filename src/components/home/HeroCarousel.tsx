import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import heroBanner1 from "@/assets/hero-banner-1.jpg";
import heroBanner2 from "@/assets/hero-banner-2.jpg";
import heroBanner3 from "@/assets/hero-banner-3.jpg";

const banners = [
  {
    id: 1,
    image: heroBanner1,
    title: "Global Wholesale Network",
    subtitle: "Connect with suppliers worldwide",
    cta: "Explore Now"
  },
  {
    id: 2,
    image: heroBanner2,
    title: "Fashion & Bags Collection",
    subtitle: "Premium quality at wholesale prices",
    cta: "Shop Collection"
  },
  {
    id: 3,
    image: heroBanner3,
    title: "Electronics & Gadgets",
    subtitle: "Latest tech at B2B prices",
    cta: "View Products"
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Slides Container */}
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div 
            key={banner.id}
            className="relative min-w-full aspect-[21/9] md:aspect-[3/1]"
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="h-full w-full object-cover"
            />
            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-center bg-gradient-to-r from-foreground/60 to-transparent">
              <div className="p-6 md:p-12 lg:p-16 max-w-lg">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-card mb-2 md:mb-4 animate-slide-in-left">
                  {banner.title}
                </h2>
                <p className="text-sm md:text-lg text-card/90 mb-4 md:mb-6 animate-slide-in-left stagger-1">
                  {banner.subtitle}
                </p>
                <Button 
                  size="lg"
                  className="gradient-primary text-primary-foreground hover:opacity-90 animate-slide-in-left stagger-2"
                >
                  {banner.cta}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card shadow-card"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card shadow-card"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              currentSlide === index 
                ? "w-8 bg-primary" 
                : "w-2 bg-card/60 hover:bg-card/80"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
