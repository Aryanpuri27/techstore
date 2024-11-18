import crypto from "crypto";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const secret = process.env.RAZORPAY_KEY_SECRET; // Access Razorpay secret key from environment variables

    const generatedBody = `${razorpay_order_id}|${razorpay_payment_id}`;

    // Generate the expected signature
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(generatedBody)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Update order status in your storage or database
      // Example: Uncomment and implement with your DB or file utils
      // const orders = readData();
      // const order = orders.find((o) => o.order_id === razorpay_order_id);
      // if (order) {
      //   order.status = "paid";
      //   order.payment_id = razorpay_payment_id;
      //   writeData(orders);
      // }

      console.log("Payment verification successful");
      return new Response(
        JSON.stringify({ status: "ok", message: "Payment verified" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      console.log("Payment verification failed");
      return new Response(
        JSON.stringify({
          status: "verification_failed",
          message: "Invalid signature",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return new Response(
      JSON.stringify({ status: "error", message: "Error verifying payment" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
