
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MemberDashboard from "@/components/member/MemberDashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-background">
        <ToastContainer />
        <MemberDashboard />
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
