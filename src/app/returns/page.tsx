import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function ImprovedRefundPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 min-h-screen bg-background text-foreground">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">
            Refund and Warranty Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              All items have a standard 15-day warranty from the invoice date
              unless otherwise specified on the product page.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="policy" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="policy">Policy Overview</TabsTrigger>
              <TabsTrigger value="process">Refund Process</TabsTrigger>
              <TabsTrigger value="exceptions">Exceptions</TabsTrigger>
            </TabsList>
            <TabsContent value="policy" className="space-y-4">
              <h3 className="text-lg font-semibold">Our Refund Policy</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Only defective or damaged products are eligible for
                  returns/refunds.
                </li>
                <li>
                  You must notify us of any defects within 15 days from the
                  invoice date.
                </li>
                <li>
                  Products marked as non-returnable on the product page are not
                  eligible for return or replacement.
                </li>
                <li>
                  Refunds are processed via UPI/NEFT within 7 working days of
                  approval.
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="process" className="space-y-4">
              <h3 className="text-lg font-semibold">Refund Process</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>
                  Contact us within 15 days of receiving your order if the
                  product is defective.
                </li>
                <li>
                  Our tech team will inspect the product to confirm the defect.
                </li>
                <li>
                  If approved, our customer support will contact you for the
                  return.
                </li>
                <li>
                  Ship the product back in its original packaging with all
                  accessories.
                </li>
                <li>Once received, we'll inspect the returned item.</li>
                <li>
                  If everything is in order, we'll process your refund or
                  replacement.
                </li>
                <li>
                  Refunds are credited via UPI/NEFT within 7 working days of
                  approval.
                </li>
              </ol>
            </TabsContent>
            <TabsContent value="exceptions" className="space-y-4">
              <h3 className="text-lg font-semibold">
                Exceptions and Special Cases
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Damage due to misuse, accidents, or neglect is not covered
                  under warranty.
                </li>
                <li>
                  Products that have been modified or altered are not eligible
                  for refunds.
                </li>
                <li>
                  If a replacement is unavailable, a full refund will be issued.
                </li>
                <li>
                  Shipping costs for returns are non-refundable and paid by the
                  customer.
                </li>
                <li>
                  Orders can only be changed or cancelled if they are in
                  "Pending" or "Payment Verification" status.
                </li>
              </ul>
            </TabsContent>
          </Tabs>

          <div className="mt-8 p-4 bg-muted rounded-md">
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p>
              If you have any questions about our refund policy or need to
              initiate a return, please contact our customer support:
            </p>
            <ul className="list-disc pl-5 mt-2">
              <li>Email: support@techstore.com</li>
              <li>
                Phone: 1-800-TECH-HELP (Available Monday to Friday, 9 AM to 6 PM
                EST)
              </li>
              <li>Live Chat: Available on our website during business hours</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
