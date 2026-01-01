import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Headphones
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const features = [
    { icon: <Truck className="h-6 w-6" />, title: "Fast Shipping", desc: "Worldwide delivery" },
    { icon: <Shield className="h-6 w-6" />, title: "Secure Payment", desc: "100% protected" },
    { icon: <CreditCard className="h-6 w-6" />, title: "Easy Returns", desc: "30-day policy" },
    { icon: <Headphones className="h-6 w-6" />, title: "24/7 Support", desc: "Always here to help" },
  ];

  return (
    <footer className="bg-foreground text-card mt-8">
      {/* Features Bar */}
      <div className="border-b border-card/10">
        <div className="container py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="text-primary">{feature.icon}</div>
                <div>
                  <p className="font-semibold text-sm">{feature.title}</p>
                  <p className="text-xs text-card/70">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                <span className="text-lg font-bold text-primary-foreground">W</span>
              </div>
              <span className="text-xl font-bold">WholesaleHub</span>
            </div>
            <p className="text-sm text-card/70 mb-4">
              Your trusted B2B marketplace for wholesale products. Connect with verified suppliers worldwide.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-card/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-card/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-card/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-card/10">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-card/70">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">How to Order</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-card/70">
              <li><a href="#" className="hover:text-primary transition-colors">Bags & Wallets</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Jewelry</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shoes</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Electronics</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Fashion</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-card/70 mb-4">
              Subscribe to get updates on new arrivals and special offers.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-card/10 border-card/20 text-card placeholder:text-card/50"
              />
              <Button className="gradient-primary text-primary-foreground shrink-0">
                Subscribe
              </Button>
            </div>
            <div className="mt-4 space-y-2 text-sm text-card/70">
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@wholesalehub.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-card/10">
        <div className="container py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-card/60">
          <p>© 2026 WholesaleHub. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
