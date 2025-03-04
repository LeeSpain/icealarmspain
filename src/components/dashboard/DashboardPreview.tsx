
import React, { useState } from "react";
import { LayoutDashboard, ArrowUpCircle } from "lucide-react";
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
            {language === 'en' ? 'Advanced Dashboard' : 'Panel de Control Avanzado'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Experience our intuitive dashboard with real-time monitoring and personalized insights for your health needs.' 
              : 'Experimente nuestro panel intuitivo con monitoreo en tiempo real e información personalizada para sus necesidades de salud.'}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-50 to-ice-50 rounded-xl shadow-lg overflow-hidden border border-ice-100">
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
                          className="w-6 bg-gradient-to-t from-ice-500 to-ice-300 rounded-t-sm" 
                          style={{ height: `${value}%` }}
                        ></div>
                        <span className="text-xs mt-1 text-gray-500">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{language === 'en' ? 'Weekly Average:' : 'Promedio Semanal:'} <span className="font-medium text-ice-700">79%</span></span>
                  <button 
                    onClick={() => setPreviewOpen(true)}
                    className="text-xs text-ice-600 hover:text-ice-700 flex items-center"
                  >
                    {language === 'en' ? 'View Details' : 'Ver Detalles'} →
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow-sm p-4 border border-ice-100">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">{language === 'en' ? 'Heart Rate' : 'Ritmo Cardíaco'}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-ice-700">72</span>
                    <span className="text-sm text-gray-400">{language === 'en' ? 'bpm' : 'lpm'}</span>
                  </div>
                  <div className="h-10 w-full mt-2">
                    <div className="w-full h-4 bg-ice-50 rounded-full overflow-hidden">
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
              <div className="bg-white rounded-lg shadow-sm p-4 border border-ice-100 h-[160px]">
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
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">JD</div>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">+34 612 345 678</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-ice-50/70 border-t border-ice-100 flex justify-center">
            <ButtonCustom size="sm" className="group" onClick={() => setPreviewOpen(true)}>
              <span className="flex items-center">
                {language === 'en' ? 'See Dashboard Example' : 'Ver Ejemplo del Panel'}
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
