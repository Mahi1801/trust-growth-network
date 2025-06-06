
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { PlusCircle, Camera, TrendingUp, MapPin, Star, Upload, FileText, CheckCircle, AlertTriangle, DollarSign } from 'lucide-react';
import { CountUp } from '@/components/ui/count-up';
import FundingRequestModal from '@/components/modals/FundingRequestModal';
import PhotoUploadModal from '@/components/modals/PhotoUploadModal';
import AnalyticsModal from '@/components/modals/AnalyticsModal';

const VendorDashboard = () => {
  const { user, profile, logout } = useAuth();
  const [trustScore] = useState(87);
  const [currentLocation] = useState("Mumbai, Maharashtra");
  const [showFundingModal, setShowFundingModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

  // More realistic data for vendor progress
  const progressData = [
    { month: 'Jan', score: 72, revenue: 45000, funding: 15000 },
    { month: 'Feb', score: 75, revenue: 52000, funding: 20000 },
    { month: 'Mar', score: 78, revenue: 58000, funding: 25000 },
    { month: 'Apr', score: 82, revenue: 64000, funding: 30000 },
    { month: 'May', score: 87, revenue: 71000, funding: 35000 },
    { month: 'Jun', score: 89, revenue: 78000, funding: 40000 },
  ];

  const recentActivities = [
    { 
      id: 1, 
      type: 'funding', 
      description: 'Received ₹75,000 funding for new equipment purchase', 
      time: '2 days ago', 
      status: 'completed',
      amount: 75000
    },
    { 
      id: 2, 
      type: 'verification', 
      description: 'Location verification completed successfully', 
      time: '5 days ago', 
      status: 'completed',
      verifier: 'NGO Helper Foundation'
    },
    { 
      id: 3, 
      type: 'submission', 
      description: 'Progress photos and revenue documentation submitted', 
      time: '1 week ago', 
      status: 'under_review',
      documents: 5
    },
    { 
      id: 4, 
      type: 'fraud_check', 
      description: 'Fraud detection scan completed - No issues found', 
      time: '2 weeks ago', 
      status: 'completed',
      confidence: 98
    },
  ];

  const fraudAlerts = [
    { 
      id: 1, 
      type: 'warning', 
      message: 'Ensure all photos are recent and unedited for better trust score', 
      severity: 'low' 
    },
  ];

  const fundingHistory = [
    { date: '2024-05-15', amount: 75000, purpose: 'Equipment Upgrade', status: 'approved', ngo: 'Urban Development NGO' },
    { date: '2024-04-20', amount: 50000, purpose: 'Shop Renovation', status: 'completed', ngo: 'Community Builders' },
    { date: '2024-03-10', amount: 30000, purpose: 'Inventory Expansion', status: 'completed', ngo: 'Small Business Support' },
  ];

  const getTrustScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrustScoreBg = (score: number) => {
    if (score >= 85) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {profile?.first_name || user?.email}! Track your business growth and funding opportunities.</p>
        </div>
        <Button onClick={logout} variant="outline">Logout</Button>
      </div>

      {/* Fraud Detection Alert */}
      {fraudAlerts.length > 0 && (
        <div className="mb-6">
          {fraudAlerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${
              alert.severity === 'high' ? 'bg-red-50 border-red-500' :
              alert.severity === 'medium' ? 'bg-yellow-50 border-yellow-500' :
              'bg-blue-50 border-blue-500'
            }`}>
              <div className="flex items-center space-x-2">
                <AlertTriangle className={`h-5 w-5 ${
                  alert.severity === 'high' ? 'text-red-600' :
                  alert.severity === 'medium' ? 'text-yellow-600' :
                  'text-blue-600'
                }`} />
                <span className="font-medium">Fraud Detection System</span>
              </div>
              <p className="mt-1 text-sm text-gray-700">{alert.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Trust Score & Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className={`${getTrustScoreBg(trustScore)} border-l-4 border-l-blue-600`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Trust Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <span className={`text-3xl font-bold ${getTrustScoreColor(trustScore)}`}>
                <CountUp end={trustScore} duration={2000} />
              </span>
              <span className="text-xl text-gray-400">/100</span>
              <Star className={`h-6 w-6 ${getTrustScoreColor(trustScore)}`} fill="currentColor" />
            </div>
            <div className="flex items-center mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${trustScore}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-1">Excellent rating (+2 this month)</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Funding Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              <CountUp end={235000} duration={2500} prefix="₹" />
            </div>
            <p className="text-xs text-green-600">+₹75,000 this month</p>
            <div className="flex items-center mt-1">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-xs text-gray-600 ml-1">
                <CountUp end={3} duration={1500} /> approved requests
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Business Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              +<CountUp end={28} duration={2000} />%
            </div>
            <p className="text-xs text-blue-600">Revenue increase (6 months)</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="text-xs text-gray-600 ml-1">
                ₹<CountUp end={78000} duration={2200} /> current monthly
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Location Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Verified</span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-gray-600">{currentLocation}</span>
            </div>
            <p className="text-xs text-green-600 mt-1">Auto-detected & verified</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards with working buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-200">
          <CardHeader>
            <PlusCircle className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Submit Funding Request</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Request funding for business improvements, equipment, or expansion</p>
            <Button className="w-full" onClick={() => setShowFundingModal(true)}>
              <FileText className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-200">
          <CardHeader>
            <Camera className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Upload Progress Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Share before/after photos with fraud detection verification</p>
            <Button className="w-full" variant="outline" onClick={() => setShowPhotoModal(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Photos
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-200">
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>View Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Monitor trust score, funding status and business metrics</p>
            <Button className="w-full" variant="outline" onClick={() => setShowAnalyticsModal(true)}>
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Trust Score & Revenue Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ score: { label: 'Trust Score', color: '#3B82F6' } }} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3B82F6" 
                    strokeWidth={3} 
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }} 
                    name="Trust Score"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10B981" 
                    strokeWidth={2} 
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }} 
                    name="Monthly Revenue"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    activity.status === 'completed' ? 'bg-green-500' : 
                    activity.status === 'under_review' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    {activity.amount && (
                      <p className="text-xs text-green-600 font-medium">₹{activity.amount.toLocaleString()}</p>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                    activity.status === 'under_review' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {activity.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funding History */}
      <Card>
        <CardHeader>
          <CardTitle>Funding History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fundingHistory.map((funding, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{funding.purpose}</p>
                  <p className="text-sm text-gray-600">by {funding.ngo}</p>
                  <p className="text-xs text-gray-500">{funding.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">₹{funding.amount.toLocaleString()}</p>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    funding.status === 'completed' ? 'bg-green-100 text-green-800' :
                    funding.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {funding.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <FundingRequestModal 
        isOpen={showFundingModal} 
        onClose={() => setShowFundingModal(false)} 
      />
      <PhotoUploadModal 
        isOpen={showPhotoModal} 
        onClose={() => setShowPhotoModal(false)} 
      />
      <AnalyticsModal 
        isOpen={showAnalyticsModal} 
        onClose={() => setShowAnalyticsModal(false)} 
        userType="vendor"
      />
    </div>
  );
};

export default VendorDashboard;
