
import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusSquare, Clock, Pill, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import MedicationReminderCard from "@/components/medications/MedicationReminderCard";
import MedicationStatusCard from "@/components/medications/MedicationStatusCard";
import MedicationScheduleCard from "@/components/medications/MedicationScheduleCard";

// Mock medication data
const medicationInventory = [
  { id: 1, name: "Lisinopril", remaining: 12, total: 28 },
  { id: 2, name: "Metformin", remaining: 15, total: 30 },
  { id: 3, name: "Atorvastatin", remaining: 10, total: 30 },
  { id: 4, name: "Aspirin", remaining: 5, total: 30 },
];

const medicationSchedule = [
  { 
    id: 1, 
    name: "Lisinopril", 
    dosage: "10mg", 
    schedule: { morning: "8:00 AM" },
    days: ["0", "1", "2", "3", "4", "5", "6"]
  },
  { 
    id: 2, 
    name: "Metformin", 
    dosage: "500mg", 
    schedule: { morning: "8:00 AM", evening: "7:00 PM" },
    days: ["0", "1", "2", "3", "4", "5", "6"]
  },
  { 
    id: 3, 
    name: "Atorvastatin", 
    dosage: "20mg", 
    schedule: { evening: "9:00 PM" },
    days: ["0", "1", "2", "3", "4", "5", "6"]
  },
  { 
    id: 4, 
    name: "Aspirin", 
    dosage: "81mg", 
    schedule: { morning: "8:00 AM" },
    days: ["0", "1", "2", "3", "4", "5", "6"]
  }
];

const upcomingReminders = [
  { id: 1, name: "Metformin", dosage: "500mg", time: "Today, 7:00 PM" },
  { id: 2, name: "Atorvastatin", dosage: "20mg", time: "Today, 9:00 PM" },
  { id: 3, name: "Lisinopril", dosage: "10mg", time: "Tomorrow, 8:00 AM" },
  { id: 4, name: "Aspirin", dosage: "81mg", time: "Tomorrow, 8:00 AM" }
];

const MedicationsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  const [takenMedications, setTakenMedications] = useState<number[]>([]);
  
  const handleMarkTaken = (id: number) => {
    setTakenMedications(prev => [...prev, id]);
    toast.success(
      language === 'en' 
        ? "Medication marked as taken" 
        : "Medicamento marcado como tomado"
    );
  };
  
  return (
    <div className="flex h-screen bg-ice-50/30">
      <MemberSidebar 
        activePage="medications"
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <div className="flex-1 overflow-auto transition-all duration-300">
        <div className="p-6 max-w-7xl mx-auto">
          <ToastContainer />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-ice-800 mb-2">
              {language === 'en' ? 'Medications' : 'Medicamentos'}
            </h1>
            <p className="text-ice-700">
              {language === 'en' 
                ? 'Manage your medications and view upcoming reminders' 
                : 'Gestiona tus medicamentos y visualiza los próximos recordatorios'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium text-gray-700">
                    {language === 'en' ? 'Active Medications' : 'Medicamentos Activos'}
                  </div>
                  <div className="p-2 rounded-full bg-ice-50 text-ice-600">
                    <Pill size={18} />
                  </div>
                </div>
                <div className="text-2xl font-bold">{medicationInventory.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium text-gray-700">
                    {language === 'en' ? 'Next Dose' : 'Próxima Dosis'}
                  </div>
                  <div className="p-2 rounded-full bg-ice-50 text-ice-600">
                    <Clock size={18} />
                  </div>
                </div>
                <div className="text-2xl font-bold">
                  {language === 'en' ? 'Today, 7:00 PM' : 'Hoy, 7:00 PM'}
                </div>
                <div className="mt-2 text-xs text-amber-600">Metformin (500mg)</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium text-gray-700">
                    {language === 'en' ? 'Adherence Rate' : 'Tasa de Adherencia'}
                  </div>
                  <div className="p-2 rounded-full bg-ice-50 text-ice-600">
                    <Calendar size={18} />
                  </div>
                </div>
                <div className="text-2xl font-bold">94%</div>
                <div className="mt-2 text-xs text-green-600">
                  {language === 'en' ? 'Excellent' : 'Excelente'}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PlusSquare className="h-5 w-5 text-ice-500" />
                      <CardTitle>
                        {language === 'en' ? 'Current Medications' : 'Medicamentos Actuales'}
                      </CardTitle>
                    </div>
                    <Button className="bg-ice-600 hover:bg-ice-700">
                      <Plus className="mr-2 h-4 w-4" />
                      {language === 'en' ? 'Add Medication' : 'Añadir Medicamento'}
                    </Button>
                  </div>
                  <CardDescription>
                    {language === 'en' 
                      ? 'Manage your prescribed medications and schedules' 
                      : 'Gestiona tus medicamentos recetados y sus horarios'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MedicationStatusCard medications={medicationInventory} />
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-ice-500" />
                    <CardTitle>
                      {language === 'en' ? 'Upcoming Reminders' : 'Próximos Recordatorios'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {upcomingReminders.map(reminder => (
                      <MedicationReminderCard
                        key={reminder.id}
                        medication={{
                          id: reminder.id,
                          name: reminder.name,
                          dosage: reminder.dosage,
                          time: reminder.time,
                          taken: takenMedications.includes(reminder.id)
                        }}
                        onMarkTaken={handleMarkTaken}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <MedicationScheduleCard medications={medicationSchedule} />
        </div>
      </div>
    </div>
  );
};

export default MedicationsPage;
