
import React, { useState } from "react";
import { LayoutDashboard, ArrowUpCircle, Activity, Heart, Bell } from "lucide-react";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useLanguage } from "@/context/LanguageContext";
import DashboardPreviewModal from "./DashboardPreviewModal";

const DashboardPreview: React.FC = () => {
  const { language } = useLanguage();
  const [previewOpen, setPreviewOpen] = useState(false);
  
  return (
    <section id="dashboard-example" className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-ice-900 to-guardian-800 bg-clip-text text-transparent inline-block">
            {language === 'en' ? 'Advanced Health Monitoring' : 'Monitoreo Avanzado de Salud'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Experience our intuitive dashboard with real-time health monitoring and personalized insights tailored to your specific needs.' 
              : 'Experimente nuestro panel intuitivo con monitoreo de salud en tiempo real e información personalizada adaptada a sus necesidades específicas.'}
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-white to-ice-50 rounded-xl shadow-lg overflow-hidden border border-ice-100">
          <div className="p-4 bg-white/80 backdrop-blur-sm border-b border-ice-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-ice-600" />
              <h3 className="font-medium">{language === 'en' ? 'Health Monitor Dashboard' : 'Panel de Monitoreo de Salud'}</h3>
            </div>
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-ice-500" />
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-12 gap-5 p-6">
            {/* Left column - 8 spans */}
            <div className="md:col-span-8 space-y-5">
              <div className="bg-white rounded-lg shadow-sm p-5 border border-ice-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-gray-700">{language === 'en' ? 'Weekly Health Overview' : 'Resumen Semanal de Salud'}</h4>
                  <Activity className="h-4 w-4 text-ice-600" />
                </div>
                
                <div className="h-44 flex items-center justify-center">
                  <div className="w-full h-36 flex items-end justify-around">
                    {[70, 88, 76, 92, 72, 88, 80].map((value, i) => (
                      <div key={i} className="h-full flex flex-col items-center justify-end">
                        <div 
                          className="w-10 bg-gradient-to-t from-ice-600 to-ice-400 rounded-t-sm" 
                          style={{ height: `${value}%` }}
                        ></div>
                        <span className="text-xs mt-2 text-gray-500">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-ice-100 flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-600">{language === 'en' ? 'Weekly Score:' : 'Puntuación Semanal:'}</span>
                    <span className="ml-2 font-medium text-ice-700">82/100</span>
                  </div>
                  <button 
                    onClick={() => setPreviewOpen(true)}
                    className="text-xs text-ice-600 hover:text-ice-700 flex items-center"
                  >
                    {language === 'en' ? 'View Details' : 'Ver Detalles'} →
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-white rounded-lg shadow-sm p-5 border border-ice-100">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-medium text-gray-700">{language === 'en' ? 'Heart Rate' : 'Ritmo Cardíaco'}</h4>
                    <Heart className="h-4 w-4 text-red-500" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-bold text-ice-700">72</span>
                    <span className="text-sm text-gray-500">{language === 'en' ? 'bpm' : 'lpm'}</span>
                  </div>
                  
                  <div className="w-full h-2 bg-ice-100 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-ice-500 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>50</span>
                    <span>Normal Range</span>
                    <span>100</span>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-5 border border-ice-100">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-sm font-medium text-gray-700">{language === 'en' ? 'Blood Pressure' : 'Presión Arterial'}</h4>
                    <Activity className="h-4 w-4 text-blue-500" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-3xl font-bold text-ice-700">120/80</span>
                    <span className="text-sm text-gray-500">{language === 'en' ? 'mmHg' : 'mmHg'}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 text-xs">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded">{language === 'en' ? 'Normal' : 'Normal'}</span>
                    <span className="text-gray-500">{language === 'en' ? 'Last checked: 2h ago' : 'Última revisión: hace 2h'}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-5 border border-ice-100">
                <h4 className="text-sm font-medium text-gray-700 mb-4">{language === 'en' ? 'Activity Goals' : 'Objetivos de Actividad'}</h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: language === 'en' ? 'Steps' : 'Pasos', value: '8,246', goal: '10,000', percent: 82 },
                    { label: language === 'en' ? 'Calories' : 'Calorías', value: '1,842', goal: '2,200', percent: 84 },
                    { label: language === 'en' ? 'Water' : 'Agua', value: '1.6L', goal: '2.0L', percent: 80 }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">{item.label}</span>
                        <span className="text-xs text-gray-500">{item.value}/{item.goal}</span>
                      </div>
                      <div className="w-full h-1.5 bg-ice-100 rounded-full overflow-hidden">
                        <div className="h-full bg-ice-500 rounded-full" style={{ width: `${item.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right column - 4 spans */}
            <div className="md:col-span-4 space-y-5">
              <div className="bg-white rounded-lg shadow-sm p-5 border border-ice-100">
                <h4 className="text-sm font-medium text-gray-700 mb-4">{language === 'en' ? 'Today\'s Medications' : 'Medicamentos de Hoy'}</h4>
                <div className="space-y-3">
                  {[
                    { time: '08:00', name: language === 'en' ? 'Vitamin D' : 'Vitamina D', status: 'taken' },
                    { time: '14:00', name: language === 'en' ? 'Blood Pressure' : 'Presión Arterial', status: 'upcoming' },
                    { time: '20:00', name: language === 'en' ? 'Omega-3' : 'Omega-3', status: 'upcoming' }
                  ].map((med, i) => (
                    <div key={i} className="flex items-center p-2 rounded-md border border-ice-50 bg-ice-50/50">
                      <div className={`w-2 h-2 rounded-full ${med.status === 'taken' ? 'bg-green-500' : 'bg-amber-500'} mr-3`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{med.name}</p>
                        <p className="text-xs text-gray-500">{med.time}</p>
                      </div>
                      {med.status === 'taken' ? (
                        <span className="text-xs text-green-600 bg-green-50 rounded px-2 py-0.5">
                          {language === 'en' ? 'Taken' : 'Tomado'}
                        </span>
                      ) : (
                        <span className="text-xs text-amber-600 bg-amber-50 rounded px-2 py-0.5">
                          {language === 'en' ? 'Upcoming' : 'Próximo'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-5 border border-ice-100">
                <h4 className="text-sm font-medium text-gray-700 mb-4">{language === 'en' ? 'Device Status' : 'Estado del Dispositivo'}</h4>
                <div className="space-y-3">
                  {[
                    { name: 'SOS Pendant', battery: 85, status: 'active' },
                    { name: 'Glucose Monitor', battery: 62, status: 'active' },
                    { name: 'Medical Dispenser', battery: 45, status: 'warning' }
                  ].map((device, i) => (
                    <div key={i} className="flex items-center p-2 rounded-md border border-ice-50 bg-ice-50/50">
                      <div className={`w-2 h-2 rounded-full ${device.status === 'active' ? 'bg-green-500' : 'bg-amber-500'} mr-3`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{device.name}</p>
                        <div className="flex items-center mt-1">
                          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${device.battery > 60 ? 'bg-green-500' : device.battery > 30 ? 'bg-amber-500' : 'bg-red-500'}`} 
                              style={{ width: `${device.battery}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">{device.battery}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-5 border border-ice-100">
                <h4 className="text-sm font-medium text-gray-700 mb-3">{language === 'en' ? 'Emergency Contact' : 'Contacto de Emergencia'}</h4>
                <div className="flex items-center gap-3 p-2 rounded-md border border-ice-50 bg-ice-50/50">
                  <div className="w-10 h-10 rounded-full bg-ice-200 flex items-center justify-center text-ice-600 font-medium">JD</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">+34 612 345 678</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white border border-ice-100 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-ice-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-ice-50/70 border-t border-ice-100 flex justify-center">
            <ButtonCustom size="sm" className="group" onClick={() => setPreviewOpen(true)}>
              <span className="flex items-center">
                {language === 'en' ? 'See Full Dashboard Example' : 'Ver Ejemplo Completo del Panel'}
                <ArrowUpCircle className="ml-2 h-4 w-4 rotate-90 transition group-hover:translate-x-1" />
              </span>
            </ButtonCustom>
          </div>
        </div>
      </div>
      
      {/* Dashboard Preview Modal */}
      <DashboardPreviewModal 
        open={previewOpen} 
        onOpenChange={setPreviewOpen} 
      />
    </section>
  );
};

export default DashboardPreview;
