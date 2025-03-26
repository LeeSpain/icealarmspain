
import React, { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  actions?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, actions }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-8 px-6 mt-16">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-ice-800">{title}</h1>
            <p className="text-muted-foreground text-lg mt-2">{subtitle}</p>
          </div>
          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
