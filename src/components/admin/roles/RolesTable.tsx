
import React from "react";
import { 
  Shield, 
  Pencil, 
  Trash2 
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Role } from "./types";
import { useRolesTranslation } from "./useRolesTranslation";

interface RolesTableProps {
  roles: Role[];
  loading: boolean;
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

const RolesTable: React.FC<RolesTableProps> = ({ roles, loading, onEdit, onDelete }) => {
  const { t } = useRolesTranslation();

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("Role", "Role")}</TableHead>
            <TableHead className="hidden md:table-cell">{t("Description", "Description")}</TableHead>
            <TableHead>{t("Status", "Status")}</TableHead>
            <TableHead className="text-center">{t("Users", "Users")}</TableHead>
            <TableHead className="text-center">{t("Permissions", "Permissions")}</TableHead>
            <TableHead className="text-right">{t("Actions", "Actions")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                {t("No roles found", "No roles found")}
              </TableCell>
            </TableRow>
          ) : (
            roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Shield size={16} className="text-ice-600" />
                    <div>
                      <div className="flex items-center">
                        {role.name}
                        {role.isDefault && (
                          <Badge className="ml-2 bg-ice-100 text-ice-800 hover:bg-ice-100">
                            {t("Default", "Default")}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground md:hidden mt-1">
                        {role.description.length > 60 
                          ? role.description.substring(0, 60) + '...' 
                          : role.description}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {role.description.length > 100 
                    ? role.description.substring(0, 100) + '...' 
                    : role.description}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={role.status === "active" ? "default" : "secondary"}
                    className={role.status === "active" 
                      ? "bg-green-100 text-green-800 hover:bg-green-100" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                    }
                  >
                    {role.status === "active" 
                      ? t("Active", "Active") 
                      : t("Inactive", "Inactive")}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">{role.userCount}</TableCell>
                <TableCell className="text-center">
                  <div className="flex flex-col items-center">
                    <span>{role.permissionCount}</span>
                    <Button variant="link" size="sm" className="p-0 h-auto text-xs underline">
                      {t("View Permissions", "View Permissions")}
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onEdit(role)}
                      disabled={!role.isMutable}
                    >
                      <Pencil size={16} className="mr-1" />
                      {t("Edit", "Edit")}
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => onDelete(role)}
                      disabled={!role.isMutable || role.isDefault}
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
  );
};

export default RolesTable;
