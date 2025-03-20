
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck, Globe, Users, Target } from 'lucide-react';

const CompanyOverview: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Company Overview</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            ICE Alarm is an established emergency response and health monitoring company operating in Spain, 
            providing critical services to expats and Spanish residents.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>What is ICE Alarm?</CardTitle>
              <CardDescription>Our mission and current services</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                ICE Alarm is an established emergency response and health monitoring company operating in Spain, 
                providing critical services to expats and Spanish residents. We currently support 100+ active 
                members through our SOS emergency alert system and are now expanding our platform with additional 
                health-monitoring products and AI-powered services.
              </p>
              <div className="flex items-center gap-2 text-ice-600">
                <BadgeCheck className="h-5 w-5" />
                <span>100+ Active Members</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Expansion Strategy</CardTitle>
              <CardDescription>Our next phase of growth</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-ice-100 flex items-center justify-center">
                  <span className="font-semibold text-ice-600">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Adding Two New Products</h4>
                  <p className="text-muted-foreground">Glucose Monitoring & Medication Dispensers</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-ice-100 flex items-center justify-center">
                  <span className="font-semibold text-ice-600">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Launching a New AI-Powered Platform</h4>
                  <p className="text-muted-foreground">Integrating real-time health monitoring, emergency response, and automated alerts</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="shrink-0 w-10 h-10 rounded-full bg-ice-100 flex items-center justify-center">
                  <span className="font-semibold text-ice-600">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Opening Commercial Partnership Opportunities</h4>
                  <p className="text-muted-foreground">Engaging with businesses, care facilities, and healthcare providers</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-ice-50 rounded-lg">
            <Globe className="h-10 w-10 text-ice-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Target Audience</h3>
            <p className="text-muted-foreground">Expats & Spanish residents, elderly individuals, chronic illness patients</p>
          </div>
          
          <div className="p-6 bg-ice-50 rounded-lg">
            <Target className="h-10 w-10 text-ice-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Geographic Focus</h3>
            <p className="text-muted-foreground">Spain (current market), with planned UK & worldwide expansion</p>
          </div>
          
          <div className="p-6 bg-ice-50 rounded-lg">
            <div className="h-10 w-10 flex items-center justify-center text-ice-600 mb-4">
              <span className="text-2xl font-bold">€</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Revenue Model</h3>
            <p className="text-muted-foreground">Device sales + recurring monthly subscriptions (€24.99/month per user)</p>
          </div>
          
          <div className="p-6 bg-ice-50 rounded-lg">
            <Users className="h-10 w-10 text-ice-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Competitive Edge</h3>
            <p className="text-muted-foreground">Fully integrated AI monitoring system and multilingual support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;
