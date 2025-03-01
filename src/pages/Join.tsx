
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Check, Shield, PlusCircle, MinusCircle, Users, ShoppingBag, Info } from "lucide-react";

interface PersonProducts {
  id: string;
  name: string;
  selectedDevices: string[];
}

const Join: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [people, setPeople] = useState<PersonProducts[]>([
    { id: "person1", name: language === 'en' ? "Person 1" : "Persona 1", selectedDevices: [] }
  ]);
  
  const handleSignupSuccess = () => {
    // Redirect to dashboard or home after successful signup
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  const devices = [
    {
      id: "sos",
      name: language === 'en' ? "SOS Pendant" : "Colgante SOS",
      price: 110.00,
      monthlyPrice: 24.99,
      image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=300&fit=crop",
      description: language === 'en' ? 
        "One-touch emergency call with GPS tracking and fall detection." :
        "Llamada de emergencia con un solo toque con seguimiento GPS y detección de caídas."
    },
    {
      id: "dispenser",
      name: language === 'en' ? "Medical Dispenser" : "Dispensador Médico",
      price: 249.99,
      monthlyPrice: 24.99,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      description: language === 'en' ? 
        "Automated medication management with intelligent reminders." :
        "Gestión automatizada de medicamentos con recordatorios inteligentes."
    },
    {
      id: "glucose",
      name: language === 'en' ? "Glucose Monitor" : "Monitor de Glucosa",
      price: 149.99,
      monthlyPrice: 24.99,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop",
      description: language === 'en' ? 
        "Real-time glucose monitoring with AI-powered analysis." :
        "Monitoreo de glucosa en tiempo real con análisis impulsado por IA."
    }
  ];
  
  const toggleDeviceSelection = (personId: string, deviceId: string) => {
    setPeople(prevPeople => 
      prevPeople.map(person => {
        if (person.id === personId) {
          // If device is already selected, remove it; otherwise, add it
          if (person.selectedDevices.includes(deviceId)) {
            return {
              ...person,
              selectedDevices: person.selectedDevices.filter(id => id !== deviceId)
            };
          } else {
            return {
              ...person,
              selectedDevices: [...person.selectedDevices, deviceId]
            };
          }
        }
        return person;
      })
    );
  };
  
  const addPerson = () => {
    const newPersonId = `person${people.length + 1}`;
    const newPersonName = language === 'en' ? `Person ${people.length + 1}` : `Persona ${people.length + 1}`;
    
    setPeople(prevPeople => [
      ...prevPeople,
      {
        id: newPersonId,
        name: newPersonName,
        selectedDevices: []
      }
    ]);
  };
  
  const removePerson = (personId: string) => {
    if (people.length > 1) {
      setPeople(prevPeople => prevPeople.filter(person => person.id !== personId));
    }
  };
  
  const updatePersonName = (personId: string, newName: string) => {
    setPeople(prevPeople =>
      prevPeople.map(person => 
        person.id === personId ? { ...person, name: newName } : person
      )
    );
  };
  
  const calculateTotals = () => {
    let oneTimeTotal = 0;
    let totalMonthlyBase = 0;
    
    // Calculate totals for each person
    people.forEach(person => {
      if (person.selectedDevices.length === 0) return;
      
      let personOneTime = 0;
      let personMonthly = 0;
      
      // Add up device costs
      person.selectedDevices.forEach(deviceId => {
        const device = devices.find(d => d.id === deviceId);
        if (device) {
          personOneTime += device.price;
          personMonthly += device.monthlyPrice;
        }
      });
      
      // Add AI Guardian base service (€49.99) per person with devices
      if (person.selectedDevices.length > 0) {
        personMonthly += 49.99;
      }
      
      // Apply discounts based on number of devices per person
      if (person.selectedDevices.length === 2) {
        // 10% discount for 2 devices
        personMonthly *= 0.9;
      } else if (person.selectedDevices.length === 3) {
        // 20% discount for 3 devices
        personMonthly *= 0.8;
      }
      
      oneTimeTotal += personOneTime;
      totalMonthlyBase += personMonthly;
    });
    
    // Calculate taxes
    const productTaxRate = 0.21; // 21% IVA for products
    const monthlyTaxRate = 0.10; // 10% IVA for monthly services
    
    const productTax = oneTimeTotal * productTaxRate;
    const monthlyTax = totalMonthlyBase * monthlyTaxRate;
    
    const totalWithProductTax = oneTimeTotal + productTax;
    const totalWithMonthlyTax = totalMonthlyBase + monthlyTax;
    
    return {
      oneTimeTotal,
      totalMonthlyBase,
      productTax,
      monthlyTax,
      totalWithProductTax,
      totalWithMonthlyTax,
      hasDevices: people.some(person => person.selectedDevices.length > 0)
    };
  };
  
  const totals = calculateTotals();
  
  const handleCheckout = () => {
    setShowSignup(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-28">
        <div className="container mx-auto px-4 py-12">
          {showSignup ? (
            <div className="max-w-md mx-auto glass-panel p-8">
              <h1 className="text-2xl font-bold mb-6 text-center">
                {language === 'en' ? "Create Your Account" : "Crea Tu Cuenta"}
              </h1>
              <p className="text-muted-foreground mb-8 text-center">
                {language === 'en' 
                  ? "Sign up to start your health monitoring journey with ICE Alarm España." 
                  : "Regístrate para comenzar tu viaje de monitoreo de salud con ICE Alarm España."}
              </p>
              
              <AuthForm mode="signup" onSuccess={handleSignupSuccess} />
            </div>
          ) : (
            <>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-ice-50 border border-ice-200 text-ice-600 text-sm font-medium mb-4">
                  <Shield size={16} className="mr-2" />
                  {language === 'en' ? 'OUR PRODUCTS & SERVICES' : 'NUESTROS PRODUCTOS Y SERVICIOS'}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                  {language === 'en' ? "Join ICE Alarm España Today" : "Únase a ICE Alarm España Hoy"}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {language === 'en' 
                    ? "Choose your devices and create a personalized health monitoring package for you and your loved ones." 
                    : "Elija sus dispositivos y cree un paquete de monitoreo de salud personalizado para usted y sus seres queridos."}
                </p>
              </div>
              
              {/* Add multiple people section */}
              <div className="max-w-6xl mx-auto mb-10">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Users className="mr-2 text-ice-600" />
                    {language === 'en' ? "Select Devices for Multiple People" : "Seleccionar Dispositivos para Varias Personas"}
                  </h2>
                  <ButtonCustom 
                    variant="outline" 
                    size="sm" 
                    onClick={addPerson}
                    className="flex items-center"
                  >
                    <PlusCircle size={16} className="mr-2" />
                    {language === 'en' ? "Add Person" : "Añadir Persona"}
                  </ButtonCustom>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <div className="text-sm text-muted-foreground mb-6 flex items-start">
                    <Info size={16} className="mr-2 flex-shrink-0 mt-0.5 text-ice-600" />
                    <p>
                      {language === 'en' 
                        ? "For each person, select the devices they need. Each person with devices will receive their own AI Guardian monitoring service." 
                        : "Para cada persona, seleccione los dispositivos que necesita. Cada persona con dispositivos recibirá su propio servicio de monitoreo AI Guardian."}
                    </p>
                  </div>
                  
                  {people.map((person, personIndex) => (
                    <div key={person.id} className="mb-8 pb-8 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <h3 className="text-lg font-medium mr-3">{language === 'en' ? "Person" : "Persona"} {personIndex + 1}</h3>
                          <input
                            type="text"
                            value={person.name}
                            onChange={(e) => updatePersonName(person.id, e.target.value)}
                            className="border border-gray-200 rounded-md px-3 py-1 text-sm"
                            placeholder={language === 'en' ? "Enter name" : "Ingrese nombre"}
                          />
                        </div>
                        {people.length > 1 && (
                          <ButtonCustom 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removePerson(person.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <MinusCircle size={16} className="mr-1" />
                            {language === 'en' ? "Remove" : "Eliminar"}
                          </ButtonCustom>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {devices.map((device) => {
                          const isSelected = person.selectedDevices.includes(device.id);
                          
                          return (
                            <div 
                              key={`${person.id}-${device.id}`} 
                              className={`border rounded-lg overflow-hidden transition-all ${
                                isSelected ? "border-ice-500 shadow-md" : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <img 
                                src={device.image} 
                                alt={device.name} 
                                className="w-full h-48 object-cover"
                              />
                              <div className="p-4">
                                <h4 className="font-medium mb-1">{device.name}</h4>
                                <p className="text-sm text-muted-foreground mb-3">{device.description}</p>
                                
                                <div className="flex justify-between items-center mb-2">
                                  <div>
                                    <p className="text-lg font-semibold text-ice-600">€{device.price.toFixed(2)}</p>
                                    <p className="text-xs text-muted-foreground">{language === 'en' ? "+ 21% IVA" : "+ 21% IVA"}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm text-ice-600">+€{device.monthlyPrice.toFixed(2)}/{language === 'en' ? "mo" : "mes"}</p>
                                    <p className="text-xs text-muted-foreground">{language === 'en' ? "+ 10% IVA" : "+ 10% IVA"}</p>
                                  </div>
                                </div>
                                
                                <ButtonCustom
                                  variant={isSelected ? "primary" : "outline"}
                                  className="w-full"
                                  onClick={() => toggleDeviceSelection(person.id, device.id)}
                                >
                                  {isSelected 
                                    ? (language === 'en' ? "Selected" : "Seleccionado") 
                                    : (language === 'en' ? "Select" : "Seleccionar")}
                                </ButtonCustom>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Summary/Cart */}
              {totals.hasDevices && (
                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 mb-10">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <ShoppingBag className="mr-2 text-orange-500" />
                    {language === 'en' ? "Your Package Summary" : "Resumen de su Paquete"}
                  </h2>
                  
                  {people.map((person) => {
                    if (person.selectedDevices.length === 0) return null;
                    
                    return (
                      <div key={person.id} className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0">
                        <p className="font-medium">{person.name}</p>
                        <div className="pl-4">
                          {person.selectedDevices.map((deviceId) => {
                            const device = devices.find(d => d.id === deviceId);
                            return device && (
                              <div key={`${person.id}-${deviceId}`} className="flex justify-between text-sm py-1">
                                <span>{device.name}</span>
                                <span>€{device.price.toFixed(2)}</span>
                              </div>
                            );
                          })}
                          <div className="flex justify-between text-sm py-1 text-guardian-600 font-medium">
                            <span>AI Guardian Service</span>
                            <span>{language === 'en' ? "Included" : "Incluido"}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">
                        {language === 'en' ? "One-time devices cost" : "Costo único de dispositivos"}:
                      </span>
                      <span>€{totals.oneTimeTotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">
                        {language === 'en' ? "IVA (21%)" : "IVA (21%)"}:
                      </span>
                      <span>€{totals.productTax.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between mb-4 pt-2 border-t border-gray-100">
                      <span className="font-medium">
                        {language === 'en' ? "Total one-time cost" : "Costo único total"}:
                      </span>
                      <span className="font-bold">€{totals.totalWithProductTax.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">
                        {language === 'en' ? "Monthly subscription" : "Suscripción mensual"}:
                      </span>
                      <span>€{totals.totalMonthlyBase.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">
                        {language === 'en' ? "IVA (10%)" : "IVA (10%)"}:
                      </span>
                      <span>€{totals.monthlyTax.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between pt-2 border-t border-gray-100">
                      <span className="font-medium">
                        {language === 'en' ? "Total monthly cost" : "Costo mensual total"}:
                      </span>
                      <span className="font-bold">€{totals.totalWithMonthlyTax.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 text-xs rounded-lg my-4 flex items-start">
                    <Info size={14} className="text-ice-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === 'en' 
                        ? "All prices are subject to IVA. One-time purchases include 21% IVA, monthly fees include 10% IVA. Free shipping on all orders." 
                        : "Todos los precios incluyen IVA. Las compras únicas incluyen 21% de IVA, las cuotas mensuales incluyen 10% de IVA. Envío gratuito en todos los pedidos."}
                    </span>
                  </div>
                  
                  <ButtonCustom 
                    className="w-full mt-4" 
                    onClick={handleCheckout}
                  >
                    {language === 'en' ? "Proceed to Checkout" : "Proceder al Pago"}
                  </ButtonCustom>
                </div>
              )}
              
              {/* Benefits section */}
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">
                  {language === 'en' ? "All Plans Include" : "Todos los Planes Incluyen"}
                </h2>
                <div className="glass-panel p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(language === 'en' ? [
                    "No long-term contracts",
                    "Cancel anytime",
                    "Free shipping on all devices",
                    "Software updates included",
                    "Multilingual support",
                    "30-day money-back guarantee",
                    "No hidden fees",
                    "Technical support"
                  ] : [
                    "Sin contratos a largo plazo",
                    "Cancele en cualquier momento",
                    "Envío gratuito en todos los dispositivos",
                    "Actualizaciones de software incluidas",
                    "Soporte multilingüe",
                    "Garantía de devolución de 30 días",
                    "Sin tarifas ocultas",
                    "Soporte técnico"
                  ]).map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Join;
