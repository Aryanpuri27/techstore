"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Printer, Upload, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MotionDiv, MotionImg } from "@/components/type/motion";

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 max-w-screen-xl mx-auto">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-16"
      >
        <h1 className="text-5xl font-bold text-center mb-16 text-foreground">
          About Our 3D Printing Company
        </h1>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold mb-4 text-foreground">
              Bringing Ideas to Life
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              At our core, we&apos;re passionate about transforming digital
              designs into tangible realities. Our state-of-the-art 3D printing
              technology and expert team work tirelessly to deliver
              high-quality, precision-crafted parts and products for a diverse
              range of applications.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Whether you&apos;re a hobbyist, engineer, designer, or business,
              we're here to make cutting-edge 3D printing technology accessible
              and user-friendly.
            </p>
            <Button className="mt-4 text-lg" size="lg">
              Explore Our Services
            </Button>
          </div>
          <div className="relative h-96 lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl">
            <MotionImg
              src="/printedpart.jpg"
              alt="3D Printing in Action"
              className="object-cover w-full h-full"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{
                scale: isVisible ? 1 : 1.1,
                opacity: isVisible ? 1 : 0,
              }}
              transition={{ delay: 0.2, duration: 1.2 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-background">
              <h3 className="text-2xl font-bold mb-2">
                Precision in Every Print
              </h3>
              <p className="text-sm">
                Our advanced technology ensures unparalleled quality in every
                project
              </p>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-3xl font-semibold mb-12 text-center text-foreground">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Printer,
                title: "Ready-Made Products",
                description:
                  "Explore our extensive catalog of pre-designed 3D printed items, perfect for immediate use or inspiration.",
              },
              {
                icon: Upload,
                title: "Custom Printing",
                description:
                  "Upload your designs and bring your unique ideas to life with our state-of-the-art printing capabilities.",
              },
              {
                icon: Users,
                title: "Expert Consultation",
                description:
                  "Get professional advice to optimize your designs for the best results, ensuring your vision becomes reality.",
              },
            ].map((service, index) => (
              <MotionDiv
                key={index}
                className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ delay: 0.2 * (index + 1), duration: 0.6 }}
              >
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                  {service.title}
                </h3>
                <p className="text-card-foreground/80">{service.description}</p>
              </MotionDiv>
            ))}
          </div>
        </div>

        <div className="bg-primary text-primary-foreground rounded-2xl p-12 mb-24">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Uncompromising quality and precision",
              "Cutting-edge 3D printing technology",
              "Expert team of professionals",
              "Competitive pricing",
              "Quick turnaround times",
              "Convenient online ordering",
            ].map((item, index) => (
              <MotionDiv
                key={index}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
                transition={{ delay: 0.1 * (index + 1), duration: 0.6 }}
              >
                <svg
                  className="w-6 h-6 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>{item}</span>
              </MotionDiv>
            ))}
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-foreground">
            Ready to Start Your Project?
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Let&apos;s bring your ideas to life with our cutting-edge 3D
            printing technology.
          </p>
          <Button className="text-lg" size="lg">
            Get Started Now
          </Button>
        </div>

        <MotionDiv
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </MotionDiv>
      </MotionDiv>
    </div>
  );
}
