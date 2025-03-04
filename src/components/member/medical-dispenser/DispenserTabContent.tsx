
import React from "react";
import DeviceStatusCard from "./DeviceStatusCard";
import QuickActionsCard from "./QuickActionsCard";
import MedicationManagement from "./MedicationManagement";
import MedicationScheduleManagement from "./MedicationScheduleManagement";
import DeviceSettings from "./DeviceSettings";
import { TabsContent } from "@/components/ui/tabs";

interface TabContentProps {
  medications: Array<{
    name: string;
    schedule: string;
    remaining: number;
    total: number;
  }>;
}

export const OverviewTabContent: React.FC<TabContentProps> = ({ medications }) => {
  return (
    <TabsContent value="overview" className="space-y-4">
      <DeviceStatusCard medications={medications} />
      <QuickActionsCard />
    </TabsContent>
  );
};

export const MedicationsTabContent: React.FC = () => {
  return (
    <TabsContent value="medications" className="space-y-4">
      <MedicationManagement />
    </TabsContent>
  );
};

export const ScheduleTabContent: React.FC = () => {
  return (
    <TabsContent value="schedule" className="space-y-4">
      <MedicationScheduleManagement />
    </TabsContent>
  );
};

export const SettingsTabContent: React.FC = () => {
  return (
    <TabsContent value="settings" className="space-y-4">
      <DeviceSettings />
    </TabsContent>
  );
};
