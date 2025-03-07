
import React, { useEffect } from "react";
import { X, Activity, Heart, Bell, Calendar, LayoutDashboard, User, Clock, Circle, Battery, Shield } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Link } from "react-router-dom";

interface DashboardPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DashboardPreviewModal: React.FC<DashboardPreviewModalProps> = ({
  open,
  onOpenChange,
}) => {
  const { language } = useLanguage();

  useEffect(() => {
    if (open) {
      window.scrollTo(0, 0);
    }
  }, [open]);

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-auto">
        <DialogHeader className="flex flex-row items-center justify-between pb-2">
          <DialogTitle className="text-xl font-semibold flex items-center">
            <LayoutDashboard className="w-5 h-5 mr-2 text-ice-600" />
            {language === 'en' ? 'Health Monitor Dashboard' : 'Panel de Monitoreo de Salud'}
          </DialogTitle>
          <ButtonCustom 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0" 
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </ButtonCustom>
        </DialogHeader>
        
        <div className="bg-ice-50/50 p-4 rounded-lg border border-ice-100">
          {/* Header Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center mb-1">
                  <User className="h-5 w-5 text-ice-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">
                    {language === 'en' ? 'Welcome back, Maria!' : '¡Bienvenido de nuevo, Maria!'}
                  </h2>
                </div>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  {language === 'en'
                    ? 'Here\'s your daily health summary.'
                    : 'Aquí está tu resumen diario de salud.'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-ice-50 px-3 py-2 rounded-md text-sm">
                  <div className="font-medium text-ice-800">
                    {language === 'en' ? 'Madrid, Spain' : 'Madrid, España'}
                  </div>
                  <div className="text-ice-600 flex items-center">
                    <span className="text-lg mr-1">23°C</span>
                    <span className="text-xs">Sunny</span>
                  </div>
                </div>
                <button className="relative">
                  <Bell className="h-5 w-5 text-ice-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { 
                  title: language === 'en' ? 'Health Score' : 'Puntuación de Salud',
                  value: '82',
                  unit: '/100',
                  icon: <Activity className="h-5 w-5 text-emerald-500" />,
                  status: 'good',
                  info: language === 'en' ? '5% improvement' : '5% de mejora'
                },
                {
                  title: language === 'en' ? 'Heart Rate' : 'Ritmo Cardíaco',
                  value: '72',
                  unit: 'bpm',
                  icon: <Heart className="h-5 w-5 text-red-500" />,
                  status: 'normal',
                  info: language === 'en' ? 'Normal range' : 'Rango normal'
                },
                {
                  title: language === 'en' ? 'Steps Today' : 'Pasos Hoy',
                  value: '8,246',
                  unit: '',
                  icon: <Activity className="h-5 w-5 text-blue-500" />,
                  status: 'good',
                  info: language === 'en' ? 'Goal: 10,000' : 'Meta: 10,000'
                }
              ].map((card, index) => (
                <div key={index} className="bg-white border border-ice-100 rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                    {card.icon}
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-800">{card.value}</span>
                    <span className="ml-1 text-sm text-gray-500">{card.unit}</span>
                  </div>
                  <div className="mt-2 text-xs">
                    <span className={`px-1.5 py-0.5 rounded ${
                      card.status === 'good' ? 'bg-emerald-50 text-emerald-600' : 
                      card.status === 'normal' ? 'bg-blue-50 text-blue-600' : 
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {card.status === 'good' ? (language === 'en' ? 'Good' : 'Bueno') : 
                       card.status === 'normal' ? (language === 'en' ? 'Normal' : 'Normal') : 
                       (language === 'en' ? 'Warning' : 'Advertencia')}
                    </span>
                    <span className="ml-2 text-gray-500">{card.info}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Device Status Section */}
            <div className="bg-white border border-ice-100 rounded-lg p-5 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">{language === 'en' ? 'Your Devices' : 'Tus Dispositivos'}</h3>
                <Shield className="h-4 w-4 text-ice-600" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    name: language === 'en' ? 'SOS Pendant' : 'Colgante SOS',
                    battery: 85,
                    status: 'active',
                    lastCheck: language === 'en' ? '10 min ago' : 'hace 10 min'
                  },
                  {
                    name: language === 'en' ? 'Glucose Monitor' : 'Monitor de Glucosa',
                    battery: 62,
                    status: 'active',
                    lastCheck: language === 'en' ? '1h ago' : 'hace 1h'
                  },
                  {
                    name: language === 'en' ? 'Medical Dispenser' : 'Dispensador Médico',
                    battery: 45,
                    status: 'warning',
                    lastCheck: language === 'en' ? '30 min ago' : 'hace 30 min'
                  }
                ].map((device, i) => (
                  <div key={i} className="flex items-center p-3 rounded-lg border border-ice-50 bg-ice-50/30">
                    <div className="mr-3 bg-white p-2 rounded-full border border-ice-100">
                      <Circle className={`h-5 w-5 ${device.status === 'active' ? 'text-green-500' : 'text-amber-500'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <p className="text-sm font-medium">{device.name}</p>
                        <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                          device.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {device.status === 'active' ? (language === 'en' ? 'Active' : 'Activo') : (language === 'en' ? 'Low Batt' : 'Bat. Baja')}
                        </span>
                      </div>
                      <div className="flex items-center mt-1">
                        <Battery className="h-3 w-3 text-gray-400 mr-1" />
                        <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${device.battery > 60 ? 'bg-green-500' : device.battery > 30 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${device.battery}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-1">{device.battery}%</span>
                        <span className="text-xs text-gray-400 ml-auto">{device.lastCheck}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Medications Section */}
            <div className="bg-white border border-ice-100 rounded-lg p-5 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-700">{language === 'en' ? 'Today\'s Medications' : 'Medicamentos de Hoy'}</h3>
                <Clock className="h-4 w-4 text-ice-600" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { time: '08:00', name: language === 'en' ? 'Vitamin D' : 'Vitamina D', status: 'taken' },
                  { time: '14:00', name: language === 'en' ? 'Blood Pressure' : 'Presión Arterial', status: 'upcoming' },
                  { time: '20:00', name: language === 'en' ? 'Omega-3' : 'Omega-3', status: 'upcoming' }
                ].map((med, i) => (
                  <div key={i} className="flex items-center p-3 rounded-lg border border-ice-50 bg-ice-50/30">
                    <div className="mr-3 bg-white p-2 rounded-full border border-ice-100">
                      <Clock className="h-5 w-5 text-ice-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{med.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">{med.time}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          med.status === 'taken' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {med.status === 'taken' ? 
                            (language === 'en' ? 'Taken' : 'Tomado') : 
                            (language === 'en' ? 'Upcoming' : 'Próximo')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sign Up CTA */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-ice-100">
              <div className="text-sm text-gray-500">
                {language === 'en' 
                  ? 'Start monitoring your health today'
                  : 'Comienza a monitorear tu salud hoy'}
              </div>
              <Link to="/join" onClick={handleLinkClick}>
                <ButtonCustom size="sm" className="bg-ice-600 hover:bg-ice-700">
                  {language === 'en' ? 'Sign Up Now' : 'Regístrate Ahora'}
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardPreviewModal;
