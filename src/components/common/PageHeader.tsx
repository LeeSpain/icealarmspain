
import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-ice-800">{title}</h1>
        <p className="text-muted-foreground">{subtitle}</p>
      </div>
    </header>
  );
};

export default PageHeader;
