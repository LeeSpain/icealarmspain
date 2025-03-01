
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import { useLanguage } from "@/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { 
  Check, Shield, PlusCircle, MinusCircle, Users, ShoppingBag, 
  Info, UserPlus, User, Home, Heart, UserCog, Truck
} from "lucide-react";

// Membership types that users can select from
interface MembershipType {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

interface PersonProducts {
  id: string;
  name: string;
  membershipType: string;
  selectedDevices: string[];
}

const Join: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  const [people, setPeople] = useState<PersonProducts[]>([
    { 
      id: "person1", 
      name: language === 'en' ? "Member 1" : "Miembro 1", 
      membershipType: "individual",
      selectedDevices: [] 
    }
  ]);
  
  // Define membership types
  const membershipTypes: MembershipType[] = [
    {
      id: "individual",
      icon: <User className="h-8 w-8 text-orange-500" />,
      title: language === 'en' ? "Individual" : "Individual",
      subtitle: language === 'en' ? "For a single person" : "Para una persona"
    },
    {
      id: "couple",
      icon: <Heart className="h-8 w-8 text-orange-500" />,
      title: language === 'en' ? "Couple" : "Pareja",
      subtitle: language === 'en' ? "For partners or spouses" : "Para parejas o cónyuges"
    },
    {
      id: "family",
      icon: <Home className="h-8 w-8 text-orange-500" />,
      title: language === 'en' ? "Family" : "Familia",
      subtitle: language === 'en' ? "For family members" : "Para miembros de la familia"
    },
    {
      id: "caregiver",
      icon: <UserCog className="h-8 w-8 text-orange-500" />,
      title: language === 'en' ? "Caregiver" : "Cuidador",
      subtitle: language === 'en' ? "For caregivers" : "Para cuidadores"
    }
  ];
  
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
    const newPersonName = language === 'en' ? `Member ${people.length + 1}` : `Miembro ${people.length + 1}`;
    
    setPeople(prevPeople => [
      ...prevPeople,
      {
        id: newPersonId,
        name: newPersonName,
        membershipType: "individual",
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
  
  const updateMembershipType = (personId: string, newType: string) => {
    setPeople(prevPeople =>
      prevPeople.map(person => 
        person.id === personId ? { ...person, membershipType: newType } : person
      )
    );
  };
  
  const calculateTotals = () => {
    let oneTimeTotal = 0;
    let totalMonthlyBase = 0;
    let totalShipping = 0;
    
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
      
      // Add shipping costs (€14.99 per device)
      totalShipping += person.selectedDevices.length * 14.99;
      
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
    const shippingTax = totalShipping * productTaxRate;
    
    const totalWithProductTax = oneTimeTotal + productTax;
    const totalWithShipping = totalWithProductTax + totalShipping + shippingTax;
    const totalWithMonthlyTax = totalMonthlyBase + monthlyTax;
    
    return {
      oneTimeTotal,
      totalMonthlyBase,
      productTax,
      monthlyTax,
      totalShipping,
      shippingTax,
      totalWithProductTax,
      totalWithShipping,
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
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-ice-50/30 to-white">
      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] bg-gradient-radial from-ice-100/60 to-transparent rounded-full filter blur-3xl opacity-60"></div>
        <div className="absolute top-[60%] left-[5%] w-[400px] h-[400px] bg-gradient-radial from-guardian-100/50 to-transparent rounded-full filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-[10%] right-[15%] w-[350px] h-[350px] bg-gradient-radial from-ice-200/40 to-transparent rounded-full filter blur-3xl opacity-30"></div>
      </div>
      
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
              <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-down">
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
              
              {/* New Multiple People section with improved UI */}
              <div className="max-w-6xl mx-auto mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold flex items-center text-ice-600">
                    <Users className="mr-3" />
                    {language === 'en' ? "Who Is This Package For?" : "¿Para Quién Es Este Paquete?"}
                  </h2>
                  
                  <ButtonCustom 
                    variant="outline" 
                    onClick={addPerson}
                    className="flex items-center shadow-sm"
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    {language === 'en' ? "Add Another Member" : "Añadir Otro Miembro"}
                  </ButtonCustom>
                </div>
                
                <div className="bg-gradient-to-br from-white to-ice-50/50 rounded-xl shadow-glass-sm p-6 mb-6">
                  <div className="flex flex-wrap gap-6 mb-4">
                    {people.map((person, index) => (
                      <div 
                        key={person.id} 
                        className={`
                          flex-grow min-w-[300px] p-5 rounded-lg border 
                          ${person.selectedDevices.length > 0 
                            ? 'bg-ice-50/80 border-ice-200 shadow-sm' 
                            : 'bg-white/80 border-gray-100'
                          } 
                          transition-all duration-300
                        `}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center space-x-2">
                            <User className="h-5 w-5 text-ice-500" />
                            <input
                              type="text"
                              value={person.name}
                              onChange={(e) => updatePersonName(person.id, e.target.value)}
                              className="font-medium border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-ice-300 rounded-md px-2 py-1 w-full max-w-[200px]"
                              placeholder={language === 'en' ? "Enter name" : "Ingrese nombre"}
                            />
                          </div>
                          
                          {people.length > 1 && (
                            <button
                              onClick={() => removePerson(person.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              aria-label={language === 'en' ? "Remove person" : "Eliminar persona"}
                            >
                              <MinusCircle size={18} />
                            </button>
                          )}
                        </div>
                        
                        {/* Membership type selection */}
                        <div className="mb-4">
                          <label className="text-sm text-muted-foreground mb-2 block">
                            {language === 'en' ? "Membership type:" : "Tipo de membresía:"}
                          </label>
                          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                            {membershipTypes.map(type => (
                              <div 
                                key={type.id}
                                onClick={() => updateMembershipType(person.id, type.id)}
                                className={`
                                  p-3 rounded-lg border cursor-pointer transition-all
                                  flex flex-col items-center text-center
                                  ${person.membershipType === type.id 
                                    ? 'border-orange-300 bg-orange-50/50 shadow-sm' 
                                    : 'border-gray-200 bg-white hover:border-orange-200'
                                  }
                                `}
                              >
                                {type.icon}
                                <span className="font-medium text-sm mt-2">{type.title}</span>
                                <span className="text-xs text-muted-foreground">{type.subtitle}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-sm text-muted-foreground mb-1">
                          {language === 'en' ? "Selected devices:" : "Dispositivos seleccionados:"}
                        </div>
                        
                        {person.selectedDevices.length > 0 ? (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {person.selectedDevices.map(deviceId => {
                              const device = devices.find(d => d.id === deviceId);
                              return device && (
                                <span 
                                  key={deviceId} 
                                  className="inline-flex items-center px-2 py-1 bg-white rounded-full text-xs font-medium border border-ice-200 text-ice-700"
                                >
                                  {device.name}
                                </span>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="text-sm italic text-gray-400 mt-2">
                            {language === 'en' ? "No devices selected yet" : "Aún no hay dispositivos seleccionados"}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-sm text-muted-foreground flex items-start mt-4">
                    <Info size={16} className="mr-2 flex-shrink-0 mt-0.5 text-ice-600" />
                    <p>
                      {language === 'en' 
                        ? "Select devices below for each member you've added. Each member will receive their own personalized monitoring package." 
                        : "Seleccione dispositivos a continuación para cada miembro que haya añadido. Cada miembro recibirá su propio paquete de monitoreo personalizado."}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Device Selection - Keep existing code with minor updates */}
              <div className="max-w-6xl mx-auto mb-10">
                <h2 className="text-2xl font-semibold mb-8 flex items-center text-ice-600">
                  <ShoppingBag className="mr-3" />
                  {language === 'en' ? "Select Your Devices" : "Seleccione Sus Dispositivos"}
                </h2>
                
                {people.map((person, personIndex) => (
                  <div key={person.id} className="mb-16 last:mb-8">
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-glass-sm border border-ice-100/50 overflow-hidden">
                      <div className="bg-gradient-to-r from-ice-50 to-ice-100/30 px-6 py-4 border-b border-ice-100/50">
                        <h3 className="text-lg font-semibold text-ice-700 flex items-center">
                          {person.name}
                          <span className="ml-3 px-2 py-0.5 bg-ice-100 text-ice-600 rounded-full text-xs font-medium">
                            {membershipTypes.find(t => t.id === person.membershipType)?.title || 'Individual'}
                          </span>
                        </h3>
                      </div>
                      
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {devices.map((device) => {
                            const isSelected = person.selectedDevices.includes(device.id);
                            
                            return (
                              <div 
                                key={`${person.id}-${device.id}`} 
                                className={`
                                  border rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md
                                  ${isSelected ? "border-ice-400 shadow-md" : "border-gray-200 hover:border-gray-300"}
                                `}
                              >
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                  <img 
                                    src={device.image} 
                                    alt={device.name} 
                                    className={`w-full h-full object-cover transition-transform duration-700 ${isSelected ? "scale-105" : "hover:scale-105"}`}
                                  />
                                  {isSelected && (
                                    <div className="absolute top-3 right-3 bg-ice-500 text-white rounded-full p-1">
                                      <Check size={18} />
                                    </div>
                                  )}
                                </div>
                                
                                <div className="p-4">
                                  <h4 className="font-semibold mb-1 text-lg">{device.name}</h4>
                                  <p className="text-sm text-muted-foreground mb-3">{device.description}</p>
                                  
                                  <div className="flex justify-between items-center mb-3">
                                    <div>
                                      <p className="text-lg font-semibold text-ice-600">€{device.price.toFixed(2)}</p>
                                      <p className="text-xs text-muted-foreground">{language === 'en' ? "+ 21% IVA" : "+ 21% IVA"}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm text-ice-600">+€{device.monthlyPrice.toFixed(2)}/{language === 'en' ? "mo" : "mes"}</p>
                                      <p className="text-xs text-muted-foreground">{language === 'en' ? "+ 10% IVA" : "+ 10% IVA"}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center text-xs text-muted-foreground">
                                      <Truck size={12} className="mr-1" />
                                      <span>€14.99 {language === 'en' ? "shipping" : "envío"}</span>
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
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Summary/Cart - Update with shipping costs */}
              {totals.hasDevices && (
                <div className="max-w-3xl mx-auto glass-panel p-6 mb-10 animate-fade-in">
                  <h2 className="text-xl font-semibold mb-6 flex items-center border-b pb-4 border-ice-100/50">
                    <ShoppingBag className="mr-2 text-orange-500" />
                    {language === 'en' ? "Your Package Summary" : "Resumen de su Paquete"}
                  </h2>
                  
                  {people.map((person) => {
                    if (person.selectedDevices.length === 0) return null;
                    
                    return (
                      <div key={person.id} className="mb-6 pb-4 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0">
                        <div className="flex items-center mb-2">
                          <p className="font-medium text-ice-700">{person.name}</p>
                          <span className="ml-2 px-2 py-0.5 bg-ice-100 text-ice-600 rounded-full text-xs font-medium">
                            {membershipTypes.find(t => t.id === person.membershipType)?.title || 'Individual'}
                          </span>
                        </div>
                        <div className="pl-4 space-y-1">
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
                    
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground flex items-center">
                        <Truck size={14} className="mr-1" />
                        {language === 'en' ? "Shipping" : "Envío"}:
                      </span>
                      <span>€{totals.totalShipping.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between mb-1">
                      <span className="text-muted-foreground">
                        {language === 'en' ? "Shipping IVA (21%)" : "IVA de envío (21%)"}:
                      </span>
                      <span>€{totals.shippingTax.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between mb-4 pt-2 border-t border-gray-100">
                      <span className="font-medium">
                        {language === 'en' ? "Total one-time cost" : "Costo único total"}:
                      </span>
                      <span className="font-bold">€{totals.totalWithShipping.toFixed(2)}</span>
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
                  
                  <div className="bg-ice-50 p-4 text-sm rounded-lg my-6 flex items-start">
                    <Info size={16} className="text-ice-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>
                      {language === 'en' 
                        ? "All prices are subject to IVA. One-time purchases include 21% IVA, monthly fees include 10% IVA. Shipping fee of €14.99 applies per device." 
                        : "Todos los precios incluyen IVA. Las compras únicas incluyen 21% de IVA, las cuotas mensuales incluyen 10% de IVA. Se aplica una tarifa de envío de €14.99 por dispositivo."}
                    </span>
                  </div>
                  
                  <ButtonCustom 
                    className="w-full mt-4 text-lg py-6" 
                    onClick={handleCheckout}
                  >
                    {language === 'en' ? "Proceed to Checkout" : "Proceder al Pago"}
                  </ButtonCustom>
                </div>
              )}
              
              {/* Benefits section */}
              <div className="max-w-3xl mx-auto text-center mb-10">
                <h2 className="text-2xl font-bold mb-6">
                  {language === 'en' ? "All Plans Include" : "Todos los Planes Incluyen"}
                </h2>
                <div className="glass-panel p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(language === 'en' ? [
                    "No long-term contracts",
                    "Cancel anytime",
                    "Software updates included",
                    "Multilingual support",
                    "30-day money-back guarantee",
                    "No hidden fees",
                    "Technical support"
                  ] : [
                    "Sin contratos a largo plazo",
                    "Cancele en cualquier momento",
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
