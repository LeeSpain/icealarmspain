
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { MultiEntry } from "@/components/questionnaire/types";

interface MultiEntryCardProps {
  title: string;
  description: string;
  items: MultiEntry[];
  addButtonLabel: string;
  emptyStateText: string;
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  renderItem: (item: MultiEntry, index: number) => React.ReactNode;
}

const MultiEntryCard: React.FC<MultiEntryCardProps> = ({
  title,
  description,
  items,
  addButtonLabel,
  emptyStateText,
  onAddItem,
  onRemoveItem,
  renderItem
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onAddItem}
        >
          <PlusCircle className="h-4 w-4 mr-1" />
          {addButtonLabel}
        </Button>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={item._id} className="border rounded-md p-4 mb-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-medium">
                  {renderItem(item, index)}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveItem(item._id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              {renderItem(item, index)}
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            {emptyStateText}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MultiEntryCard;
