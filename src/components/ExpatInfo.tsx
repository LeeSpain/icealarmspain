
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe, PhoneCall, MessageSquare, Users, ArrowRight, MapPin, Headphones } from "lucide-react";
import { ButtonCustom } from "./ui/button-custom";
import { Link } from "react-router-dom";

const ExpatInfo: React.FC = () => {
  const { language } = useLanguage();
  
  // Only show this component for English users
  if (language !== 'en') return null;
  
  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-6 shadow-sm">
              <Globe size={16} className="mr-2" />
              <span>International Community Support</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Expat Support Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We understand the unique challenges faced by expatriates in Spain. Our bilingual support services in English and Spanish are designed to help you maintain independence in your new home.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Headphones size={36} />,
                title: "Translation Services",
                description: "Our devices provide real-time translation between English and Spanish, ensuring clear communication with local healthcare providers when you need help most.",
                iconColor: "text-ice-500"
              },
              {
                icon: <MapPin size={36} />,
                title: "Location Tracking",
                description: "The SOS pendant provides your exact location during emergencies, allowing our team to quickly locate and send appropriate assistance to you.",
                iconColor: "text-ice-500"
              },
              {
                icon: <PhoneCall size={36} />,
                title: "24/7 Emergency Support",
                description: "Our emergency line is always available with bilingual operators ready to assist in critical situations and communicate with local medical personnel.",
                iconColor: "text-ice-500"
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-subtle p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-ice-100"
              >
                <div className={`mb-4 ${service.iconColor}`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/contact">
              <ButtonCustom size="lg" className="group">
                <span className="flex items-center">
                  <MessageSquare size={18} className="mr-2" />
                  Contact Our Expat Support Team
                  <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </ButtonCustom>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpatInfo;
