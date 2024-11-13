import { Cashfree } from "cashfree-pg";
// import { usePathname } from "next/navigation";

Cashfree.XClientId = "TEST10346445ebd27c4df8f96d34311754464301";
Cashfree.XClientSecret =
  "cfsk_ma_test_f5c9ae2a1bb093fdd401d96374612713_5e594fac";
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

import { NextRequest, NextResponse } from "next/server";

// // Setup Cashfree credentials from environment variables
// Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
// Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET;
// Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

export async function GET(req) {
  return NextResponse.json(
    { message: "GET request to the homepage" },
    { status: 200 }
  );
}

export async function POST(req, pathname) {
  try {
    const body = await req.json();
    const { order_amount } = body;

    // Validate required data
    if (!order_amount) {
      return NextResponse.json(
        { message: "order_amount is required" },
        { status: 400 }
      );
    }

    // const pathname = usePathname();
    // const domain = new URL(pathname).hostname;
    const order_id = `order_${Date.now()}`; // Generate a unique order ID

    console.log("domain", pathname);
    const request = {
      order_amount,
      order_currency: "INR",
      order_id,
      customer_details: {
        customer_id: "devstudio_user",
        customer_phone: "8474090589",
        customer_name: "Harshith",
        customer_email: "test@cashfree.com",
      },
      order_meta: {
        return_url: `http://localhost:3000/paymentconfirm?order_id=${order_id}`,
      },
    };

    const response = await Cashfree.PGCreateOrder("2023-08-01", request);
    console.log("Order created successfully", response.data);
    return NextResponse.json(
      {
        message: "Order created successfully",
        data: response.data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error creating order:",
      error.response?.data?.message || error.message
    );
    return NextResponse.json(
      {
        message: error.response?.data?.message || "Order creation failed",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export function OPTIONS(req) {
  return NextResponse.json(null, {
    status: 204,
    headers: {
      Allow: "GET, POST, OPTIONS",
    },
  });
}
