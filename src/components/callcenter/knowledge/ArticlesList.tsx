
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, User } from "lucide-react";
import { Article } from "./types";

interface ArticlesListProps {
  articles: Article[];
  searchQuery: string;
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles, searchQuery }) => {
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "device":
        return <Badge className="bg-blue-100 text-blue-800">Device</Badge>;
      case "troubleshooting":
        return <Badge className="bg-purple-100 text-purple-800">Troubleshooting</Badge>;
      case "policy":
        return <Badge className="bg-green-100 text-green-800">Policy</Badge>;
      default:
        return <Badge>{category}</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      {articles.length > 0 ? (
        articles.map((article) => (
          <Card key={article.id} className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-2 md:space-y-0">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-medium">{article.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  {getCategoryBadge(article.category)}
                  <div className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.lastUpdated}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-8">
          <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-medium">No articles found</h3>
          <p className="text-sm text-muted-foreground">
            {searchQuery 
              ? `No results found for "${searchQuery}". Try a different search term.` 
              : "No articles available in this category."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ArticlesList;
