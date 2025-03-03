
import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MemberSidebar from "@/components/member/MemberSidebar";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusSquare, Clock, Pill, Calendar, AlarmClock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock medication data
const medications = [
  { 
    id: 1, 
    name: "Lisinopril", 
    dosage: "10mg", 
    frequency: "Once daily", 
    time: "Morning", 
    nextDose: "Today, 8:00 AM",
    status: "active" 
  },
  { 
    id: 2, 
    name: "Metformin", 
    dosage: "500mg", 
    frequency: "Twice daily", 
    time: "Morning and Evening", 
    nextDose: "Today, 7:00 PM",
    status: "active" 
  },
  { 
    id: 3, 
    name: "Atorvastatin", 
    dosage: "20mg", 
    frequency: "Once daily", 
    time: "Evening", 
    nextDose: "Today, 9:00 PM",
    status: "active" 
  },
  { 
    id: 4, 
    name: "Aspirin", 
    dosage: "81mg", 
    frequency: "Once daily", 
    time: "Morning", 
    nextDose: "Tomorrow, 8:00 AM",
    status: "active" 
  }
];

const upcomingReminders = [
  { id: 1, medication: "Metformin", time: "Today, 7:00 PM" },
  { id: 2, medication: "Atorvastatin", time: "Today, 9:00 PM" },
  { id: 3, medication: "Lisinopril", time: "Tomorrow, 8:00 AM" },
  { id: 4, medication: "Aspirin", time: "Tomorrow, 8:00 AM" }
];

const MedicationsPage: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { language } = useLanguage();
  
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
                <div className="text-2xl font-bold">{medications.length}</div>
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
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{language === 'en' ? 'Medication' : 'Medicamento'}</TableHead>
                        <TableHead>{language === 'en' ? 'Dosage' : 'Dosis'}</TableHead>
                        <TableHead>{language === 'en' ? 'Frequency' : 'Frecuencia'}</TableHead>
                        <TableHead>{language === 'en' ? 'Next Dose' : 'Próxima Dosis'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {medications.map(med => (
                        <TableRow key={med.id}>
                          <TableCell className="font-medium">{med.name}</TableCell>
                          <TableCell>{med.dosage}</TableCell>
                          <TableCell>{med.frequency}</TableCell>
                          <TableCell>{med.nextDose}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlarmClock className="h-5 w-5 text-ice-500" />
                    <CardTitle>
                      {language === 'en' ? 'Upcoming Reminders' : 'Próximos Recordatorios'}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingReminders.map(reminder => (
                      <div key={reminder.id} className="flex justify-between items-center pb-3 border-b last:border-0">
                        <div>
                          <h3 className="font-medium">{reminder.medication}</h3>
                          <p className="text-sm text-muted-foreground">{reminder.time}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          {language === 'en' ? 'Mark Taken' : 'Marcar Tomado'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-ice-500" />
                <CardTitle>
                  {language === 'en' ? 'Medication Schedule' : 'Horario de Medicamentos'}
                </CardTitle>
              </div>
              <CardDescription>
                {language === 'en' 
                  ? 'Your weekly medication schedule' 
                  : 'Tu horario semanal de medicamentos'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === 'en' ? 'Medication' : 'Medicamento'}</TableHead>
                      <TableHead>{language === 'en' ? 'Monday' : 'Lunes'}</TableHead>
                      <TableHead>{language === 'en' ? 'Tuesday' : 'Martes'}</TableHead>
                      <TableHead>{language === 'en' ? 'Wednesday' : 'Miércoles'}</TableHead>
                      <TableHead>{language === 'en' ? 'Thursday' : 'Jueves'}</TableHead>
                      <TableHead>{language === 'en' ? 'Friday' : 'Viernes'}</TableHead>
                      <TableHead>{language === 'en' ? 'Saturday' : 'Sábado'}</TableHead>
                      <TableHead>{language === 'en' ? 'Sunday' : 'Domingo'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Lisinopril (10mg)</TableCell>
                      <TableCell>8:00 AM</TableCell>
                      <TableCell>8:00 AM</TableCell>
                      <TableCell>8:00 AM</TableCell>
                      <TableCell>8:00 AM</TableCell>
                      <TableCell>8:00 AM</TableCell>
                      <TableCell>8:00 AM</TableCell>
                      <TableCell>8:00 AM</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Metformin (500mg)</TableCell>
                      <TableCell>8:00 AM, 7:00 PM</TableCell>
                      <TableCell>8:00 AM, 7:00 PM</TableCell>
                      <TableCell>8:00 AM, 7:00 PM</TableCell>
                      <TableCell>8:00 AM, 7:00 PM</TableCell>
                      <TableCell>8:00 AM, 7:00 PM</TableCell>
                      <TableCell>8:00 AM, 7:00 PM</TableCell>
                      <TableCell>8:00 AM, 7:00 PM</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Atorvastatin (20mg)</TableCell>
                      <TableCell>9:00 PM</TableCell>
                      <TableCell>9:00 PM</TableCell>
                      <TableCell>9:00 PM</TableCell>
                      <TableCell>9:00 PM</TableCell>
                      <TableCell>9:00 PM</TableCell>
                      <TableCell>9:00 PM</TableCell>
                      <TableCell>9:00 PM</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Aspirin (81mg)</TableCell>
                      <TableCell>8:00 AM</TableCell>
                      <TableCell>8:00 AM</TableCell>
                      <TableCell>8:00 AM</TableCell>
                      <TableCell>8:00 AM</TableCell>
                      <TableCell>8:00 AM</TableCell>
                      <TableCell>8:00 AM</TableCell>
                      <TableCell>8:00 AM</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </div>
  );
};

export default MedicationsPage;
