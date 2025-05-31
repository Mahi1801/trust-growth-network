
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, DollarSign, Users, BarChart } from 'lucide-react';

const NGODashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">NGO Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
        </div>
        <Button onClick={logout} variant="outline">Logout</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <FileText className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Review Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Review vendor funding requests</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <DollarSign className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Distribute Funding</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Manage and distribute funds to vendors</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <Users className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Monitor Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Track vendor improvement progress</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <BarChart className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>Impact Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Generate comprehensive impact reports</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NGODashboard;
