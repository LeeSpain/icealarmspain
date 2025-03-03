
import React, { useState, useEffect } from "react";
import { Shield, Plus, Search, Edit, Trash, Check, X, UserCog } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Role {
  id: string;
  name: string;
  description: string;
  usersCount: number;
  isSystem: boolean;
  createdAt: string;
}

// Initial mock data for roles
const initialRoles: Role[] = [
  {
    id: "1",
    name: "Administrator",
    description: "Full system access with all permissions",
    usersCount: 3,
    isSystem: true,
    createdAt: "2023-06-10T10:00:00Z"
  },
  {
    id: "2",
    name: "Call Center Agent",
    description: "Access to call center features and client data",
    usersCount: 8,
    isSystem: true,
    createdAt: "2023-06-10T10:00:00Z"
  },
  {
    id: "3",
    name: "Device Manager",
    description: "Manages device inventory and maintenance",
    usersCount: 2,
    isSystem: false,
    createdAt: "2023-07-15T14:30:00Z"
  },
  {
    id: "4",
    name: "Support Specialist",
    description: "Handles support tickets and customer inquiries",
    usersCount: 0,
    isSystem: false,
    createdAt: "2023-08-22T09:15:00Z"
  }
];

const RolesManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const { language, t } = useLanguage();

  useEffect(() => {
    // Simulate loading data from API
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRoles(initialRoles);
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error(t("adminDashboard.errorLoadingRoles"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [t]);

  useEffect(() => {
    // Filter roles based on search query
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
    setFormData({
      name: "",
      description: "",
    });
    setIsCreateDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setCurrentRole(role);
    setFormData({
      name: role.name,
      description: role.description,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteRole = (role: Role) => {
    setCurrentRole(role);
    setIsDeleteDialogOpen(true);
  };

  const submitCreateRole = () => {
    if (!formData.name) {
      toast.error(t("adminDashboard.fillRequiredFields"));
      return;
    }

    const newRole: Role = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      usersCount: 0,
      isSystem: false,
      createdAt: new Date().toISOString(),
    };

    setRoles([...roles, newRole]);
    setIsCreateDialogOpen(false);
    toast.success(t("adminDashboard.roleCreatedSuccess"));
  };

  const submitEditRole = () => {
    if (!currentRole || !formData.name) {
      toast.error(t("adminDashboard.fillRequiredFields"));
      return;
    }

    const updatedRoles = roles.map(role => {
      if (role.id === currentRole.id) {
        return {
          ...role,
          name: formData.name,
          description: formData.description,
        };
      }
      return role;
    });

    setRoles(updatedRoles);
    setIsEditDialogOpen(false);
    toast.success(t("adminDashboard.roleUpdatedSuccess"));
  };

  const submitDeleteRole = () => {
    if (!currentRole) return;

    if (currentRole.usersCount > 0) {
      toast.error(t("adminDashboard.cannotDeleteRoleWithUsers"));
      setIsDeleteDialogOpen(false);
      return;
    }

    const updatedRoles = roles.filter(role => role.id !== currentRole.id);
    setRoles(updatedRoles);
    setIsDeleteDialogOpen(false);
    toast.success(t("adminDashboard.roleDeletedSuccess"));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ice-800">
            {t("adminDashboard.rolesManagement")}
          </h2>
          <p className="text-muted-foreground">
            {t("adminDashboard.rolesManagementDescription")}
          </p>
        </div>
        <Button onClick={handleCreateRole} className="flex items-center gap-2">
          <Plus size={16} />
          {t("adminDashboard.addRole")}
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("adminDashboard.searchRoles")}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

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
                <TableHead>{t("adminDashboard.roleName")}</TableHead>
                <TableHead>{t("adminDashboard.description")}</TableHead>
                <TableHead>{t("adminDashboard.usersAssigned")}</TableHead>
                <TableHead>{t("adminDashboard.type")}</TableHead>
                <TableHead>{t("adminDashboard.createdAt")}</TableHead>
                <TableHead className="text-right">{t("adminDashboard.actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    {t("adminDashboard.noRolesFound")}
                  </TableCell>
                </TableRow>
              ) : (
                filteredRoles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Shield size={16} className="text-ice-600" />
                        {role.name}
                      </div>
                    </TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>{role.usersCount}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={role.isSystem ? "secondary" : "default"}
                        className={role.isSystem ? "bg-blue-100 text-blue-800 hover:bg-blue-100" : ""}
                      >
                        {role.isSystem ? t("adminDashboard.system") : t("adminDashboard.custom")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(role.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditRole(role)}
                          disabled={role.isSystem}
                        >
                          <Edit size={16} className="mr-1" />
                          {t("adminDashboard.edit")}
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleDeleteRole(role)}
                          disabled={role.isSystem || role.usersCount > 0}
                        >
                          <Trash size={16} className="mr-1" />
                          {t("adminDashboard.delete")}
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
              {t("adminDashboard.addNewRole")}
            </DialogTitle>
            <DialogDescription>
              {t("adminDashboard.createRoleDescription")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                {t("adminDashboard.roleName")}
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              {t("adminDashboard.cancel")}
            </Button>
            <Button onClick={submitCreateRole}>
              {t("adminDashboard.createRole")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {t("adminDashboard.editRole")}
            </DialogTitle>
            <DialogDescription>
              {t("adminDashboard.editRoleDescription")}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                {t("adminDashboard.roleName")}
              </Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                {t("adminDashboard.description")}
              </Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t("adminDashboard.cancel")}
            </Button>
            <Button onClick={submitEditRole}>
              {t("adminDashboard.updateRole")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Role Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("adminDashboard.areYouSure")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("adminDashboard.deleteRoleWarning", { roleName: currentRole?.name })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {t("adminDashboard.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction onClick={submitDeleteRole} className="bg-red-600">
              {t("adminDashboard.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RolesManagement;
