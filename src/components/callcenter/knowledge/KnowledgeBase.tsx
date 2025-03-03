
import React, { useState } from "react";
import { Search, Book, BookOpen, FileText, Star, Clock, Filter, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ArticlesList from "./ArticlesList";
import PopularArticles from "./PopularArticles";
import RecentlyViewed from "./RecentlyViewed";
import { mockArticles } from "./mock-data";
import { toast } from "react-toastify";

const KnowledgeBase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredArticles = searchQuery 
    ? mockArticles.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockArticles;
    
  const handleCreateArticle = () => {
    toast.info("Create new article functionality will be available soon");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Knowledge Base</h2>
          <p className="text-muted-foreground">
            Access and manage support resources and documentation
          </p>
        </div>
        
        <Button onClick={handleCreateArticle}>
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <CardTitle>Documentation Library</CardTitle>
              <CardDescription>
                Search and browse all available support materials
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3 space-y-6">
              <div className="relative">
                <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search articles, guides, and documentation..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                    <TabsTrigger value="devices" className="text-xs">Devices</TabsTrigger>
                    <TabsTrigger value="troubleshooting" className="text-xs">Troubleshooting</TabsTrigger>
                    <TabsTrigger value="policies" className="text-xs">Policies</TabsTrigger>
                  </TabsList>
                  
                  <Button variant="outline" size="sm">
                    <Filter className="h-3 w-3 mr-1" /> Filter
                  </Button>
                </div>
                
                <TabsContent value="all" className="pt-4">
                  <ArticlesList 
                    articles={filteredArticles} 
                    searchQuery={searchQuery}
                  />
                </TabsContent>
                
                <TabsContent value="devices" className="pt-4">
                  <ArticlesList 
                    articles={filteredArticles.filter(a => a.category === "device")} 
                    searchQuery={searchQuery}
                  />
                </TabsContent>
                
                <TabsContent value="troubleshooting" className="pt-4">
                  <ArticlesList 
                    articles={filteredArticles.filter(a => a.category === "troubleshooting")} 
                    searchQuery={searchQuery}
                  />
                </TabsContent>
                
                <TabsContent value="policies" className="pt-4">
                  <ArticlesList 
                    articles={filteredArticles.filter(a => a.category === "policy")} 
                    searchQuery={searchQuery}
                  />
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="md:w-1/3 space-y-6">
              <PopularArticles articles={mockArticles} />
              <RecentlyViewed articles={mockArticles} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeBase;
