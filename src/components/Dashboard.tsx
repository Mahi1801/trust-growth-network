
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import VendorDashboard from './dashboards/VendorDashboard';
import NGODashboard from './dashboards/NGODashboard';
import CorporateDashboard from './dashboards/CorporateDashboard';
import AdminDashboard from './dashboards/AdminDashboard';
import UserTypeSelector from './UserTypeSelector';

const Dashboard = () => {
  const { user, profile, isLoading } = useAuth();
  const [isUpdatingUserType, setIsUpdatingUserType] = useState(false);

  const handleUserTypeSelection = async (userType: string) => {
    if (!user || !profile) return;
    
    setIsUpdatingUserType(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ user_type: userType })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating user type:', error);
        toast.error('Failed to update user type. Please try again.');
        return;
      }

      toast.success('User type updated successfully!');
      // Force page refresh to get updated profile
      window.location.reload();
    } catch (error) {
      console.error('Error updating user type:', error);
      toast.error('Failed to update user type. Please try again.');
    } finally {
      setIsUpdatingUserType(false);
    }
  };

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

  // If user doesn't have a user_type set, show UserTypeSelector
  if (!profile.user_type) {
    return (
      <div className="relative">
        {isUpdatingUserType && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Setting up your account...</p>
            </div>
          </div>
        )}
        <UserTypeSelector onSelectType={handleUserTypeSelection} />
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
