import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-6 text-primary">Privacy Policy</h1>
      <ScrollArea className="h-[calc(100vh-12rem)] pr-4">
        <div className="space-y-6">
          <PolicySection
            title="SECTION 1 – INFORMATION COLLECTION"
            content={`
              When you purchase from our store, we collect personal information you provide, such as your name, address, and email address. We also automatically receive your computer's IP address to help us understand your browser and operating system, enhancing your browsing experience.

              When you provide personal information to complete a transaction, verify your credit card, place an order, or sign up on our website, you give us explicit consent to contact you via channels such as RCS, WhatsApp, Email, SMS, and more.
            `}
          />

          <PolicySection
            title="SECTION 2 – DISCLOSURE"
            content={`
              We may disclose your personal information if required by law or if you violate our Terms of Service.
            `}
          />

          <PolicySection
            title="SECTION 3 – PAYMENT"
            content={`
              For purchases, if you choose a direct payment gateway, your credit card data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS). Your transaction data is stored only as long as necessary to complete your purchase and then deleted.

              All direct payment gateways adhere to PCI-DSS standards, which ensure the secure handling of credit card information by our store and service providers.
            `}
          />

          <PolicySection
            title="SECTION 4 – THIRD-PARTY SERVICES"
            content={`
              In general, third-party providers will only collect, use, and disclose your information as needed to perform services for us. However, specific providers, such as payment gateways and processors, have their own privacy policies regarding the information we must provide for transaction-related purposes.

              We recommend reviewing their privacy policies to understand how they handle your information. Note that some providers may be located in jurisdictions different from yours, meaning your information may be subject to the laws of those jurisdictions.

              Once you leave our website or are redirected to a third-party site or application, this Privacy Policy and our Terms of Service no longer apply.

              Links

              When you click on links in our store, they may direct you to other sites. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.
            `}
          />

          <PolicySection
            title="SECTION 5 – SECURITY"
            content={`
              To protect your personal information, we follow industry best practices to ensure it is not inappropriately lost, misused, accessed, disclosed, altered, or destroyed.

              Your credit card information is encrypted with SSL technology and stored using AES-256 encryption. While no method of transmission over the Internet or electronic storage is 100% secure, we comply with PCI-DSS requirements and follow additional industry standards.
            `}
          />

          <PolicySection
            title="SECTION 6 – AGE OF CONSENT"
            content={`
              By using this site, you confirm that you are at least the age of majority in your state or province of residence or that you are the age of majority and have provided consent for any minor dependents to use this site.
            `}
          />
        </div>
      </ScrollArea>
    </div>
  );
}

function PolicySection({ title, content }: { title: string; content: string }) {
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
