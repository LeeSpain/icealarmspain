
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { QuestionnaireProvider } from './QuestionnaireContext';

interface QuestionnaireLayoutProps {
  children: React.ReactNode;
}

const QuestionnaireLayout: React.FC<QuestionnaireLayoutProps> = ({ children }) => {
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
