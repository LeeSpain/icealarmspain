
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLanguage } from "@/context/LanguageContext";
import { LockKeyhole, Plus, Edit, Trash2, CheckCircle2, XCircle, Shield, Eye, Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  roles: string[];
  isSystemDefault: boolean;
}

interface Role {
  id: string;
  name: string;
}

interface PermissionsManagementProps {
  onAction?: (action: string) => void;
}

const PermissionsManagement: React.FC<PermissionsManagementProps> = ({ onAction }) => {
  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "perm-1",
      name: "users.view",
      description: "Can view user information",
      category: "User Management",
      roles: ["admin", "callcenter"],
      isSystemDefault: true
    },
    {
      id: "perm-2",
      name: "users.create",
      description: "Can create new users",
      category: "User Management",
      roles: ["admin"],
      isSystemDefault: true
    },
    {
      id: "perm-3",
      name: "users.edit",
      description: "Can edit user information",
      category: "User Management",
      roles: ["admin"],
      isSystemDefault: true
    },
    {
      id: "perm-4",
      name: "users.delete",
      description: "Can delete users",
      category: "User Management",
      roles: ["admin"],
      isSystemDefault: true
    },
    {
      id: "perm-5",
      name: "roles.manage",
      description: "Can manage roles and permissions",
      category: "Role Management",
      roles: ["admin"],
      isSystemDefault: true
    },
    {
      id: "perm-6",
      name: "devices.view",
      description: "Can view device information",
      category: "Device Management",
      roles: ["admin", "callcenter"],
      isSystemDefault: true
    },
    {
      id: "perm-7",
      name: "devices.manage",
      description: "Can manage devices",
      category: "Device Management",
      roles: ["admin"],
      isSystemDefault: true
    },
    {
      id: "perm-8",
      name: "clients.view",
      description: "Can view client information",
      category: "Client Management",
      roles: ["admin", "callcenter"],
      isSystemDefault: true
    },
    {
      id: "perm-9",
      name: "clients.manage",
      description: "Can manage client accounts",
      category: "Client Management",
      roles: ["admin"],
      isSystemDefault: true
    },
    {
      id: "perm-10",
      name: "alerts.view",
      description: "Can view alert histories",
      category: "Alerts",
      roles: ["admin", "callcenter"],
      isSystemDefault: true
    },
    {
      id: "perm-11",
      name: "alerts.manage",
      description: "Can manage and respond to alerts",
      category: "Alerts",
      roles: ["admin", "callcenter"],
      isSystemDefault: true
    },
    {
      id: "perm-12",
      name: "reports.view",
      description: "Can view system reports",
      category: "Reporting",
      roles: ["admin"],
      isSystemDefault: true
    }
  ]);
  
  const [roles, setRoles] = useState<Role[]>([
    { id: "role-1", name: "admin" },
    { id: "role-2", name: "callcenter" },
    { id: "role-3", name: "member" }
  ]);
  
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRoleAssignmentDialogOpen, setIsRoleAssignmentDialogOpen] = useState(false);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
  });
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const { language } = useLanguage();
  
  // Translation helper
  const t = (key: string, fallback: string): string => {
    // Simple implementation - in a real app you'd use a proper i18n solution
    if (language === 'es') {
      const translations: Record<string, string> = {
        "Permissions Management": "Gestión de Permisos",
        "Manage system permissions and role assignments": "Gestionar permisos del sistema y asignaciones de roles",
        "Add Permission": "Añadir Permiso",
        "Search permissions...": "Buscar permisos...",
        "All": "Todos",
        "User Management": "Gestión de Usuarios",
        "Role Management": "Gestión de Roles",
        "Device Management": "Gestión de Dispositivos",
        "Client Management": "Gestión de Clientes",
        "Alerts": "Alertas",
        "Reporting": "Informes",
        "Permission": "Permiso",
        "Description": "Descripción",
        "Category": "Categoría",
        "Roles": "Roles",
        "Actions": "Acciones",
        "Assign Roles": "Asignar Roles",
        "Edit": "Editar",
        "Delete": "Eliminar",
        "No permissions found": "No se encontraron permisos",
        "Create Permission": "Crear Permiso",
        "Add a new permission to the system": "Añadir un nuevo permiso al sistema",
        "Permission Name": "Nombre del Permiso",
        "Use dot notation (e.g., resource.action)": "Use notación con puntos (ej., recurso.acción)",
        "Permission Description": "Descripción del Permiso",
        "Describe what this permission allows": "Describa qué permite este permiso",
        "Permission Category": "Categoría del Permiso",
        "Cancel": "Cancelar",
        "Create": "Crear",
        "Are you sure?": "¿Está seguro?",
        "This will permanently delete the permission. This action cannot be undone.": "Esto eliminará permanentemente el permiso. Esta acción no se puede deshacer.",
        "Edit Permission": "Editar Permiso",
        "Update permission information": "Actualizar información del permiso",
        "Update": "Actualizar",
        "Select Roles": "Seleccionar Roles",
        "Assign roles to this permission": "Asignar roles a este permiso",
        "System Default": "Predeterminado del Sistema",
        "This is a system-default permission and cannot be modified": "Este es un permiso predeterminado del sistema y no puede ser modificado"
      };
      return translations[fallback] || fallback;
    }
    return fallback;
  };
  
  useEffect(() => {
    // Simulate loading data from API
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const getFilteredPermissions = () => {
    let filtered = [...permissions];
    
    if (searchQuery) {
      filtered = filtered.filter(permission => 
        permission.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        permission.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeTab !== "all") {
      filtered = filtered.filter(permission => permission.category === activeTab);
    }
    
    return filtered;
  };
  
  const openCreateDialog = () => {
    setFormData({
      name: "",
      description: "",
      category: "User Management",
    });
    setSelectedRoles([]);
    setIsCreateDialogOpen(true);
  };
  
  const openEditDialog = (permission: Permission) => {
    setSelectedPermission(permission);
    setFormData({
      name: permission.name,
      description: permission.description,
      category: permission.category,
    });
    setIsEditDialogOpen(true);
  };
  
  const openDeleteDialog = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsDeleteDialogOpen(true);
  };
  
  const openRoleAssignmentDialog = (permission: Permission) => {
    setSelectedPermission(permission);
    setSelectedRoles([...permission.roles]);
    setIsRoleAssignmentDialogOpen(true);
  };
  
  const handleCreatePermission = () => {
    if (!formData.name || !formData.description || !formData.category) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const newPermission: Permission = {
      id: `perm-${permissions.length + 1}`,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      roles: selectedRoles,
      isSystemDefault: false
    };
    
    setPermissions([...permissions, newPermission]);
    setIsCreateDialogOpen(false);
    
    if (onAction) {
      onAction(`Created permission: ${formData.name}`);
    }
    
    toast.success("Permission created successfully");
  };
  
  const handleEditPermission = () => {
    if (!selectedPermission || !formData.name || !formData.description || !formData.category) {
      toast.error("Please fill all required fields");
      return;
    }
    
    const updatedPermissions = permissions.map(permission => {
      if (permission.id === selectedPermission.id) {
        return {
          ...permission,
          name: formData.name,
          description: formData.description,
          category: formData.category
        };
      }
      return permission;
    });
    
    setPermissions(updatedPermissions);
    setIsEditDialogOpen(false);
    
    if (onAction) {
      onAction(`Updated permission: ${formData.name}`);
    }
    
    toast.success("Permission updated successfully");
  };
  
  const handleDeletePermission = () => {
    if (!selectedPermission) return;
    
    if (selectedPermission.isSystemDefault) {
      toast.error("Cannot delete system default permissions");
      setIsDeleteDialogOpen(false);
      return;
    }
    
    const updatedPermissions = permissions.filter(
      permission => permission.id !== selectedPermission.id
    );
    
    setPermissions(updatedPermissions);
    setIsDeleteDialogOpen(false);
    
    if (onAction) {
      onAction(`Deleted permission: ${selectedPermission.name}`);
    }
    
    toast.success("Permission deleted successfully");
  };
  
  const handleRoleAssignment = () => {
    if (!selectedPermission) return;
    
    const updatedPermissions = permissions.map(permission => {
      if (permission.id === selectedPermission.id) {
        return {
          ...permission,
          roles: selectedRoles
        };
      }
      return permission;
    });
    
    setPermissions(updatedPermissions);
    setIsRoleAssignmentDialogOpen(false);
    
    if (onAction) {
      onAction(`Updated roles for permission: ${selectedPermission.name}`);
    }
    
    toast.success("Roles assigned successfully");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ice-800">
            {t("Permissions Management", "Permissions Management")}
          </h2>
          <p className="text-muted-foreground">
            {t("Manage system permissions and role assignments", "Manage system permissions and role assignments")}
          </p>
        </div>
        <Button onClick={openCreateDialog} className="flex items-center gap-2">
          <Plus size={16} />
          {t("Add Permission", "Add Permission")}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <Input
            placeholder={t("Search permissions...", "Search permissions...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-7">
            <TabsTrigger value="all">{t("All", "All")}</TabsTrigger>
            <TabsTrigger value="User Management">{t("User Management", "User")}</TabsTrigger>
            <TabsTrigger value="Role Management">{t("Role Management", "Role")}</TabsTrigger>
            <TabsTrigger value="Device Management">{t("Device Management", "Device")}</TabsTrigger>
            <TabsTrigger value="Client Management">{t("Client Management", "Client")}</TabsTrigger>
            <TabsTrigger value="Alerts">{t("Alerts", "Alerts")}</TabsTrigger>
            <TabsTrigger value="Reporting">{t("Reporting", "Reports")}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-md shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("Permission", "Permission")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("Description", "Description")}</TableHead>
                <TableHead>{t("Category", "Category")}</TableHead>
                <TableHead>{t("Roles", "Roles")}</TableHead>
                <TableHead className="text-right">{t("Actions", "Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getFilteredPermissions().length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    {t("No permissions found", "No permissions found")}
                  </TableCell>
                </TableRow>
              ) : (
                getFilteredPermissions().map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <LockKeyhole className="w-4 h-4 text-ice-600" />
                        <div>
                          <div className="font-mono text-sm">{permission.name}</div>
                          {permission.isSystemDefault && (
                            <Badge variant="outline" className="mt-1 text-xs">
                              {t("System Default", "System Default")}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {permission.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {permission.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {permission.roles.map(role => (
                          <Badge key={role} className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                            {role}
                          </Badge>
                        ))}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-xs"
                          onClick={() => openRoleAssignmentDialog(permission)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          {permission.roles.length === 0 ? t("Assign", "Assign") : t("Edit", "Edit")}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openEditDialog(permission)}
                          disabled={permission.isSystemDefault}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          {t("Edit", "Edit")}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => openDeleteDialog(permission)}
                          disabled={permission.isSystemDefault}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          {t("Delete", "Delete")}
                        </Button>
                      </div>
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
              {t("Create Permission", "Create Permission")}
            </DialogTitle>
            <DialogDescription>
              {t("Add a new permission to the system", "Add a new permission to the system")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">
                {t("Permission Name", "Permission Name")}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="resource.action"
              />
              <p className="text-xs text-muted-foreground">
                {t("Use dot notation (e.g., resource.action)", "Use dot notation (e.g., resource.action)")}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">
                {t("Permission Description", "Permission Description")}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what this permission allows"
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                {t("Describe what this permission allows", "Describe what this permission allows")}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">
                {t("Permission Category", "Permission Category")}
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="User Management">User Management</SelectItem>
                  <SelectItem value="Role Management">Role Management</SelectItem>
                  <SelectItem value="Device Management">Device Management</SelectItem>
                  <SelectItem value="Client Management">Client Management</SelectItem>
                  <SelectItem value="Alerts">Alerts</SelectItem>
                  <SelectItem value="Reporting">Reporting</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>
                {t("Assign Roles", "Assign Roles")}
              </Label>
              <div className="grid grid-cols-1 gap-2">
                {roles.map(role => (
                  <div key={role.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`role-${role.id}`}
                      checked={selectedRoles.includes(role.name)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedRoles([...selectedRoles, role.name]);
                        } else {
                          setSelectedRoles(selectedRoles.filter(r => r !== role.name));
                        }
                      }}
                    />
                    <Label htmlFor={`role-${role.id}`} className="flex items-center space-x-1">
                      <Shield className="w-4 h-4" />
                      <span>{role.name}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              {t("Cancel", "Cancel")}
            </Button>
            <Button onClick={handleCreatePermission}>
              {t("Create", "Create")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Permission Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {t("Edit Permission", "Edit Permission")}
            </DialogTitle>
            <DialogDescription>
              {t("Update permission information", "Update permission information")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">
                {t("Permission Name", "Permission Name")}
              </Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="resource.action"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">
                {t("Permission Description", "Permission Description")}
              </Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe what this permission allows"
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-category">
                {t("Permission Category", "Permission Category")}
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="edit-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="User Management">User Management</SelectItem>
                  <SelectItem value="Role Management">Role Management</SelectItem>
                  <SelectItem value="Device Management">Device Management</SelectItem>
                  <SelectItem value="Client Management">Client Management</SelectItem>
                  <SelectItem value="Alerts">Alerts</SelectItem>
                  <SelectItem value="Reporting">Reporting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t("Cancel", "Cancel")}
            </Button>
            <Button onClick={handleEditPermission}>
              {t("Update", "Update")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Role Assignment Dialog */}
      <Dialog open={isRoleAssignmentDialogOpen} onOpenChange={setIsRoleAssignmentDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>
              {t("Select Roles", "Select Roles")}
            </DialogTitle>
            <DialogDescription>
              {t("Assign roles to this permission", "Assign roles to this permission")}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid grid-cols-1 gap-2">
              {roles.map(role => (
                <div key={role.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`assign-role-${role.id}`}
                    checked={selectedRoles.includes(role.name)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRoles([...selectedRoles, role.name]);
                      } else {
                        setSelectedRoles(selectedRoles.filter(r => r !== role.name));
                      }
                    }}
                  />
                  <Label htmlFor={`assign-role-${role.id}`} className="flex items-center space-x-1">
                    <Shield className="w-4 h-4" />
                    <span>{role.name}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRoleAssignmentDialogOpen(false)}>
              {t("Cancel", "Cancel")}
            </Button>
            <Button onClick={handleRoleAssignment}>
              {t("Save", "Save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Permission Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("Are you sure?", "Are you sure?")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("This will permanently delete the permission. This action cannot be undone.", 
                `This will permanently delete the permission "${selectedPermission?.name}". This action cannot be undone.`)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t("Cancel", "Cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePermission} className="bg-red-600">
              {t("Delete", "Delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {selectedPermission?.isSystemDefault && (
        <AlertDialog 
          open={isEditDialogOpen || isDeleteDialogOpen} 
          onOpenChange={() => {
            setIsEditDialogOpen(false);
            setIsDeleteDialogOpen(false);
          }}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t("System Default Permission", "System Default Permission")}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {t("This is a system-default permission and cannot be modified", 
                  "This is a system-default permission and cannot be modified")}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>
                {t("Understood", "Understood")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default PermissionsManagement;
