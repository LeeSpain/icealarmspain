
import React from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRolesTranslation } from "./useRolesTranslation";

interface RolesHeaderProps {
  onCreateRole: () => void;
}

const RolesHeader: React.FC<RolesHeaderProps> = ({ onCreateRole }) => {
  const { t } = useRolesTranslation();

  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-ice-800">
          {t("Roles Management", "Roles Management")}
        </h2>
        <p className="text-muted-foreground">
          {t("Manage system roles and their permissions", "Manage system roles and their permissions")}
        </p>
      </div>
      <Button onClick={onCreateRole} className="flex items-center gap-2">
        <UserPlus size={16} />
        {t("Add Role", "Add Role")}
      </Button>
    </div>
  );
};

export default RolesHeader;
