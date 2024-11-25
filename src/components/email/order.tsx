import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface OrderItem {
  quantity: number;
  products: {
    name: string;
    price: number;
  };
}

interface OrderSuccessEmailProps {
  customerName: string;
  orderNumber: string;
  orderDate: string;
  orderItems: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export const OrderSuccessEmail = ({
  customerName,
  orderNumber,
  orderDate,
  orderItems,
  subtotal,
  shipping,
  tax,
  total,
  shippingAddress,
}: OrderSuccessEmailProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <Html>
      <Head />
      <Preview>
        Thank you for your order! Here's your order confirmation.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* <Img
            src={`${process.env.NEXT_PUBLIC_APP_URL}/logo.png`}
            width="170"
            height="50"
            alt="Your Company Logo"
            style={logo}
          /> */}
          <Heading style={h1}>Order Confirmation</Heading>
          <Text style={text}>Hello {customerName},</Text>
          <Text style={text}>
            Thank you for your order! We're pleased to confirm that we've
            received your order and it's being processed.
          </Text>
          <Section style={orderInfo}>
            <Text style={orderInfoText}>
              <strong>Order Number:</strong> {orderNumber}
            </Text>
            <Text style={orderInfoText}>
              <strong>Order Date:</strong> {orderDate}
            </Text>
          </Section>
          <Heading as="h2" style={h2}>
            Order Details
          </Heading>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Item</th>
                <th style={th}>Qty</th>
                <th style={th}>Price</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr key={index} style={index % 2 === 0 ? trEven : trOdd}>
                  <td style={td}>{item.products.name}</td>
                  <td style={td}>{item.quantity}</td>
                  <td style={td}>{formatCurrency(item.products.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Section style={orderSummary}>
            <Text style={summaryText}>
              Subtotal: {formatCurrency(subtotal)}
            </Text>
            <Text style={summaryText}>
              Shipping: {formatCurrency(shipping)}
            </Text>
            <Text style={summaryText}>Tax: {formatCurrency(tax)}</Text>
            <Text style={summaryTextBold}>Total: {formatCurrency(total)}</Text>
          </Section>
          <Heading as="h2" style={h2}>
            Shipping Address
          </Heading>
          <Text style={text}>
            {shippingAddress.street}
            <br />
            {shippingAddress.city}, {shippingAddress.state}{" "}
            {shippingAddress.zipCode}
            <br />
            {shippingAddress.country}
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            If you have any questions about your order, please don't hesitate to{" "}
            <Link href={`mailto:support@example.com`} style={link}>
              contact our support team
            </Link>
            .
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderSuccessEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const logo = {
  margin: "0 auto",
};

const h1 = {
  color: "#333",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
};

const h2 = {
  color: "#333",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: "20px",
  fontWeight: "bold",
  margin: "20px 0",
  padding: "0",
};

const text = {
  color: "#333",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  fontSize: "16px",
  lineHeight: "24px",
};

const orderInfo = {
  margin: "20px 0",
};

const orderInfoText = {
  ...text,
  margin: "5px 0",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
};

const th = {
  backgroundColor: "#f6f9fc",
  padding: "10px",
  textAlign: "left" as const,
  fontWeight: "bold",
};

const td = {
  padding: "10px",
  borderBottom: "1px solid #f0f0f0",
};

const trEven = {
  backgroundColor: "#ffffff",
};

const trOdd = {
  backgroundColor: "#f6f9fc",
};

const orderSummary = {
  margin: "20px 0",
};

const summaryText = {
  ...text,
  margin: "5px 0",
};

const summaryTextBold = {
  ...summaryText,
  fontWeight: "bold",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  ...text,
  textAlign: "center" as const,
  color: "#8898aa",
};

const link = {
  color: "#2754C5",
};
