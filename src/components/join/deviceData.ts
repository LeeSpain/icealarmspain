
export interface JoinDevice {
  id: string;
  name: string;
  price: number;
  monthlyPrice: number;
  image: string;
  description: string;
}

export const getDevices = (language: string): JoinDevice[] => [
  {
    id: "sos",
    name: language === 'en' ? "SOS Pendant" : "Colgante SOS",
    price: 110.00,
    monthlyPrice: 24.99,
    image: "/lovable-uploads/ad65a632-e7ef-4c61-a20e-7b6ff282a87a.png",
    description: language === 'en' ? 
      "One-touch emergency call with GPS tracking and fall detection." :
      "Llamada de emergencia con un solo toque con seguimiento GPS y detección de caídas."
  },
  {
    id: "dispenser",
    name: language === 'en' ? "Medical Dispenser" : "Dispensador Médico",
    price: 249.99,
    monthlyPrice: 24.99,
    image: "/lovable-uploads/5e439305-cf63-4080-962e-52657e864050.png",
    description: language === 'en' ? 
      "Automated medication management with intelligent reminders." :
      "Gestión automatizada de medicamentos con recordatorios inteligentes."
  },
  {
    id: "glucose",
    name: language === 'en' ? "Glucose Monitor" : "Monitor de Glucosa",
    price: 149.99,
    monthlyPrice: 24.99,
    image: "/lovable-uploads/6eb6b5d1-34a3-4236-ac3a-351d6c22de7e.png",
    description: language === 'en' ? 
      "Real-time glucose monitoring with AI-powered analysis." :
      "Monitoreo de glucosa en tiempo real con análisis impulsado por IA."
  }
];
