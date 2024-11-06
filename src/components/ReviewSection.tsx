import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// This would typically come from an API or database
const reviews = [
  {
    id: 1,
    author: "John Doe",
    rating: 5,
    content:
      "Excellent sound quality and comfortable to wear for long periods. The noise cancellation is top-notch, making it perfect for both work and leisure.",
    date: "2023-05-15",
    verifiedPurchase: true,
  },
  {
    id: 2,
    author: "Jane Smith",
    rating: 4,
    content:
      "Great headphones overall, but the battery life could be better. I find myself charging them more often than I'd like. Still, the sound quality makes up for it.",
    date: "2023-06-02",
    verifiedPurchase: true,
  },
  {
    id: 3,
    author: "Mike Johnson",
    rating: 5,
    content:
      "The noise cancellation is fantastic! Perfect for my daily commute on the noisy subway. It's like being in my own little bubble of music.",
    date: "2023-06-20",
    verifiedPurchase: false,
  },
];

export default function ReviewSection({ productId }: { productId: number }) {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <Card key={review.id} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="mr-2">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.author}`}
                    />
                    <AvatarFallback>
                      {review.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-semibold">{review.author}</span>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-700 mb-4">{review.content}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{review.date}</span>
                {review.verifiedPurchase && (
                  <Badge variant="secondary" className="text-xs">
                    Verified Purchase
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
