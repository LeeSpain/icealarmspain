
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth";
import { toast } from "react-toastify";
import ProfileInfo from "./ProfileInfo";
import PerformanceMetrics from "./PerformanceMetrics";
import Preferences from "./Preferences";
import SkillsTraining from "./SkillsTraining";

const AgentProfile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("info");
  
  // Mock data for agent performance
  const performanceData = {
    callsPerDay: 32,
    avgHandleTime: "8m 45s",
    satisfactionScore: 4.8,
    lastMonthCalls: 640,
    resolvedTickets: 128,
    firstCallResolution: "92%"
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Agent Profile</h2>
          <p className="text-muted-foreground">
            View and manage your personal profile and settings
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="h-20 w-20 mx-auto">
              <AvatarImage src="/placeholder.svg" alt={user?.name || "Agent"} />
              <AvatarFallback>{user?.name?.charAt(0) || "A"}</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-2">{user?.name || "Agent Name"}</CardTitle>
            <CardDescription>Call Center Agent</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Agent ID:</span>
                <span className="font-medium">AGT-{user?.id?.slice(0, 6) || "123456"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className="font-medium text-green-600">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Team:</span>
                <span className="font-medium">Technical Support</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Joined:</span>
                <span className="font-medium">Mar 15, 2023</span>
              </div>
            </div>
            
            <div className="pt-2">
              <Button variant="secondary" className="w-full" onClick={() => toast.info("Status management coming soon")}>
                Set Status
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader className="pb-2">
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="info">Personal Info</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="skills">Skills & Training</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
            
              <TabsContent value="info" className="mt-4">
                <ProfileInfo />
              </TabsContent>
              
              <TabsContent value="performance" className="mt-4">
                <PerformanceMetrics data={performanceData} />
              </TabsContent>
              
              <TabsContent value="skills" className="mt-4">
                <SkillsTraining />
              </TabsContent>
              
              <TabsContent value="preferences" className="mt-4">
                <Preferences />
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default AgentProfile;
