
import React from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  activeTab, 
  setActiveTab 
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="relative w-full sm:w-64">
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8 border-ice-200 focus:border-ice-300"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full sm:w-auto"
      >
        <TabsList className="grid w-full grid-cols-4 bg-ice-50">
          <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-ice-800">All</TabsTrigger>
          <TabsTrigger value="admin" className="data-[state=active]:bg-white data-[state=active]:text-ice-800">Admins</TabsTrigger>
          <TabsTrigger value="callcenter" className="data-[state=active]:bg-white data-[state=active]:text-ice-800">Call Center</TabsTrigger>
          <TabsTrigger value="member" className="data-[state=active]:bg-white data-[state=active]:text-ice-800">Members</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
