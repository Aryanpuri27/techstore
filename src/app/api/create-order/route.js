import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Use environment variables for sensitive data
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const body = await req.json(); // Parse JSON from the request body
    const { amount, currency, receipt, notes } = body;

    const options = {
      amount: amount, // Convert amount to paise
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(options);

    // Send the order details as a JSON response
    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating order:", error);

    return new Response(JSON.stringify({ error: "Error creating order" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
