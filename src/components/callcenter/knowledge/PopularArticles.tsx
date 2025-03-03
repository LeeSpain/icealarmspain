
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, FileText } from "lucide-react";
import { Article } from "./types";

interface PopularArticlesProps {
  articles: Article[];
  onArticleClick?: (articleId: number) => void;
}

const PopularArticles: React.FC<PopularArticlesProps> = ({ 
  articles, 
  onArticleClick 
}) => {
  // Get the 5 most viewed articles
  const popularArticles = [...articles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);
    
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center">
          <Star className="h-4 w-4 text-yellow-500 mr-1" />
          Popular Articles
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {popularArticles.map(article => (
            <li 
              key={article.id} 
              className="flex items-start space-x-2 py-1 cursor-pointer hover:text-ice-700"
              onClick={() => onArticleClick && onArticleClick(article.id)}
            >
              <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span className="text-sm leading-tight">{article.title}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PopularArticles;
