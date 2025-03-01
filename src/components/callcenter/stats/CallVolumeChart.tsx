
import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { PhoneCall } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { DailyCallData } from "./types";

interface CallVolumeChartProps {
  labels: string[];
  data: number[];
}

const CallVolumeChart: React.FC<CallVolumeChartProps> = ({ labels, data }) => {
  // Transform the data for the chart
  const chartData: DailyCallData[] = labels.map((label, index) => ({
    name: label,
    calls: data[index],
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <PhoneCall className="h-5 w-5" />
          Weekly Call Volume
        </CardTitle>
        <CardDescription>
          Total calls per day over the past week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="calls" fill="rgba(24, 144, 255, 0.6)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CallVolumeChart;
