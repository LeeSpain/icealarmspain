
import React from "react";
import RolesHeader from "./roles/RolesHeader";
import RolesFilter from "./roles/RolesFilter";
import RolesTable from "./roles/RolesTable";
import RoleFormDialog from "./roles/RoleFormDialog";
import DeleteRoleDialog from "./roles/DeleteRoleDialog";
import { useRolesManagement } from "./roles/useRolesManagement";
import { useRolesTranslation } from "./roles/useRolesTranslation";

const RolesManagement: React.FC<{ onAction: (action: string) => void }> = ({ onAction }) => {
  const { t } = useRolesTranslation();
  const {
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
  } = useRolesManagement();

  // Notify parent component about actions
  const notifyAction = (action: string) => {
    if (onAction) {
      onAction(action);
    }
  };

  const handleCreateSubmit = () => {
    submitCreateRole();
    notifyAction("created new role");
  };

  const handleEditSubmit = () => {
    submitEditRole();
    notifyAction(`updated role ${currentRole?.name}`);
  };

  const handleDeleteSubmit = () => {
    submitDeleteRole();
    notifyAction(`deleted role ${currentRole?.name}`);
  };

  return (
    <div className="space-y-6">
      <RolesHeader onCreateRole={handleCreateRole} />
      
      <RolesFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <RolesTable
        roles={filteredRoles}
        loading={loading}
        onEdit={handleEditRole}
        onDelete={handleDeleteRole}
      />
      
      {/* Create Role Dialog */}
      <RoleFormDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        title={t("Create Role", "Create Role")}
        description={t("Add a new role to the system", "Add a new role to the system")}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleCreateSubmit}
        submitLabel={t("Create", "Create")}
      />
      
      {/* Edit Role Dialog */}
      <RoleFormDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        title={t("Edit Role", "Edit Role")}
        description={t("Update role information", "Update role information")}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleEditSubmit}
        submitLabel={t("Update", "Update")}
      />
      
      {/* Delete Role Dialog */}
      <DeleteRoleDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onDelete={handleDeleteSubmit}
        currentRole={currentRole}
      />
    </div>
  );
};

export default RolesManagement;
