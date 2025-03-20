
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ROICalculator: React.FC = () => {
  const [investment, setInvestment] = useState(50000);
  const [equity, setEquity] = useState(5);
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

  const handleInvestmentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 10000 && value <= 300000) {
      setInvestment(value);
    }
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Investment ROI Calculator</CardTitle>
        <CardDescription>
          Estimate your potential returns based on investment amount, equity stake, and exit timeline
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
                min={10000} 
                max={300000} 
                step={5000} 
                value={[investment]} 
                onValueChange={(value) => setInvestment(value[0])} 
              />
              <div className="flex items-center mt-2 gap-2">
                <Input
                  type="number"
                  value={investment}
                  onChange={handleInvestmentInput}
                  className="max-w-[200px]"
                />
                <span className="text-sm text-muted-foreground">Min: €10K, Max: €300K</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="equity">Equity Stake (%)</Label>
                <span>{equity}%</span>
              </div>
              <Slider 
                id="equity"
                min={1} 
                max={20} 
                step={0.5} 
                value={[equity]} 
                onValueChange={(value) => setEquity(value[0])} 
              />
              <div className="mt-1 text-sm text-muted-foreground">
                The €300K funding target represents 20% equity. Your stake will be proportional to your investment.
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="exit">Years to Exit</Label>
                <span>{yearsToExit} years</span>
              </div>
              <Slider 
                id="exit"
                min={3} 
                max={8} 
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
                max={60} 
                step={5} 
                value={[growthRate]} 
                onValueChange={(value) => setGrowthRate(value[0])} 
              />
              <div className="mt-1 text-sm text-muted-foreground">
                Based on our business model and market opportunity, we project 30-40% annual growth.
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-semibold text-lg mb-2">Exit Summary</h3>
              {projections.length > 0 && (
                <div className="space-y-2">
                  <p>Initial investment: <span className="font-semibold">{formatCurrency(investment)}</span></p>
                  <p>Projected exit value: <span className="font-semibold">{formatCurrency(projections[projections.length - 1]?.investmentValue)}</span></p>
                  <p>Total ROI: <span className="font-semibold">{projections[projections.length - 1]?.roi}%</span></p>
                  <p>Annualized ROI: <span className="font-semibold">{Math.round(projections[projections.length - 1]?.roi / yearsToExit)}% per year</span></p>
                  <Button className="w-full mt-4 bg-ice-600 hover:bg-ice-700">Download Detailed Projections</Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="h-96">
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
                <Line type="monotone" dataKey="investmentValue" name="Your Investment Value" stroke="#2563eb" strokeWidth={2} activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="companyValue" name="Company Value" stroke="#10b981" strokeWidth={1.5} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ROICalculator;
