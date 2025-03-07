
import React from "react";
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
import { Role } from "./types";
import { useRolesTranslation } from "./useRolesTranslation";

interface DeleteRoleDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  currentRole: Role | null;
}

const DeleteRoleDialog: React.FC<DeleteRoleDialogProps> = ({
  isOpen,
  onOpenChange,
  onDelete,
  currentRole,
}) => {
  const { t } = useRolesTranslation();

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("Are you sure?", "Are you sure?")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("This will permanently delete the role. This action cannot be undone.", 
              `This will permanently delete the role "${currentRole?.name}". This action cannot be undone.`)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {t("Cancel", "Cancel")}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className="bg-red-600">
            {t("Delete", "Delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteRoleDialog;
