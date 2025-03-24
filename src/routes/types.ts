
import React from "react";

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  protected?: boolean;
  allowedRoles?: string[];
}
