
import React from "react";
import { ButtonCustom } from "./ui/button-custom";
import { BellRing, PlusSquare, ActivitySquare, ArrowRight, CheckCircle } from "lucide-react";

const DeviceShowcase: React.FC = () => {
  const devices = [
    {
      id: "sos",
      name: "SOS Pendant",
      price: "€110.00",
      icon: <BellRing className="w-12 h-12 text-ice-500" />,
      features: [
        "One-touch emergency call",
        "GPS tracking",
        "Fall detection sensors",
        "Custom emergency routing",
        "AI wellness check-ins"
      ],
      description: "Immediate emergency response with just one touch. Our advanced pendant provides around-the-clock protection with built-in fall detection and GPS tracking."
    },
    {
      id: "dispenser",
      name: "Medical Dispenser",
      price: "€249.99",
      icon: <PlusSquare className="w-12 h-12 text-guardian-500" />,
      features: [
        "Automated pill dispensing",
        "Missed dose notifications",
        "AI-powered reminders",
        "Escalation protocols",
        "Medication adherence tracking"
      ],
      description: "Never miss a dose again. Our smart Medical Dispenser provides automated medication management with intelligent reminders and adherence tracking."
    },
    {
      id: "glucose",
      name: "Glucose Monitor",
      price: "€149.99",
      icon: <ActivitySquare className="w-12 h-12 text-ice-500" />,
      features: [
        "Continuous glucose monitoring",
        "AI trend analysis",
        "Immediate alerts",
        "Emergency response",
        "Dietary recommendations"
      ],
      description: "Real-time glucose monitoring with AI-powered analysis. Receive immediate alerts for concerning levels and personalized recommendations for better health."
    }
  ];
  
  return (
    <section id="devices" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-down">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Integrated Smart Devices
          </h2>
          <p className="text-muted-foreground text-lg">
            Our comprehensive ecosystem of health monitoring devices works seamlessly with the AI Guardian.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {devices.map((device, index) => (
            <div 
              key={device.id}
              className="device-card shadow-subtle animate-slide-up"
              style={{ animationDelay: `${(index + 1) * 0.1}s` }}
            >
              <div className="mb-6">{device.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{device.name}</h3>
              <p className="text-2xl font-bold text-ice-600 mb-4">{device.price}</p>
              <p className="text-muted-foreground text-sm text-center mb-6">
                {device.description}
              </p>
              
              <div className="w-full border-t border-gray-100 pt-4 mb-6">
                <ul className="space-y-2">
                  {device.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <ButtonCustom variant="outline" className="mt-auto group">
                Learn More
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </ButtonCustom>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeviceShowcase;
