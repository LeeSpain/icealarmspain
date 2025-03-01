
import React from "react";
import MemberDashboard from "@/components/member/MemberDashboard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-ice-50/30 to-white">
      <main className="min-h-screen">
        <ToastContainer />
        <MemberDashboard />
      </main>
    </div>
  );
};

export default DashboardPage;
