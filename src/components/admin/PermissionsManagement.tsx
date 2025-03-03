
import React, { useState, useEffect } from "react";
import { Lock, Search, CheckCircle, XCircle, Plus, Settings, Filter } from "lucide-react";
import { toast } from "react-toastify";
import { useLanguage } from "@/context/LanguageContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  roles: string[];
}

interface Role {
  id: string;
  name: string;
}

// Initial mock data
const initialCategories = [
  "Users & Clients",
  "Devices",
  "Call Center",
  "Operations",
  "System",
  "Reports",
  "Billing"
];

const initialRoles: Role[] = [
  { id: "1", name: "Administrator" },
  { id: "2", name: "Call Center Agent" },
  { id: "3", name: "Device Manager" },
  { id: "4", name: "Support Specialist" }
];

const initialPermissions: Permission[] = [
  {
    id: "1",
    name: "users.view",
    description: "View users and their details",
    category: "Users & Clients",
    roles: ["1", "2"] // Administrator, Call Center Agent
  },
  {
    id: "2",
    name: "users.manage",
    description: "Create, edit and delete users",
    category: "Users & Clients",
    roles: ["1"] // Administrator only
  },
  {
    id: "3",
    name: "devices.view",
    description: "View device information",
    category: "Devices",
    roles: ["1", "2", "3"] // Administrator, Call Center Agent, Device Manager
  },
  {
    id: "4",
    name: "devices.manage",
    description: "Add, edit and delete devices",
    category: "Devices",
    roles: ["1", "3"] // Administrator, Device Manager
  },
  {
    id: "5",
    name: "callcenter.manage",
    description: "Manage call center operations",
    category: "Call Center",
    roles: ["1", "2"] // Administrator, Call Center Agent
  },
  {
    id: "6",
    name: "reports.view",
    description: "View reports and analytics",
    category: "Reports",
    roles: ["1", "3"] // Administrator, Device Manager
  },
  {
    id: "7",
    name: "system.settings",
    description: "Manage system settings",
    category: "System",
    roles: ["1"] // Administrator only
  },
  {
    id: "8",
    name: "billing.manage",
    description: "Manage billing and invoices",
    category: "Billing",
    roles: ["1"] // Administrator only
  }
];

const PermissionsManagement: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPermissions, setFilteredPermissions] = useState<Permission[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [currentPermission, setCurrentPermission] = useState<Permission | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: ""
  });
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const { t } = useLanguage();

  useEffect(() => {
    // Simulate loading data from API
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setPermissions(initialPermissions);
        setRoles(initialRoles);
      } catch (error) {
        console.error("Error fetching permissions:", error);
        toast.error(t("adminDashboard.errorLoadingPermissions"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [t]);

  useEffect(() => {
    // Filter permissions based on search query, category, and role
    let filtered = permissions;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(permission => 
        permission.name.toLowerCase().includes(query) || 
        permission.description.toLowerCase().includes(query)
      );
    }
    
    if (categoryFilter !== "all") {
      filtered = filtered.filter(permission => permission.category === categoryFilter);
    }
    
    if (roleFilter !== "all") {
      filtered = filtered.filter(permission => permission.roles.includes(roleFilter));
    }
    
    setFilteredPermissions(filtered);
  }, [searchQuery, permissions, categoryFilter, roleFilter]);

  const handleCreatePermission = () => {
    setFormData({
      name: "",
      description: "",
      category: initialCategories[0]
    });
    setIsCreateDialogOpen(true);
  };

  const handleAssignRoles = (permission: Permission) => {
    setCurrentPermission(permission);
    setSelectedRoles(permission.roles);
    setIsAssignDialogOpen(true);
  };

  const submitCreatePermission = () => {
    if (!formData.name || !formData.description || !formData.category) {
      toast.error(t("adminDashboard.fillRequiredFields"));
      return;
    }

    const newPermission: Permission = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      roles: []
    };

    setPermissions([...permissions, newPermission]);
    setIsCreateDialogOpen(false);
    toast.success(t("adminDashboard.permissionCreatedSuccess"));
  };

  const submitAssignRoles = () => {
    if (!currentPermission) return;

    const updatedPermissions = permissions.map(permission => {
      if (permission.id === currentPermission.id) {
        return {
          ...permission,
          roles: selectedRoles
        };
      }
      return permission;
    });

    setPermissions(updatedPermissions);
    setIsAssignDialogOpen(false);
    toast.success(t("adminDashboard.rolesAssignedSuccess"));
  };

  const toggleRole = (roleId: string) => {
    setSelectedRoles(prevRoles => {
      if (prevRoles.includes(roleId)) {
        return prevRoles.filter(id => id !== roleId);
      } else {
        return [...prevRoles, roleId];
      }
    });
  };

  const getRoleNameById = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.name : "Unknown";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ice-800">
            {t("adminDashboard.permissionsManagement")}
          </h2>
          <p className="text-muted-foreground">
            {t("adminDashboard.permissionsManagementDescription")}
          </p>
        </div>
        <Button onClick={handleCreatePermission} className="flex items-center gap-2">
          <Plus size={16} />
          {t("adminDashboard.addPermission")}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("adminDashboard.filters")}</CardTitle>
          <CardDescription>{t("adminDashboard.filtersDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label>{t("adminDashboard.search")}</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("adminDashboard.searchPermissions")}
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label>{t("adminDashboard.category")}</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder={t("adminDashboard.selectCategory")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("adminDashboard.allCategories")}</SelectItem>
                  {initialCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t("adminDashboard.role")}</Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder={t("adminDashboard.selectRole")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("adminDashboard.allRoles")}</SelectItem>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-md shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("adminDashboard.permissionName")}</TableHead>
                <TableHead>{t("adminDashboard.description")}</TableHead>
                <TableHead>{t("adminDashboard.category")}</TableHead>
                <TableHead>{t("adminDashboard.assignedRoles")}</TableHead>
                <TableHead className="text-right">{t("adminDashboard.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPermissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    {t("adminDashboard.noPermissionsFound")}
                  </TableCell>
                </TableRow>
              ) : (
                filteredPermissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Lock size={16} className="text-ice-600" />
                        {permission.name}
                      </div>
                    </TableCell>
                    <TableCell>{permission.description}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {permission.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {permission.roles.map(roleId => (
                          <Badge key={roleId} variant="secondary" className="bg-blue-100 text-blue-800">
                            {getRoleNameById(roleId)}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleAssignRoles(permission)}
                      >
                        <Settings size={16} className="mr-1" />
                        {t("adminDashboard.manageRoles")}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create Permission Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {t("adminDashboard.addNewPermission")}
            </DialogTitle>
            <DialogDescription>
              {t("adminDashboard.createPermissionDescription")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {t("adminDashboard.permissionName")}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                {t("adminDashboard.description")}
              </Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                {t("adminDashboard.category")}
              </Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t("adminDashboard.selectCategory")} />
                </SelectTrigger>
                <SelectContent>
                  {initialCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              {t("adminDashboard.cancel")}
            </Button>
            <Button onClick={submitCreatePermission}>
              {t("adminDashboard.createPermission")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Roles Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {t("adminDashboard.assignRoles")}
            </DialogTitle>
            <DialogDescription>
              {currentPermission && (
                t("adminDashboard.assignRolesDescription", { permissionName: currentPermission.name })
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              {roles.map(role => (
                <div key={role.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-ice-600" />
                    <span>{role.name}</span>
                  </div>
                  <Switch
                    checked={selectedRoles.includes(role.id)}
                    onCheckedChange={() => toggleRole(role.id)}
                  />
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              {t("adminDashboard.cancel")}
            </Button>
            <Button onClick={submitAssignRoles}>
              {t("adminDashboard.saveAssignments")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PermissionsManagement;
