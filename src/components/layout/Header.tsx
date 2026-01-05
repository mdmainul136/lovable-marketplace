import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  ChevronDown,
  Upload,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(5);
  const { user, isAuthenticated, logout, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-card shadow-navbar">
      <div className="container flex h-16 items-center justify-between gap-4 lg:h-20">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
            <span className="text-lg font-bold text-primary-foreground">W</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-xl font-bold text-foreground">Wholesale</span>
            <span className="text-xl font-bold text-primary">Hub</span>
          </div>
        </a>

        {/* Search Bar */}
        <div className={`relative flex-1 max-w-xl transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`}>
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              className="h-11 w-full rounded-full border-2 border-border bg-muted/50 pl-12 pr-32 text-sm transition-all focus:border-primary focus:bg-card"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
            />
            <div className="absolute right-2 flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <Upload className="h-3.5 w-3.5 mr-1" />
                Image
              </Button>
              <Button 
                size="sm" 
                className="h-7 rounded-full px-4 gradient-primary text-primary-foreground hover:opacity-90"
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Wishlist */}
          <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full hover:bg-accent">
            <Heart className="h-5 w-5" />
            {wishlistCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                {wishlistCount}
              </span>
            )}
          </Button>

          {/* Cart */}
          <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full hover:bg-accent">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Button>

          {/* User / Auth */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-10 gap-2 rounded-full px-3 hover:bg-accent">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <span className="text-xs font-semibold">
                      {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">
                    {user?.firstName || user?.email?.split('@')[0]}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="flex items-center gap-2 text-destructive focus:text-destructive"
                  onClick={() => logout()}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" size="sm" className="h-10 gap-2 rounded-full px-4 hover:bg-accent">
              <Link to="/auth">
                <User className="h-5 w-5" />
                <span className="hidden sm:inline text-sm">Login</span>
              </Link>
            </Button>
          )}

          {/* More Dropdown */}
          <Button variant="ghost" size="sm" className="hidden lg:flex items-center gap-1 rounded-full hover:bg-accent">
            <span className="text-sm">More</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
