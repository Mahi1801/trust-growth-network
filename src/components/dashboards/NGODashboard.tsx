
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, MapPin, TrendingUp, DollarSign, CheckCircle, Clock, AlertCircle, Plus, Eye } from 'lucide-react';
import { CountUp } from '@/components/ui/count-up';
import CampaignModal from '@/components/modals/CampaignModal';
import AnalyticsModal from '@/components/modals/AnalyticsModal';
import VendorManagementModal from '@/components/modals/VendorManagementModal';

const NGODashboard = () => {
  const { user, profile, logout } = useAuth();
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showVendorManagementModal, setShowVendorManagementModal] = useState(false);

  const vendorData = [
    { id: 1, name: 'Eco Crafts', location: 'Mumbai', status: 'Verified', funding: 50000 },
    { id: 2, name: 'Organic Foods Co', location: 'Delhi', status: 'Pending', funding: 30000 },
    { id: 3, name: 'Sustainable Textiles', location: 'Bangalore', status: 'Verified', funding: 75000 },
  ];

  const campaignData = [
    { id: 1, title: 'Empower Rural Artisans', goal: 100000, raised: 75000, status: 'Active' },
    { id: 2, title: 'Support Urban Farmers', goal: 50000, raised: 42000, status: 'Completed' },
  ];

  const keyMetrics = [
    { label: 'Vendors Supported', value: 156, icon: Users, color: 'text-blue-600' },
    { label: 'Funds Distributed', value: '₹2.35M', icon: DollarSign, color: 'text-green-600' },
    { label: 'Active Campaigns', value: 3, icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Regional Coverage', value: 7, icon: MapPin, color: 'text-orange-600' },
  ];

  const impactData = [
    { month: 'Jan', vendorsHelped: 45, fundsDistributed: 450000 },
    { month: 'Feb', vendorsHelped: 52, fundsDistributed: 520000 },
    { month: 'Mar', vendorsHelped: 61, fundsDistributed: 610000 },
    { month: 'Apr', vendorsHelped: 68, fundsDistributed: 680000 },
    { month: 'May', vendorsHelped: 75, fundsDistributed: 750000 },
    { month: 'Jun', vendorsHelped: 82, fundsDistributed: 820000 },
  ];

  const regionData = [
    { region: 'Mumbai', vendors: 45, funding: 450000 },
    { region: 'Delhi', vendors: 38, funding: 380000 },
    { region: 'Bangalore', vendors: 32, funding: 320000 },
    { region: 'Chennai', vendors: 28, funding: 280000 },
    { region: 'Kolkata', vendors: 25, funding: 250000 },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">NGO Dashboard</h1>
          <p className="text-gray-600">Welcome back, {profile?.first_name || user?.email}! Track your campaigns and vendor impact.</p>
        </div>
        <Button onClick={logout} variant="outline">Logout</Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Vendors Supported</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                <CountUp end={156} duration={2000} />
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Funds Distributed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">
                ₹<CountUp end={2.35} duration={2500} />M
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">
                <CountUp end={3} duration={1500} />
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-600">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Regional Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-orange-600" />
              <span className="text-2xl font-bold text-gray-900">
                <CountUp end={7} duration={1800} />
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-200">
          <CardHeader>
            <Plus className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Create Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Launch new funding campaigns for vendor support</p>
            <Button className="w-full" onClick={() => setShowCampaignModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-200">
          <CardHeader>
            <Users className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Vendor Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Review and verify vendor applications</p>
            <Button className="w-full" variant="outline" onClick={() => setShowVendorManagementModal(true)}>
              <Users className="h-4 w-4 mr-2" />
              Manage Vendors
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-200">
          <CardHeader>
            <Eye className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>View Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Track impact metrics and funding distribution</p>
            <Button className="w-full" variant="outline" onClick={() => setShowAnalyticsModal(true)}>
              <Eye className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Impact Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={impactData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line type="monotone" dataKey="vendorsHelped" stroke="#10B981" strokeWidth={3} name="Vendors Helped" />
                  <Line type="monotone" dataKey="fundsDistributed" stroke="#3B82F6" strokeWidth={2} name="Funds Distributed" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Regional Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {regionData.map((region, index) => (
                <div key={region.region} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <span className="font-medium">{region.region}</span>
                    <p className="text-sm text-gray-600">{region.vendors} vendors</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-green-600">₹{region.funding.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Distributed funds to Eco Crafts</p>
                <p className="text-sm text-gray-600">Mumbai, Maharashtra</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">₹50,000</p>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Completed</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Campaign "Support Urban Farmers" completed</p>
                <p className="text-sm text-gray-600">Raised ₹42,000</p>
              </div>
              <div className="text-right">
                <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Completed</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vendor Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {vendorData.map((vendor) => (
              <div key={vendor.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{vendor.name}</p>
                  <p className="text-sm text-gray-600">{vendor.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">₹{vendor.funding.toLocaleString()}</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    vendor.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {vendor.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <CampaignModal 
        isOpen={showCampaignModal} 
        onClose={() => setShowCampaignModal(false)} 
        onCampaignCreated={() => {
          // This dashboard uses static data, so no action is needed here for now.
        }}
      />
      <AnalyticsModal 
        isOpen={showAnalyticsModal} 
        onClose={() => setShowAnalyticsModal(false)} 
        userType="ngo"
      />
      <VendorManagementModal 
        isOpen={showVendorManagementModal} 
        onClose={() => setShowVendorManagementModal(false)} 
      />
    </div>
  );
};

export default NGODashboard;
