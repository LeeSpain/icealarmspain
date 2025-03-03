
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DeviceShowcase from "@/components/DeviceShowcase";
import Pricing from "@/components/Pricing";
import ExpatInfo from "@/components/ExpatInfo";
import Footer from "@/components/Footer";
import { ArrowUpCircle, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";

const Index: React.FC = () => {
  console.log("Index component rendering - SHOULD BE VISIBLE");
  const { language } = useLanguage();
  
  // Smooth scroll implementation
  useEffect(() => {
    console.log("Setting up smooth scroll");
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function (e) {});
      });
    };
  }, []);

  // Scroll to top button visibility
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  
  useEffect(() => {
    console.log("Setting up scroll to top");
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Add effect for scrolling to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  console.log("Index about to render JSX");
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-ice-50/30 to-white">
      {/* Enhanced Decorative Elements */}
      <div className="fixed top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] bg-gradient-radial from-ice-100/60 to-transparent rounded-full filter blur-3xl opacity-60 animate-pulse-gentle"></div>
        <div className="absolute top-[60%] left-[5%] w-[400px] h-[400px] bg-gradient-radial from-guardian-100/50 to-transparent rounded-full filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[350px] h-[350px] bg-gradient-radial from-ice-200/40 to-transparent rounded-full filter blur-3xl opacity-30 animate-pulse-gentle" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <Navbar />
      
      <main className="flex-grow relative">
        {/* Wrapping Hero in error boundary */}
        <div className="relative">
          <Hero />
        </div>
        
        {/* Section Divider with enhanced styling */}
        <div className="relative">
          <div className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white/80 -top-16 z-10"></div>
        </div>
        
        {/* Dashboard Example Section */}
        <section id="dashboard-example" className="py-20 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent inline-block">
                {language === 'en' ? 'Advanced Dashboard' : 'Panel de Control Avanzado'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'en' 
                  ? 'Experience our intuitive dashboard with real-time monitoring and personalized insights for your health needs.' 
                  : 'Experimente nuestro panel intuitivo con monitoreo en tiempo real e información personalizada para sus necesidades de salud.'}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-ice-50 rounded-xl shadow-lg overflow-hidden border border-ice-100">
              <div className="p-4 bg-white/50 backdrop-blur-sm border-b border-ice-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-ice-600" />
                  <h3 className="font-medium">{language === 'en' ? 'Health Monitor Dashboard' : 'Panel de Monitoreo de Salud'}</h3>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 p-6">
                <div className="col-span-2 space-y-4">
                  <div className="bg-white rounded-lg shadow-sm p-4 border border-ice-100">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">{language === 'en' ? 'Health Metrics' : 'Métricas de Salud'}</h4>
                    <div className="h-32 flex items-center justify-center border-b border-dashed border-ice-200 mb-3">
                      <div className="w-full h-24 flex items-end justify-around">
                        {[65, 85, 75, 92, 70, 88, 78].map((value, i) => (
                          <div key={i} className="h-full flex flex-col items-center justify-end">
                            <div 
                              className="w-8 bg-gradient-to-t from-ice-500 to-ice-300 rounded-t-sm" 
                              style={{ height: `${value}%` }}
                            ></div>
                            <span className="text-xs mt-1 text-gray-500">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{language === 'en' ? 'Weekly Average:' : 'Promedio Semanal:'} <span className="font-medium text-ice-700">79%</span></span>
                      <Link to="/dashboard" className="text-xs text-ice-600 hover:text-ice-700 flex items-center">
                        {language === 'en' ? 'View Details' : 'Ver Detalles'} →
                      </Link>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg shadow-sm p-4 border border-ice-100">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">{language === 'en' ? 'Heart Rate' : 'Ritmo Cardíaco'}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-ice-700">72</span>
                        <span className="text-sm text-gray-400">{language === 'en' ? 'bpm' : 'lpm'}</span>
                      </div>
                      <div className="h-12 w-full mt-2">
                        <div className="w-full h-6 bg-ice-50 rounded-full overflow-hidden">
                          <div className="h-full bg-ice-400 rounded-full" style={{ width: '72%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-4 border border-ice-100">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">{language === 'en' ? 'Blood Pressure' : 'Presión Arterial'}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-ice-700">120/80</span>
                        <span className="text-sm text-gray-400">{language === 'en' ? 'mmHg' : 'mmHg'}</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-green-500">{language === 'en' ? 'Normal' : 'Normal'}</span>
                        <span className="text-xs text-gray-400">{language === 'en' ? 'Last checked: 2h ago' : 'Última revisión: hace 2h'}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white rounded-lg shadow-sm p-4 border border-ice-100 h-44">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">{language === 'en' ? 'Upcoming Medications' : 'Próximos Medicamentos'}</h4>
                    <div className="space-y-2">
                      {[
                        { time: '9:00 AM', name: language === 'en' ? 'Vitamin D' : 'Vitamina D', dosage: '1000 IU' },
                        { time: '2:00 PM', name: language === 'en' ? 'Calcium' : 'Calcio', dosage: '500 mg' },
                        { time: '8:00 PM', name: language === 'en' ? 'Omega-3' : 'Omega-3', dosage: '1000 mg' }
                      ].map((med, i) => (
                        <div key={i} className="flex items-center justify-between p-2 bg-ice-50/50 rounded-md">
                          <div>
                            <span className="text-xs font-medium text-ice-700">{med.time}</span>
                            <p className="text-sm">{med.name}</p>
                          </div>
                          <span className="text-xs text-gray-500">{med.dosage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-4 border border-ice-100">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">{language === 'en' ? 'Emergency Contact' : 'Contacto de Emergencia'}</h4>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">JD</div>
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-gray-500">+34 612 345 678</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 bg-ice-50/70 border-t border-ice-100 flex justify-center">
                <Link to="/dashboard">
                  <ButtonCustom size="sm" className="group">
                    <span className="flex items-center">
                      {language === 'en' ? 'Try Our Dashboard Demo' : 'Pruebe Nuestra Demo del Panel'}
                      <ArrowUpCircle className="ml-2 h-4 w-4 rotate-90 transition group-hover:translate-x-1" />
                    </span>
                  </ButtonCustom>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        <DeviceShowcase />
        
        <Pricing />
        
        {/* Section Divider with enhanced styling */}
        <div className="relative">
          <div className="absolute left-0 right-0 h-16 bg-gradient-to-b from-white to-ice-50/30 -top-16 z-10"></div>
        </div>
        
        <ExpatInfo />
        
        {/* Scroll to Top Button with enhanced styling */}
        {showScrollTop && (
          <button 
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-white/90 p-2 rounded-full shadow-glass-lg backdrop-blur-sm border border-ice-200/50 text-ice-600 hover:text-ice-700 hover:bg-white transition-all duration-300 z-40"
            aria-label="Scroll to top"
          >
            <ArrowUpCircle className="w-8 h-8" />
          </button>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
