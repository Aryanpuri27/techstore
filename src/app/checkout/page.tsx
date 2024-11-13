"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import {
  ShoppingCart,
  CreditCard,
  Truck,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

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
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [cartItems, setCart] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [sessionData, setSessionData] = useState({});
  const { session } = useSession();

  useEffect(() => {
    load({ mode: "sandbox" });
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const client = createClerkSupabaseClient();
    const { data, error } = await client
      .from("cart")
      .select(`id, quantity, product_id, products (id, name, price, images)`);
    if (data) setCart(data);
    if (error) console.error("Error fetching cart items:", error);
  };

  const createClerkSupabaseClient = () => {
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
            return fetch(url, { ...options, headers });
          },
        },
      }
    );
  };

  const handleShippingInfoChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleProceedToPayment = async () => {
    if (Object.values(shippingInfo).every((value) => value !== "")) {
      try {
        const { data } = await createSession(total);
        setSessionData(data.data);
        const orderId = data.data.order_id;
        await addOrderToDatabase(orderId);
        setStep(2);
        toast({
          title: "Order Created",
          description: `Order ID: ${orderId}`,
          variant: "success",
        });
      } catch (error) {
        console.error("Error during checkout:", error);
        toast({
          title: "Checkout Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Incomplete Information",
        description: "Please fill all fields.",
        variant: "destructive",
      });
    }
  };

  const createSession = async (orderAmount) => {
    return axios.post("/api/session", {
      order_amount: orderAmount,
      customer_id: "devstudio_user",
      customer_phone: shippingInfo.phone,
      customer_name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
      customer_email: shippingInfo.email,
    });
  };

  const addOrderToDatabase = async (orderId) => {
    const client = createClerkSupabaseClient();
    const orderItems = cartItems.map((item) => ({
      order_id: orderId,
      product_id: item.product_id,
      product_name: item.products.name,
      quantity: item.quantity,
      price: item.products.price,
      total: item.products.price * item.quantity,
      shippinginfo: shippingInfo,
    }));
    const { error } = await client.from("orderdetails").insert(orderItems);
    if (error) throw error;
  };

  const handleOpenPaymentGateway = async () => {
    if (!agreeToTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please agree to the terms.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Redirecting to Payment",
      description: `Session ID: ${sessionData.payment_session_id}`,
    });
    const cashfree = await load({ mode: "sandbox" });
    cashfree
      .checkout({
        paymentSessionId: sessionData.payment_session_id,
        redirectTarget: "_self",
      })
      .then((result) => {
        if (result.error) console.log("Payment error:", result.error);
        if (result.redirect) console.log("Payment redirected");
        if (result.paymentDetails)
          console.log(
            "Payment completed:",
            result.paymentDetails.paymentMessage
          );
      });
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.products.price * item.quantity,
    0
  );
  const shipping = 500;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="mr-2" />
                  Your Cart
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center mb-4 space-x-4"
                    >
                      <Image
                        src={item.products.images[0]}
                        alt={item.products.name}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.products.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        ₹{(item.products.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </ScrollArea>
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
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleShippingInfoChange}
                          required
                        />
                      </div>
                      <div>
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
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={handleShippingInfoChange}
                        required
                      />
                    </div>
                    <div>
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
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingInfoChange}
                          required
                        />
                      </div>
                      <div>
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
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={handleShippingInfoChange}
                          required
                        />
                      </div>
                      <div>
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
                    Proceed to Payment <ChevronRight className="ml-2" />
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
                    Click below to proceed to our secure payment gateway.
                  </p>
                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked)}
                    />
                    <label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    <ChevronLeft className="mr-2" /> Back
                  </Button>
                  <Button
                    onClick={handleOpenPaymentGateway}
                    disabled={!agreeToTerms}
                  >
                    Pay Now <ChevronRight className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          <div>
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
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
