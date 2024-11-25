import OrderSuccessEmail from "@/components/email/order";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  const {
    customerName,
    orderNumber,
    orderDate,
    orderItems,
    subtotal,
    shipping,
    tax,
    total,
    shippingAddress,
  } = body;

  try {
    const data = await resend.emails.send({
      from: "Aivora <order@aivora.in>",
      to: [body.customerEmail],
      subject: `Order Confirmation - ${orderNumber}`,
      react: OrderSuccessEmail({
        customerName,
        orderNumber,
        orderDate,
        orderItems,
        subtotal,
        shipping,
        tax,
        total,
        shippingAddress,
      }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
