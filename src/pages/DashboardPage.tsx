
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";
import { 
  BarChart, LineChart, Activity, Shield, Bell, Users, 
  Calendar, Settings, Heart, Clock, Pill, AlertCircle
} from "lucide-react";

const DashboardPage: React.FC = () => {
  const { language } = useLanguage();
  
  const features = [
    {
      icon: <Activity className="h-10 w-10 text-ice-600" />,
      title: language === 'en' ? "Health Monitoring" : "Monitoreo de Salud",
      description: language === 'en' 
        ? "Track vital signs in real-time with advanced sensors and AI analysis."
        : "Seguimiento de signos vitales en tiempo real con sensores avanzados y análisis de IA."
    },
    {
      icon: <Shield className="h-10 w-10 text-guardian-500" />,
      title: language === 'en' ? "24/7 Protection" : "Protección 24/7",
      description: language === 'en'
        ? "Around-the-clock monitoring with immediate emergency response when needed."
        : "Monitoreo continuo con respuesta inmediata a emergencias cuando sea necesario."
    },
    {
      icon: <Bell className="h-10 w-10 text-orange-500" />,
      title: language === 'en' ? "Smart Alerts" : "Alertas Inteligentes",
      description: language === 'en'
        ? "Customizable alerts for medication, appointments, and health conditions."
        : "Alertas personalizables para medicamentos, citas y condiciones de salud."
    },
    {
      icon: <Users className="h-10 w-10 text-ice-600" />,
      title: language === 'en' ? "Family Access" : "Acceso Familiar",
      description: language === 'en'
        ? "Share access with family members or caregivers for better coordination."
        : "Comparta acceso con familiares o cuidadores para una mejor coordinación."
    },
    {
      icon: <Calendar className="h-10 w-10 text-guardian-500" />,
      title: language === 'en' ? "Scheduling" : "Programación",
      description: language === 'en'
        ? "Organize medical appointments, medication schedules, and daily activities."
        : "Organice citas médicas, horarios de medicación y actividades diarias."
    },
    {
      icon: <Settings className="h-10 w-10 text-orange-500" />,
      title: language === 'en' ? "Customizable" : "Personalizable",
      description: language === 'en'
        ? "Tailor the dashboard to your specific needs and health conditions."
        : "Adapte el panel a sus necesidades específicas y condiciones de salud."
    }
  ];
  
  const benefits = [
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: language === 'en' ? "Improved Health Outcomes" : "Mejores Resultados de Salud",
      description: language === 'en'
        ? "Early detection of potential health issues leads to better treatment outcomes."
        : "La detección temprana de posibles problemas de salud conduce a mejores resultados de tratamiento."
    },
    {
      icon: <Clock className="h-8 w-8 text-ice-600" />,
      title: language === 'en' ? "Time-Saving" : "Ahorro de Tiempo",
      description: language === 'en'
        ? "Streamlined health management reduces the time spent coordinating care."
        : "La gestión simplificada de la salud reduce el tiempo dedicado a coordinar la atención."
    },
    {
      icon: <Pill className="h-8 w-8 text-guardian-500" />,
      title: language === 'en' ? "Better Medication Adherence" : "Mejor Cumplimiento de Medicación",
      description: language === 'en'
        ? "Reminders and tracking help ensure medications are taken correctly and on time."
        : "Los recordatorios y el seguimiento ayudan a garantizar que los medicamentos se tomen correctamente y a tiempo."
    },
    {
      icon: <AlertCircle className="h-8 w-8 text-orange-500" />,
      title: language === 'en' ? "Peace of Mind" : "Tranquilidad",
      description: language === 'en'
        ? "Knowing that health is being monitored continuously provides reassurance to users and families."
        : "Saber que la salud está siendo monitoreada continuamente proporciona tranquilidad a usuarios y familias."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-ice-50 to-white py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {language === 'en' 
                    ? "Our Intelligent Dashboard" 
                    : "Nuestro Panel Inteligente"}
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  {language === 'en'
                    ? "Experience comprehensive health monitoring through our AI-powered dashboard. Keep track of vital signs, medication schedules, and emergency alerts all in one place."
                    : "Experimente un monitoreo integral de salud a través de nuestro panel impulsado por IA. Mantenga un registro de signos vitales, horarios de medicación y alertas de emergencia, todo en un solo lugar."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/join">
                    <ButtonCustom size="lg">
                      {language === 'en' ? "Get Started" : "Comenzar"}
                    </ButtonCustom>
                  </Link>
                  <Link to="/demo">
                    <ButtonCustom variant="outline" size="lg">
                      {language === 'en' ? "Request Demo" : "Solicitar Demo"}
                    </ButtonCustom>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white p-6 rounded-xl shadow-glass-lg border border-ice-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-xl">
                      {language === 'en' ? "Health Overview" : "Resumen de Salud"}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {language === 'en' ? "Updated live" : "Actualizado en vivo"}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-ice-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">
                          {language === 'en' ? "Heart Rate" : "Ritmo Cardíaco"}
                        </span>
                        <span className="text-ice-600 font-bold">72 BPM</span>
                      </div>
                      <div className="h-12">
                        <LineChart className="text-ice-500 w-full h-12" />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-guardian-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">
                          {language === 'en' ? "Blood Pressure" : "Presión Arterial"}
                        </span>
                        <span className="text-guardian-600 font-bold">120/80</span>
                      </div>
                      <div className="h-12">
                        <BarChart className="text-guardian-500 w-full h-12" />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">
                          {language === 'en' ? "Glucose Level" : "Nivel de Glucosa"}
                        </span>
                        <span className="text-orange-600 font-bold">110 mg/dL</span>
                      </div>
                      <div className="h-12">
                        <Activity className="text-orange-500 w-full h-12" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -z-10 -top-6 -left-6 w-24 h-24 bg-ice-200 rounded-full opacity-20"></div>
                <div className="absolute -z-10 -bottom-6 -right-6 w-32 h-32 bg-guardian-200 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'en' ? "Dashboard Features" : "Características del Panel"}
              </h2>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? "Our intelligent dashboard combines powerful monitoring tools with an intuitive interface."
                  : "Nuestro panel inteligente combina potentes herramientas de monitoreo con una interfaz intuitiva."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-subtle border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 bg-gradient-to-b from-ice-50/50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {language === 'en' ? "Benefits of Our Dashboard" : "Beneficios de Nuestro Panel"}
              </h2>
              <p className="text-muted-foreground">
                {language === 'en'
                  ? "Experience the advantages of comprehensive health monitoring with ICE Alarm España."
                  : "Experimente las ventajas del monitoreo integral de salud con ICE Alarm España."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 bg-white p-2 rounded-full shadow-subtle">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-ice-600 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">
              {language === 'en' 
                ? "Ready to experience the power of our dashboard?" 
                : "¿Listo para experimentar el poder de nuestro panel?"}
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              {language === 'en'
                ? "Join thousands of satisfied customers who trust ICE Alarm España for their health monitoring needs."
                : "Únase a miles de clientes satisfechos que confían en ICE Alarm España para sus necesidades de monitoreo de salud."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/join">
                <ButtonCustom variant="secondary" size="lg">
                  {language === 'en' ? "Sign Up Now" : "Regístrese Ahora"}
                </ButtonCustom>
              </Link>
              <Link to="/demo">
                <ButtonCustom variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                  {language === 'en' ? "Request Demo" : "Solicitar Demo"}
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
