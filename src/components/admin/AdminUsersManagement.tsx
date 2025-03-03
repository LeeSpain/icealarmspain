
import React, { useState, useEffect } from "react";
import { Search, Shield, UserPlus, UserCog, X, Check } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'callcenter' | 'member';
  status: 'active' | 'inactive';
  permissions: string[];
  lastLogin?: string;
}

// Initial mock data for admin users
const initialAdminUsers: AdminUser[] = [
  {
    id: "1",
    name: "John Admin",
    email: "john@icealarm.es",
    role: "admin",
    status: "active",
    permissions: ["users.manage", "devices.manage", "reports.view", "settings.manage"],
    lastLogin: "2023-08-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Maria Manager",
    email: "maria@icealarm.es",
    role: "admin",
    status: "active",
    permissions: ["users.view", "devices.view", "reports.view"],
    lastLogin: "2023-08-14T16:45:00Z"
  },
  {
    id: "3",
    name: "Support Admin",
    email: "support.admin@icealarm.es",
    role: "admin",
    status: "inactive",
    permissions: ["users.view", "devices.manage"],
    lastLogin: "2023-07-30T09:15:00Z"
  }
];

// Available permission options
const availablePermissions = [
  { id: "users.view", name: "View Users", description: "Can view user profiles and information" },
  { id: "users.manage", name: "Manage Users", description: "Can create, edit, and delete users" },
  { id: "devices.view", name: "View Devices", description: "Can view device information" },
  { id: "devices.manage", name: "Manage Devices", description: "Can add, edit, and remove devices" },
  { id: "reports.view", name: "View Reports", description: "Can view reports and analytics" },
  { id: "reports.manage", name: "Manage Reports", description: "Can create and edit reports" },
  { id: "settings.view", name: "View Settings", description: "Can view system settings" },
  { id: "settings.manage", name: "Manage Settings", description: "Can modify system settings" },
  { id: "callcenter.manage", name: "Manage Call Center", description: "Can manage call center operations" },
  { id: "billing.manage", name: "Manage Billing", description: "Can manage billing and invoices" }
];

const AdminUsersManagement: React.FC = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<AdminUser[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "admin" as 'admin' | 'callcenter' | 'member',
    status: "active" as 'active' | 'inactive',
  });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const { user } = useAuth();
  const { language } = useLanguage();

  useEffect(() => {
    // Simulate loading data from API
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAdminUsers(initialAdminUsers);
      } catch (error) {
        console.error("Error fetching admin users:", error);
        toast.error(language === 'en' ? "Failed to load admin users" : "Error al cargar usuarios administradores");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  useEffect(() => {
    // Filter users based on search query
    if (searchQuery) {
      const filtered = adminUsers.filter(admin => 
        admin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        admin.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(adminUsers);
    }
  }, [searchQuery, adminUsers]);

  const handleCreateUser = () => {
    setFormData({
      name: "",
      email: "",
      role: "admin",
      status: "active",
    });
    setSelectedPermissions([]);
    setIsCreateDialogOpen(true);
  };

  const handleEditUser = (user: AdminUser) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = (user: AdminUser) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleManagePermissions = (user: AdminUser) => {
    setCurrentUser(user);
    setSelectedPermissions(user.permissions);
    setIsPermissionsDialogOpen(true);
  };

  const submitCreateUser = () => {
    if (!formData.name || !formData.email) {
      toast.error(language === 'en' ? "Please fill all required fields" : "Por favor complete todos los campos requeridos");
      return;
    }

    const newUser: AdminUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
      permissions: selectedPermissions,
      lastLogin: new Date().toISOString(),
    };

    setAdminUsers([...adminUsers, newUser]);
    setIsCreateDialogOpen(false);
    toast.success(language === 'en' ? "Admin user created successfully" : "Usuario administrador creado con éxito");
  };

  const submitEditUser = () => {
    if (!currentUser || !formData.name || !formData.email) {
      toast.error(language === 'en' ? "Please fill all required fields" : "Por favor complete todos los campos requeridos");
      return;
    }

    const updatedUsers = adminUsers.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
        };
      }
      return user;
    });

    setAdminUsers(updatedUsers);
    setIsEditDialogOpen(false);
    toast.success(language === 'en' ? "Admin user updated successfully" : "Usuario administrador actualizado con éxito");
  };

  const submitDeleteUser = () => {
    if (!currentUser) return;

    const updatedUsers = adminUsers.filter(user => user.id !== currentUser.id);
    setAdminUsers(updatedUsers);
    setIsDeleteDialogOpen(false);
    toast.success(language === 'en' ? "Admin user deleted successfully" : "Usuario administrador eliminado con éxito");
  };

  const submitPermissions = () => {
    if (!currentUser) return;

    const updatedUsers = adminUsers.map(user => {
      if (user.id === currentUser.id) {
        return {
          ...user,
          permissions: selectedPermissions,
        };
      }
      return user;
    });

    setAdminUsers(updatedUsers);
    setIsPermissionsDialogOpen(false);
    toast.success(language === 'en' ? "Permissions updated successfully" : "Permisos actualizados con éxito");
  };

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prevPermissions => {
      if (prevPermissions.includes(permissionId)) {
        return prevPermissions.filter(id => id !== permissionId);
      } else {
        return [...prevPermissions, permissionId];
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ice-800">
            {language === 'en' ? "Admin Users Management" : "Gestión de Usuarios Administradores"}
          </h2>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? "Manage administrator access and permissions" 
              : "Gestione el acceso y los permisos de los administradores"}
          </p>
        </div>
        <Button onClick={handleCreateUser} className="flex items-center gap-2">
          <UserPlus size={16} />
          {language === 'en' ? "Add Admin User" : "Añadir Administrador"}
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={language === 'en' ? "Search users..." : "Buscar usuarios..."}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select 
          value="all" 
          onValueChange={(value) => console.log(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={language === 'en' ? "Filter by status" : "Filtrar por estado"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{language === 'en' ? "All Users" : "Todos los Usuarios"}</SelectItem>
            <SelectItem value="active">{language === 'en' ? "Active" : "Activo"}</SelectItem>
            <SelectItem value="inactive">{language === 'en' ? "Inactive" : "Inactivo"}</SelectItem>
          </SelectContent>
        </Select>
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
                <TableHead>{language === 'en' ? "Name" : "Nombre"}</TableHead>
                <TableHead>{language === 'en' ? "Email" : "Correo"}</TableHead>
                <TableHead>{language === 'en' ? "Status" : "Estado"}</TableHead>
                <TableHead>{language === 'en' ? "Last Login" : "Último Acceso"}</TableHead>
                <TableHead>{language === 'en' ? "Permissions" : "Permisos"}</TableHead>
                <TableHead className="text-right">{language === 'en' ? "Actions" : "Acciones"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    {language === 'en' ? "No admin users found" : "No se encontraron usuarios administradores"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((adminUser) => (
                  <TableRow key={adminUser.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-ice-600" />
                        {adminUser.name}
                      </div>
                    </TableCell>
                    <TableCell>{adminUser.email}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={adminUser.status === "active" ? "default" : "secondary"}
                        className={adminUser.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-gray-100 text-gray-800 hover:bg-gray-100"}
                      >
                        {adminUser.status === "active" 
                          ? (language === 'en' ? "Active" : "Activo") 
                          : (language === 'en' ? "Inactive" : "Inactivo")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {adminUser.lastLogin 
                        ? new Date(adminUser.lastLogin).toLocaleDateString() 
                        : (language === 'en' ? "Never" : "Nunca")}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {adminUser.permissions.length > 0 ? (
                          <span className="text-sm text-muted-foreground">
                            {adminUser.permissions.length} {language === 'en' ? "permissions" : "permisos"}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            {language === 'en' ? "No permissions" : "Sin permisos"}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleManagePermissions(adminUser)}
                        >
                          <UserCog size={16} className="mr-1" />
                          {language === 'en' ? "Permissions" : "Permisos"}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditUser(adminUser)}
                        >
                          {language === 'en' ? "Edit" : "Editar"}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDeleteUser(adminUser)}
                        >
                          {language === 'en' ? "Delete" : "Eliminar"}
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

      {/* Create Admin User Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? "Add New Admin User" : "Añadir Nuevo Usuario Administrador"}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? "Create a new administrator with access to the admin dashboard" 
                : "Cree un nuevo administrador con acceso al panel de administración"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {language === 'en' ? "Name" : "Nombre"}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                {language === 'en' ? "Email" : "Correo"}
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                {language === 'en' ? "Status" : "Estado"}
              </Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={language === 'en' ? "Select status" : "Seleccionar estado"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{language === 'en' ? "Active" : "Activo"}</SelectItem>
                  <SelectItem value="inactive">{language === 'en' ? "Inactive" : "Inactivo"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <div className="text-right pt-2">
                <Label>{language === 'en' ? "Permissions" : "Permisos"}</Label>
              </div>
              <div className="col-span-3 space-y-4">
                <p className="text-sm text-muted-foreground mb-2">
                  {language === 'en' 
                    ? "Select the permissions for this administrator" 
                    : "Seleccione los permisos para este administrador"}
                </p>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {availablePermissions.map((permission) => (
                    <div key={permission.id} className="flex items-start space-x-2">
                      <div className="pt-0.5">
                        <Switch
                          checked={selectedPermissions.includes(permission.id)}
                          onCheckedChange={() => togglePermission(permission.id)}
                        />
                      </div>
                      <div>
                        <Label htmlFor={permission.id} className="font-medium">
                          {permission.name}
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          {permission.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              {language === 'en' ? "Cancel" : "Cancelar"}
            </Button>
            <Button onClick={submitCreateUser}>
              {language === 'en' ? "Create User" : "Crear Usuario"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Admin User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? "Edit Admin User" : "Editar Usuario Administrador"}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? "Update the information for this administrator" 
                : "Actualice la información para este administrador"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                {language === 'en' ? "Name" : "Nombre"}
              </Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                {language === 'en' ? "Email" : "Correo"}
              </Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                {language === 'en' ? "Status" : "Estado"}
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'active' | 'inactive') => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={language === 'en' ? "Select status" : "Seleccionar estado"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{language === 'en' ? "Active" : "Activo"}</SelectItem>
                  <SelectItem value="inactive">{language === 'en' ? "Inactive" : "Inactivo"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {language === 'en' ? "Cancel" : "Cancelar"}
            </Button>
            <Button onClick={submitEditUser}>
              {language === 'en' ? "Update User" : "Actualizar Usuario"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Admin User Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'en' ? "Are you sure?" : "¿Está seguro?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'en'
                ? `This will permanently delete the admin user "${currentUser?.name}". This action cannot be undone.`
                : `Esto eliminará permanentemente al usuario administrador "${currentUser?.name}". Esta acción no se puede deshacer.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {language === 'en' ? "Cancel" : "Cancelar"}
            </AlertDialogCancel>
            <AlertDialogAction onClick={submitDeleteUser} className="bg-red-600">
              {language === 'en' ? "Delete" : "Eliminar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Permissions Dialog */}
      <Dialog open={isPermissionsDialogOpen} onOpenChange={setIsPermissionsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? "Manage Permissions" : "Gestionar Permisos"}
            </DialogTitle>
            <DialogDescription>
              {language === 'en'
                ? `Update permissions for ${currentUser?.name}`
                : `Actualizar permisos para ${currentUser?.name}`}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {availablePermissions.map((permission) => (
                <div key={permission.id} className="flex items-start space-x-3 p-2 rounded hover:bg-gray-50">
                  <div className="pt-0.5">
                    <Switch
                      checked={selectedPermissions.includes(permission.id)}
                      onCheckedChange={() => togglePermission(permission.id)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={permission.id} className="font-medium">
                      {permission.name}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {permission.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPermissionsDialogOpen(false)}>
              {language === 'en' ? "Cancel" : "Cancelar"}
            </Button>
            <Button onClick={submitPermissions}>
              {language === 'en' ? "Save Permissions" : "Guardar Permisos"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsersManagement;
