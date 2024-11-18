// import Img from "@/components/corosul";
// import QuantitySelector from "@/components/quantitySelector";
// import { Button } from "@/components/ui/button";

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const slug = (await params).id;

//   return (
//     <div className="p-5 md:px-20 gap-10 flex flex-col">
//       <div className="flex flex-col  md:flex-row gap-4 lg:px-20">
//         <div className="flex md:w-[50%]">
//           <Img
//             links={[
//               "https://picsum.photos/200",
//               "https://picsum.photos/200",
//               "https://picsum.photos/200",
//               "https://picsum.photos/200",
//             ]}
//           />
//         </div>
//         <div className="flex flex-col  md:p-10 gap-2 md:gap-4   justify-center">
//           <h1 className=" text-5xl md:text-9xl">Name</h1>
//           <span className="md:text-4xl">⭐⭐⭐⭐⭐</span>
//           <QuantitySelector quantity={2} />
//           <Button>Add to Cart🛒</Button>
//           <Button>Buy Now</Button>
//         </div>
//       </div>
//       <div className="p-5 md:p-20">
//         <p>
//           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui impedit
//           totam illo, fugiat iste id dolorem aut praesentium laboriosam
//           voluptatibus expedita est nostrum reprehenderit repudiandae voluptate
//           ea quod minus quia. Natus tenetur fuga dolor dolorem doloribus modi
//           harum nisi beatae labore earum repellat, eveniet explicabo facere,
//           quas repellendus ullam molestiae laborum obcaecati sequi similique
//           eius! Est, odio maxime! Recusandae similique eum earum voluptates
//           eaque, totam, optio delectus quis voluptatem accusamus assumenda
//           laboriosam. Assumenda mollitia atque magnam? Eius dolorem ratione
//           perspiciatis eveniet ducimus, provident fugit tempora minus molestias
//           eum libero debitis? Aliquid dolores nam, alias sint quas culpa
//           molestias minima, dolore perferendis praesentium, cupiditate tempora
//           illum fugit voluptas totam! Id, optio quia voluptates molestiae,
//           accusantium, odio consectetur totam porro pariatur et sint. Sit quis
//           ratione incidunt reiciendis nemo fuga distinctio! Nemo optio assumenda
//           ratione qui quae soluta unde ad reiciendis voluptates. Maxime sequi
//           cumque illum voluptas odit esse, eius quas deserunt, recusandae nihil
//           perspiciatis et nobis dolorem nesciunt, rem asperiores dolor aliquam
//           temporibus impedit? Hic perspiciatis suscipit saepe, ab cumque
//           maiores! Nulla aut aperiam culpa minima praesentium ex! Sunt, quod
//           sint rerum minus aspernatur maiores consequatur consequuntur fugiat
//           similique cumque saepe beatae pariatur adipisci porro dolore soluta
//           repellat, aperiam est accusamus a nesciunt inventore sed omnis! Natus
//           odit nihil perspiciatis quos dignissimos. Assumenda aliquam inventore
//           deserunt delectus nobis. Eos praesentium perferendis, delectus
//           dignissimos pariatur doloribus sunt nam est error temporibus
//           laudantium ut non quia voluptates sint commodi qui iure quae nihil
//           labore itaque. Cupiditate aliquam quod recusandae provident ex
//           repellendus, architecto excepturi exercitationem dicta laboriosam
//           eveniet fugiat illum officia neque perferendis et labore inventore
//           delectus. Voluptatum veniam voluptatibus placeat velit nobis, aut
//           maxime aliquid aperiam accusantium esse sint harum, perferendis
//           sapiente! Voluptatum nisi ut adipisci perferendis obcaecati quod
//           accusamus voluptate, nobis consequatur aliquid alias, hic totam sunt,
//           reiciendis amet velit ipsam!
//         </p>
//       </div>
//     </div>
//   );
// }
import { Suspense } from "react";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ImageCarousel from "@/components/image-corosul";
import ReviewSection from "@/components/ReviewSection";
import { createClerkSupabaseClientSsr } from "@/app/ssr/client";
import { toast } from "@/hooks/use-toast";
import AddToCartButton from "./addToCartBtn";
// import Footer from "@/components/Footer";
// import ReviewSection from "./ReviewSection";
// import ImageCarousel from "./ImageCarousel";

// This would typically come from an API or database
const product = {
  id: 1,
  name: "Premium Wireless Headphones",
  category: "Electronics",
  price: 199.99,
  discountedPrice: 149.99,
  rating: 4.5,
  reviewCount: 128,
  description:
    "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and long-lasting battery life.",
  images: ["/stage.jpeg", "/banner.png", "/stage.jpeg", "/banner.png"],
  specifications: [
    { name: "Battery Life", value: "Up to 30 hours" },
    { name: "Bluetooth Version", value: "5.0" },
    { name: "Noise Cancellation", value: "Active" },
    { name: "Water Resistance", value: "IPX4" },
    { name: "Weight", value: "250g" },
  ],
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const client = await createClerkSupabaseClientSsr();
  const { data: product, error } = await client
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return <div>Error loading product</div>;
  }
  console.log(product);
  async function addToCart(product, quantity) {
    "use client";
    try {
      const response = await client.from("cart").insert({
        product_id: product.id,
        quantity: quantity,
        unit_price: product.price,
      });

      if (response.error) throw response.error;

      toast({
        title: "Added to Cart",
        description: `${quantity} ${product.name} added to cart`,
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add product to cart",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <ImageCarousel images={product.images} />

            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  ({product.review_count} reviews)
                </span>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-primary">
                  Rs.{product.discounted_price.toFixed(2)}
                </span>
                <span className="ml-2 text-xl text-gray-500 line-through">
                  Rs.{product.price.toFixed(2)}
                </span>
                <Badge className="ml-2 bg-green-500">
                  Save{" "}
                  {(
                    ((product.price - product.discounted_price) /
                      product.price) *
                    100
                  ).toFixed(0)}
                  %
                </Badge>
              </div>
              <p className="text-gray-700 mb-6">{product.description}</p>
              <div className="flex space-x-4 mb-8">
                {/* <Button size="lg">Buy Now</Button> */}
                {/* <Button
                  size="lg"
                  variant="outline"
                  onClick={() => addToCart(product, 1)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button> */}
                <AddToCartButton product={product} />
                {/* <Button size="icon" variant="outline">
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Add to wishlist</span>
                </Button> */}
              </div>

              <Tabs defaultValue="specifications">
                <TabsList>
                  <TabsTrigger value="specifications">
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent value="specifications">
                  <ul className="list-disc pl-5">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="mb-2">
                        <span className="font-semibold">{spec.name}:</span>{" "}
                        {spec.value}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="shipping">
                  <p>
                    Free shipping on orders over Rs10000. Standard delivery 3-5
                    business days.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* <Suspense fallback={<div>Loading reviews...</div>}>
            <ReviewSection productId={product.id} />
          </Suspense> */}
        </div>
      </main>
    </div>
  );
}
