
import React from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRolesTranslation } from "./useRolesTranslation";

interface RolesFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const RolesFilter: React.FC<RolesFilterProps> = ({ 
  searchQuery, 
  setSearchQuery, 
  activeTab, 
  setActiveTab 
}) => {
  const { t } = useRolesTranslation();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="relative w-full sm:w-64">
        <Input
          placeholder={t("Search roles...", "Search roles...")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">{t("All", "All")}</TabsTrigger>
          <TabsTrigger value="active">{t("Active", "Active")}</TabsTrigger>
          <TabsTrigger value="inactive">{t("Inactive", "Inactive")}</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default RolesFilter;
