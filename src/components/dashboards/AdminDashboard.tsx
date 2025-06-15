import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Users, Building2, Heart, Store, Settings, BarChart3, Shield, AlertTriangle, TrendingUp, MapPin, Eye, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import VendorManagementModal from '@/components/modals/VendorManagementModal';
import UserManagementModal from '@/components/modals/UserManagementModal';
import AnalyticsModal from '@/components/modals/AnalyticsModal';
import SystemSettingsModal from '@/components/modals/SystemSettingsModal';

const AdminDashboard = () => {
  const { user, profile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showVendorManagement, setShowVendorManagement] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showSystemSettingsModal, setShowSystemSettingsModal] = useState(false);
  const { toast } = useToast();

  // Mock data for analytics
  const fundingData = [
    { month: 'Jan', amount: 45000, vendors: 12 },
    { month: 'Feb', amount: 52000, vendors: 18 },
    { month: 'Mar', amount: 38000, vendors: 15 },
    { month: 'Apr', amount: 61000, vendors: 22 },
    { month: 'May', amount: 55000, vendors: 19 },
    { month: 'Jun', amount: 67000, vendors: 25 },
  ];

  const trustScoreData = [
    { range: '90-100', count: 45, color: '#10B981' },
    { range: '80-89', count: 78, color: '#3B82F6' },
    { range: '70-79', count: 62, color: '#F59E0B' },
    { range: '60-69', count: 23, color: '#EF4444' },
    { range: '0-59', count: 8, color: '#6B7280' },
  ];

  const vendorData = [
    { id: 1, name: 'Local Market Vendor', trustScore: 85, location: 'Mumbai, India', status: 'Active', flagged: false },
    { id: 2, name: 'Street Food Corner', trustScore: 92, location: 'Delhi, India', status: 'Active', flagged: false },
    { id: 3, name: 'Textile Shop', trustScore: 67, location: 'Bangalore, India', status: 'Under Review', flagged: true },
    { id: 4, name: 'Handicraft Store', trustScore: 78, location: 'Jaipur, India', status: 'Active', flagged: false },
    { id: 5, name: 'Electronics Repair', trustScore: 45, location: 'Chennai, India', status: 'Flagged', flagged: true },
  ];

  const fraudAlerts = [
    { id: 1, vendor: 'Electronics Repair', issue: 'Duplicate documentation detected', severity: 'high', time: '2 hours ago' },
    { id: 2, vendor: 'Textile Shop', issue: 'Location verification failed', severity: 'medium', time: '5 hours ago' },
    { id: 3, vendor: 'Unknown Vendor', issue: 'Suspicious funding pattern', severity: 'high', time: '1 day ago' },
  ];

  const adminStats = [
    { title: 'Total Users', value: '1,247', icon: Users, color: 'text-blue-600', change: '+12%' },
    { title: 'Active Vendors', value: '342', icon: Store, color: 'text-green-600', change: '+8%' },
    { title: 'NGO Partners', value: '89', icon: Heart, color: 'text-red-600', change: '+15%' },
    { title: 'Corporate Partners', value: '45', icon: Building2, color: 'text-purple-600', change: '+5%' },
  ];

  const handleViewVendor = (vendorId: number, vendorName: string) => {
    toast({
      title: "Vendor Details",
      description: `Viewing detailed profile and history for ${vendorName}.`,
    });
  };

  const handleFlagVendor = (vendorId: number, vendorName: string) => {
    toast({
      title: "Vendor Flagged",
      description: `${vendorName} has been flagged for manual review. Admin team will investigate.`,
    });
  };

  const handleReviewAlert = (alertId: number, issue: string) => {
    toast({
      title: "Alert Under Review",
      description: `Reviewing fraud alert: "${issue}". Investigation started.`,
    });
  };

  const handleManageVendors = () => {
    setShowVendorManagement(true);
  };

  const handleManageUsers = () => {
    setShowUserManagement(true);
  };

  const handleSystemSettings = () => {
    setShowSystemSettingsModal(true);
  };

  const handleSecurityAudit = () => {
    toast({
      title: "Security Audit",
      description: "Initiating comprehensive security audit of all platform activities and user behaviors.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data Export",
      description: "Generating comprehensive platform data export. This may take a few minutes.",
    });
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-green-600 font-medium">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-200">
          <CardHeader>
            <UserCheck className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Manage Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Review, approve, and manage vendor applications</p>
            <Button className="w-full" onClick={handleManageVendors}>
              <UserCheck className="h-4 w-4 mr-2" />
              Vendor Management
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-200">
          <CardHeader>
            <Users className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Monitor and manage all platform users</p>
            <Button className="w-full" variant="outline" onClick={handleManageUsers}>
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-200">
          <CardHeader>
            <Shield className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Security Audit</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Run comprehensive security checks</p>
            <Button className="w-full" variant="outline" onClick={handleSecurityAudit}>
              <Shield className="h-4 w-4 mr-2" />
              Security Audit
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-orange-200">
          <CardHeader>
            <Settings className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>System Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Configure platform settings and controls</p>
            <Button className="w-full" variant="outline" onClick={handleSystemSettings}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Funding Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ amount: { label: 'Amount', color: '#3B82F6' } }} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fundingData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="amount" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Trust Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ count: { label: 'Vendors', color: '#10B981' } }} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trustScoreData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="count"
                    label={({ range, count }) => `${range}: ${count}`}
                  >
                    {trustScoreData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Fraud Alerts */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <span>Recent Fraud Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {fraudAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${alert.severity === 'high' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                  <div>
                    <p className="font-medium">{alert.vendor}</p>
                    <p className="text-sm text-gray-600">{alert.issue}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{alert.time}</p>
                  <Button size="sm" variant="outline" onClick={() => handleReviewAlert(alert.id, alert.issue)}>
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTrustScoring = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vendor Trust Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Trust Score</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendorData.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        vendor.trustScore >= 80 ? 'bg-green-500' : 
                        vendor.trustScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                      <span>{vendor.trustScore}/100</span>
                    </div>
                  </TableCell>
                  <TableCell className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{vendor.location}</span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      vendor.status === 'Active' ? 'bg-green-100 text-green-800' :
                      vendor.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {vendor.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleViewVendor(vendor.id, vendor.name)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {vendor.flagged && (
                        <Button size="sm" variant="destructive" onClick={() => handleFlagVendor(vendor.id, vendor.name)}>
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Platform Growth Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ vendors: { label: 'New Vendors', color: '#10B981' } }} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fundingData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="vendors" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Impact Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Lives Impacted</span>
              <span className="font-bold">12,450</span>
            </div>
            <div className="flex justify-between">
              <span>Businesses Improved</span>
              <span className="font-bold">342</span>
            </div>
            <div className="flex justify-between">
              <span>Total Funding</span>
              <span className="font-bold">₹2.4M</span>
            </div>
            <div className="flex justify-between">
              <span>Success Rate</span>
              <span className="font-bold">87%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Mumbai</span>
              <span className="font-bold">45%</span>
            </div>
            <div className="flex justify-between">
              <span>Delhi</span>
              <span className="font-bold">28%</span>
            </div>
            <div className="flex justify-between">
              <span>Bangalore</span>
              <span className="font-bold">15%</span>
            </div>
            <div className="flex justify-between">
              <span>Others</span>
              <span className="font-bold">12%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Real-time Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>New vendor registered</span>
              <span className="text-gray-500">2m ago</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>Funding approved</span>
              <span className="text-gray-500">5m ago</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
              <span>Review required</span>
              <span className="text-gray-500">8m ago</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {profile?.first_name || user?.email}! Monitor and manage the EmpowerLink platform.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowAnalyticsModal(true)} variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button onClick={handleExportData} variant="outline">
            Export Data
          </Button>
          <Button onClick={logout} variant="outline">Logout</Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 bg-white p-1 rounded-lg shadow-sm">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'trust', label: 'Trust Scoring', icon: Shield },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'settings', label: 'Settings', icon: Settings },
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
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'trust' && renderTrustScoring()}
      {activeTab === 'analytics' && renderAnalytics()}
      {activeTab === 'settings' && (
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Platform Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600 mb-4">Configure system-wide settings and platform controls.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button onClick={handleSystemSettings} className="justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  System Configuration
                </Button>
                <Button onClick={handleSecurityAudit} variant="outline" className="justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Settings
                </Button>
                <Button onClick={handleExportData} variant="outline" className="justify-start">
                  Export Platform Data
                </Button>
                <Button onClick={handleManageUsers} variant="outline" className="justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  User Permissions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <VendorManagementModal 
        isOpen={showVendorManagement} 
        onClose={() => setShowVendorManagement(false)} 
      />
      <UserManagementModal 
        isOpen={showUserManagement} 
        onClose={() => setShowUserManagement(false)} 
      />
      <AnalyticsModal 
        isOpen={showAnalyticsModal} 
        onClose={() => setShowAnalyticsModal(false)} 
        userType="admin"
      />
      <SystemSettingsModal
        isOpen={showSystemSettingsModal}
        onClose={() => setShowSystemSettingsModal(false)}
      />
    </div>
  );
};

export default AdminDashboard;
