
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Clock, MapPin, Users, Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Demo: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    participants: "1",
    demoType: "virtual"
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Demo requested:", formData);
    
    toast({
      title: "Demo Request Received",
      description: "Thank you for your interest! We'll confirm your demo appointment shortly.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      participants: "1",
      demoType: "virtual"
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-ice-50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-6 text-center">Request a Live Demo</h1>
              <p className="text-lg text-muted-foreground mb-8 text-center">
                See our health monitoring and emergency response system in action with a personalized demo from our experts.
              </p>
              
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="flex flex-col items-center p-6 bg-ice-50 rounded-lg text-center">
                    <Video className="h-12 w-12 text-ice-600 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Virtual Demo</h3>
                    <p className="text-sm text-muted-foreground">
                      Join us for an online demonstration via video conference. Perfect if you're busy or not located in Spain.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center p-6 bg-ice-50 rounded-lg text-center">
                    <MapPin className="h-12 w-12 text-ice-600 mb-4" />
                    <h3 className="text-lg font-medium mb-2">In-Person Demo</h3>
                    <p className="text-sm text-muted-foreground">
                      Visit our office or request a home demo to experience our devices firsthand with personalized guidance.
                    </p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ice-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ice-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ice-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        <Calendar className="inline-block w-4 h-4 mr-1" /> Preferred Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ice-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                        <Clock className="inline-block w-4 h-4 mr-1" /> Preferred Time
                      </label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ice-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-1">
                        <Users className="inline-block w-4 h-4 mr-1" /> Number of Participants
                      </label>
                      <select
                        id="participants"
                        name="participants"
                        value={formData.participants}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ice-500"
                      >
                        <option value="1">Just me</option>
                        <option value="2">2 people</option>
                        <option value="3">3 people</option>
                        <option value="4+">4+ people</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="demoType" className="block text-sm font-medium text-gray-700 mb-1">Demo Type</label>
                      <select
                        id="demoType"
                        name="demoType"
                        value={formData.demoType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ice-500"
                      >
                        <option value="virtual">Virtual Demo</option>
                        <option value="office">Office Visit (Malaga)</option>
                        <option value="home">Home Demo (Subject to availability)</option>
                      </select>
                    </div>
                  </div>
                  
                  <ButtonCustom type="submit" className="w-full">
                    Schedule My Demo
                  </ButtonCustom>
                </form>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Have questions? Contact us directly at <span className="font-medium">info@icealarespana.com</span> or call <span className="font-medium">+34 951 123 456</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Demo;
