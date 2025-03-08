import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MemberSidebar from "@/components/member/MemberSidebar";
import { QuestionnaireProvider } from './QuestionnaireContext';

interface QuestionnaireLayoutProps {
  children: React.ReactNode;
}

const QuestionnaireLayout: React.FC<QuestionnaireLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  
  if (isDashboardRoute) {
    return (
      <QuestionnaireProvider>
        <div className="flex-1 overflow-auto">
          <div className="p-6 w-full">
            {children}
          </div>
        </div>
      </QuestionnaireProvider>
    );
  }
  
  return (
    <QuestionnaireProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-28 pb-16">
          {children}
        </main>
        <Footer />
      </div>
    </QuestionnaireProvider>
  );
};

export default QuestionnaireLayout;
