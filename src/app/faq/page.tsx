import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FAQPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 min-h-screen bg-background text-foreground">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent>
                We accept all major credit cards (Visa, MasterCard, American
                Express, Discover), PayPal, and Apple Pay. For certain products,
                we also offer financing options.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                We offer a 30-day return policy for most items. Products must be
                returned in their original condition with all accessories and
                packaging. Some items, like software and opened consumables, may
                not be eligible for return. Please check the specific product
                page for any exceptions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Do you offer international shipping?
              </AccordionTrigger>
              <AccordionContent>
                Yes, we ship to many countries worldwide. Shipping costs and
                delivery times vary depending on the destination. Please check
                our shipping page or proceed to checkout to see if we ship to
                your country and to get a shipping quote.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>How can I track my order?</AccordionTrigger>
              <AccordionContent>
                Once your order has been shipped, you will receive a
                confirmation email with a tracking number. You can use this
                number on our website or the carrier's website to track your
                package's progress.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                Do you offer warranty on your products?
              </AccordionTrigger>
              <AccordionContent>
                Most of our products come with a manufacturer's warranty. The
                duration and coverage of the warranty vary by product and brand.
                We also offer extended warranty options for many items at an
                additional cost. You can find warranty information on each
                product's page.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>
                Can I cancel or modify my order?
              </AccordionTrigger>
              <AccordionContent>
                You can cancel or modify your order within 1 hour of placing it.
                After that, we begin processing orders for shipment and may not
                be able to make changes. Please contact our customer service as
                soon as possible if you need to make changes to your order.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>Do you price match?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer price matching on identical items sold by major
                retailers. The item must be in stock both at our store and the
                competitor's. Price matching requests must be made at the time
                of purchase. Please contact our customer service with the
                details of the lower-priced item.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>
                How do I contact customer support?
              </AccordionTrigger>
              <AccordionContent>
                You can reach our customer support team via email at
                support@aivore.com, by phone at 1-800-TECH-HELP (available
                Monday to Friday, 9 AM to 6 PM EST), or through the live chat
                feature on our website. We aim to respond to all inquiries
                within 24 hours.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
