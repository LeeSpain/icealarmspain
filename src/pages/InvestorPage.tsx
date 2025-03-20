
import React from 'react';
import Layout from '../components/layout/Layout';
import InvestorHero from '../components/investors/InvestorHero';
import CompanyOverview from '../components/investors/CompanyOverview';
import FinancialForecast from '../components/investors/FinancialForecast';
import ROICalculator from '../components/investors/ROICalculator';
import InvestmentOpportunity from '../components/investors/InvestmentOpportunity';
import ContactSection from '../components/investors/ContactSection';
import SEO from '../components/layout/SEO';

const InvestorPage: React.FC = () => {
  return (
    <Layout>
      <SEO 
        title="Investor Information | ICE Alarm" 
        description="Investment opportunities in ICE Alarm - the innovative AI-powered health monitoring and emergency response system."
      />
      <InvestorHero />
      <CompanyOverview />
      <FinancialForecast />
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Investment ROI Calculator</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Use the interactive calculator below to estimate potential returns on your investment in ICE Alarm.
            </p>
          </div>
          <ROICalculator />
        </div>
      </div>
      <InvestmentOpportunity />
      <ContactSection />
    </Layout>
  );
};

export default InvestorPage;
