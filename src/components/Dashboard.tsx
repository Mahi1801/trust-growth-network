
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import VendorDashboard from './dashboards/VendorDashboard';
import NGODashboard from './dashboards/NGODashboard';
import CorporateDashboard from './dashboards/CorporateDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

const Dashboard = () => {
  const { user, profile } = useAuth();

  if (!user || !profile) return null;

  const renderDashboard = () => {
    switch (profile.user_type) {
      case 'vendor':
        return <VendorDashboard />;
      case 'ngo':
        return <NGODashboard />;
      case 'corporate':
        return <CorporateDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Unknown user type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
