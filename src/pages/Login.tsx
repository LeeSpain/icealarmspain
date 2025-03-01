
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";
import { Lock, Mail, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Login: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      console.log("Login attempt:", { email: formData.email });
      // Mock login success
      toast({
        title: "Login Successful",
        description: "Welcome back to ICE Alarm España!",
      });
    } else {
      console.log("Registration attempt:", { email: formData.email, name: formData.name });
      // Mock registration success
      toast({
        title: "Registration Successful",
        description: "Your account has been created. Please check your email to verify.",
      });
    }
    
    // Reset form
    setFormData({
      email: "",
      password: "",
      name: ""
    });
  };
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-ice-50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold">{isLogin ? "Log In to Your Account" : "Create an Account"}</h1>
                  <p className="text-muted-foreground mt-2">
                    {isLogin ? "Access your ICE Member dashboard" : "Join the ICE Alarm España community"}
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required={!isLogin}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ice-500"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ice-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                      {isLogin && (
                        <a href="/forgot-password" className="text-xs text-ice-600 hover:underline">
                          Forgot password?
                        </a>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ice-500"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                  
                  <ButtonCustom type="submit" className="w-full mt-6">
                    {isLogin ? "Log In" : "Create Account"}
                  </ButtonCustom>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button 
                      type="button" 
                      onClick={toggleForm} 
                      className="text-ice-600 hover:underline font-medium"
                    >
                      {isLogin ? "Sign up" : "Log in"}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
