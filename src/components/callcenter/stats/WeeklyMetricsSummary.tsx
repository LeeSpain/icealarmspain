
import React from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  PhoneCall
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { WeeklyMetricsData } from "./types";

interface WeeklyMetricsSummaryProps {
  data: WeeklyMetricsData;
}

const WeeklyMetricsSummary: React.FC<WeeklyMetricsSummaryProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Weekly Performance Metrics
        </CardTitle>
        <CardDescription>
          Summary of key performance indicators
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted rounded-md p-4 text-center">
            <PhoneCall className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="text-xl font-bold">{data.totalCalls}</h3>
            <p className="text-sm text-muted-foreground">Total Calls</p>
          </div>
          
          <div className="bg-muted rounded-md p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-amber-500" />
            <h3 className="text-xl font-bold">{data.avgDuration}</h3>
            <p className="text-sm text-muted-foreground">Avg. Call Duration</p>
          </div>
          
          <div className="bg-muted rounded-md p-4 text-center">
            <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h3 className="text-xl font-bold">{data.resolvedFirstContact}</h3>
            <p className="text-sm text-muted-foreground">First Contact Resolution</p>
          </div>
          
          <div className="bg-muted rounded-md p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <h3 className="text-xl font-bold">{data.customerSatisfaction}</h3>
            <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-muted/50 rounded-md">
          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Weekly Insights
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
              <span>Call volume decreased by 5% compared to last week.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
              <span>Average response time improved by 16%.</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 text-amber-500" />
              <span>Tuesday continues to be the highest volume day.</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyMetricsSummary;
