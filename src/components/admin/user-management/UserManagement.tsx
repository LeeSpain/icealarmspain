
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/auth";
import { UserTable } from "./UserTable";
import { CreateUserDialog } from "./dialogs/CreateUserDialog";
import { EditRoleDialog } from "./dialogs/EditRoleDialog";
import { DeleteUserDialog } from "./dialogs/DeleteUserDialog";
import { UserManagementHeader } from "./UserManagementHeader";
import { UserFilters } from "./UserFilters";
import { useUserManagement } from "./hooks/useUserManagement";

interface UserManagementProps {
  onAction?: (action: string) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ onAction }) => {
  const { getAllUsers, createUser, updateUserRole, deleteUser } = useAuth();
  const {
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
    setIsCreateDialogOpen,
    setIsDeleteDialogOpen,
    setIsEditRoleDialogOpen,
    setSelectedUser,
    setSearchQuery,
    setActiveTab,
    setFormData,
    setNewRole,
    getFilteredUsers,
    getUserStatus,
    formatDate
  } = useUserManagement({ getAllUsers });

  const handleCreateUser = async () => {
    try {
      if (!formData.email || !formData.displayName || !formData.password) {
        toast.error("Please fill all the required fields");
        return;
      }

      await createUser(
        formData.email,
        formData.password,
        formData.displayName,
        formData.role
      );

      setIsCreateDialogOpen(false);
      setFormData({
        email: "",
        displayName: "",
        password: "",
        role: "member"
      });
      
      if (onAction) {
        onAction(`Created user ${formData.displayName}`);
      }
      
      toast.success("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user");
    }
  };

  const handleEditRole = async () => {
    try {
      if (!selectedUser || !newRole) {
        toast.error("Please select a role");
        return;
      }

      await updateUserRole(selectedUser.id, newRole);

      setIsEditRoleDialogOpen(false);
      setSelectedUser(null);
      setNewRole("");
      
      if (onAction) {
        onAction(`Updated user role to ${newRole}`);
      }
      
      toast.success("User role updated successfully");
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role");
    }
  };

  const handleDeleteUser = async () => {
    try {
      if (!selectedUser) return;

      await deleteUser(selectedUser.id);

      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
      
      if (onAction) {
        onAction(`Deleted user ${selectedUser.displayName || selectedUser.email}`);
      }
      
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const openEditRoleDialog = (user: any) => {
    setSelectedUser(user);
    setNewRole(user.role || "member");
    setIsEditRoleDialogOpen(true);
  };

  const openDeleteDialog = (user: any) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <UserManagementHeader onCreateUser={() => setIsCreateDialogOpen(true)} />
      
      <UserFilters 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <UserTable 
        loading={loading} 
        users={getFilteredUsers()} 
        getUserStatus={getUserStatus} 
        formatDate={formatDate} 
        onEditRole={openEditRoleDialog}
        onDeleteUser={openDeleteDialog}
      />

      <CreateUserDialog
        isOpen={isCreateDialogOpen}
        setIsOpen={setIsCreateDialogOpen}
        formData={formData}
        setFormData={setFormData}
        onCreateUser={handleCreateUser}
      />

      <EditRoleDialog
        isOpen={isEditRoleDialogOpen}
        setIsOpen={setIsEditRoleDialogOpen}
        selectedUser={selectedUser}
        newRole={newRole}
        setNewRole={setNewRole}
        onEditRole={handleEditRole}
      />

      <DeleteUserDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        selectedUser={selectedUser}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
};

export default UserManagement;
