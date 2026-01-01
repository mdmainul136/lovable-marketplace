import { Search, Package, HelpCircle } from "lucide-react";

const QuickLinks = () => {
  const links = [
    {
      id: "skyone",
      title: "WholesaleOne",
      description: "One-stop shop for all products",
      icon: <Package className="h-8 w-8" />,
      color: "bg-gradient-to-br from-primary/10 to-primary/5"
    },
    {
      id: "skyship",
      title: "QuickShip",
      description: "Fast & reliable shipping",
      icon: <Package className="h-8 w-8" />,
      color: "bg-gradient-to-br from-category-5/10 to-category-5/5"
    },
    {
      id: "search",
      title: "How to find products?",
      description: "Search by name or image",
      icon: <Search className="h-8 w-8" />,
      color: "bg-gradient-to-br from-category-3/10 to-category-3/5"
    },
    {
      id: "order",
      title: "How to order?",
      description: "Click on product and place order",
      icon: <HelpCircle className="h-8 w-8" />,
      color: "bg-gradient-to-br from-category-4/10 to-category-4/5"
    },
  ];

  return (
    <section className="py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {links.map((link, index) => (
          <a
            key={link.id}
            href="#"
            className={`group relative flex flex-col items-center justify-center p-4 md:p-6 rounded-2xl ${link.color} transition-all duration-300 hover:scale-[1.02] hover:shadow-card animate-fade-in`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-primary mb-2 transition-transform duration-300 group-hover:scale-110">
              {link.icon}
            </div>
            <h3 className="text-sm md:text-base font-semibold text-center">
              {link.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground text-center line-clamp-1">
              {link.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default QuickLinks;
