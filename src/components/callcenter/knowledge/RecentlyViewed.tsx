
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, FileText } from "lucide-react";
import { Article } from "./types";

interface RecentlyViewedProps {
  articles: Article[];
}

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ articles }) => {
  // Get the 5 most recently updated articles as mock "recently viewed"
  const recentArticles = [...articles]
    .sort((a, b) => {
      const dateA = new Date(a.lastUpdated);
      const dateB = new Date(b.lastUpdated);
      return dateB.getTime() - dateA.getTime();
    })
    .slice(0, 5);
    
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          Recently Viewed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {recentArticles.map(article => (
            <li key={article.id} className="flex items-start space-x-2 py-1 cursor-pointer hover:text-ice-700">
              <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
              <div className="flex-1">
                <span className="text-sm leading-tight block">{article.title}</span>
                <span className="text-xs text-muted-foreground">Viewed {article.lastUpdated}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RecentlyViewed;
