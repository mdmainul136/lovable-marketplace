import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PricingTier {
  minQty: number;
  maxQty: number | null;
  price: number;
}

interface PricingTiersProps {
  tiers: PricingTier[];
  selectedQty: number;
  basePrice: number;
}

const PricingTiers = ({ tiers, selectedQty, basePrice }: PricingTiersProps) => {
  const getActiveTier = () => {
    return tiers.find(
      (tier) =>
        selectedQty >= tier.minQty &&
        (tier.maxQty === null || selectedQty <= tier.maxQty)
    );
  };

  const activeTier = getActiveTier();

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <span className="h-1 w-1 rounded-full bg-primary" />
        Bulk Pricing Tiers
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {tiers.map((tier, index) => {
          const isActive = activeTier === tier;
          const discount = Math.round(((basePrice - tier.price) / basePrice) * 100);
          
          return (
            <div
              key={index}
              className={cn(
                "relative rounded-xl p-3 border-2 transition-all",
                isActive
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/30"
              )}
            >
              {isActive && (
                <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary-foreground" />
                </div>
              )}
              
              <p className="text-xs text-muted-foreground">
                {tier.maxQty
                  ? `${tier.minQty}-${tier.maxQty} pcs`
                  : `${tier.minQty}+ pcs`}
              </p>
              
              <p className={cn(
                "text-lg font-bold mt-1",
                isActive ? "text-primary" : "text-foreground"
              )}>
                ${tier.price.toFixed(2)}
              </p>
              
              {discount > 0 && (
                <span className="text-[10px] font-medium text-badge-sale">
                  Save {discount}%
                </span>
              )}
            </div>
          );
        })}
      </div>
      
      <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-2">
        💡 Order more to unlock better prices. Bulk orders ship within 3-5 business days.
      </p>
    </div>
  );
};

export default PricingTiers;
