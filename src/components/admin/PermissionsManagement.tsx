
import React, { useState, useEffect } from "react";
import { Lock, Search, Plus, Settings, Filter, Shield } from "lucide-react";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

// Permission interface definition
interface Permission {
  id: string;
  name: string;
  key: string;
  group: string;
  createdAt: string;
}

interface Role {
  id: string;
  name: string;
}

// Initial mock data for permissions
const initialPermissions: Permission[] = [
  {
    id: "1",
    name: "View Users",
    key: "users:view",
    group: "Users",
    createdAt: "2023-01-10",
  },
  {
    id: "2",
    name: "Create Users",
    key: "users:create",
    group: "Users",
    createdAt: "2023-01-10",
  },
  {
    id: "3",
    name: "Edit Users",
    key: "users:edit",
    group: "Users",
    createdAt: "2023-01-10",
  },
  {
    id: "4",
    name: "Delete Users",
    key: "users:delete",
    group: "Users",
    createdAt: "2023-01-10",
  },
  {
    id: "5",
    name: "View Devices",
    key: "devices:view",
    group: "Devices",
    createdAt: "2023-01-15",
  },
  {
    id: "6",
    name: "Edit Devices",
    key: "devices:edit",
    group: "Devices",
    createdAt: "2023-01-15",
  },
  {
    id: "7",
    name: "View Roles",
    key: "roles:view",
    group: "Roles",
    createdAt: "2023-01-20",
  },
  {
    id: "8",
    name: "Edit Roles",
    key: "roles:edit",
    group: "Roles",
    createdAt: "2023-01-20",
  },
  {
    id: "9",
    name: "View Reports",
    key: "reports:view",
    group: "Reports",
    createdAt: "2023-01-25",
  },
  {
    id: "10",
    name: "Create Reports",
    key: "reports:create",
    group: "Reports",
    createdAt: "2023-01-25",
  },
];

// Initial mock data for roles
const initialRoles: Role[] = [
  { id: "1", name: "Super Admin" },
  { id: "2", name: "Admin" },
  { id: "3", name: "Support Manager" },
  { id: "4", name: "Support Agent" },
  { id: "5", name: "Inventory Manager" },
];

// Mock permissions-roles assignments
const initialPermissionRoles: Record<string, string[]> = {
  "1": ["1", "2", "3"],
  "2": ["1", "2"],
  "3": ["1", "2"],
  "4": ["1"],
  "5": ["1", "2", "3", "4", "5"],
  "6": ["1", "2", "5"],
  "7": ["1", "2"],
  "8": ["1"],
  "9": ["1", "2", "3"],
  "10": ["1", "2"],
};

const PermissionsManagement: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [filteredPermissions, setFilteredPermissions] = useState<Permission[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [filterGroup, setFilterGroup] = useState<string>("all");
  
  const [permissionRoles, setPermissionRoles] = useState<Record<string, string[]>>(initialPermissionRoles);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAssignRolesDialogOpen, setIsAssignRolesDialogOpen] = useState(false);
  const [currentPermission, setCurrentPermission] = useState<Permission | null>(null);
  const [newPermission, setNewPermission] = useState<Omit<Permission, 'id' | 'createdAt'>>({
    name: "",
    key: "",
    group: "Users",
  });
  
  const { t } = useLanguage();

  // Groups for permissions
  const permissionGroups = ["Users", "Devices", "Roles", "Reports", "Settings", "Other"];

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
        toast.error(t("error"));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [t]);

  useEffect(() => {
    // Filter permissions based on search query and group filter
    let filtered = permissions;
    
    if (searchQuery) {
      filtered = filtered.filter(permission => 
        permission.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        permission.key.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filterGroup !== "all") {
      filtered = filtered.filter(permission => permission.group === filterGroup);
    }
    
    setFilteredPermissions(filtered);
  }, [searchQuery, filterGroup, permissions]);

  const handleCreatePermission = () => {
    const permissionToAdd: Permission = {
      id: `${Date.now()}`,
      name: newPermission.name,
      key: newPermission.key,
      group: newPermission.group,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setPermissions([...permissions, permissionToAdd]);
    toast.success(t("adminDashboard.permissionCreated"));
    setIsCreateDialogOpen(false);
    resetNewPermissionForm();
  };

  const handleUpdatePermission = () => {
    if (!currentPermission) return;
    
    const updatedPermissions = permissions.map(permission => 
      permission.id === currentPermission.id ? currentPermission : permission
    );
    
    setPermissions(updatedPermissions);
    toast.success(t("adminDashboard.permissionUpdated"));
    setIsEditDialogOpen(false);
  };

  const handleDeletePermission = () => {
    if (!currentPermission) return;
    
    const updatedPermissions = permissions.filter(permission => permission.id !== currentPermission.id);
    const updatedPermissionRoles = { ...permissionRoles };
    delete updatedPermissionRoles[currentPermission.id];
    
    setPermissions(updatedPermissions);
    setPermissionRoles(updatedPermissionRoles);
    toast.success(t("adminDashboard.permissionDeleted"));
    setIsDeleteDialogOpen(false);
  };

  const handleAssignRoles = () => {
    if (!currentPermission) return;
    
    const updatedPermissionRoles = {
      ...permissionRoles,
      [currentPermission.id]: selectedRoles,
    };
    
    setPermissionRoles(updatedPermissionRoles);
    toast.success(t("adminDashboard.permissionAssigned"));
    setIsAssignRolesDialogOpen(false);
  };

  const openEditDialog = (permission: Permission) => {
    setCurrentPermission(permission);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (permission: Permission) => {
    setCurrentPermission(permission);
    setIsDeleteDialogOpen(true);
  };

  const openAssignRolesDialog = (permission: Permission) => {
    setCurrentPermission(permission);
    setSelectedRoles(permissionRoles[permission.id] || []);
    setIsAssignRolesDialogOpen(true);
  };

  const resetNewPermissionForm = () => {
    setNewPermission({
      name: "",
      key: "",
      group: "Users",
    });
  };

  const handleRoleCheckboxChange = (roleId: string) => {
    setSelectedRoles(prev => 
      prev.includes(roleId)
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t("adminDashboard.permissionsManagement")}</h2>
          <p className="text-muted-foreground">
            {t("adminDashboard.totalPermissions")}: {permissions.length}
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> {t("adminDashboard.createPermission")}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("adminDashboard.searchPermissions")}
            className="pl-8 w-full md:w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>{filterGroup === "all" ? t("filter") : filterGroup}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("adminDashboard.permissionGroup")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterGroup("all")}>All Groups</DropdownMenuItem>
              {permissionGroups.map(group => (
                <DropdownMenuItem key={group} onClick={() => setFilterGroup(group)}>
                  {group}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {loading ? (
        <Card>
          <CardContent className="py-10">
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              <p className="mt-4 text-muted-foreground">{t("loading")}</p>
            </div>
          </CardContent>
        </Card>
      ) : filteredPermissions.length === 0 ? (
        <Card>
          <CardContent className="py-10">
            <div className="flex flex-col items-center justify-center">
              <Lock className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">{t("adminDashboard.noPermissionsFound")}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-white rounded-md shadow-sm border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">{t("adminDashboard.permissionName")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("adminDashboard.permissionKey")}</TableHead>
                <TableHead className="hidden lg:table-cell">{t("adminDashboard.permissionGroup")}</TableHead>
                <TableHead className="hidden lg:table-cell">{t("adminDashboard.permissionCreatedAt")}</TableHead>
                <TableHead className="text-right">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPermissions.map((permission) => (
                <TableRow key={permission.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    {permission.name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-sm">
                    {permission.key}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant="outline">{permission.group}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{permission.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-8"
                        onClick={() => openAssignRolesDialog(permission)}
                      >
                        {t("adminDashboard.assignRoles")}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEditDialog(permission)}>
                            {t("edit")}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => openDeleteDialog(permission)}
                            className="text-red-600"
                          >
                            {t("delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create Permission Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("adminDashboard.createPermission")}</DialogTitle>
            <DialogDescription>
              {t("adminDashboard.createPermission")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium col-span-1">
                {t("adminDashboard.permissionName")}
              </label>
              <Input
                id="name"
                placeholder={t("adminDashboard.permissionNamePlaceholder")}
                className="col-span-3"
                value={newPermission.name}
                onChange={(e) => setNewPermission({...newPermission, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="key" className="text-right text-sm font-medium col-span-1">
                {t("adminDashboard.permissionKey")}
              </label>
              <Input
                id="key"
                placeholder={t("adminDashboard.permissionKeyPlaceholder")}
                className="col-span-3"
                value={newPermission.key}
                onChange={(e) => setNewPermission({...newPermission, key: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="group" className="text-right text-sm font-medium col-span-1">
                {t("adminDashboard.permissionGroup")}
              </label>
              <Select
                value={newPermission.group}
                onValueChange={(value) => setNewPermission({...newPermission, group: value})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent>
                  {permissionGroups.map(group => (
                    <SelectItem key={group} value={group}>{group}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>{t("cancel")}</Button>
            <Button onClick={handleCreatePermission}>{t("adminDashboard.savePermission")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Permission Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("adminDashboard.editPermission")}</DialogTitle>
            <DialogDescription>
              {t("adminDashboard.editPermission")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-name" className="text-right text-sm font-medium col-span-1">
                {t("adminDashboard.permissionName")}
              </label>
              <Input
                id="edit-name"
                placeholder={t("adminDashboard.permissionNamePlaceholder")}
                className="col-span-3"
                value={currentPermission?.name || ""}
                onChange={(e) => setCurrentPermission(currentPermission ? {...currentPermission, name: e.target.value} : null)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-key" className="text-right text-sm font-medium col-span-1">
                {t("adminDashboard.permissionKey")}
              </label>
              <Input
                id="edit-key"
                placeholder={t("adminDashboard.permissionKeyPlaceholder")}
                className="col-span-3"
                value={currentPermission?.key || ""}
                onChange={(e) => setCurrentPermission(currentPermission ? {...currentPermission, key: e.target.value} : null)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-group" className="text-right text-sm font-medium col-span-1">
                {t("adminDashboard.permissionGroup")}
              </label>
              <Select
                value={currentPermission?.group || ""}
                onValueChange={(value) => setCurrentPermission(currentPermission ? {...currentPermission, group: value} : null)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent>
                  {permissionGroups.map(group => (
                    <SelectItem key={group} value={group}>{group}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>{t("cancel")}</Button>
            <Button onClick={handleUpdatePermission}>{t("adminDashboard.savePermission")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Permission Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("adminDashboard.areYouSure")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("adminDashboard.deletePermissionWarning")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePermission} className="bg-red-600 hover:bg-red-700">
              {t("adminDashboard.deletePermission")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Assign Roles Dialog */}
      <Dialog open={isAssignRolesDialogOpen} onOpenChange={setIsAssignRolesDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {t("adminDashboard.assignRoles")}
            </DialogTitle>
            <DialogDescription>
              {currentPermission ? 
                t("adminDashboard.assignRolesDescription") :
                ""
              }
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              {roles.map(role => (
                <div key={role.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`role-${role.id}`} 
                    checked={selectedRoles.includes(role.id)}
                    onCheckedChange={() => handleRoleCheckboxChange(role.id)}
                  />
                  <label 
                    htmlFor={`role-${role.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {role.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignRolesDialogOpen(false)}>{t("cancel")}</Button>
            <Button onClick={handleAssignRoles}>{t("save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PermissionsManagement;
