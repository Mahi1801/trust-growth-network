import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Rocket, TrendingUp, Users, Target, DollarSign, Award, Globe, Handshake, BarChart3, FileText } from 'lucide-react';
import { CountUp } from '@/components/ui/count-up';
import CampaignModal from '@/components/modals/CampaignModal';
import AnalyticsModal from '@/components/modals/AnalyticsModal';
import { useToast } from '@/hooks/use-toast';

const CorporateDashboard = () => {
  const { user, logout } = useAuth();
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const { toast } = useToast();

  // Mock data for corporate analytics
  const roiData = [
    { month: 'Jan', investment: 100000, socialReturn: 120000, brandValue: 25000 },
    { month: 'Feb', investment: 150000, socialReturn: 180000, brandValue: 35000 },
    { month: 'Mar', investment: 120000, socialReturn: 160000, brandValue: 40000 },
    { month: 'Apr', investment: 200000, socialReturn: 250000, brandValue: 50000 },
    { month: 'May', investment: 180000, socialReturn: 230000, brandValue: 55000 },
  ];

  const impactMetrics = [
    { metric: 'Lives Impacted', value: '2,450', change: '+18%' },
    { metric: 'Communities Reached', value: '45', change: '+12%' },
    { metric: 'Businesses Supported', value: '156', change: '+25%' },
    { metric: 'Sustainability Score', value: '8.7/10', change: '+0.5' },
  ];

  const campaignData = [
    { campaign: 'Mumbai Market Revival', invested: 500000, impact: 89, vendors: 45, status: 'active' },
    { campaign: 'Delhi Tech Empowerment', invested: 750000, impact: 92, vendors: 62, status: 'completed' },
    { campaign: 'Rural Business Boost', invested: 300000, impact: 76, vendors: 28, status: 'active' },
  ];

  const handleViewAnalytics = () => {
    setShowAnalyticsModal(true);
  };

  const handleViewImpact = () => {
    toast({
      title: "Impact Dashboard",
      description: "Comprehensive impact metrics and detailed reports would be displayed here.",
    });
  };

  const handleFindPartners = () => {
    toast({
      title: "Partner Network",
      description: "NGO partner discovery and collaboration features would be implemented here.",
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: "Creating comprehensive CSR impact report with all metrics and analytics.",
    });
  };

  const handleManageCampaigns = () => {
    toast({
      title: "Campaign Management",
      description: "Opening advanced campaign management tools with performance tracking.",
    });
  };

  const handleCSRCompliance = () => {
    toast({
      title: "CSR Compliance",
      description: "Accessing CSR compliance dashboard with regulatory requirements and reporting.",
    });
  };

  const handleInvestmentPortfolio = () => {
    toast({
      title: "Investment Portfolio",
      description: "Viewing detailed social investment portfolio with risk analysis and ROI projections.",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Corporate Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.firstName}! Track your social impact and ROI.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleGenerateReport} variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button onClick={logout} variant="outline">Logout</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹<CountUp end={15.2} duration={2500} />M
            </div>
            <p className="text-xs opacity-90">+22% from last quarter</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Social ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CountUp end={3.4} duration={2000} />x
            </div>
            <p className="text-xs opacity-90">
              ₹<CountUp end={51.7} duration={2300} />M social value created
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Brand Impact Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CountUp end={92} duration={1800} />/100
            </div>
            <p className="text-xs opacity-90">Excellent brand perception</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CountUp end={12} duration={1500} />
            </div>
            <p className="text-xs opacity-90">
              Across <CountUp end={8} duration={1200} /> cities
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards with working buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-200">
          <CardHeader>
            <Rocket className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Launch Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Create new social impact funding campaigns</p>
            <Button className="w-full" onClick={() => setShowCampaignModal(true)}>
              <Rocket className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-200">
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Track ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Monitor return on social investment in real-time</p>
            <Button className="w-full" variant="outline" onClick={handleViewAnalytics}>
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-200">
          <CardHeader>
            <Target className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Impact Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">View detailed impact analytics and reports</p>
            <Button className="w-full" variant="outline" onClick={handleViewImpact}>
              <Target className="h-4 w-4 mr-2" />
              View Impact
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-orange-200">
          <CardHeader>
            <Users className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>Partner Network</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Connect with NGO partners and expand reach</p>
            <Button className="w-full" variant="outline" onClick={handleFindPartners}>
              <Handshake className="h-4 w-4 mr-2" />
              Find Partners
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-indigo-200">
          <CardHeader>
            <BarChart3 className="h-8 w-8 text-indigo-600 mb-2" />
            <CardTitle>Manage Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Advanced campaign management and optimization</p>
            <Button className="w-full" variant="outline" onClick={handleManageCampaigns}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Manage
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-pink-200">
          <CardHeader>
            <Award className="h-8 w-8 text-pink-600 mb-2" />
            <CardTitle>CSR Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Track compliance with CSR regulations</p>
            <Button className="w-full" variant="outline" onClick={handleCSRCompliance}>
              <Award className="h-4 w-4 mr-2" />
              Compliance
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-cyan-200">
          <CardHeader>
            <DollarSign className="h-8 w-8 text-cyan-600 mb-2" />
            <CardTitle>Investment Portfolio</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Manage social investment portfolio</p>
            <Button className="w-full" variant="outline" onClick={handleInvestmentPortfolio}>
              <DollarSign className="h-4 w-4 mr-2" />
              Portfolio
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-teal-200">
          <CardHeader>
            <Globe className="h-8 w-8 text-teal-600 mb-2" />
            <CardTitle>Global Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Monitor worldwide social impact initiatives</p>
            <Button className="w-full" variant="outline" onClick={() => toast({ title: "Global Impact", description: "Accessing global impact tracking dashboard." })}>
              <Globe className="h-4 w-4 mr-2" />
              Global View
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Social ROI Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ socialReturn: { label: 'Social Return', color: '#10B981' } }} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={roiData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line type="monotone" dataKey="socialReturn" stroke="#10B981" strokeWidth={3} />
                  <Line type="monotone" dataKey="investment" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Brand Value Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ brandValue: { label: 'Brand Value', color: '#8B5CF6' } }} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roiData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Bar dataKey="brandValue" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Impact Metrics and Campaign Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Impact Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {impactMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-gray-900">{metric.metric}</p>
                    <p className="text-2xl font-bold text-blue-600">{metric.value}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600 font-medium">{metric.change}</p>
                    <p className="text-xs text-gray-500">vs last period</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignData.map((campaign, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{campaign.campaign}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Investment</p>
                      <p className="font-medium">₹{campaign.invested.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Impact Score</p>
                      <p className="font-medium">{campaign.impact}/100</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Vendors</p>
                      <p className="font-medium">{campaign.vendors}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <CampaignModal 
        isOpen={showCampaignModal} 
        onClose={() => setShowCampaignModal(false)} 
      />
      <AnalyticsModal 
        isOpen={showAnalyticsModal} 
        onClose={() => setShowAnalyticsModal(false)} 
        userType="corporate"
      />
    </div>
  );
};

export default CorporateDashboard;
