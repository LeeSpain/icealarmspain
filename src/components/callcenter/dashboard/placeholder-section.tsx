
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface PlaceholderSectionProps {
  title: string;
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ title }) => {
  // Format the title to be more readable
  const formatTitle = (title: string) => {
    // Replace hyphens with spaces and capitalize each word
    const formatted = title
      .split('-')
      .join(' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return formatted;
  };

  return (
    <Card className="h-full w-full">
      <CardHeader>
        <CardTitle>{formatTitle(title)}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-[80%]">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Coming Soon</h3>
          <p className="text-muted-foreground mb-6">
            This feature is currently under development and will be available soon.
          </p>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceholderSection;
