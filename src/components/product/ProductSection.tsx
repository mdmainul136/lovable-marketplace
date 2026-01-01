import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { useRef } from "react";

import bagImage from "@/assets/products/bag-1.jpg";
import shoesImage from "@/assets/products/shoes-1.jpg";
import jewelryImage from "@/assets/products/jewelry-1.jpg";
import watchImage from "@/assets/products/watch-1.jpg";
import gadgetImage from "@/assets/products/gadget-1.jpg";
import eyewearImage from "@/assets/products/eyewear-1.jpg";

interface ProductSectionProps {
  title: string;
  viewAllLink?: string;
  accentColor?: string;
}

const sampleProducts = [
  {
    id: "1",
    name: "Premium Leather Tote Bag - Genuine Italian Leather",
    image: bagImage,
    price: 45.99,
    originalPrice: 89.99,
    minOrder: 10,
    badge: "sale" as const,
    rating: 4.8,
    sold: 1250
  },
  {
    id: "2",
    name: "Classic Oxford Leather Shoes - Men's Formal Wear",
    image: shoesImage,
    price: 68.00,
    minOrder: 20,
    badge: "new" as const,
    rating: 4.6,
    sold: 890
  },
  {
    id: "3",
    name: "Elegant Gold Jewelry Set - Necklace & Earrings",
    image: jewelryImage,
    price: 32.50,
    originalPrice: 55.00,
    minOrder: 50,
    badge: "hot" as const,
    rating: 4.9,
    sold: 2340
  },
  {
    id: "4",
    name: "Smart Watch Pro - Fitness Tracker with Heart Monitor",
    image: watchImage,
    price: 125.00,
    minOrder: 5,
    rating: 4.7,
    sold: 567
  },
  {
    id: "5",
    name: "Wireless Earbuds Pro - Active Noise Cancellation",
    image: gadgetImage,
    price: 28.99,
    originalPrice: 49.99,
    minOrder: 30,
    badge: "sale" as const,
    rating: 4.5,
    sold: 3200
  },
  {
    id: "6",
    name: "Designer Aviator Sunglasses - UV400 Protection",
    image: eyewearImage,
    price: 18.50,
    minOrder: 50,
    badge: "new" as const,
    rating: 4.4,
    sold: 1890
  },
];

const ProductSection = ({ title, viewAllLink, accentColor }: ProductSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 
          className="text-lg md:text-xl font-bold"
          style={{ color: accentColor }}
        >
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full hidden md:flex"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full hidden md:flex"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          {viewAllLink && (
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
      </div>

      {/* Products Scroll */}
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
      >
        {sampleProducts.map((product, index) => (
          <div 
            key={product.id}
            className="shrink-0 w-[160px] md:w-[200px] lg:w-[220px] animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
