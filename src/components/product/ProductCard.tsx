import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  minOrder: number;
  badge?: "new" | "sale" | "hot";
  rating?: number;
  sold?: number;
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  originalPrice,
  minOrder,
  badge,
  rating,
  sold
}: ProductCardProps) => {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-card shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badge */}
        {badge && (
          <Badge
            className={cn(
              "absolute left-2 top-2 text-[10px] font-semibold uppercase",
              badge === "new" && "bg-badge-new text-primary-foreground",
              badge === "sale" && "bg-badge-sale text-primary-foreground",
              badge === "hot" && "bg-badge-hot text-primary-foreground"
            )}
          >
            {badge === "sale" && discount > 0 ? `-${discount}%` : badge}
          </Badge>
        )}

        {/* Quick Actions */}
        <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-card/90 backdrop-blur-sm shadow-sm hover:bg-primary hover:text-primary-foreground"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-card/90 backdrop-blur-sm shadow-sm hover:bg-primary hover:text-primary-foreground"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to Cart Button */}
        <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button
            size="sm"
            className="w-full rounded-lg gradient-primary text-primary-foreground hover:opacity-90"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Min Order */}
        <p className="mt-1 text-xs text-muted-foreground">
          Min. Order: {minOrder} pcs
        </p>

        {/* Stats */}
        {(rating || sold) && (
          <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
            {rating && (
              <span className="flex items-center gap-1">
                <span className="text-badge-hot">★</span>
                {rating.toFixed(1)}
              </span>
            )}
            {sold && (
              <span>{sold}+ sold</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
