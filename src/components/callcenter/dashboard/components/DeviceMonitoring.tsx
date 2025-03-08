
import React from "react";
import { BarChart3, AlertTriangle, Phone } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const DeviceMonitoring: React.FC = () => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-500" />
            <CardTitle className="text-lg">Device Monitoring</CardTitle>
          </div>
          <Button variant="outline" size="sm">View All Devices</Button>
        </div>
        <CardDescription>
          Recent device alerts from monitored clients
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-muted-foreground border-b">
                <th className="pb-2 text-left font-medium">Client</th>
                <th className="pb-2 text-left font-medium">Device</th>
                <th className="pb-2 text-left font-medium">Status</th>
                <th className="pb-2 text-left font-medium">Last Signal</th>
                <th className="pb-2 text-left font-medium">Battery</th>
                <th className="pb-2 text-left font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-100">
                <td className="py-3 font-medium">Maria García</td>
                <td className="py-3">SOS Pendant</td>
                <td className="py-3">
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </td>
                <td className="py-3">10 min ago</td>
                <td className="py-3">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </td>
                <td className="py-3">
                  <Button size="sm" variant="outline">Details</Button>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 font-medium">John Stevenson</td>
                <td className="py-3">Medical Dispenser</td>
                <td className="py-3">
                  <Badge className="bg-amber-100 text-amber-800">Warning</Badge>
                </td>
                <td className="py-3">1 hour ago</td>
                <td className="py-3">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </td>
                <td className="py-3">
                  <Button size="sm">Contact</Button>
                </td>
              </tr>
              <tr>
                <td className="py-3 font-medium">Sarah Williams</td>
                <td className="py-3">Health Wristband</td>
                <td className="py-3">
                  <Badge className="bg-red-100 text-red-800">Alert</Badge>
                </td>
                <td className="py-3">15 min ago</td>
                <td className="py-3">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </td>
                <td className="py-3">
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
