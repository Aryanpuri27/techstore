"use client";

import { useState, useEffect } from "react";

// Declare Razorpay on the window object
declare global {
  interface Window {
    Razorpay: any;
  }
}
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";
import {
  ShoppingCart,
  CreditCard,
  Truck,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useRazorpay } from "react-razorpay";

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
import { after } from "node:test";

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
  const { session } = useSession();
  const [afterPayment, setAfterPayment] = useState(false);

  useEffect(() => {
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
  const clearCartItems = async () => {
    const client = createClerkSupabaseClient();

    const { data, error } = await client
      .from("cart")
      .delete()
      .eq("user_id", session?.user.id);
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
      setStep(2);
    } else {
      toast({
        title: "Incomplete Information",
        description: "Please fill all fields.",
        variant: "destructive",
      });
    }
  };
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const handleOpenPaymentGateway = async () => {
    const Razorpayres = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!Razorpayres) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    if (!agreeToTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please agree to the terms.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1 * 100, // Razorpay expects amount in paise
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
          notes: {},
        }),
      });

      const order = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "AIVORE",
        description: "Purchase",
        order_id: order.id,
        handler: function (response) {
          handlePaymentVerification(response);
        },
        prefill: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          email: shippingInfo.email,
          contact: shippingInfo.phone,
        },
        theme: {
          color: "#F37254",
        },
      };

      // const rzp = new Razorpay(options);
      // rzp.open();
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error creating order:", error);
      toast({
        title: "Payment Error",
        description: "Unable to initiate payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentVerification = async (response) => {
    setAfterPayment(true);
    try {
      const verificationResponse = await fetch("/api/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }),
      });

      const data = await verificationResponse.json();

      if (data.status === "ok") {
        await addOrderToDatabase(response.razorpay_order_id);
        await clearCartItems();
        await sendMail(response.razorpay_order_id);

        router.push(`/paymentconfirm?order_id=${response.razorpay_order_id}`);
      } else {
        toast({
          title: "Payment Verification Failed",
          description: "Please contact support.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast({
        title: "Verification Error",
        description: "Error verifying payment. Please contact support.",
        variant: "destructive",
      });
    }
  };

  const sendMail = async (id) => {
    // const { customerName, customerEmail, orderNumber, orderDate } =
    //   orderDetails;
    // const { subtotal, shipping, tax, total, shippingAddress } = orderDetails;
    const body = {
      customerName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
      customerEmail: shippingInfo.email,
      orderNumber: id,
      orderDate: Date.now(),
      orderItems: cartItems,
      subtotal,
      shipping: subtotal < 500 ? 60 : 0,
      tax: 0,
      total,
      shippingAddress: {
        street: shippingInfo.address,
        city: shippingInfo.city,
        country: shippingInfo.country,
        zipCode: shippingInfo.zipCode,
        state: shippingInfo.state,
      },
    };
    const response = await fetch("/api/sendmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      toast({
        title: "Order Confirmation",
        description: "Order confirmation email sent successfully.",
        variant: "default",
      });
    } else {
      toast({
        title: "Email Error",
        description: "Failed to send order confirmation email.",
        variant: "destructive",
      });
    }
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

  const subtotal = cartItems.reduce(
    (total, item) => total + item.products.price * item.quantity,
    0
  );

  const total = subtotal + (subtotal < 500 ? 60 : 0);

  if (afterPayment) {
    return <div>Processing Payment...</div>;
  }
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
                      onCheckedChange={(checked) => setAgreeToTerms(true)}
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
                    <span>₹{subtotal < 500 ? 60 : 0}</span>
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
