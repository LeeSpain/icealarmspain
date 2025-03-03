
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Code, ArrowRight } from "lucide-react";

interface PlaceholderSectionProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  estimatedCompletion?: string;
  suggestedAction?: {
    label: string;
    onClick: () => void;
  };
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ 
  title, 
  description, 
  icon,
  estimatedCompletion,
  suggestedAction
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
      <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
        <div className="p-4 bg-amber-50 rounded-full">
          {icon || <Lightbulb className="h-8 w-8 text-amber-500" />}
        </div>
        <div className="text-center max-w-md">
          <h3 className="text-lg font-medium mb-2">
            This section is under development
          </h3>
          <p className="text-muted-foreground">
            We're currently working on building this feature to provide you with the best experience.
            {estimatedCompletion && (
              <span className="block mt-2">
                Expected completion: <span className="font-medium">{estimatedCompletion}</span>
              </span>
            )}
          </p>
          
          <div className="mt-6 p-4 border border-dashed border-muted-foreground/30 rounded-md bg-muted/30">
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Developer Notes</span>
            </div>
            <p className="text-sm text-muted-foreground">
              This component is a placeholder for sections that are still in development.
              Replace it with actual content when the feature is ready.
            </p>
          </div>
        </div>
      </CardContent>
      
      {suggestedAction && (
        <CardFooter className="flex justify-center pb-6">
          <Button 
            variant="outline"
            onClick={suggestedAction.onClick}
            className="group"
          >
            {suggestedAction.label}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PlaceholderSection;
