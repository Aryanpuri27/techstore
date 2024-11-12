"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, CreditCard, Truck } from "lucide-react";
import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  let [cartItems, setCart] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = () => {
    if (Object.values(shippingInfo).every((value) => value !== "")) {
      setStep(2);
    } else {
      toast({
        title: "Please fill in all fields",
        description: "All shipping information fields are required.",
        variant: "destructive",
      });
    }
  };

  const handleOpenPaymentGateway = () => {
    console.log("Opening payment gateway with order details:", {
      shippingInfo,
      cartItems,
    });
    toast({
      title: "Redirecting to Payment Gateway",
      description: "You will be redirected to complete your payment.",
    });
    setTimeout(() => {
      router.push("/order-confirmation");
    }, 2000);
  };

  const { session } = useSession();
  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      {
        global: {
          // Get the custom Supabase token from Clerk
          fetch: async (url, options = {}) => {
            // The Clerk `session` object has the getToken() method
            const clerkToken = await session?.getToken({
              // Pass the name of the JWT template you created in the Clerk Dashboard
              // For this tutorial, you named it 'supabase'
              template: "supabase",
            });

            // Insert the Clerk Supabase token into the headers
            const headers = new Headers((options as RequestInit).headers);
            headers.set("Authorization", `Bearer ${clerkToken}`);

            // Call the default fetch
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
  // async function abc() {
  //   const response = await client.from("cart").select("*");
  //   console.log("response", response);
  //   setCart(response.data);
  // }
  // abc();

  const abc = async () => {
    // const response = await client.from("cart").select("*");
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
    console.log("data", data);
    if (data) setCart(data);
  };
  abc();

  useEffect(() => {
    abc();
  }, []);

  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce(
        (total, item) => total + item.products.price * item.quantity,
        0
      )
    : 0;
  const shipping = 500; // Fixed shipping cost
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 lg:px-10 py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2" />
                Your Cart
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                {cartItems.map((item) => {
                  return item.quantity === 0 ? null : (
                    <div
                      key={item.id}
                      className="flex items-center mb-4 space-x-4"
                    >
                      <Image
                        src={item.products.images[0]}
                        alt={item.products.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.products.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="text-primary">
                        ₹{(item.products.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </ScrollArea>
              <Separator className="my-4" />
              <div className="flex justify-between items-center mb-2">
                <p>Subtotal</p>
                <p className="text-primary">₹{subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p>Shipping</p>
                <p className="text-primary">₹{shipping.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center font-bold">
                <p>Total</p>
                <p className="text-primary">₹{total.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingInfoChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={shippingInfo.country}
                        onValueChange={(value) =>
                          setShippingInfo({ ...shippingInfo, country: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="india">India</SelectItem>
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleProceedToPayment}>
                  Proceed to Payment
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2" />
                  Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Click the button below to be redirected to our secure payment
                  gateway.
                </p>
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the terms and conditions
                  </label>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleOpenPaymentGateway}>
                  Proceed with Payment
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
