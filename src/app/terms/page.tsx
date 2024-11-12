import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TermsOfService() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-6 text-primary">Terms of Service</h1>
      <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
        <div className="space-y-6">
          <TermsSection
            title="SECTION 1 – ONLINE STORE TERMS"
            content={`
              By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.

              You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). You must not transmit any worms or viruses or any code of a destructive nature. A breach or violation of any of the Terms will result in an immediate termination of your Services.
            `}
          />

          <TermsSection
            title="SECTION 2 – GENERAL CONDITIONS"
            content={`
              We reserve the right to refuse service to anyone for any reason at any time.

              You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks.

              You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.
            `}
          />

          <TermsSection
            title="SECTION 3 – ACCURACY, COMPLETENESS, AND TIMELINESS OF INFORMATION"
            content={`
              We are not responsible if information made available on this site is not accurate, complete, or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete, or more timely sources of information. Any reliance on the material on this site is at your own risk.
            `}
          />

          <TermsSection
            title="SECTION 4 – MODIFICATIONS TO THE SERVICE AND PRICES"
            content={`
              Prices for our products are subject to change without notice.

              We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice. We shall not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Service.
            `}
          />

          <TermsSection
            title="SECTION 5 – PRODUCTS OR SERVICES (if applicable)"
            content={`
              Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.

              We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate.

              We reserve the right to limit the sales of our products or Services to any person, geographic region, or jurisdiction. We reserve the right to limit quantities of any products or services offered. Descriptions of products or product pricing are subject to change at any time without notice, at our sole discretion.
            `}
          />

          <TermsSection
            title="SECTION 6 – ACCURACY OF BILLING AND ACCOUNT INFORMATION"
            content={`
              We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. If we make a change to or cancel an order, we may attempt to notify you by contacting the email and/or billing address/phone number provided at the time the order was made.

              For more detail, please review our Returns Policy.
            `}
          />

          <TermsSection
            title="SECTION 7 – OPTIONAL TOOLS"
            content={`
              We may provide you with access to third-party tools over which we neither monitor nor have any control nor input. You acknowledge and agree that we provide access to such tools "as is" and "as available" without any warranties, representations, or conditions of any kind and without endorsement.
            `}
          />

          <TermsSection
            title="SECTION 8 – THIRD-PARTY LINKS"
            content={`
              Certain content, products, and services available via our Service may include materials from third parties.

              We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or other transactions made in connection with any third-party websites.
            `}
          />

          <TermsSection
            title="SECTION 9 – USER COMMENTS, FEEDBACK, AND OTHER SUBMISSIONS"
            content={`
              If, at our request, you send certain specific submissions (for example, contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials (collectively, 'comments'), you agree that we may, at any time, use in any medium any comments that you forward to us.
            `}
          />

          <TermsSection
            title="SECTION 10 – PERSONAL INFORMATION"
            content={`
              Your submission of personal information through the store is governed by our Privacy Policy.
            `}
          />

          <TermsSection
            title="SECTION 11 – ERRORS, INACCURACIES, AND OMISSIONS"
            content={`
              Occasionally, there may be information on our site or in the Service that contains typographical errors, inaccuracies, or omissions that may relate to product descriptions, pricing, promotions, offers, shipping charges, transit times, and availability. We reserve the right to correct any errors, inaccuracies, or omissions and to update information or cancel orders if any information in the Service or on any related website is inaccurate.
            `}
          />

          <TermsSection
            title="SECTION 12 – PROHIBITED USES"
            content={`
              In addition to other prohibitions set forth in the Terms of Service, you are prohibited from using the site or its content for any unlawful purpose, to solicit others to perform unlawful acts, to infringe intellectual property rights, or to violate our Terms of Service.
            `}
          />

          <TermsSection
            title="SECTION 13 – DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY"
            content={`
              We do not guarantee that your use of our service will be uninterrupted, timely, secure, or error-free.

              The service and all products and services delivered to you are provided "as is" and "as available" for your use, without warranties of any kind.
            `}
          />

          <TermsSection
            title="SECTION 14 – SEVERABILITY"
            content={`
              If any provision of these Terms of Service is deemed unlawful or unenforceable, such provision shall be severed, and the remaining provisions will remain in effect.
            `}
          />

          <TermsSection
            title="SECTION 15 – TERMINATION"
            content={`
              These Terms of Service are effective unless and until terminated by either you or us.
            `}
          />

          <TermsSection
            title="SECTION 16 – ENTIRE AGREEMENT"
            content={`
              These Terms of Service constitute the entire agreement between you and us regarding your use of the Service, superseding any prior agreements.
            `}
          />

          <TermsSection
            title="SECTION 17 – CHANGES TO TERMS OF SERVICE"
            content={`
              We reserve the right to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check periodically for changes. Your continued use of or access to our website following any changes constitutes acceptance of those changes.
            `}
          />
        </div>
      </ScrollArea>
    </div>
  );
}

function TermsSection({ title, content }: { title: string; content: string }) {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm dark:prose-invert">
          {content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
