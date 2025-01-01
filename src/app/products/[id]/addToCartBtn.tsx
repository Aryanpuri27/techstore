"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ product }) {
  const { session } = useSession();
  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        global: {
          fetch: async (url, options = {}) => {
            const clerkToken = await session?.getToken({
              template: "supabase",
            });
            const headers = new Headers((options as RequestInit).headers);
            headers.set("Authorization", `Bearer ${clerkToken}`);
            return fetch(url, {
              ...options,
              headers,
            });
          },
        },
      }
    );
  }
  const client = createClerkSupabaseClient();
  async function addToCart(product, quantity) {
    try {
      if (!session) {
        toast({
          title: "Sign in to add to cart",
          description: "You need to sign in to add products to cart",
        });
        return;
      }
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
    <Button size="lg" variant="outline" onClick={() => addToCart(product, 1)}>
      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
    </Button>
  );
}
