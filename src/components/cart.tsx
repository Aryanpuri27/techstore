"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "@clerk/nextjs";
import { createSupabaseClient } from "@/lib/supabase-client";

function ShoppingCartCom() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { session } = useSession();
  const router = useRouter();

  const client = React.useMemo(() => {
    if (session) {
      return createSupabaseClient(() =>
        session.getToken({ template: "supabase" })
      );
    }
    return null;
  }, [session]);

  const fetchCart = useCallback(async () => {
    if (client) {
      const { data, error } = await client.from("cart").select(`
        id,
        quantity,
        product_id,
        products (
          id,
          name,
          category,
          price,
          discounted_price,
          rating,
          review_count,
          description,
          images,
          specifications
        )
      `);
      if (data) setCart(data);
      if (error) console.error("Error fetching cart:", error);
    }
  }, [client]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart, isCartOpen]);

  const updateCartItemQuantity = useCallback(
    async (productId, newQuantity) => {
      if (client) {
        await client
          .from("cart")
          .update({ quantity: newQuantity })
          .match({ id: productId });
        fetchCart();
      }
    },
    [client, fetchCart]
  );

  const removeFromCart = useCallback(
    async (productId) => {
      if (client) {
        await client.from("cart").delete().match({ id: productId });
        fetchCart();
      }
    },
    [client, fetchCart]
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.products.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <div>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="relative">
            <ShoppingCart className="h-4 w-4" />
            {cart.length > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>
              Review your items and proceed to checkout
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.products.images[0]}
                    alt={item.products.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{item.products.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Rs {item.products.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateCartItemQuantity(item.id, item.quantity - 1)
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateCartItemQuantity(item.id, item.quantity + 1)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          {cart.length > 0 ? (
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="font-bold">Rs{cartTotal.toFixed(2)}</span>
              </div>
              <Button className="w-full" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          ) : (
            <p className="text-center mt-6 text-muted-foreground">
              Your cart is empty
            </p>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default ShoppingCartCom;
