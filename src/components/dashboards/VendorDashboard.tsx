
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Camera, DollarSign, TrendingUp } from 'lucide-react';

const VendorDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
        </div>
        <Button onClick={logout} variant="outline">Logout</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <PlusCircle className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Submit New Request</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Request funding for business improvements</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <Camera className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Upload Progress Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Share before/after photos of improvements</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Track Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Monitor your funding and improvement status</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorDashboard;
