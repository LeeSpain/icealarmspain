
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-toastify";

const Preferences: React.FC = () => {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    desktopNotifications: true,
    soundAlerts: true,
    theme: "light",
    language: "english",
    ticketAutoAssign: true,
  });
  
  const handleToggle = (name: string) => {
    setPreferences(prev => ({
      ...prev,
      [name]: !prev[name as keyof typeof preferences]
    }));
  };
  
  const handleChange = (name: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    toast.success("Preferences saved successfully");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Preferences & Settings</h3>
        <Button onClick={handleSave}>Save Preferences</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="email-notifications" className="flex-1">
                Email Notifications
                <p className="text-xs text-muted-foreground mt-1">Receive notifications via email</p>
              </Label>
              <Switch
                id="email-notifications"
                checked={preferences.emailNotifications}
                onCheckedChange={() => handleToggle("emailNotifications")}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="desktop-notifications" className="flex-1">
                Desktop Notifications
                <p className="text-xs text-muted-foreground mt-1">Show desktop pop-up notifications</p>
              </Label>
              <Switch
                id="desktop-notifications"
                checked={preferences.desktopNotifications}
                onCheckedChange={() => handleToggle("desktopNotifications")}
              />
            </div>
            
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="sound-alerts" className="flex-1">
                Sound Alerts
                <p className="text-xs text-muted-foreground mt-1">Play sound for critical notifications</p>
              </Label>
              <Switch
                id="sound-alerts"
                checked={preferences.soundAlerts}
                onCheckedChange={() => handleToggle("soundAlerts")}
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Interface Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select 
                value={preferences.theme}
                onValueChange={(value) => handleChange("theme", value)}
              >
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System Default</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select 
                value={preferences.language}
                onValueChange={(value) => handleChange("language", value)}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center justify-between space-x-2 pt-2">
              <Label htmlFor="ticket-auto-assign" className="flex-1">
                Auto-assign Tickets
                <p className="text-xs text-muted-foreground mt-1">Automatically assign tickets based on availability</p>
              </Label>
              <Switch
                id="ticket-auto-assign"
                checked={preferences.ticketAutoAssign}
                onCheckedChange={() => handleToggle("ticketAutoAssign")}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Preferences;
