
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLanguage } from "@/context/LanguageContext";
import { LockKeyhole, PlusCircle, Save, Pencil, Trash2, Filter, RefreshCw } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define permission interface
interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  isSystem: boolean;
  rolesCount: number;
  createdAt: string;
  updatedAt: string;
}

// Define permission categories
const permissionCategories = [
  { value: "users", label: "Users & Accounts" },
  { value: "devices", label: "Devices & Inventory" },
  { value: "alerts", label: "Alerts & Notifications" },
  { value: "billing", label: "Billing & Payments" },
  { value: "reports", label: "Reports & Analytics" },
  { value: "system", label: "System Settings" },
  { value: "callcenter", label: "Call Center" },
  { value: "clients", label: "Clients & Customers" },
];

// Mock permission data
const initialPermissions: Permission[] = [
  {
    id: "perm-001",
    name: "users.view",
    description: "View user accounts and profiles",
    category: "users",
    isSystem: true,
    rolesCount: 4,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "perm-002",
    name: "users.create",
    description: "Create new user accounts",
    category: "users",
    isSystem: true,
    rolesCount: 2,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "perm-003",
    name: "users.edit",
    description: "Edit existing user accounts",
    category: "users",
    isSystem: true,
    rolesCount: 2,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "perm-004",
    name: "users.delete",
    description: "Delete user accounts",
    category: "users",
    isSystem: true,
    rolesCount: 1,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "perm-005",
    name: "devices.view",
    description: "View devices and their status",
    category: "devices",
    isSystem: true,
    rolesCount: 5,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "perm-006",
    name: "devices.manage",
    description: "Add, edit, and remove devices",
    category: "devices",
    isSystem: true,
    rolesCount: 3,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "perm-007",
    name: "reports.view",
    description: "View reports and analytics",
    category: "reports",
    isSystem: true,
    rolesCount: 4,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "perm-008",
    name: "reports.create",
    description: "Create and edit reports",
    category: "reports",
    isSystem: true,
    rolesCount: 2,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "perm-009",
    name: "settings.view",
    description: "View system settings",
    category: "system",
    isSystem: true,
    rolesCount: 3,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "perm-010",
    name: "settings.manage",
    description: "Modify system settings",
    category: "system",
    isSystem: true,
    rolesCount: 1,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "perm-011",
    name: "billing.view",
    description: "View billing information and history",
    category: "billing",
    isSystem: true,
    rolesCount: 3,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "perm-012",
    name: "billing.manage",
    description: "Manage billing and process payments",
    category: "billing",
    isSystem: true,
    rolesCount: 1,
    createdAt: "2023-01-15T10:30:00Z",
    updatedAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "perm-013",
    name: "callcenter.access",
    description: "Access to call center features",
    category: "callcenter",
    isSystem: false,
    rolesCount: 2,
    createdAt: "2023-03-10T14:45:00Z",
    updatedAt: "2023-03-10T14:45:00Z"
  },
  {
    id: "perm-014",
    name: "clients.view",
    description: "View client information",
    category: "clients",
    isSystem: false,
    rolesCount: 3,
    createdAt: "2023-05-22T09:15:00Z",
    updatedAt: "2023-05-22T09:15:00Z"
  },
  {
    id: "perm-015",
    name: "clients.manage",
    description: "Manage client accounts and information",
    category: "clients",
    isSystem: false,
    rolesCount: 2,
    createdAt: "2023-05-22T09:15:00Z",
    updatedAt: "2023-05-22T09:15:00Z"
  }
];

const PermissionsManagement: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPermissions, setFilteredPermissions] = useState<Permission[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPermission, setCurrentPermission] = useState<Permission | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "users",
  });
  const { language } = useLanguage();

  // Translation helpers
  const t = (key: string, fallback: string): string => {
    return language === 'en' ? fallback : getFallbackSpanish(key, fallback);
  };

  // Simple Spanish translations fallback
  const getFallbackSpanish = (key: string, fallback: string): string => {
    const spanishMap: Record<string, string> = {
      "Permissions Management": "Gestión de Permisos",
      "Manage system permissions that can be assigned to roles": "Gestiona los permisos del sistema que pueden asignarse a roles",
      "Add Permission": "Añadir Permiso",
      "Search permissions...": "Buscar permisos...",
      "All Categories": "Todas las Categorías",
      "Users & Accounts": "Usuarios y Cuentas",
      "Devices & Inventory": "Dispositivos e Inventario",
      "Alerts & Notifications": "Alertas y Notificaciones",
      "Billing & Payments": "Facturación y Pagos",
      "Reports & Analytics": "Informes y Analíticas",
      "System Settings": "Configuración del Sistema",
      "Call Center": "Centro de Llamadas",
      "Clients & Customers": "Clientes",
      "Permission": "Permiso",
      "Description": "Descripción",
      "Category": "Categoría",
      "Used In": "Usado En",
      "Actions": "Acciones",
      "Edit": "Editar",
      "Delete": "Eliminar",
      "No permissions found": "No se encontraron permisos",
      "Create Permission": "Crear Permiso",
      "Add a new permission to the system": "Añade un nuevo permiso al sistema",
      "Permission Name": "Nombre del Permiso",
      "Permission Description": "Descripción del Permiso",
      "Describe what this permission allows": "Describe lo que permite este permiso",
      "Enter permission name (e.g. users.create)": "Ingrese el nombre del permiso (ej. usuarios.crear)",
      "Enter permission description": "Ingrese la descripción del permiso",
      "Select category": "Seleccionar categoría",
      "Cancel": "Cancelar",
      "Create": "Crear",
      "Are you sure?": "¿Está seguro?",
      "This will permanently delete the permission. This action cannot be undone.": "Esto eliminará permanentemente el permiso. Esta acción no se puede deshacer.",
      "Permission created successfully": "Permiso creado con éxito",
      "Permission updated successfully": "Permiso actualizado con éxito",
      "Permission deleted successfully": "Permiso eliminado con éxito",
      "Please fill all required fields": "Por favor complete todos los campos requeridos",
      "Edit Permission": "Editar Permiso",
      "Update permission information": "Actualizar información del permiso",
      "Update": "Actualizar",
      "System": "Sistema",
      "roles": "roles",
      "Cannot delete system permission": "No se puede eliminar un permiso del sistema"
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
        setPermissions(initialPermissions);
      } catch (error) {
        console.error("Error fetching permissions:", error);
        toast.error(t("Failed to load permissions", "Failed to load permissions"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter permissions based on search query and category filter
    let filtered = [...permissions];
    
    if (searchQuery) {
      filtered = filtered.filter(permission => 
        permission.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        permission.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (categoryFilter !== "all") {
      filtered = filtered.filter(permission => permission.category === categoryFilter);
    }
    
    setFilteredPermissions(filtered);
  }, [searchQuery, permissions, categoryFilter]);

  const handleCreatePermission = () => {
    setFormData({
      name: "",
      description: "",
      category: "users",
    });
    setIsCreateDialogOpen(true);
  };

  const handleEditPermission = (permission: Permission) => {
    setCurrentPermission(permission);
    setFormData({
      name: permission.name,
      description: permission.description,
      category: permission.category,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeletePermission = (permission: Permission) => {
    setCurrentPermission(permission);
    setIsDeleteDialogOpen(true);
  };

  const submitCreatePermission = () => {
    if (!formData.name || !formData.description) {
      toast.error(t("Please fill all required fields", "Please fill all required fields"));
      return;
    }

    const newPermission: Permission = {
      id: `perm-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      isSystem: false,
      rolesCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setPermissions([...permissions, newPermission]);
    setIsCreateDialogOpen(false);
    toast.success(t("Permission created successfully", "Permission created successfully"));
  };

  const submitEditPermission = () => {
    if (!currentPermission || !formData.name || !formData.description) {
      toast.error(t("Please fill all required fields", "Please fill all required fields"));
      return;
    }

    const updatedPermissions = permissions.map(permission => {
      if (permission.id === currentPermission.id) {
        return {
          ...permission,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          updatedAt: new Date().toISOString()
        };
      }
      return permission;
    });

    setPermissions(updatedPermissions);
    setIsEditDialogOpen(false);
    toast.success(t("Permission updated successfully", "Permission updated successfully"));
  };

  const submitDeletePermission = () => {
    if (!currentPermission) return;

    // Check if the permission is a system permission
    if (currentPermission.isSystem) {
      toast.error(t("Cannot delete system permission", "Cannot delete system permission"));
      setIsDeleteDialogOpen(false);
      return;
    }

    const updatedPermissions = permissions.filter(permission => permission.id !== currentPermission.id);
    setPermissions(updatedPermissions);
    setIsDeleteDialogOpen(false);
    toast.success(t("Permission deleted successfully", "Permission deleted successfully"));
  };

  const getCategoryLabel = (categoryValue: string): string => {
    const category = permissionCategories.find(cat => cat.value === categoryValue);
    return category ? t(category.label, category.label) : categoryValue;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ice-800">
            {t("Permissions Management", "Permissions Management")}
          </h2>
          <p className="text-muted-foreground">
            {t("Manage system permissions that can be assigned to roles", 
              "Manage system permissions that can be assigned to roles")}
          </p>
        </div>
        <Button onClick={handleCreatePermission} className="flex items-center gap-2">
          <PlusCircle size={16} />
          {t("Add Permission", "Add Permission")}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Input
            placeholder={t("Search permissions...", "Search permissions...")}
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
        
        <div className="flex w-full md:w-auto">
          <Select 
            value={categoryFilter} 
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger className="w-full md:w-[220px]">
              <Filter size={16} className="mr-2" />
              <SelectValue placeholder={t("All Categories", "All Categories")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("All Categories", "All Categories")}</SelectItem>
              {permissionCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {t(category.label, category.label)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="ghost" size="icon" className="ml-2" onClick={() => {
            setSearchQuery("");
            setCategoryFilter("all");
          }}>
            <RefreshCw size={16} />
          </Button>
        </div>
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
                <TableHead className="text-center">{t("Used In", "Used In")}</TableHead>
                <TableHead className="text-right">{t("Actions", "Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPermissions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    {t("No permissions found", "No permissions found")}
                  </TableCell>
                </TableRow>
              ) : (
                filteredPermissions.map((permission) => (
                  <TableRow key={permission.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <LockKeyhole size={16} className="text-ice-600" />
                        <div>
                          <div className="flex items-center">
                            {permission.name}
                            {permission.isSystem && (
                              <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                                {t("System", "System")}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground md:hidden mt-1">
                            {permission.description.length > 60 
                              ? permission.description.substring(0, 60) + '...' 
                              : permission.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {permission.description}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {getCategoryLabel(permission.category)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      {permission.rolesCount} {t("roles", "roles")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditPermission(permission)}
                        >
                          <Pencil size={16} className="mr-1" />
                          {t("Edit", "Edit")}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDeletePermission(permission)}
                          disabled={permission.isSystem}
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="permission-name" className="text-right">
                {t("Permission Name", "Permission Name")}
              </Label>
              <Input
                id="permission-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                placeholder={t("Enter permission name (e.g. users.create)", 
                  "Enter permission name (e.g. users.create)")}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="permission-description" className="text-right pt-2">
                {t("Description", "Description")}
              </Label>
              <Textarea
                id="permission-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                placeholder={t("Describe what this permission allows", "Describe what this permission allows")}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="permission-category" className="text-right">
                {t("Category", "Category")}
              </Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="permission-category" className="col-span-3">
                  <SelectValue placeholder={t("Select category", "Select category")} />
                </SelectTrigger>
                <SelectContent>
                  {permissionCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {t(category.label, category.label)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              {t("Cancel", "Cancel")}
            </Button>
            <Button onClick={submitCreatePermission}>
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
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-permission-name" className="text-right">
                {t("Permission Name", "Permission Name")}
              </Label>
              <Input
                id="edit-permission-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                placeholder={t("Enter permission name (e.g. users.create)", 
                  "Enter permission name (e.g. users.create)")}
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="edit-permission-description" className="text-right pt-2">
                {t("Description", "Description")}
              </Label>
              <Textarea
                id="edit-permission-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                placeholder={t("Describe what this permission allows", "Describe what this permission allows")}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-permission-category" className="text-right">
                {t("Category", "Category")}
              </Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger id="edit-permission-category" className="col-span-3">
                  <SelectValue placeholder={t("Select category", "Select category")} />
                </SelectTrigger>
                <SelectContent>
                  {permissionCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {t(category.label, category.label)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t("Cancel", "Cancel")}
            </Button>
            <Button onClick={submitEditPermission}>
              {t("Update", "Update")}
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
                `This will permanently delete the permission "${currentPermission?.name}". This action cannot be undone.`)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t("Cancel", "Cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={submitDeletePermission} className="bg-red-600">
              {t("Delete", "Delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PermissionsManagement;
