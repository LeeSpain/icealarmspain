
import React, { useState, useEffect } from "react";
import { Shield, Plus, Search, Edit, Trash, UserCog } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

// Role interface definition
interface Role {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  createdAt: string;
}

const initialRoles: Role[] = [
  {
    id: "1",
    name: "Super Admin",
    description: "Full access to all systems and features",
    status: "active",
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    name: "Admin",
    description: "Access to administrative features",
    status: "active",
    createdAt: "2023-02-10",
  },
  {
    id: "3",
    name: "Support Manager",
    description: "Manage support agents and tickets",
    status: "active",
    createdAt: "2023-03-05",
  },
  {
    id: "4",
    name: "Support Agent",
    description: "Handle support tickets and customer inquiries",
    status: "active",
    createdAt: "2023-04-12",
  },
  {
    id: "5",
    name: "Inventory Manager",
    description: "Manage product inventory and stock",
    status: "active",
    createdAt: "2023-05-20",
  },
  {
    id: "6",
    name: "Sales Representative",
    description: "Handle sales and customer accounts",
    status: "inactive",
    createdAt: "2023-06-15",
  },
];

const RolesManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [newRole, setNewRole] = useState<Omit<Role, 'id' | 'createdAt'>>({
    name: "",
    description: "",
    status: "active",
  });
  
  const { t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRoles(initialRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error(t("error"));
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [t]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = roles.filter(role => 
        role.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        role.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRoles(filtered);
    } else {
      setFilteredRoles(roles);
    }
  }, [searchQuery, roles]);

  const handleCreateRole = () => {
    const roleToAdd: Role = {
      id: `${Date.now()}`,
      name: newRole.name,
      description: newRole.description,
      status: newRole.status,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setRoles([...roles, roleToAdd]);
    toast.success(t("adminDashboard.roleCreated"));
    setIsCreateDialogOpen(false);
    resetNewRoleForm();
  };

  const handleUpdateRole = () => {
    if (!currentRole) return;
    
    const updatedRoles = roles.map(role => 
      role.id === currentRole.id ? currentRole : role
    );
    
    setRoles(updatedRoles);
    toast.success(t("adminDashboard.roleUpdated"));
    setIsEditDialogOpen(false);
  };

  const handleDeleteRole = () => {
    if (!currentRole) return;
    
    const updatedRoles = roles.filter(role => role.id !== currentRole.id);
    setRoles(updatedRoles);
    toast.success(t("adminDashboard.roleDeleted"));
    setIsDeleteDialogOpen(false);
  };

  const openEditDialog = (role: Role) => {
    setCurrentRole(role);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (role: Role) => {
    setCurrentRole(role);
    setIsDeleteDialogOpen(true);
  };

  const resetNewRoleForm = () => {
    setNewRole({
      name: "",
      description: "",
      status: "active",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{t("adminDashboard.rolesManagement")}</h2>
          <p className="text-muted-foreground">
            {t("adminDashboard.totalRoles")}: {roles.length}
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> {t("adminDashboard.createRole")}
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("adminDashboard.searchRoles")}
            className="pl-8 w-[300px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            {t("adminDashboard.activeRoles")}: {roles.filter(r => r.status === "active").length}
          </Badge>
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            {t("adminDashboard.inactiveRoles")}: {roles.filter(r => r.status === "inactive").length}
          </Badge>
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
      ) : filteredRoles.length === 0 ? (
        <Card>
          <CardContent className="py-10">
            <div className="flex flex-col items-center justify-center">
              <UserCog className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">{t("adminDashboard.noRolesFound")}</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-white rounded-md shadow-sm border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">{t("adminDashboard.roleName")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("adminDashboard.roleDescription")}</TableHead>
                <TableHead className="hidden md:table-cell">{t("status")}</TableHead>
                <TableHead className="hidden lg:table-cell">{t("adminDashboard.roleCreatedAt")}</TableHead>
                <TableHead className="text-right">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    {role.name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-[300px] truncate">
                    {role.description}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={role.status === "active" ? "default" : "outline"}>
                      {role.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{role.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openEditDialog(role)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => openDeleteDialog(role)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("adminDashboard.createRole")}</DialogTitle>
            <DialogDescription>
              {t("adminDashboard.createRole")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium col-span-1">
                {t("adminDashboard.roleName")}
              </label>
              <Input
                id="name"
                placeholder={t("adminDashboard.roleNamePlaceholder")}
                className="col-span-3"
                value={newRole.name}
                onChange={(e) => setNewRole({...newRole, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="description" className="text-right text-sm font-medium col-span-1">
                {t("adminDashboard.roleDescription")}
              </label>
              <Textarea
                id="description"
                placeholder={t("adminDashboard.roleDescriptionPlaceholder")}
                className="col-span-3"
                value={newRole.description}
                onChange={(e) => setNewRole({...newRole, description: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>{t("cancel")}</Button>
            <Button onClick={handleCreateRole}>{t("adminDashboard.saveRole")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("adminDashboard.editRole")}</DialogTitle>
            <DialogDescription>
              {t("adminDashboard.editRole")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-name" className="text-right text-sm font-medium col-span-1">
                {t("adminDashboard.roleName")}
              </label>
              <Input
                id="edit-name"
                placeholder={t("adminDashboard.roleNamePlaceholder")}
                className="col-span-3"
                value={currentRole?.name || ""}
                onChange={(e) => setCurrentRole(currentRole ? {...currentRole, name: e.target.value} : null)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="edit-description" className="text-right text-sm font-medium col-span-1">
                {t("adminDashboard.roleDescription")}
              </label>
              <Textarea
                id="edit-description"
                placeholder={t("adminDashboard.roleDescriptionPlaceholder")}
                className="col-span-3"
                value={currentRole?.description || ""}
                onChange={(e) => setCurrentRole(currentRole ? {...currentRole, description: e.target.value} : null)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>{t("cancel")}</Button>
            <Button onClick={handleUpdateRole}>{t("adminDashboard.saveRole")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("adminDashboard.areYouSure")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("adminDashboard.deleteRoleWarning")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRole} className="bg-red-600 hover:bg-red-700">
              {t("adminDashboard.deleteRole")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RolesManagement;
