
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Settings, Users, Layout } from "lucide-react";
import { toast } from "react-toastify";

interface PlaceholderSectionProps {
  title: string;
  description: string;
  onAction?: (action: string) => void;
}

const PlaceholderSection: React.FC<PlaceholderSectionProps> = ({ 
  title, 
  description,
  onAction 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleAction = (action: string) => {
    setIsLoading(true);
    
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
      toast.info(`${action} requested for ${title}`);
      if (onAction) {
        onAction(`${action} requested for ${title}`);
      }
    }, 800);
  };
  
  const getIcon = () => {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('user') || lowerTitle.includes('client') || lowerTitle.includes('customer')) {
      return <Users className="h-12 w-12 text-primary/20" />;
    }
    
    if (lowerTitle.includes('report') || lowerTitle.includes('document') || lowerTitle.includes('file')) {
      return <FileText className="h-12 w-12 text-primary/20" />;
    }
    
    if (lowerTitle.includes('setting') || lowerTitle.includes('config')) {
      return <Settings className="h-12 w-12 text-primary/20" />;
    }
    
    return <Layout className="h-12 w-12 text-primary/20" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-ice-800">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Button onClick={() => handleAction('Create new')} disabled={isLoading} className="flex items-center gap-2">
          {isLoading ? (
            <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          Create New
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            The {title} functionality is under development and will be available soon.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center py-10">
          {getIcon()}
          <p className="mt-4 text-center text-muted-foreground max-w-md">
            We're currently working on the {title.toLowerCase()} module. It will provide tools to manage and monitor {title.toLowerCase()} effectively.
          </p>
          <div className="flex gap-4 mt-6">
            <Button variant="outline" onClick={() => handleAction('Request early access')} disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Request Early Access'}
            </Button>
            <Button onClick={() => handleAction('Subscribe to updates')} disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Subscribe to Updates'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlaceholderSection;
