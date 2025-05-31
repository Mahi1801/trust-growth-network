
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { PlusCircle, Camera, TrendingUp, MapPin, Star, Upload, FileText, CheckCircle } from 'lucide-react';

const VendorDashboard = () => {
  const { user, logout } = useAuth();
  const [trustScore] = useState(85);

  // Mock data for vendor progress
  const progressData = [
    { month: 'Jan', score: 72, revenue: 25000 },
    { month: 'Feb', score: 75, revenue: 28000 },
    { month: 'Mar', score: 78, revenue: 32000 },
    { month: 'Apr', score: 82, revenue: 35000 },
    { month: 'May', score: 85, revenue: 38000 },
  ];

  const recentActivities = [
    { id: 1, type: 'funding', description: 'Received ₹50,000 funding for equipment upgrade', time: '2 days ago', status: 'completed' },
    { id: 2, type: 'verification', description: 'Location verification completed', time: '5 days ago', status: 'completed' },
    { id: 3, type: 'submission', description: 'Progress photos submitted', time: '1 week ago', status: 'under_review' },
  ];

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrustScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.firstName}! Track your business growth and funding.</p>
        </div>
        <Button onClick={logout} variant="outline">Logout</Button>
      </div>

      {/* Trust Score & Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className={`${getTrustScoreBg(trustScore)} border-l-4 border-l-blue-600`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Trust Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <span className={`text-3xl font-bold ${getTrustScoreColor(trustScore)}`}>{trustScore}</span>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Funding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹1,85,000</div>
            <p className="text-xs text-green-600">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Business Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">+23%</div>
            <p className="text-xs text-blue-600">Revenue increase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">Verified</span>
            </div>
            <div className="flex items-center space-x-1 mt-1">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-xs text-gray-600">Mumbai, India</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-200">
          <CardHeader>
            <PlusCircle className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Submit New Request</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Request funding for business improvements and equipment upgrades</p>
            <Button className="w-full">
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
            <p className="text-gray-600 mb-4">Share before/after photos of your business improvements</p>
            <Button className="w-full" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload Photos
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-200">
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Track Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Monitor your funding status and business improvement metrics</p>
            <Button className="w-full" variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    activity.status === 'completed' ? 'bg-green-500' : 
                    activity.status === 'under_review' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
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
    </div>
  );
};

export default VendorDashboard;
