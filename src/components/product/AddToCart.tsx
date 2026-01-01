import { useState } from "react";
import { ShoppingCart, Heart, Share2, Minus, Plus, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AddToCartProps {
  productName: string;
  price: number;
  minOrder: number;
  inStock: boolean;
  onQuantityChange?: (qty: number) => void;
}

const AddToCart = ({ productName, price, minOrder, inStock, onQuantityChange }: AddToCartProps) => {
  const [quantity, setQuantity] = useState(minOrder);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();

  const handleQuantityChange = (delta: number) => {
    const newQty = Math.max(minOrder, quantity + delta);
    setQuantity(newQty);
    onQuantityChange?.(newQty);
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${productName} added to your cart.`,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted 
        ? `${productName} removed from your wishlist.`
        : `${productName} added to your wishlist.`,
    });
  };

  const totalPrice = price * quantity;

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Quantity (Min. {minOrder} pcs)</label>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-border rounded-xl overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-none"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= minOrder}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value) || minOrder;
                setQuantity(Math.max(minOrder, val));
                onQuantityChange?.(Math.max(minOrder, val));
              }}
              className="w-16 h-10 text-center bg-transparent border-x border-border focus:outline-none text-sm font-medium"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-none"
              onClick={() => handleQuantityChange(1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 text-right">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-xl font-bold text-primary">${totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          size="lg"
          className="flex-1 gradient-primary text-primary-foreground hover:opacity-90 rounded-xl h-12"
          onClick={handleAddToCart}
          disabled={!inStock}
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          {inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "h-12 w-12 rounded-xl transition-colors",
            isWishlisted && "bg-badge-sale/10 border-badge-sale text-badge-sale"
          )}
          onClick={handleWishlist}
        >
          <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
        </Button>
        
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        <div className="flex flex-col items-center text-center p-3 bg-muted/50 rounded-xl">
          <Truck className="h-5 w-5 text-primary mb-1" />
          <span className="text-[10px] text-muted-foreground">Free Shipping</span>
        </div>
        <div className="flex flex-col items-center text-center p-3 bg-muted/50 rounded-xl">
          <Shield className="h-5 w-5 text-primary mb-1" />
          <span className="text-[10px] text-muted-foreground">Secure Payment</span>
        </div>
        <div className="flex flex-col items-center text-center p-3 bg-muted/50 rounded-xl">
          <RotateCcw className="h-5 w-5 text-primary mb-1" />
          <span className="text-[10px] text-muted-foreground">Easy Returns</span>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
