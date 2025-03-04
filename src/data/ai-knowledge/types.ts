
export interface KnowledgeEntry {
  id: string;
  topic: string;
  keywords: string[];
  responses: {
    en: string[];
    es: string[];
  };
}
