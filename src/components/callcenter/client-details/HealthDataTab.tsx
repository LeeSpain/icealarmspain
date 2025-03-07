
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoField } from "@/components/medical-info/InfoField";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

// Mock health data - in a real app, this would come from your API
const mockHealthData = {
  1: { // client ID
    vitals: {
      bloodPressure: "120/80",
      heartRate: "72 bpm",
      temperature: "36.5°C",
      oxygenSaturation: "98%",
      glucoseLevel: "5.4 mmol/L",
      lastUpdated: "2023-08-15"
    },
    conditions: [
      { id: 1, name: "Type 2 Diabetes", status: "Managed", notes: "Taking medication regularly" },
      { id: 2, name: "Hypertension", status: "Controlled", notes: "Diet and medication" }
    ],
    allergies: [
      { id: 1, allergen: "Penicillin", severity: "High", reaction: "Rash, difficulty breathing" },
      { id: 2, allergen: "Shellfish", severity: "Medium", reaction: "Hives" }
    ],
    medications: [
      { id: 1, name: "Metformin", dosage: "500mg", frequency: "Twice daily", purpose: "Diabetes" },
      { id: 2, name: "Lisinopril", dosage: "10mg", frequency: "Once daily", purpose: "Blood pressure" }
    ]
  },
  2: { // another client
    vitals: {
      bloodPressure: "110/70",
      heartRate: "68 bpm",
      temperature: "36.6°C",
      oxygenSaturation: "99%",
      glucoseLevel: "4.9 mmol/L",
      lastUpdated: "2023-08-16"
    },
    conditions: [
      { id: 1, name: "Asthma", status: "Managed", notes: "Uses inhaler as needed" }
    ],
    allergies: [
      { id: 1, allergen: "Pollen", severity: "Medium", reaction: "Sneezing, itchy eyes" },
      { id: 2, allergen: "Dust", severity: "Low", reaction: "Sneezing" }
    ],
    medications: [
      { id: 1, name: "Albuterol", dosage: "90mcg", frequency: "As needed", purpose: "Asthma" }
    ]
  }
};

interface HealthDataTabProps {
  clientId: number;
}

const HealthDataTab: React.FC<HealthDataTabProps> = ({ clientId }) => {
  const [editMode, setEditMode] = useState(false);
  
  // Get client health data or default to empty structure if not found
  const healthData = mockHealthData[clientId as keyof typeof mockHealthData] || {
    vitals: {},
    conditions: [],
    allergies: [],
    medications: []
  };
  
  const handleSaveChanges = () => {
    setEditMode(false);
    toast.success("Health information updated successfully");
  };
  
  return (
    <div className="space-y-6">
      {/* Edit controls */}
      <div className="flex justify-end">
        {editMode ? (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setEditMode(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>
        ) : (
          <Button onClick={() => setEditMode(true)}>
            Edit Health Information
          </Button>
        )}
      </div>
      
      {/* Health data tabs */}
      <Tabs defaultValue="vitals">
        <TabsList className="mb-4">
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="conditions">Medical Conditions</TabsTrigger>
          <TabsTrigger value="allergies">Allergies</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vitals" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField 
              label="Blood Pressure" 
              value={healthData.vitals.bloodPressure || "-"} 
              editMode={editMode} 
              onChange={() => {}}
            />
            <InfoField 
              label="Heart Rate" 
              value={healthData.vitals.heartRate || "-"} 
              editMode={editMode} 
              onChange={() => {}}
            />
            <InfoField 
              label="Temperature" 
              value={healthData.vitals.temperature || "-"} 
              editMode={editMode} 
              onChange={() => {}}
            />
            <InfoField 
              label="Oxygen Saturation" 
              value={healthData.vitals.oxygenSaturation || "-"} 
              editMode={editMode} 
              onChange={() => {}}
            />
            <InfoField 
              label="Glucose Level" 
              value={healthData.vitals.glucoseLevel || "-"} 
              editMode={editMode} 
              onChange={() => {}}
            />
            <InfoField 
              label="Last Updated" 
              value={healthData.vitals.lastUpdated || "-"} 
              editMode={editMode} 
              onChange={() => {}}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="conditions">
          {healthData.conditions.length === 0 ? (
            <p className="text-center py-6 text-gray-500">No medical conditions recorded</p>
          ) : (
            <div className="space-y-4">
              {healthData.conditions.map(condition => (
                <div key={condition.id} className="border rounded-md p-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{condition.name}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {condition.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{condition.notes}</p>
                </div>
              ))}
            </div>
          )}
          {editMode && (
            <Button variant="outline" size="sm" className="mt-4">
              Add Medical Condition
            </Button>
          )}
        </TabsContent>
        
        <TabsContent value="allergies">
          {healthData.allergies.length === 0 ? (
            <p className="text-center py-6 text-gray-500">No allergies recorded</p>
          ) : (
            <div className="space-y-4">
              {healthData.allergies.map(allergy => (
                <div key={allergy.id} className="border rounded-md p-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{allergy.allergen}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      allergy.severity === 'High' ? 'bg-red-100 text-red-800' : 
                      allergy.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {allergy.severity} Severity
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Reaction: {allergy.reaction}</p>
                </div>
              ))}
            </div>
          )}
          {editMode && (
            <Button variant="outline" size="sm" className="mt-4">
              Add Allergy
            </Button>
          )}
        </TabsContent>
        
        <TabsContent value="medications">
          {healthData.medications.length === 0 ? (
            <p className="text-center py-6 text-gray-500">No medications recorded</p>
          ) : (
            <div className="space-y-4">
              {healthData.medications.map(medication => (
                <div key={medication.id} className="border rounded-md p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h3 className="font-medium">{medication.name} ({medication.dosage})</h3>
                    <span className="mt-1 sm:mt-0 text-sm text-gray-600">
                      {medication.frequency}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Purpose: {medication.purpose}</p>
                </div>
              ))}
            </div>
          )}
          {editMode && (
            <Button variant="outline" size="sm" className="mt-4">
              Add Medication
            </Button>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthDataTab;
