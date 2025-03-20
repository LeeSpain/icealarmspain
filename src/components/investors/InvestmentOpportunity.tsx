
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowUpRight, Calendar, Target } from 'lucide-react';

const InvestmentOpportunity: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Investment Opportunity</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join us in our mission to revolutionize emergency response and health monitoring with AI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Funding Requirements & Equity Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                To develop the new platform, expand product offerings, and launch into the UK and global markets, 
                we are seeking investment for:
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Technology Development (AI, API, cloud infrastructure improvements)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Marketing & Expansion (customer acquisition & commercial partnerships)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <span>Operational Scale-Up (expanding call center services & customer support)</span>
                </li>
              </ul>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-ice-50 p-4 rounded-lg">
                  <div className="text-ice-600 font-semibold mb-1 text-sm">Investment Target</div>
                  <div className="text-2xl font-bold">€300,000</div>
                  <div className="text-sm text-muted-foreground">Growth Round</div>
                </div>
                
                <div className="bg-ice-50 p-4 rounded-lg">
                  <div className="text-ice-600 font-semibold mb-1 text-sm">Equity Offer</div>
                  <div className="text-2xl font-bold">20% Stake</div>
                  <div className="text-sm text-muted-foreground">in ICE Alarm</div>
                </div>
                
                <div className="bg-ice-50 p-4 rounded-lg">
                  <div className="text-ice-600 font-semibold mb-1 text-sm">Valuation</div>
                  <div className="text-2xl font-bold">€1.5M</div>
                  <div className="text-sm text-muted-foreground">Pre-Money</div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button className="bg-ice-600 hover:bg-ice-700">
                  Request Investor Deck
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Investor Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="rounded-full bg-ice-100 w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <div className="text-ice-600">1</div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Equity in a Proven Business</h4>
                    <p className="text-muted-foreground">
                      Stake in a revenue-generating emergency healthcare business with existing customers
                    </p>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <div className="rounded-full bg-ice-100 w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <div className="text-ice-600">2</div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">First-Mover Advantage</h4>
                    <p className="text-muted-foreground">
                      Early access to AI-powered health monitoring & emergency response markets
                    </p>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <div className="rounded-full bg-ice-100 w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <div className="text-ice-600">3</div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">International Scalability</h4>
                    <p className="text-muted-foreground">
                      Opportunity to scale into the UK & other international markets
                    </p>
                  </div>
                </li>
                
                <li className="flex gap-4">
                  <div className="rounded-full bg-ice-100 w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <div className="text-ice-600">4</div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Exit Potential</h4>
                    <p className="text-muted-foreground">
                      Opportunities for acquisition, buyout, or long-term dividend payouts
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-6">Why Invest Now?</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-ice-100 p-2 rounded-md">
                  <Target className="h-5 w-5 text-ice-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Aging Population</h4>
                  <p className="text-muted-foreground">Demand for elderly care & monitoring solutions is skyrocketing</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-ice-100 p-2 rounded-md">
                  <Target className="h-5 w-5 text-ice-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Remote Healthcare Growth</h4>
                  <p className="text-muted-foreground">AI-driven monitoring is the future of healthcare services</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-ice-100 p-2 rounded-md">
                  <Target className="h-5 w-5 text-ice-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Subscription-Based Revenue</h4>
                  <p className="text-muted-foreground">Recurring revenue ensures long-term profitability</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-ice-100 p-2 rounded-md">
                  <Target className="h-5 w-5 text-ice-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Minimal Competition</h4>
                  <p className="text-muted-foreground">Unique market opportunity with first-mover advantage in AI emergency monitoring</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Roadmap & Expansion Plans</h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Calendar className="h-6 w-6 text-ice-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Q2 2025</h4>
                  <p className="text-muted-foreground">New platform development, product expansion, and marketing push</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Calendar className="h-6 w-6 text-ice-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Q3 2025</h4>
                  <p className="text-muted-foreground">Expansion into healthcare & commercial partnerships</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Calendar className="h-6 w-6 text-ice-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Q4 2025</h4>
                  <p className="text-muted-foreground">Entry into UK & international pilot programs</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Calendar className="h-6 w-6 text-ice-600" />
                </div>
                <div>
                  <h4 className="font-semibold">2026+</h4>
                  <p className="text-muted-foreground">Scaling to 50,000+ active users globally</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentOpportunity;
