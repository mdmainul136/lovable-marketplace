import { useState } from "react";
import Header from "@/components/layout/Header";
import CategorySidebar from "@/components/layout/CategorySidebar";
import MobileNav from "@/components/layout/MobileNav";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/home/HeroCarousel";
import ContentTabs from "@/components/home/ContentTabs";
import QuickLinks from "@/components/home/QuickLinks";
import ProductSection from "@/components/product/ProductSection";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Category Sidebar */}
        <CategorySidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)} 
        />

        {/* Main Area */}
        <main className="flex-1 overflow-x-hidden pb-20 lg:pb-0">
          <div className="container py-4 lg:py-6 space-y-2">
            {/* Hero Carousel */}
            <HeroCarousel />

            {/* Content Tabs */}
            <ContentTabs />

            {/* Quick Links */}
            <QuickLinks />

            {/* Product Sections */}
            <ProductSection 
              title="Shoes For All Occasions" 
              viewAllLink="/category/shoes"
              accentColor="hsl(168, 76%, 42%)"
            />

            <ProductSection 
              title="Huge Collection Of Bags" 
              viewAllLink="/category/bags"
              accentColor="hsl(262, 80%, 55%)"
            />

            <ProductSection 
              title="Stylish Jewelry" 
              viewAllLink="/category/jewelry"
              accentColor="hsl(340, 75%, 55%)"
            />

            <ProductSection 
              title="Unique Watches" 
              viewAllLink="/category/watches"
              accentColor="hsl(210, 80%, 55%)"
            />

            <ProductSection 
              title="Latest Electronics" 
              viewAllLink="/category/gadgets"
              accentColor="hsl(32, 95%, 55%)"
            />
          </div>

          {/* Footer */}
          <Footer />
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default Index;
