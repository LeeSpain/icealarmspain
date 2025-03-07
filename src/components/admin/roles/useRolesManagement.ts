
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Role, RoleFormData } from "./types";
import { fetchRoles, createRole } from "./rolesData";
import { useRolesTranslation } from "./useRolesTranslation";

export const useRolesManagement = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRoles, setFilteredRoles] = useState<Role[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState<RoleFormData>({
    name: "",
    description: "",
    status: "active",
  });
  const { t } = useRolesTranslation();

  // Fetch roles on component mount
  useEffect(() => {
    const loadRoles = async () => {
      setLoading(true);
      try {
        const data = await fetchRoles();
        setRoles(data);
      } catch (error) {
        console.error("Error fetching roles:", error);
        toast.error(t("Failed to load roles", "Failed to load roles"));
      } finally {
        setLoading(false);
      }
    };

    loadRoles();
  }, []);

  // Filter roles based on search query and active tab
  useEffect(() => {
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

    const newRole = createRole(formData.name, formData.description, formData.status);
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

  return {
    roles,
    loading,
    filteredRoles,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    currentRole,
    formData,
    setFormData,
    handleCreateRole,
    handleEditRole,
    handleDeleteRole,
    submitCreateRole,
    submitEditRole,
    submitDeleteRole
  };
};
