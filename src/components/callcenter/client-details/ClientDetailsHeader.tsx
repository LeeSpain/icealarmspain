
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Edit, Save, X } from "lucide-react";
import { Client } from "./types";
import { formatDate } from "./utils";

interface ClientDetailsHeaderProps {
  client: Client;
  editMode: boolean;
  setEditMode: (value: boolean) => void;
  onSave: () => void;
}

const ClientDetailsHeader: React.FC<ClientDetailsHeaderProps> = ({ 
  client, 
  editMode, 
  setEditMode, 
  onSave 
}) => {
  return (
    <div className="flex justify-between">
      <div>
        <CardTitle className="text-xl flex items-center gap-2">
          <User className="h-5 w-5" />
          {client.name}
        </CardTitle>
        <CardDescription>
          Client since {formatDate(client.joinDate)}
        </CardDescription>
      </div>
      <div className="flex gap-2">
        {editMode ? (
          <>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setEditMode(false)}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button 
              size="sm"
              onClick={onSave}
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </>
        ) : (
          <Button 
            size="sm"
            onClick={() => setEditMode(true)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        )}
      </div>
    </div>
  );
};

export default ClientDetailsHeader;
