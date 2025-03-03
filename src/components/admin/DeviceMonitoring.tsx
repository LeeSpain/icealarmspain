
import React, { useState, useEffect } from "react";
import { 
  Monitor, 
  Battery, 
  Signal, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Search,
  BarChart3,
  Settings
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'warning' | 'error';
  batteryLevel: number;
  signalStrength: number;
  lastPing: string;
  location: string;
  owner: string;
}

const initialDevices: Device[] = [
  {
    id: "1",
    name: "SOS Pendant #1234",
    type: "SOS Pendant",
    status: "online",
    batteryLevel: 85,
    signalStrength: 90,
    lastPing: "2024-03-03T16:30:00Z",
    location: "Madrid, Spain",
    owner: "Maria García"
  },
  {
    id: "2",
    name: "Medical Dispenser #5678",
    type: "Medical Dispenser",
    status: "warning",
    batteryLevel: 15,
    signalStrength: 75,
    lastPing: "2024-03-03T16:25:00Z",
    location: "Barcelona, Spain",
    owner: "Juan Pérez"
  },
  {
    id: "3",
    name: "Health Monitor #9012",
    type: "Health Monitor",
    status: "error",
    batteryLevel: 45,
    signalStrength: 30,
    lastPing: "2024-03-03T15:45:00Z",
    location: "Valencia, Spain",
    owner: "Ana Martínez"
  },
  {
    id: "4",
    name: "SOS Pendant #3456",
    type: "SOS Pendant",
    status: "offline",
    batteryLevel: 0,
    signalStrength: 0,
    lastPing: "2024-03-02T10:15:00Z",
    location: "Seville, Spain",
    owner: "Carlos Ruiz"
  }
];

const DeviceMonitoring: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const { t } = useLanguage();

  useEffect(() => {
    // Simulate loading data from API
    const fetchDevices = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDevices(initialDevices);
        setFilteredDevices(initialDevices);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevices();
  }, []);

  useEffect(() => {
    // Filter devices based on search query and filters
    let filtered = devices;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(device => 
        device.name.toLowerCase().includes(query) ||
        device.owner.toLowerCase().includes(query) ||
        device.location.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(device => device.status === statusFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(device => device.type === typeFilter);
    }

    setFilteredDevices(filtered);
  }, [searchQuery, statusFilter, typeFilter, devices]);

  const getStatusBadge = (status: Device['status']) => {
    const statusConfig = {
      online: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      offline: { color: "bg-gray-100 text-gray-800", icon: XCircle },
      warning: { color: "bg-yellow-100 text-yellow-800", icon: AlertTriangle },
      error: { color: "bg-red-100 text-red-800", icon: AlertTriangle }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon size={12} />
        {t(`adminDashboard.deviceStatus.${status}`)}
      </Badge>
    );
  };

  const getBatteryIndicator = (level: number) => {
    let color = "text-green-500";
    if (level <= 20) color = "text-red-500";
    else if (level <= 50) color = "text-yellow-500";

    return (
      <div className="flex items-center gap-1">
        <Battery className={color} size={16} />
        <span>{level}%</span>
      </div>
    );
  };

  const getSignalIndicator = (strength: number) => {
    let color = "text-green-500";
    if (strength <= 30) color = "text-red-500";
    else if (strength <= 70) color = "text-yellow-500";

    return (
      <div className="flex items-center gap-1">
        <Signal className={color} size={16} />
        <span>{strength}%</span>
      </div>
    );
  };

  // Calculate statistics
  const totalDevices = devices.length;
  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const warningDevices = devices.filter(d => d.status === 'warning').length;
  const errorDevices = devices.filter(d => d.status === 'error').length;
  const offlineDevices = devices.filter(d => d.status === 'offline').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ice-800">
            {t("adminDashboard.deviceMonitoring")}
          </h2>
          <p className="text-muted-foreground">
            {t("adminDashboard.deviceMonitoringDescription")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            {t("adminDashboard.viewReports")}
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            {t("adminDashboard.settings")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <Monitor className="h-8 w-8 mx-auto mb-2 text-ice-600" />
              <div className="text-2xl font-bold">{totalDevices}</div>
              <p className="text-sm text-muted-foreground">{t("adminDashboard.totalDevices")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{onlineDevices}</div>
              <p className="text-sm text-muted-foreground">{t("adminDashboard.onlineDevices")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{warningDevices}</div>
              <p className="text-sm text-muted-foreground">{t("adminDashboard.warningDevices")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">{errorDevices}</div>
              <p className="text-sm text-muted-foreground">{t("adminDashboard.errorDevices")}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="text-center">
              <XCircle className="h-8 w-8 mx-auto mb-2 text-gray-500" />
              <div className="text-2xl font-bold">{offlineDevices}</div>
              <p className="text-sm text-muted-foreground">{t("adminDashboard.offlineDevices")}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("adminDashboard.deviceList")}</CardTitle>
          <CardDescription>{t("adminDashboard.deviceListDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("adminDashboard.searchDevices")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("adminDashboard.filterByStatus")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("adminDashboard.allStatuses")}</SelectItem>
                  <SelectItem value="online">{t("adminDashboard.deviceStatus.online")}</SelectItem>
                  <SelectItem value="offline">{t("adminDashboard.deviceStatus.offline")}</SelectItem>
                  <SelectItem value="warning">{t("adminDashboard.deviceStatus.warning")}</SelectItem>
                  <SelectItem value="error">{t("adminDashboard.deviceStatus.error")}</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("adminDashboard.filterByType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("adminDashboard.allTypes")}</SelectItem>
                  <SelectItem value="SOS Pendant">{t("adminDashboard.deviceTypes.sosPendant")}</SelectItem>
                  <SelectItem value="Medical Dispenser">{t("adminDashboard.deviceTypes.medicalDispenser")}</SelectItem>
                  <SelectItem value="Health Monitor">{t("adminDashboard.deviceTypes.healthMonitor")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("adminDashboard.deviceName")}</TableHead>
                  <TableHead>{t("adminDashboard.owner")}</TableHead>
                  <TableHead>{t("adminDashboard.status")}</TableHead>
                  <TableHead>{t("adminDashboard.battery")}</TableHead>
                  <TableHead>{t("adminDashboard.signal")}</TableHead>
                  <TableHead>{t("adminDashboard.lastPing")}</TableHead>
                  <TableHead>{t("adminDashboard.location")}</TableHead>
                  <TableHead className="text-right">{t("adminDashboard.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDevices.map((device) => (
                  <TableRow key={device.id}>
                    <TableCell>
                      <div className="font-medium">{device.name}</div>
                      <div className="text-sm text-muted-foreground">{device.type}</div>
                    </TableCell>
                    <TableCell>{device.owner}</TableCell>
                    <TableCell>{getStatusBadge(device.status)}</TableCell>
                    <TableCell>{getBatteryIndicator(device.batteryLevel)}</TableCell>
                    <TableCell>{getSignalIndicator(device.signalStrength)}</TableCell>
                    <TableCell>
                      {new Date(device.lastPing).toLocaleString()}
                    </TableCell>
                    <TableCell>{device.location}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        {t("adminDashboard.viewDetails")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeviceMonitoring;
