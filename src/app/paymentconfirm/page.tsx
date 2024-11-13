import { notFound, useSearchParams } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, Package, Truck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@supabase/supabase-js";
import { useSession } from "@clerk/nextjs";
import { createClerkSupabaseClientSsr } from "../ssr/client";

async function getOrderDetails(orderId: string) {
  const supabase = await createClerkSupabaseClientSsr();

  const { data: orderItems, error: itemsError } = await supabase
    .from("orderdetails")
    .select("*")
    .eq("order_id", orderId);

  if (itemsError) {
    console.error("Error fetching order items:", itemsError);
    return null;
  }

  if (orderItems.length === 0) {
    return null;
  }

  return orderItems;
}
type Props = {
  searchParams: Promise<{ [orderId: string]: string }>;
};
export default async function OrderSuccessPage({ searchParams }: Props) {
  const sp = await searchParams;
  const orderId = sp.orderId;
  if (!orderId) {
    notFound();
  }

  const orderDetails = await getOrderDetails(orderId);

  if (!orderDetails) {
    notFound();
  }

  const orderItems = orderDetails;

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + 500;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="relative w-32 h-32">
              <Image
                src="/placeholder.svg?height=128&width=128"
                alt="Order Success"
                layout="fill"
                className="animate-bounce"
              />
            </div>
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle2 className="h-8 w-8" />
              <CardTitle className="text-3xl font-bold">
                Order Successful!
              </CardTitle>
            </div>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been received and is
              being processed.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-xl font-semibold mb-2 flex items-center">
                  <Package className="mr-2" /> Order Summary
                </h2>
                <p className="text-muted-foreground">Order ID: {orderId}</p>
                <p className="text-muted-foreground">
                  Date:{" "}
                  {new Date(orderDetails[0].created_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 flex items-center">
                  <Truck className="mr-2" /> Shipping Information
                </h2>
                {/* <p>{JSON.stringify(orderDetails[0].shippinginfo)}</p> */}
                <p>
                  {orderDetails[0].shippinginfo.firstName}{" "}
                  {orderDetails[0].shippinginfo.lastName}
                </p>
                <p>{orderDetails[0].shippinginfo.address}</p>
                <p>
                  {orderDetails[0].shippinginfo.city},{" "}
                  {orderDetails[0].shippinginfo.state}{" "}
                  {orderDetails[0].shippinginfo.zipCode}
                </p>
                <p>{orderDetails[0].shippinginfo.country}</p>
                <p>Email: {orderDetails[0].shippinginfo.email}</p>
                <p>Phone: {orderDetails[0].shippinginfo.phone}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.product_name}</TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{item.price.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="space-y-2 max-w-xs ml-auto">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{500}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="relative w-64 h-64">
                <Image
                  src="/placeholder.svg?height=256&width=256"
                  alt="Thank you"
                  layout="fill"
                  className="animate-pulse"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
