
import React from "react";
import { BarChart3 } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const DeviceMonitoring: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Device Monitoring
        </CardTitle>
        <CardDescription>
          Recent device alerts from monitored clients
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Signal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Battery</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Maria García</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">SOS Pendant</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">10 min ago</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">92%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button size="sm" variant="outline">Details</Button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">John Stevenson</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Medical Dispenser</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Badge className="bg-amber-100 text-amber-800">Warning</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">1 hour ago</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">45%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button size="sm">Contact</Button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Sarah Williams</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Health Wristband</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Badge className="bg-red-100 text-red-800">Alert</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">15 min ago</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">78%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Button size="sm" className="bg-red-600 hover:bg-red-700">
                    <Phone className="mr-2 h-3 w-3" />
                    Call Now
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceMonitoring;
