
import React, { useState, useEffect } from "react";
import { Search, Shield, UserPlus, UserCog, X, Check, UserX, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/auth";
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
import { User } from "@/context/auth/types";

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

// Available roles with descriptions
const availableRoles = [
  { id: "admin", name: "Administrator", description: "Full system access and control" },
  { id: "callcenter", name: "Call Center Agent", description: "Access to call center features" },
  { id: "member", name: "Regular Member", description: "Basic access to member features" },
  { id: "technician", name: "Technician", description: "Access to device maintenance features" },
  { id: "support", name: "Customer Support", description: "Access to support tickets and client management" }
];

interface AdminUserWithPermissions extends User {
  permissions: string[];
}

const AdminUsersManagement: React.FC = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUserWithPermissions[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<AdminUserWithPermissions[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUserWithPermissions | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "member" as string,
    status: "active" as 'active' | 'inactive' | 'pending',
  });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const { user, getAllUsers, createUser, updateUserRole, deleteUser } = useAuth();
  const { language } = useLanguage();
  const [refreshing, setRefreshing] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    setLoadingError(null);
    
    try {
      if (getAllUsers) {
        // Use the actual getAllUsers function if available
        const users = await getAllUsers();
        
        // Transform users data to include permissions
        const usersWithPermissions: AdminUserWithPermissions[] = users.map(user => ({
          ...user,
          // In a real implementation, you'd fetch permissions from a database
          // For now, we'll assign mock permissions based on role
          permissions: getMockPermissionsByRole(user.role || 'member'),
          status: user.status || 'active',
        }));
        
        setAdminUsers(usersWithPermissions);
      } else {
        // Fallback to mock data if the function is not available
        console.warn("getAllUsers function not available, using mock data");
        setAdminUsers([
          {
            id: "1",
            uid: "1",
            name: "John Admin",
            email: "john@icealarm.es",
            role: "admin",
            status: "active",
            permissions: ["users.manage", "devices.manage", "reports.view", "settings.manage"],
            lastLogin: new Date().toISOString(),
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "2",
            uid: "2",
            name: "Maria Support",
            email: "maria@icealarm.es",
            role: "callcenter",
            status: "active",
            permissions: ["users.view", "devices.view", "reports.view"],
            lastLogin: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: "3",
            uid: "3", 
            name: "Support Admin",
            email: "support.admin@icealarm.es",
            role: "admin",
            status: "inactive",
            permissions: ["users.view", "devices.manage"],
            lastLogin: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
          }
        ]);
      }
    } catch (error) {
      console.error("Error loading users:", error);
      setLoadingError(error instanceof Error ? error.message : "Unknown error occurred");
      toast.error(language === 'en' ? "Failed to load users" : "Error al cargar usuarios");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [getAllUsers]);

  useEffect(() => {
    // Filter users based on search query and status
    let results = [...adminUsers];
    
    // Search filter
    if (searchQuery) {
      results = results.filter(admin => 
        admin.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        admin.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        admin.role?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Status filter
    if (selectedStatus !== "all") {
      results = results.filter(admin => admin.status === selectedStatus);
    }
    
    setFilteredUsers(results);
  }, [searchQuery, adminUsers, selectedStatus]);

  const getMockPermissionsByRole = (role: string): string[] => {
    switch (role) {
      case 'admin':
        return ["users.manage", "devices.manage", "reports.manage", "settings.manage", "callcenter.manage", "billing.manage"];
      case 'callcenter':
        return ["users.view", "devices.view", "reports.view", "callcenter.manage"];
      case 'technician':
        return ["devices.manage", "reports.view"];
      case 'support':
        return ["users.view", "devices.view", "reports.view"];
      default: // member
        return [];
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadUsers();
  };

  const handleCreateUser = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "member",
      status: "active",
    });
    setSelectedPermissions([]);
    setIsCreateDialogOpen(true);
  };

  const handleEditUser = (user: AdminUserWithPermissions) => {
    setCurrentUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      confirmPassword: "",
      role: user.role || "member",
      status: user.status || "active",
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteUser = (user: AdminUserWithPermissions) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleManagePermissions = (user: AdminUserWithPermissions) => {
    setCurrentUser(user);
    setSelectedPermissions(user.permissions);
    setIsPermissionsDialogOpen(true);
  };

  const submitCreateUser = async () => {
    // Validate form
    if (!formData.name || !formData.email) {
      toast.error(language === 'en' ? "Please fill all required fields" : "Por favor complete todos los campos requeridos");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error(language === 'en' ? "Passwords do not match" : "Las contraseñas no coinciden");
      return;
    }
    
    try {
      if (createUser) {
        // Use the actual createUser function if available
        await createUser(formData.email, formData.password, formData.name, formData.role);
        loadUsers(); // Reload the user list
      } else {
        // Mock implementation
        const newUser: AdminUserWithPermissions = {
          id: Date.now().toString(),
          uid: Date.now().toString(),
          name: formData.name,
          email: formData.email,
          role: formData.role,
          status: formData.status,
          permissions: getMockPermissionsByRole(formData.role),
          lastLogin: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        };
        
        setAdminUsers([...adminUsers, newUser]);
      }
      
      setIsCreateDialogOpen(false);
      toast.success(language === 'en' ? "User created successfully" : "Usuario creado con éxito");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error(language === 'en' 
        ? `Failed to create user: ${error instanceof Error ? error.message : "Unknown error"}`
        : `Error al crear usuario: ${error instanceof Error ? error.message : "Error desconocido"}`);
    }
  };

  const submitEditUser = async () => {
    if (!currentUser || !formData.name || !formData.email) {
      toast.error(language === 'en' ? "Please fill all required fields" : "Por favor complete todos los campos requeridos");
      return;
    }
    
    try {
      if (updateUserRole && currentUser.role !== formData.role) {
        // Update the user's role if it changed
        await updateUserRole(currentUser.id || currentUser.uid, formData.role);
      }
      
      // In a real implementation, you would update other user data here
      
      // Update the local state
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
      toast.success(language === 'en' ? "User updated successfully" : "Usuario actualizado con éxito");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error(language === 'en' 
        ? `Failed to update user: ${error instanceof Error ? error.message : "Unknown error"}`
        : `Error al actualizar usuario: ${error instanceof Error ? error.message : "Error desconocido"}`);
    }
  };

  const submitDeleteUser = async () => {
    if (!currentUser) return;
    
    try {
      if (deleteUser) {
        // Use the actual deleteUser function if available
        await deleteUser(currentUser.id || currentUser.uid);
        loadUsers(); // Reload the user list
      } else {
        // Mock implementation
        const updatedUsers = adminUsers.filter(user => user.id !== currentUser.id);
        setAdminUsers(updatedUsers);
      }
      
      setIsDeleteDialogOpen(false);
      toast.success(language === 'en' ? "User deleted successfully" : "Usuario eliminado con éxito");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(language === 'en' 
        ? `Failed to delete user: ${error instanceof Error ? error.message : "Unknown error"}`
        : `Error al eliminar usuario: ${error instanceof Error ? error.message : "Error desconocido"}`);
    }
  };

  const submitPermissions = () => {
    if (!currentUser) return;
    
    // In a real implementation, you would save these permissions to a database
    
    // Update the local state
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

  // Get role display name
  const getRoleDisplayName = (roleId: string | undefined) => {
    if (!roleId) return language === 'en' ? "Unknown" : "Desconocido";
    
    const role = availableRoles.find(r => r.id === roleId);
    return role ? role.name : roleId;
  };

  // Format date for display
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return language === 'en' ? "Never" : "Nunca";
    
    try {
      return new Date(dateString).toLocaleString(language === 'en' ? 'en-US' : 'es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ice-800">
            {language === 'en' ? "User Management" : "Gestión de Usuarios"}
          </h2>
          <p className="text-muted-foreground">
            {language === 'en' 
              ? "Manage all users and their permissions" 
              : "Gestione todos los usuarios y sus permisos"}
          </p>
        </div>
        <Button onClick={handleCreateUser} className="flex items-center gap-2">
          <UserPlus size={16} />
          {language === 'en' ? "Create User" : "Crear Usuario"}
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
        <div className="flex items-center gap-4">
          <Select 
            value={selectedStatus} 
            onValueChange={setSelectedStatus}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={language === 'en' ? "Filter by status" : "Filtrar por estado"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'en' ? "All Users" : "Todos los Usuarios"}</SelectItem>
              <SelectItem value="active">{language === 'en' ? "Active" : "Activo"}</SelectItem>
              <SelectItem value="inactive">{language === 'en' ? "Inactive" : "Inactivo"}</SelectItem>
              <SelectItem value="pending">{language === 'en' ? "Pending" : "Pendiente"}</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleRefresh} 
            disabled={refreshing}
          >
            <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} className="h-16 w-full" />
          ))}
        </div>
      ) : loadingError ? (
        <div className="bg-white rounded-md shadow p-6 text-center">
          <div className="text-red-500 mb-4">
            <X className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold mb-2">{language === 'en' ? "Error Loading Users" : "Error al Cargar Usuarios"}</h3>
          <p className="text-muted-foreground mb-4">{loadingError}</p>
          <Button onClick={handleRefresh} variant="outline" className="gap-2">
            <RefreshCw size={16} />
            {language === 'en' ? "Try Again" : "Intentar de Nuevo"}
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-md shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{language === 'en' ? "Name" : "Nombre"}</TableHead>
                <TableHead>{language === 'en' ? "Email" : "Correo"}</TableHead>
                <TableHead>{language === 'en' ? "Role" : "Rol"}</TableHead>
                <TableHead>{language === 'en' ? "Status" : "Estado"}</TableHead>
                <TableHead>{language === 'en' ? "Last Login" : "Último Acceso"}</TableHead>
                <TableHead>{language === 'en' ? "Created" : "Creado"}</TableHead>
                <TableHead className="text-right">{language === 'en' ? "Actions" : "Acciones"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    {language === 'en' ? "No users found" : "No se encontraron usuarios"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((adminUser) => (
                  <TableRow key={adminUser.id || adminUser.uid}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {adminUser.role === 'admin' && <Shield size={16} className="text-ice-600" />}
                        {adminUser.name || adminUser.displayName || adminUser.email?.split('@')[0]}
                      </div>
                    </TableCell>
                    <TableCell>{adminUser.email}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={
                          adminUser.role === 'admin' 
                            ? "bg-purple-100 text-purple-800 hover:bg-purple-100" 
                            : adminUser.role === 'callcenter' 
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {getRoleDisplayName(adminUser.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={adminUser.status === "active" ? "default" : "secondary"}
                        className={
                          adminUser.status === "active" 
                            ? "bg-green-100 text-green-800 hover:bg-green-100" 
                            : adminUser.status === "pending" 
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {adminUser.status === "active" 
                          ? (language === 'en' ? "Active" : "Activo") 
                          : adminUser.status === "pending"
                            ? (language === 'en' ? "Pending" : "Pendiente")
                            : (language === 'en' ? "Inactive" : "Inactivo")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {formatDate(adminUser.lastLogin)}
                    </TableCell>
                    <TableCell>
                      {formatDate(adminUser.createdAt)}
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
                          disabled={adminUser.id === user?.id} // Can't delete yourself
                        >
                          <UserX size={16} className="mr-1" />
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

      {/* Create User Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? "Create New User" : "Crear Nuevo Usuario"}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? "Create a new user account with role and permissions" 
                : "Cree una nueva cuenta de usuario con rol y permisos"}
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
              <Label htmlFor="password" className="text-right">
                {language === 'en' ? "Password" : "Contraseña"}
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirm-password" className="text-right">
                {language === 'en' ? "Confirm Password" : "Confirmar Contraseña"}
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                {language === 'en' ? "Role" : "Rol"}
              </Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={language === 'en' ? "Select role" : "Seleccionar rol"} />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map(role => (
                    <SelectItem key={role.id} value={role.id}>
                      <div>
                        <span>{role.name}</span>
                        <p className="text-xs text-muted-foreground">{role.description}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                {language === 'en' ? "Status" : "Estado"}
              </Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: 'active' | 'inactive' | 'pending') => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={language === 'en' ? "Select status" : "Seleccionar estado"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{language === 'en' ? "Active" : "Activo"}</SelectItem>
                  <SelectItem value="inactive">{language === 'en' ? "Inactive" : "Inactivo"}</SelectItem>
                  <SelectItem value="pending">{language === 'en' ? "Pending" : "Pendiente"}</SelectItem>
                </SelectContent>
              </Select>
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

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {language === 'en' ? "Edit User" : "Editar Usuario"}
            </DialogTitle>
            <DialogDescription>
              {language === 'en' 
                ? "Update user information and settings" 
                : "Actualizar información y configuración del usuario"}
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
              <Label htmlFor="edit-role" className="text-right">
                {language === 'en' ? "Role" : "Rol"}
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={language === 'en' ? "Select role" : "Seleccionar rol"} />
                </SelectTrigger>
                <SelectContent>
                  {availableRoles.map(role => (
                    <SelectItem key={role.id} value={role.id}>
                      <div>
                        <span>{role.name}</span>
                        <p className="text-xs text-muted-foreground">{role.description}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                {language === 'en' ? "Status" : "Estado"}
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: 'active' | 'inactive' | 'pending') => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={language === 'en' ? "Select status" : "Seleccionar estado"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{language === 'en' ? "Active" : "Activo"}</SelectItem>
                  <SelectItem value="inactive">{language === 'en' ? "Inactive" : "Inactivo"}</SelectItem>
                  <SelectItem value="pending">{language === 'en' ? "Pending" : "Pendiente"}</SelectItem>
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

      {/* Delete User Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {language === 'en' ? "Are you sure?" : "¿Está seguro?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {language === 'en'
                ? `This will permanently delete the user "${currentUser?.name}". This action cannot be undone.`
                : `Esto eliminará permanentemente al usuario "${currentUser?.name}". Esta acción no se puede deshacer.`}
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
