
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DeviceShowcase from "@/components/DeviceShowcase";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, CheckCircle, Box } from "lucide-react";

const Products: React.FC = () => {
  const { t } = useLanguage();

  const featuresList = [
    "Real-time health monitoring",
    "24/7 emergency response",
    "AI-powered insights",
    "Medication management",
    "Family access dashboard",
    "Multilingual support",
    "Professional monitoring"
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-ice-50 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Smart Health Monitoring Devices</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Discover our comprehensive range of AI-powered health monitoring devices designed to provide peace of mind and enhanced care for you and your loved ones.
              </p>
              <ButtonCustom size="lg" className="px-8 py-6 text-lg">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </ButtonCustom>
            </div>
          </div>
        </section>
        
        {/* Showcase our devices */}
        <DeviceShowcase />
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose ICE Alarm España</h2>
              <p className="text-muted-foreground">
                Our integrated ecosystem provides comprehensive protection and monitoring, with multilingual support designed specifically for residents of Spain.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {featuresList.map((feature, index) => (
                <div key={index} className="flex items-start p-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <p>{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="bg-ice-600 text-white py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to experience peace of mind?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust ICE Alarm España for their health monitoring and emergency response needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonCustom variant="secondary" size="lg">
                Contact Our Team
              </ButtonCustom>
              <ButtonCustom variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                View Pricing
              </ButtonCustom>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
