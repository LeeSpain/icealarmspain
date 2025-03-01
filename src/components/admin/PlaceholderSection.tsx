
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface PlaceholderSectionProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ 
  title, 
  description, 
  icon 
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          {icon && <div>{icon}</div>}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center py-16">
        <p className="text-muted-foreground text-center">
          This section is under development. <br />
          Coming soon.
        </p>
      </CardContent>
    </Card>
  );
};

export default PlaceholderSection;
