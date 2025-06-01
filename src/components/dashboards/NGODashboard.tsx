import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileText, DollarSign, Users, BarChart3, Eye, CheckCircle, Clock, AlertTriangle, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const NGODashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('applications');
  const { toast } = useToast();

  // Mock data
  const fundingData = [
    { month: 'Jan', approved: 45000, pending: 15000, rejected: 5000 },
    { month: 'Feb', approved: 52000, pending: 18000, rejected: 7000 },
    { month: 'Mar', approved: 38000, pending: 12000, rejected: 3000 },
    { month: 'Apr', approved: 61000, pending: 22000, rejected: 8000 },
  ];

  const impactData = [
    { category: 'Equipment', value: 45, color: '#3B82F6' },
    { category: 'Infrastructure', value: 30, color: '#10B981' },
    { category: 'Training', value: 15, color: '#F59E0B' },
    { category: 'Technology', value: 10, color: '#EF4444' },
  ];

  const pendingApplications = [
    { id: 1, vendor: 'Local Market Vendor', amount: 50000, location: 'Mumbai', trustScore: 85, submitted: '2 days ago', priority: 'high' },
    { id: 2, vendor: 'Street Food Corner', amount: 25000, location: 'Delhi', trustScore: 92, submitted: '3 days ago', priority: 'medium' },
    { id: 3, vendor: 'Handicraft Store', amount: 75000, location: 'Jaipur', trustScore: 78, submitted: '5 days ago', priority: 'high' },
    { id: 4, vendor: 'Electronics Repair', amount: 30000, location: 'Chennai', trustScore: 67, submitted: '1 week ago', priority: 'low' },
  ];

  const stats = [
    { title: 'Applications Reviewed', value: '234', icon: FileText, color: 'text-blue-600' },
    { title: 'Funds Distributed', value: '₹2.4M', icon: DollarSign, color: 'text-green-600' },
    { title: 'Vendors Helped', value: '156', icon: Users, color: 'text-purple-600' },
    { title: 'Success Rate', value: '87%', icon: BarChart3, color: 'text-orange-600' },
  ];

  const handleViewApplication = (appId: number) => {
    toast({
      title: "Application Details",
      description: `Viewing detailed application #${appId} with documents and verification status.`,
    });
  };

  const handleApproveApplication = (appId: number, vendor: string) => {
    toast({
      title: "Application Approved",
      description: `Funding request from ${vendor} has been approved and will be processed.`,
    });
  };

  const renderApplications = () => (
    <Card>
      <CardHeader>
        <CardTitle>Pending Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Trust Score</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingApplications.map((app) => (
              <TableRow key={app.id}>
                <TableCell className="font-medium">{app.vendor}</TableCell>
                <TableCell>₹{app.amount.toLocaleString()}</TableCell>
                <TableCell className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{app.location}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      app.trustScore >= 80 ? 'bg-green-500' : 
                      app.trustScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span>{app.trustScore}/100</span>
                  </div>
                </TableCell>
                <TableCell>{app.submitted}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    app.priority === 'high' ? 'bg-red-100 text-red-800' :
                    app.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {app.priority}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleViewApplication(app.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleApproveApplication(app.id, app.vendor)}>
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Funding Distribution by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ approved: { label: 'Approved', color: '#10B981' } }} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fundingData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Bar dataKey="approved" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="pending" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Impact by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ value: { label: 'Percentage', color: '#3B82F6' } }} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={impactData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ category, value }) => `${category}: ${value}%`}
                  >
                    {impactData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">NGO Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.firstName}! Review applications and distribute funding.</p>
        </div>
        <Button onClick={logout} variant="outline">Logout</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
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

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-white p-1 rounded-lg shadow-sm">
        {[
          { id: 'applications', label: 'Review Applications', icon: FileText },
          { id: 'analytics', label: 'Impact Analytics', icon: BarChart3 },
          { id: 'monitoring', label: 'Monitor Progress', icon: Users },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'applications' && renderApplications()}
      {activeTab === 'analytics' && renderAnalytics()}
      {activeTab === 'monitoring' && (
        <Card>
          <CardHeader>
            <CardTitle>Vendor Progress Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Real-time vendor progress tracking and milestone monitoring will be implemented here.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NGODashboard;
