
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ROICalculator: React.FC = () => {
  const [investment, setInvestment] = useState(300000);
  const [equity, setEquity] = useState(20);
  const [yearsToExit, setYearsToExit] = useState(5);
  const [growthRate, setGrowthRate] = useState(30);
  const [projections, setProjections] = useState<any[]>([]);
  
  // Calculate the projections when inputs change
  useEffect(() => {
    calculateProjections();
  }, [investment, equity, yearsToExit, growthRate]);
  
  const calculateProjections = () => {
    const data = [];
    // Starting company valuation
    const initialValuation = 1500000;
    
    // Calculate projection for each year
    for (let year = 0; year <= yearsToExit; year++) {
      const companyValue = initialValuation * Math.pow((1 + growthRate / 100), year);
      const investmentValue = (equity / 100) * companyValue;
      const roi = (investmentValue - investment) / investment * 100;
      
      data.push({
        year,
        companyValue: Math.round(companyValue),
        investmentValue: Math.round(investmentValue),
        roi: Math.round(roi)
      });
    }
    
    setProjections(data);
  };
  
  const formatCurrency = (value: number): string => {
    if (value >= 1000000) {
      return `€${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`;
    }
    return `€${value}`;
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Investment ROI Calculator</CardTitle>
        <CardDescription>
          Estimate your potential returns from investing in ICE Alarm
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="investment">Investment Amount (€)</Label>
                <span>{formatCurrency(investment)}</span>
              </div>
              <Slider 
                id="investment"
                min={50000} 
                max={1000000} 
                step={10000} 
                value={[investment]} 
                onValueChange={(value) => setInvestment(value[0])} 
              />
              <Input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="mt-2"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="equity">Equity Stake (%)</Label>
                <span>{equity}%</span>
              </div>
              <Slider 
                id="equity"
                min={1} 
                max={40} 
                step={1} 
                value={[equity]} 
                onValueChange={(value) => setEquity(value[0])} 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="exit">Years to Exit</Label>
                <span>{yearsToExit} years</span>
              </div>
              <Slider 
                id="exit"
                min={1} 
                max={10} 
                step={1} 
                value={[yearsToExit]} 
                onValueChange={(value) => setYearsToExit(value[0])} 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="growth">Annual Growth Rate (%)</Label>
                <span>{growthRate}%</span>
              </div>
              <Slider 
                id="growth"
                min={10} 
                max={100} 
                step={5} 
                value={[growthRate]} 
                onValueChange={(value) => setGrowthRate(value[0])} 
              />
            </div>
            
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-semibold text-lg mb-2">Exit Summary</h3>
              {projections.length > 0 && (
                <div className="space-y-2">
                  <p>Initial investment: <span className="font-semibold">{formatCurrency(investment)}</span></p>
                  <p>Projected exit value: <span className="font-semibold">{formatCurrency(projections[projections.length - 1]?.investmentValue)}</span></p>
                  <p>Total ROI: <span className="font-semibold">{projections[projections.length - 1]?.roi}%</span></p>
                  <p>Annualized ROI: <span className="font-semibold">{Math.round(projections[projections.length - 1]?.roi / yearsToExit)}% per year</span></p>
                </div>
              )}
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={projections}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} labelFormatter={(label) => `Year ${label}`} />
                <Legend />
                <Line type="monotone" dataKey="investmentValue" name="Investment Value" stroke="#2563eb" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="companyValue" name="Company Value" stroke="#10b981" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ROICalculator;
