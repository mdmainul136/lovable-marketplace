import { useState } from "react";
import { 
  ShoppingBag, 
  Gem, 
  Footprints, 
  Sparkles, 
  Shirt, 
  User,
  Glasses,
  Baby,
  Watch,
  Smartphone,
  ChevronRight,
  ChevronDown,
  X,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  subcategories?: string[];
}

const categories: Category[] = [
  {
    id: "bags",
    name: "Bags",
    icon: <ShoppingBag className="h-5 w-5" />,
    subcategories: ["Handbags", "Backpacks", "Wallets", "Clutches", "Totes"]
  },
  {
    id: "jewelry",
    name: "Jewelry",
    icon: <Gem className="h-5 w-5" />,
    subcategories: ["Necklaces", "Earrings", "Bracelets", "Rings", "Sets"]
  },
  {
    id: "shoes",
    name: "Shoes",
    icon: <Footprints className="h-5 w-5" />,
    subcategories: ["Formal", "Casual", "Sports", "Sandals", "Boots"]
  },
  {
    id: "beauty",
    name: "Beauty",
    icon: <Sparkles className="h-5 w-5" />,
    subcategories: ["Skincare", "Makeup", "Haircare", "Fragrances", "Tools"]
  },
  {
    id: "mens-wear",
    name: "Mens Wear",
    icon: <Shirt className="h-5 w-5" />,
    subcategories: ["T-Shirts", "Shirts", "Pants", "Suits", "Jackets"]
  },
  {
    id: "womens-wear",
    name: "Women Wear",
    icon: <User className="h-5 w-5" />,
    subcategories: ["Dresses", "Tops", "Bottoms", "Ethnic", "Western"]
  },
  {
    id: "eyewear",
    name: "Eyewear",
    icon: <Glasses className="h-5 w-5" />,
    subcategories: ["Sunglasses", "Optical", "Sports", "Designer"]
  },
  {
    id: "baby-items",
    name: "Baby Items",
    icon: <Baby className="h-5 w-5" />,
    subcategories: ["Clothing", "Toys", "Accessories", "Feeding"]
  },
  {
    id: "watches",
    name: "Watches",
    icon: <Watch className="h-5 w-5" />,
    subcategories: ["Smart", "Analog", "Digital", "Luxury", "Sports"]
  },
  {
    id: "gadgets",
    name: "Gadgets",
    icon: <Smartphone className="h-5 w-5" />,
    subcategories: ["Phones", "Tablets", "Earbuds", "Chargers", "Accessories"]
  },
];

interface CategorySidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const CategorySidebar = ({ isOpen, onToggle }: CategorySidebarProps) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
    }
    setSelectedCategory(categoryId);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggle}
        className="fixed left-4 top-24 z-40 h-12 w-12 rounded-full bg-card shadow-card lg:hidden"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r border-border bg-sidebar transition-transform duration-300 lg:sticky lg:top-20 lg:z-auto lg:h-[calc(100vh-5rem)] lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Menu className="h-4 w-4" />
            Categories
          </h2>
          
          <nav className="space-y-1">
            {categories.map((category) => (
              <div key={category.id}>
                <button
                  onClick={() => handleCategoryClick(category.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-sidebar-accent",
                    selectedCategory === category.id
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground"
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span className={cn(
                      "transition-colors",
                      selectedCategory === category.id ? "text-primary" : "text-muted-foreground"
                    )}>
                      {category.icon}
                    </span>
                    {category.name}
                  </span>
                  {category.subcategories && (
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform duration-200",
                        expandedCategory === category.id && "rotate-180"
                      )}
                    />
                  )}
                </button>
                
                {/* Subcategories */}
                {category.subcategories && expandedCategory === category.id && (
                  <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-border pl-4 animate-fade-in">
                    {category.subcategories.map((sub) => (
                      <a
                        key={sub}
                        href="#"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      >
                        <ChevronRight className="h-3 w-3" />
                        {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default CategorySidebar;
