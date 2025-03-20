
import React from 'react';
import { ArrowRight, TrendingUp, Users, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InvestorHero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-ice-50 opacity-50"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ICE Alarm 
              <span className="block text-ice-600">Investor Overview</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join us in revolutionizing emergency response and health monitoring through AI-powered technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-ice-600 hover:bg-ice-700">
                Investment Deck
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg">
                Schedule a Meeting
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <TrendingUp className="h-10 w-10 text-ice-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">€1.5M</h3>
                <p className="text-muted-foreground">Pre-Money Valuation</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <Users className="h-10 w-10 text-ice-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">20%</h3>
                <p className="text-muted-foreground">Equity Offering</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <LineChart className="h-10 w-10 text-ice-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">€300K</h3>
                <p className="text-muted-foreground">Investment Target</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="h-10 w-10 flex items-center justify-center text-ice-600 mb-4">
                  <span className="text-3xl font-bold">€</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Q4 2025</h3>
                <p className="text-muted-foreground">International Expansion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorHero;
