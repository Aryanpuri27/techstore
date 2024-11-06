import React, { useEffect, useState } from "react";
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

const products = [
  {
    id: 1,
    name: "Custom Figurine",
    category: "Figurines",
    price: 29.99,
    material: "PLA",
    printTime: 3,
    image: "/placeholder.svg?height=200&width=200&text=Figurine",
  },
  {
    id: 2,
    name: "Architectural Model",
    category: "Models",
    price: 99.99,
    material: "Resin",
    printTime: 8,
    image: "/placeholder.svg?height=200&width=200&text=Model",
  },
  {
    id: 3,
    name: "Gear Set",
    category: "Mechanical",
    price: 39.99,
    material: "ABS",
    printTime: 5,
    image: "/placeholder.svg?height=200&width=200&text=Gears",
  },
  {
    id: 4,
    name: "Phone Case",
    category: "Accessories",
    price: 19.99,
    material: "TPU",
    printTime: 2,
    image: "/placeholder.svg?height=200&width=200&text=Case",
  },
  {
    id: 5,
    name: "Vase",
    category: "Home Decor",
    price: 49.99,
    material: "PETG",
    printTime: 6,
    image: "/placeholder.svg?height=200&width=200&text=Vase",
  },
  {
    id: 6,
    name: "Drone Parts",
    category: "Electronics",
    price: 79.99,
    material: "Nylon",
    printTime: 4,
    image: "/placeholder.svg?height=200&width=200&text=Drone",
  },
];

function ShoppingCartCom() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Retrieve cart from localStorage
  const getFromLocalStorage = () => {
    const cart = localStorage.getItem("cart");
    console.log("cart", cart);
    return cart ? JSON.parse(cart) : [];
  };

  // Sync cart with local storage on load and save when cart changes
  useEffect(() => {
    setCart(getFromLocalStorage());
  }, [isCartOpen]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, newQuantity) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const cartTotal = Array.isArray(cart)
    ? cart.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

  return (
    <div>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="relative">
            <ShoppingCart className=" h-4 w-4" />

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
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)} each
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
                <span className="font-bold">${cartTotal.toFixed(2)}</span>
              </div>
              <Button
                className="w-full"
                onClick={() => alert("Proceeding to checkout...")}
              >
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
