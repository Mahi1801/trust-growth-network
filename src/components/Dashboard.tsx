
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import VendorDashboard from './dashboards/VendorDashboard';
import NGODashboard from './dashboards/NGODashboard';
import CorporateDashboard from './dashboards/CorporateDashboard';
import AdminDashboard from './dashboards/AdminDashboard';

const Dashboard = () => {
  const { user, profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to access your dashboard.</p>
        </div>
      </div>
    );
  }

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
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600">Unknown user type: {profile.user_type}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
