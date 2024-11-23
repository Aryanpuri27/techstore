"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Printer,
  Upload,
  Users,
  ChevronDown,
  Zap,
  Clock,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { MotionDiv } from "./type/motion";
import { redirect } from "next/navigation";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <MotionDiv
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center"
          />
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
        </div>

        <div className="container mx-auto px-4 z-10">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold  bg-gradient-to-r  text-primary mb-6">
              Revolutionize Your Ideas with 3D Printing
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              From concept to creation, we turn your designs into reality with
              precision, innovation, and cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="text-lg"
                onClick={() => {
                  redirect("/custom");
                }}
              >
                Get Custom 3D Print
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg"
                onClick={() => {
                  redirect("/products");
                }}
              >
                Explore Products
              </Button>
            </div>
          </MotionDiv>
        </div>

        <MotionDiv
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </MotionDiv>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Our Cutting-Edge Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Printer,
                title: "Custom 3D Printing",
                description:
                  "Bring your designs to life with our state-of-the-art 3D printing technology, capable of handling complex geometries and various materials.",
              },
              {
                icon: Upload,
                title: "Easy Design Upload",
                description:
                  "Seamlessly upload your 3D models through our user-friendly platform and get instant quotes for printing your creations.",
              },
              {
                icon: Users,
                title: "Expert Consultation",
                description:
                  "Our team of experienced designers and engineers provide professional advice to optimize your designs for the best 3D printing results.",
              },
              {
                icon: Zap,
                title: "Rapid Prototyping",
                description:
                  "Accelerate your product development with our quick turnaround times on functional prototypes and concept models.",
              },
              {
                icon: Clock,
                title: "On-Demand Manufacturing",
                description:
                  "Scale your production with our on-demand 3D printing services, perfect for small batch runs or customized products.",
              },
              {
                icon: DollarSign,
                title: "Competitive Pricing",
                description:
                  "Enjoy cost-effective solutions for your 3D printing needs without compromising on quality or precision.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <feature.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Our 3D Printing Process
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/printedpart.jpg"
                alt="3D Printing Process"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <ol className="space-y-4">
                <li className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Design Upload
                    </h3>
                    <p className="text-muted-foreground">
                      Submit your 3D model through our easy-to-use platform.
                    </p>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      File Analysis
                    </h3>
                    <p className="text-muted-foreground">
                      Our experts review your design for printability and
                      optimization.
                    </p>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Printing
                    </h3>
                    <p className="text-muted-foreground">
                      Your model is brought to life using advanced 3D printing
                      technology.
                    </p>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Post-Processing
                    </h3>
                    <p className="text-muted-foreground">
                      We refine and finish your printed item for the best
                      results.
                    </p>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Quality Check
                    </h3>
                    <p className="text-muted-foreground">
                      Rigorous inspection ensures your item meets our high
                      standards.
                    </p>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    6
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Delivery
                    </h3>
                    <p className="text-muted-foreground">
                      Your finished product is carefully packaged and shipped to
                      you.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {/* <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Our Recent Projects
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <MotionDiv
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  scale: isVisible ? 1 : 0.8,
                }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                className="relative aspect-square overflow-hidden rounded-lg shadow-md"
              >
                <Image
                  src={`/printedpart.jpg `}
                  alt={`Project ${item}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-110"
                />
              </MotionDiv>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="text-lg">
              View All Projects
            </Button>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Bring Your Ideas to Life?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Whether you're a hobbyist, professional, or business, we have the
            perfect 3D printing solution for you. Let's turn your vision into
            reality!
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg"
            onClick={() => {
              redirect("/custom");
            }}
          >
            Create Your 3D Print
          </Button>
        </div>
      </section>

      {/* Testimonials Section
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "John Doe",
                role: "Product Designer",
                quote:
                  "The quality of the 3D prints exceeded my expectations. Their attention to detail is unmatched!",
                image: "/minion.png",
              },
              {
                name: "Jane Smith",
                role: "Architect",
                quote:
                  "Their expert consultation helped me refine my designs for better 3D printing results. A game-changer for my projects.",
                image: "/minion.png",
              },
              {
                name: "Mike Johnson",
                role: "Entrepreneur",
                quote:
                  "Fast turnaround and excellent customer service. They're my go-to for all 3D printing needs. Highly recommended!",
                image: "/minion.png",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground mb-4">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <p className="font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
