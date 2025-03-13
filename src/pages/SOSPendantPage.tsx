
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sos-pendant/HeroSection";
import ProductDetailTabs from "@/components/sos-pendant/ProductDetailTabs";
import CallToAction from "@/components/sos-pendant/CallToAction";

const SOSPendantPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <HeroSection />
        <ProductDetailTabs />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default SOSPendantPage;
