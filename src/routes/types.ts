
import { ReactNode } from "react";

export interface RouteConfig {
  path: string;
  element: ReactNode;
  protected?: boolean;
  allowedRoles?: string[];
  priority?: 'highest' | 'high' | 'normal' | 'low' | 'lowest'; // Added priority property
}
