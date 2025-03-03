
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLanguage } from "@/context/LanguageContext";
import { Shield, UserPlus, PlusCircle, Pencil, Trash2, CheckCircle2, XCircle, LockKeyhole } from "lucide-react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define role interface
interface Role {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  permissionCount: number;
  userCount: number;
  createdAt: string;
  updatedAt: string;
  isDefault?: boolean;
  isMutable?: boolean;
}

// Mock role data
const initialRoles: Role[] = [
  {
    id: "role-001",
    name: "Administrator",
    description: "Full system access with all permissions",
    status: "active",
    permissionCount: 32,
    userCount: 5,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-05-20T14:20:00Z",
    isDefault: true,
    isMutable: false
  },
  {
    id: "role-002",
    name: "Call Center Agent",
    description: "Access to customer support and call management features",
    status: "active",
    permissionCount: 12,
    userCount: 24,
    createdAt: "2023-01-16T11:30:00Z",
    updatedAt: "2023-06-12T09:45:00Z",
    isDefault: true,
    isMutable: true
  },
  {
    id: "role-003",
    name: "Sales Representative",
    description: "Access to sales and customer information",
    status: "active",
    permissionCount: 8,
    userCount: 15,
    createdAt: "2023-02-05T14:30:00Z",
    updatedAt: "2023-07-18T16:20:00Z",
    isMutable: true
  },
  {
    id: "role-004",
    name: "Technician",
    description: "Access to device management and technical support",
    status: "active",
    permissionCount: 10,
    userCount: 18,
    createdAt: "2023-03-10T09:15:00Z",
    updatedAt: "2023-08-22T11:10:00Z",
    isMutable: true
  },
  {
    id: "role-005",
    name: "Regional Manager",
    description: "Access to region-specific information and management",
    status: "active",
    permissionCount: 15,
    userCount: 8,
    createdAt: "2023-04-12T13:45:00Z",
    updatedAt: "2023-09-14T10:35:00Z",
    isMutable: true
  },
  {
    id: "role-006",
    name: "Billing Staff",
    description: "Access to billing and payment information",
    status: "inactive",
    permissionCount: 6,
    userCount: 0,
    createdAt: "2023-05-20T10:30:00Z",
    updatedAt: "2023-10-05T15:40:00Z",
    isMutable: true
  }
];

const RolesManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active" as 'active' | 'inactive',
  });
  const { language } = useLanguage();

  // Translation helpers
  const t = (key: string, fallback: string): string => {
    return language === 'en' ? fallback : getFallbackSpanish(key, fallback);
  };

  // Simple Spanish translations fallback
  const getFallbackSpanish = (key: string, fallback: string): string => {
    const spanishMap: Record<string, string> = {
      "Roles Management": "Gestión de Roles",
      "Manage system roles and their permissions": "Gestiona los roles del sistema y sus permisos",
      "Add Role": "Añadir Rol",
      "Search roles...": "Buscar roles...",
      "All": "Todos",
      "Active": "Activos",
      "Inactive": "Inactivos",
      "Role": "Rol",
      "Description": "Descripción",
      "Status": "Estado",
      "Users": "Usuarios",
      "Permissions": "Permisos",
      "Actions": "Acciones",
      "Edit": "Editar",
      "Delete": "Eliminar",
      "No roles found": "No se encontraron roles",
      "Create Role": "Crear Rol",
      "Add a new role to the system": "Añade un nuevo rol al sistema",
      "Role Name": "Nombre del Rol",
      "Role Description": "Descripción del Rol",
      "Describe the role's purpose and limitations": "Describe el propósito y las limitaciones del rol",
      "Enter role name": "Ingrese el nombre del rol",
      "Enter role description": "Ingrese la descripción del rol",
      "Cancel": "Cancelar",
      "Create": "Crear",
      "Are you sure?": "¿Está seguro?",
      "This will permanently delete the role. This action cannot be undone.": "Esto eliminará permanentemente el rol. Esta acción no se puede deshacer.",
      "Role created successfully": "Rol creado con éxito",
      "Role updated successfully": "Rol actualizado con éxito",
      "Role deleted successfully": "Rol eliminado con éxito",
      "Please fill all required fields": "Por favor complete todos los campos requeridos",
      "Edit Role": "Editar Rol",
      "Update role information": "Actualizar información del rol",
      "Update": "Actualizar",
      "View Permissions": "Ver Permisos",
      "Default": "Predeterminado"
    };
    
    return spanishMap[fallback] || fallback;
  };

  useEffect(() => {
    // Simulate loading data from API
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRoles(initialRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error(t("Failed to load roles", "Failed to load roles"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter roles based on search query and active tab
    let filtered = [...roles];
    
    if (searchQuery) {
      filtered = filtered.filter(role => 
        role.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        role.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (activeTab !== "all") {
      filtered = filtered.filter(role => role.status === activeTab);
    }
    
    setFilteredRoles(filtered);
  }, [searchQuery, roles, activeTab]);

  const handleCreateRole = () => {
    setFormData({
      name: "",
      description: "",
      status: "active",
    });
    setIsCreateDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setCurrentRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      status: role.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteRole = (role: Role) => {
    setCurrentRole(role);
    setIsDeleteDialogOpen(true);
  };

  const submitCreateRole = () => {
    if (!formData.name || !formData.description) {
      toast.error(t("Please fill all required fields", "Please fill all required fields"));
      return;
    }

    const newRole: Role = {
      id: `role-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      status: formData.status,
      permissionCount: 0,
      userCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isMutable: true
    };

    setRoles([...roles, newRole]);
    setIsCreateDialogOpen(false);
    toast.success(t("Role created successfully", "Role created successfully"));
  };

  const submitEditRole = () => {
    if (!currentRole || !formData.name || !formData.description) {
      toast.error(t("Please fill all required fields", "Please fill all required fields"));
      return;
    }

    const updatedRoles = roles.map(role => {
      if (role.id === currentRole.id) {
        return {
          ...role,
          name: formData.name,
          description: formData.description,
          status: formData.status,
          updatedAt: new Date().toISOString()
        };
      }
      return role;
    });

    setRoles(updatedRoles);
    setIsEditDialogOpen(false);
    toast.success(t("Role updated successfully", "Role updated successfully"));
  };

  const submitDeleteRole = () => {
    if (!currentRole) return;

    // Check if the role is deletable
    if (currentRole.isDefault) {
      toast.error(t("Cannot delete default role", "Cannot delete default role"));
      setIsDeleteDialogOpen(false);
      return;
    }

    const updatedRoles = roles.filter(role => role.id !== currentRole.id);
    setRoles(updatedRoles);
    setIsDeleteDialogOpen(false);
    toast.success(t("Role deleted successfully", "Role deleted successfully"));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ice-800">
            {t("Roles Management", "Roles Management")}
          </h2>
          <p className="text-muted-foreground">
            {t("Manage system roles and their permissions", "Manage system roles and their permissions")}
          </p>
        </div>
        <Button onClick={handleCreateRole} className="flex items-center gap-2">
          <UserPlus size={16} />
          {t("Add Role", "Add Role")}
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <Input
            placeholder={t("Search roles...", "Search roles...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">{t("All", "All")}</TabsTrigger>
            <TabsTrigger value="active">{t("Active", "Active")}</TabsTrigger>
            <TabsTrigger value="inactive">{t("Inactive", "Inactive")}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-16 w-full" />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-md shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("Role", "Role")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("Description", "Description")}</TableHead>
                <TableHead>{t("Status", "Status")}</TableHead>
                <TableHead className="text-center">{t("Users", "Users")}</TableHead>
                <TableHead className="text-center">{t("Permissions", "Permissions")}</TableHead>
                <TableHead className="text-right">{t("Actions", "Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    {t("No roles found", "No roles found")}
                  </TableCell>
                </TableRow>
              ) : (
                filteredRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-ice-600" />
                        <div>
                          <div className="flex items-center">
                            {role.name}
                            {role.isDefault && (
                              <Badge className="ml-2 bg-ice-100 text-ice-800 hover:bg-ice-100">
                                {t("Default", "Default")}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground md:hidden mt-1">
                            {role.description.length > 60 
                              ? role.description.substring(0, 60) + '...' 
                              : role.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {role.description.length > 100 
                        ? role.description.substring(0, 100) + '...' 
                        : role.description}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={role.status === "active" ? "default" : "secondary"}
                        className={role.status === "active" 
                          ? "bg-green-100 text-green-800 hover:bg-green-100" 
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {role.status === "active" 
                          ? t("Active", "Active") 
                          : t("Inactive", "Inactive")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{role.userCount}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center">
                        <span>{role.permissionCount}</span>
                        <Button variant="link" size="sm" className="p-0 h-auto text-xs underline">
                          {t("View Permissions", "View Permissions")}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditRole(role)}
                          disabled={!role.isMutable}
                        >
                          <Pencil size={16} className="mr-1" />
                          {t("Edit", "Edit")}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDeleteRole(role)}
                          disabled={!role.isMutable || role.isDefault}
                        >
                          <Trash2 size={16} className="mr-1" />
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

      {/* Create Role Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {t("Create Role", "Create Role")}
            </DialogTitle>
            <DialogDescription>
              {t("Add a new role to the system", "Add a new role to the system")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {t("Role Name", "Role Name")}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                placeholder={t("Enter role name", "Enter role name")}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                {t("Description", "Description")}
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                placeholder={t("Enter role description", "Enter role description")}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                {t("Status", "Status")}
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="status"
                  checked={formData.status === "active"}
                  onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? "active" : "inactive" })}
                />
                <Label htmlFor="status" className="cursor-pointer">
                  {formData.status === "active" ? t("Active", "Active") : t("Inactive", "Inactive")}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              {t("Cancel", "Cancel")}
            </Button>
            <Button onClick={submitCreateRole}>
              {t("Create", "Create")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {t("Edit Role", "Edit Role")}
            </DialogTitle>
            <DialogDescription>
              {t("Update role information", "Update role information")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                {t("Role Name", "Role Name")}
              </Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                placeholder={t("Enter role name", "Enter role name")}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="edit-description" className="text-right pt-2">
                {t("Description", "Description")}
              </Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                placeholder={t("Enter role description", "Enter role description")}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                {t("Status", "Status")}
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="edit-status"
                  checked={formData.status === "active"}
                  onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? "active" : "inactive" })}
                />
                <Label htmlFor="edit-status" className="cursor-pointer">
                  {formData.status === "active" ? t("Active", "Active") : t("Inactive", "Inactive")}
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t("Cancel", "Cancel")}
            </Button>
            <Button onClick={submitEditRole}>
              {t("Update", "Update")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Role Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("Are you sure?", "Are you sure?")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("This will permanently delete the role. This action cannot be undone.", 
                `This will permanently delete the role "${currentRole?.name}". This action cannot be undone.`)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t("Cancel", "Cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={submitDeleteRole} className="bg-red-600">
              {t("Delete", "Delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RolesManagement;
