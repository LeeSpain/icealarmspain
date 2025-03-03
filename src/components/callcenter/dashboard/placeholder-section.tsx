
import React from "react";
import { CircleHelp } from "lucide-react";

interface PlaceholderSectionProps {
  title: string;
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ title }) => {
  // Format the title for display
  const formatTitle = (title: string) => {
    return title
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] bg-muted/20 rounded-lg border border-dashed p-10 text-center">
      <CircleHelp className="h-16 w-16 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-medium mb-2">{formatTitle(title)}</h2>
      <p className="text-muted-foreground max-w-md mx-auto">
        This section is currently under development. Coming soon to enhance your call center experience!
      </p>
    </div>
  );
};

export default PlaceholderSection;
