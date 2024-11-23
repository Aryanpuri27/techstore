import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Component() {
  // You can replace these with your actual YouTube video IDs
  const videoIds = [
    "ryLH9qRIk1o",
    "yvqANkgRNrM",
    "w4KZunN1ntc&t=129s",
    "jyIcC9X6CF8",
    "26kVdehOJms&t=402s",
    "LqwlJ_fMK_Q",
    "_f6Sld1E-dU",
    "M5bxe7ogaCQ",
    "Ec6Gfbhfyys",
    "DVM7VddDGP4",
    "bZm5vPhTGE8",
    "_HGBCzYyu1Y,",
    "lbFKDNOYW3w&t=4s",
    "mlUA2lnmi-g",
    "BL_15zvGPiE&t=170s",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-primary">
        Our Videos
      </h1>
      <p className="text-center text-lg mb-8 text-secondary">
        Check out our latest 3D printing tutorials, product showcases, and
        behind-the-scenes footage!
      </p>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoIds.map((videoId) => (
            <Card key={videoId} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
