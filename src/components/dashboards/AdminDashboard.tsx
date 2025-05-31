
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, Heart, Store, Settings, BarChart3, Shield } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const adminStats = [
    { title: 'Total Users', value: '1,247', icon: Users, color: 'text-blue-600' },
    { title: 'Active Vendors', value: '342', icon: Store, color: 'text-green-600' },
    { title: 'NGO Partners', value: '89', icon: Heart, color: 'text-red-600' },
    { title: 'Corporate Partners', value: '45', icon: Building2, color: 'text-purple-600' },
  ];

  const adminActions = [
    { title: 'User Management', description: 'Manage all platform users', icon: Users },
    { title: 'System Settings', description: 'Configure platform settings', icon: Settings },
    { title: 'Analytics Dashboard', description: 'View detailed analytics', icon: BarChart3 },
    { title: 'Security Management', description: 'Manage security policies', icon: Shield },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.firstName}!</p>
        </div>
        <Button onClick={logout} variant="outline">Logout</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {adminStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminActions.map((action, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <action.icon className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-lg">{action.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{action.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
