
import React from "react";
import { ButtonCustom } from "./ui/button-custom";
import { ArrowRight, Shield, HeartPulse, Clock } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section 
      id="home" 
      className="relative pt-28 pb-20 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-ice-100 rounded-full filter blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 left-20 w-72 h-72 bg-guardian-100 rounded-full filter blur-3xl opacity-40 -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-6 animate-slide-down">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-4">
              <Shield size={16} className="mr-2" />
              AI-Powered Health Protection
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight bg-gradient-to-r from-gray-900 via-ice-950 to-guardian-900 bg-clip-text text-transparent">
              Intelligent Health Monitoring & Emergency Response
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Our AI Guardian provides 24/7 monitoring and emergency support, 
              integrating smart devices for real-time health tracking and instant response.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <ButtonCustom size="lg" className="group">
                Explore Solutions
                <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
              </ButtonCustom>
              <ButtonCustom variant="outline" size="lg">
                Learn More
              </ButtonCustom>
            </div>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {[
              {
                icon: <Shield className="w-10 h-10 text-ice-600" />,
                title: "24/7 Protection",
                description: "Continuous monitoring with instant emergency response when you need it most.",
                delay: "animate-delay-100"
              },
              {
                icon: <HeartPulse className="w-10 h-10 text-guardian-600" />,
                title: "Health Insights",
                description: "AI-powered analysis of your health data for personalized recommendations.",
                delay: "animate-delay-200"
              },
              {
                icon: <Clock className="w-10 h-10 text-ice-600" />,
                title: "Rapid Response",
                description: "Immediate assistance through our professional call center and AI Guardian.",
                delay: "animate-delay-300"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`glass-panel p-6 flex flex-col items-center text-center animate-slide-up ${feature.delay}`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
