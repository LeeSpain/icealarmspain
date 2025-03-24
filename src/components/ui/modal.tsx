
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ModalProps {
  isVisible: boolean;
  title: string;
  message: string;
  variant?: 'default' | 'destructive' | 'success';
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isVisible,
  title,
  message,
  variant = 'default',
  onClose
}) => {
  if (!isVisible) return null;

  return (
    <Dialog open={isVisible} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={`sm:max-w-md ${
        variant === 'destructive' ? 'border-red-500' :
        variant === 'success' ? 'border-green-500' : ''
      }`}>
        <DialogHeader>
          <DialogTitle className={`${
            variant === 'destructive' ? 'text-red-500' :
            variant === 'success' ? 'text-green-500' : ''
          }`}>{title}</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <DialogDescription>{message}</DialogDescription>
        <div className="flex justify-end">
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
