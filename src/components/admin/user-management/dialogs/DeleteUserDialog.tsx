
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

interface DeleteUserDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedUser: any;
  onDeleteUser: () => void;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  isOpen,
  setIsOpen,
  selectedUser,
  onDeleteUser
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-white max-w-md mx-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold text-gray-900">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600">
            This will permanently delete the user {selectedUser?.displayName || selectedUser?.email}. 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex space-x-2 pt-4">
          <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-100">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onDeleteUser} 
            className="bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
