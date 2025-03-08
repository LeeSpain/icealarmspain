
import { useState, useEffect } from "react";

interface UseUserManagementProps {
  getAllUsers: () => Promise<any[]>;
}

export const useUserManagement = ({ getAllUsers }: UseUserManagementProps) => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditRoleDialogOpen, setIsEditRoleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    password: "",
    role: "member"
  });
  const [newRole, setNewRole] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredUsers = () => {
    let filtered = [...users];
    
    if (searchQuery) {
      filtered = filtered.filter(user => 
        (user.displayName && user.displayName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.role && user.role.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (activeTab !== "all") {
      filtered = filtered.filter(user => user.role === activeTab);
    }
    
    return filtered;
  };

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString();
  };

  const getUserStatus = (user: any) => {
    if (user.status) return user.status;
    return user.lastLogin ? "active" : "pending";
  };

  return {
    users,
    loading,
    isCreateDialogOpen,
    isDeleteDialogOpen,
    isEditRoleDialogOpen,
    selectedUser,
    searchQuery,
    activeTab,
    formData,
    newRole,
    setUsers,
    setLoading,
    setIsCreateDialogOpen,
    setIsDeleteDialogOpen,
    setIsEditRoleDialogOpen,
    setSelectedUser,
    setSearchQuery,
    setActiveTab,
    setFormData,
    setNewRole,
    fetchUsers,
    getFilteredUsers,
    formatDate,
    getUserStatus
  };
};
