import { useState } from "react";
import { Sparkles, Tag, Truck, Users, Calendar, BookOpen, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "latest", label: "Latest", icon: <Sparkles className="h-4 w-4" /> },
  { id: "offer", label: "Offer", icon: <Tag className="h-4 w-4" /> },
  { id: "shipment", label: "Shipment", icon: <Truck className="h-4 w-4" /> },
  { id: "collaboration", label: "Collaboration", icon: <Users className="h-4 w-4" /> },
  { id: "event", label: "Event", icon: <Calendar className="h-4 w-4" /> },
  { id: "guideline", label: "Guideline", icon: <BookOpen className="h-4 w-4" /> },
];

const contentItems = [
  {
    id: 1,
    title: "How to recognize a real importer?",
    date: "22/12/2025",
    thumbnail: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=300&q=80",
    hasVideo: true
  },
  {
    id: 2,
    title: "New supplier partnerships announced",
    date: "21/12/2025",
    thumbnail: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=300&q=80",
    hasVideo: true
  },
  {
    id: 3,
    title: "Shipping guidelines for 2026",
    date: "20/12/2025",
    thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&q=80",
    hasVideo: true
  },
  {
    id: 4,
    title: "About WholesaleHub marketplace",
    date: "18/11/2025",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&q=80",
    hasVideo: true
  },
  {
    id: 5,
    title: "Why do sea shipment?",
    date: "15/11/2025",
    thumbnail: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=300&q=80",
    hasVideo: true
  },
  {
    id: 6,
    title: "Quality assurance process",
    date: "27/08/2025",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80",
    hasVideo: true
  },
];

const ContentTabs = () => {
  const [activeTab, setActiveTab] = useState("latest");

  return (
    <section className="py-6">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "shrink-0 rounded-full transition-all duration-200",
                activeTab === tab.id 
                  ? "gradient-primary text-primary-foreground shadow-card-hover" 
                  : "hover:bg-accent"
              )}
            >
              {tab.icon}
              <span className="ml-1.5">{tab.label}</span>
            </Button>
          ))}
        </div>
        
        <Button variant="outline" size="sm" className="shrink-0 rounded-full hidden md:flex items-center gap-2">
          <Play className="h-4 w-4 text-primary" />
          View Gallery
        </Button>
      </div>

      {/* Content Cards */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          {contentItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative shrink-0 w-48 md:w-56 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {item.hasVideo && (
                  <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm shadow-card">
                      <Play className="h-5 w-5 text-primary ml-0.5" />
                    </div>
                  </div>
                )}
                {/* Badge for specific categories */}
                {item.hasVideo && (
                  <div className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Play className="h-3 w-3" />
                  </div>
                )}
              </div>
              <div className="mt-3">
                <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{item.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicators */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -left-4 top-1/3 h-10 w-10 rounded-full bg-card shadow-card hidden md:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-1/3 h-10 w-10 rounded-full bg-card shadow-card hidden md:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default ContentTabs;
