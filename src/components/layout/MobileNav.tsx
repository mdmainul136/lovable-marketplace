import { Home, Grid3X3, Heart, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "category", label: "Category", icon: Grid3X3 },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "cart", label: "Cart", icon: ShoppingCart },
  { id: "account", label: "Account", icon: User },
];

const MobileNav = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-md lg:hidden">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-200",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-lg transition-all duration-200",
                isActive && "gradient-primary"
              )}>
                <Icon className={cn(
                  "h-5 w-5 transition-all",
                  isActive && "text-primary-foreground"
                )} />
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-all",
                isActive && "font-semibold"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      {/* Safe area padding for iOS */}
      <div className="h-safe-area-inset-bottom bg-card" />
    </nav>
  );
};

export default MobileNav;
