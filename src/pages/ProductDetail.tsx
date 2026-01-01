import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Package, Clock, MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import ImageGallery from "@/components/product/ImageGallery";
import PricingTiers from "@/components/product/PricingTiers";
import ReviewsSection from "@/components/product/ReviewsSection";
import AddToCart from "@/components/product/AddToCart";
import ProductSection from "@/components/product/ProductSection";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock product data
const mockProduct = {
  id: "1",
  name: "Premium Leather Crossbody Bag - Genuine Cowhide with Adjustable Strap",
  category: "Bags",
  subcategory: "Crossbody Bags",
  basePrice: 45.99,
  originalPrice: 59.99,
  minOrder: 10,
  inStock: true,
  sku: "BAG-LTH-001",
  images: [
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
    "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800",
  ],
  description: `Elevate your wholesale inventory with our Premium Leather Crossbody Bag. Crafted from genuine cowhide leather, this versatile bag combines timeless elegance with everyday functionality.

Features:
• Genuine cowhide leather exterior
• Adjustable crossbody strap (up to 52")
• Multiple interior pockets for organization
• Secure magnetic closure
• Gold-tone hardware accents
• Available in 5 colors

Perfect for retail stores, boutiques, and online sellers looking for high-quality, stylish bags at competitive wholesale prices.`,
  specifications: [
    { label: "Material", value: "Genuine Cowhide Leather" },
    { label: "Dimensions", value: "10\" x 7\" x 3\"" },
    { label: "Strap Length", value: "Adjustable up to 52\"" },
    { label: "Weight", value: "0.8 lbs" },
    { label: "Closure", value: "Magnetic Snap" },
    { label: "Colors Available", value: "Black, Brown, Tan, Navy, Burgundy" },
  ],
  pricingTiers: [
    { minQty: 10, maxQty: 49, price: 45.99 },
    { minQty: 50, maxQty: 99, price: 39.99 },
    { minQty: 100, maxQty: 499, price: 34.99 },
    { minQty: 500, maxQty: null, price: 29.99 },
  ],
  rating: 4.7,
  totalReviews: 128,
  sold: 2450,
};

const mockReviews = [
  {
    id: "1",
    author: "Sarah M.",
    rating: 5,
    date: "Dec 15, 2025",
    content: "Excellent quality leather bags! My customers love them. The stitching is perfect and the leather smell is authentic. Will definitely order again.",
    helpful: 24,
  },
  {
    id: "2",
    author: "John D.",
    rating: 4,
    date: "Dec 10, 2025",
    content: "Good quality for the price. Shipping was fast and packaging was secure. Only minor issue was one bag had a small scratch, but seller resolved it quickly.",
    helpful: 18,
  },
  {
    id: "3",
    author: "Emily R.",
    rating: 5,
    date: "Dec 5, 2025",
    content: "These bags sell out so fast in my boutique! The quality is consistent across all pieces. The brown and tan colors are especially popular.",
    helpful: 32,
  },
  {
    id: "4",
    author: "Michael K.",
    rating: 5,
    date: "Nov 28, 2025",
    content: "Third order from this seller. Quality remains excellent. Great communication and fast processing.",
    helpful: 12,
  },
];

const ratingBreakdown = [
  { stars: 5, count: 89 },
  { stars: 4, count: 28 },
  { stars: 3, count: 8 },
  { stars: 2, count: 2 },
  { stars: 1, count: 1 },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedQty, setSelectedQty] = useState(mockProduct.minOrder);

  // Get current price based on quantity
  const getCurrentPrice = () => {
    const tier = mockProduct.pricingTiers.find(
      (t) => selectedQty >= t.minQty && (t.maxQty === null || selectedQty <= t.maxQty)
    );
    return tier?.price || mockProduct.basePrice;
  };

  const currentPrice = getCurrentPrice();
  const discount = Math.round(((mockProduct.originalPrice - currentPrice) / mockProduct.originalPrice) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-4 lg:py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/category/bags" className="hover:text-primary transition-colors">{mockProduct.category}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{mockProduct.subcategory}</span>
          </nav>

          {/* Product Info Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Image Gallery */}
            <ImageGallery images={mockProduct.images} productName={mockProduct.name} />

            {/* Product Details */}
            <div className="space-y-6">
              {/* Title & Badges */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {mockProduct.category}
                  </Badge>
                  {mockProduct.inStock ? (
                    <Badge className="bg-badge-new text-primary-foreground text-xs">In Stock</Badge>
                  ) : (
                    <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                  )}
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold leading-tight">
                  {mockProduct.name}
                </h1>
                <p className="text-sm text-muted-foreground">SKU: {mockProduct.sku}</p>
              </div>

              {/* Rating & Sales */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-badge-hot">★</span>
                  <span className="font-medium">{mockProduct.rating}</span>
                  <span className="text-muted-foreground">({mockProduct.totalReviews} reviews)</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-muted-foreground">{mockProduct.sold}+ sold</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">${currentPrice.toFixed(2)}</span>
                <span className="text-lg text-muted-foreground line-through">${mockProduct.originalPrice.toFixed(2)}</span>
                <Badge className="bg-badge-sale text-primary-foreground">-{discount}%</Badge>
              </div>

              {/* Pricing Tiers */}
              <PricingTiers
                tiers={mockProduct.pricingTiers}
                selectedQty={selectedQty}
                basePrice={mockProduct.originalPrice}
              />

              {/* Add to Cart */}
              <AddToCart
                productName={mockProduct.name}
                price={currentPrice}
                minOrder={mockProduct.minOrder}
                inStock={mockProduct.inStock}
                onQuantityChange={setSelectedQty}
              />

              {/* Shipping Info */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Package className="h-4 w-4 text-primary" />
                  <span>Ships in 1-3 days</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>3-7 day delivery</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Ships worldwide</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList className="w-full justify-start bg-muted/50 p-1 rounded-xl">
              <TabsTrigger value="description" className="rounded-lg">Description</TabsTrigger>
              <TabsTrigger value="specifications" className="rounded-lg">Specifications</TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-lg">Reviews ({mockProduct.totalReviews})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                {mockProduct.description}
              </div>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {mockProduct.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between p-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">{spec.label}</span>
                    <span className="text-sm font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <ReviewsSection
                reviews={mockReviews}
                averageRating={mockProduct.rating}
                totalReviews={mockProduct.totalReviews}
                ratingBreakdown={ratingBreakdown}
              />
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          <ProductSection
            title="You May Also Like"
            viewAllLink="/category/bags"
            accentColor="hsl(168, 76%, 42%)"
          />
        </div>

        <Footer />
      </main>

      <MobileNav />
    </div>
  );
};

export default ProductDetail;
