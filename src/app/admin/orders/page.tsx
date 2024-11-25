// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClerkSupabaseClientSsr } from "@/app/ssr/client";

// Helper function to format price in rupees
function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
}

export default async function OrdersPage() {
  const supabase = await createClerkSupabaseClientSsr();

  // Fetch order details from the database
  const { data: orderDetails, error } = await supabase
    .from("orderdetails")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching order details:", error);
    return <div>Error loading orders. Please try again later.</div>;
  }

  // Group orders by order_id
  const groupedOrders = orderDetails.reduce((acc, order) => {
    if (!acc[order.order_id]) {
      acc[order.order_id] = {
        id: order.order_id,
        createdAt: order.created_at,
        items: [],
        total: 0,
        shippingInfo: order.shippinginfo,
      };
    }
    acc[order.order_id].items.push(order);
    acc[order.order_id].total += Number(order.total);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Order Details</h1>
      {Object.values(groupedOrders).map((order: any) => (
        <Card key={order.id}>
          <CardHeader>
            <CardTitle>Order #{order.id}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Placed on: {new Date(order.createdAt).toLocaleString()}
            </p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.product_name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatPrice(item.price)}</TableCell>
                    <TableCell>{formatPrice(item.total)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="font-bold">
                    Total
                  </TableCell>
                  <TableCell className="font-bold">
                    {formatPrice(order.total)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Shipping Information</h3>
              <pre className="bg-muted p-2 rounded-md overflow-x-auto">
                {/* {JSON.stringify(order.shippingInfo, null, 2)} */}
                {`${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`}
                <br />
                {` ${order.shippingInfo.address} ${order.shippingInfo.city},`}
                <br />
                {` ${order.shippingInfo.state} ${order.shippingInfo.zipCode} `}
                <br />
                {` ${order.shippingInfo.country}`}
                <br />
                {` Email: ${order.shippingInfo.email} `}
                <br />
                {` Phone: ${order.shippingInfo.phone}`}
                <br />
              </pre>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
