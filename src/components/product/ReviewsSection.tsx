import { useState } from "react";
import { Star, ThumbsUp, MessageSquare, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  content: string;
  helpful: number;
  images?: string[];
}

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: { stars: number; count: number }[];
}

const ReviewsSection = ({
  reviews,
  averageRating,
  totalReviews,
  ratingBreakdown,
}: ReviewsSectionProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  const renderStars = (rating: number, size: "sm" | "md" = "sm") => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              size === "sm" ? "h-3 w-3" : "h-5 w-5",
              star <= rating
                ? "fill-badge-hot text-badge-hot"
                : "fill-muted text-muted"
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Customer Reviews
        </h2>
        <Button variant="outline" size="sm">
          Write a Review
        </Button>
      </div>

      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-6 p-4 bg-muted/30 rounded-2xl">
        {/* Average Rating */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-5xl font-bold text-foreground">
            {averageRating.toFixed(1)}
          </div>
          <div className="mt-2">{renderStars(Math.round(averageRating), "md")}</div>
          <p className="mt-1 text-sm text-muted-foreground">
            Based on {totalReviews} reviews
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-2">
          {ratingBreakdown.map((item) => {
            const percentage = totalReviews > 0 ? (item.count / totalReviews) * 100 : 0;
            return (
              <div key={item.stars} className="flex items-center gap-2">
                <span className="text-sm w-12">{item.stars} stars</span>
                <Progress value={percentage} className="flex-1 h-2" />
                <span className="text-sm text-muted-foreground w-10 text-right">
                  {item.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="p-4 border border-border rounded-xl space-y-3 transition-shadow hover:shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {review.author.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{review.author}</p>
                  <div className="flex items-center gap-2">
                    {renderStars(review.rating)}
                    <span className="text-xs text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {review.content}
            </p>

            {review.images && review.images.length > 0 && (
              <div className="flex gap-2">
                {review.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Review image ${idx + 1}`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                ))}
              </div>
            )}

            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ThumbsUp className="h-3 w-3 mr-1" />
              Helpful ({review.helpful})
            </Button>
          </div>
        ))}
      </div>

      {/* Show More */}
      {reviews.length > 3 && (
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : `Show All ${reviews.length} Reviews`}
          <ChevronDown
            className={cn("h-4 w-4 ml-2 transition-transform", showAll && "rotate-180")}
          />
        </Button>
      )}
    </div>
  );
};

export default ReviewsSection;
