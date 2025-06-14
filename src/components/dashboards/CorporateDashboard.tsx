
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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

const CorporateDashboard = () => {
  const { user, profile, logout } = useAuth();
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const fetchCampaigns = async () => {
    if (!user) return [];
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('corporate_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching campaigns:', error);
      toast({ title: "Error", description: "Could not fetch your campaigns.", variant: "destructive" });
      return [];
    }
    return data;
  };

  const { data: campaignData, isLoading: isLoadingCampaigns } = useQuery({
    queryKey: ['campaigns', user?.id],
    queryFn: fetchCampaigns,
    enabled: !!user,
  });

  // Mock data for corporate analytics (will be replaced in future steps)
  const roiData = [
    { month: 'Jan', investment: 100000, socialReturn: 120000, brandValue: 25000 },
    { month: 'Feb', investment: 150000, socialReturn: 180000, brandValue: 35000 },
    { month: 'Mar', investment: 120000, socialReturn: 160000, brandValue: 40000 },
    { month: 'Apr', investment: 200000, socialReturn: 250000, brandValue: 50000 },
    { month: 'May', investment: 180000, socialReturn: 230000, brandValue: 55000 },
  ];

  const impactMetrics = [
    { metric: 'Lives Impacted', value: 2450, change: '+18%' },
    { metric: 'Communities Reached', value: 45, change: '+12%' },
    { metric: 'Businesses Supported', value: 156, change: '+25%' },
    { metric: 'Sustainability Score', value: 8.7, change: '+0.5' },
  ];

  const handleCampaignCreated = () => {
    queryClient.invalidateQueries({ queryKey: ['campaigns', user?.id] });
  };

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
          <p className="text-gray-600">Welcome back, {profile?.first_name || user?.email}! Track your social impact and ROI.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleGenerateReport} variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button onClick={logout} variant="outline">Logout</Button>
        </div>
      </div>

      {/* Key Metrics - Enhanced visibility with black headings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white border-2 border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <CardHeader className="pb-3 bg-white rounded-t-lg border-b border-gray-200">
            <CardTitle className="text-lg font-bold text-black text-center">
              Total Investment
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 bg-white rounded-b-lg text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              ₹<CountUp end={15.2} duration={2500} />M
            </div>
            <p className="text-sm text-gray-600 font-medium">
              +<CountUp end={22} duration={2000} />% from last quarter
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-green-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <CardHeader className="pb-3 bg-white rounded-t-lg border-b border-gray-200">
            <CardTitle className="text-lg font-bold text-black text-center">
              Social ROI
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 bg-white rounded-b-lg text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              <CountUp end={3.4} duration={2000} />x
            </div>
            <p className="text-sm text-gray-600 font-medium">
              ₹<CountUp end={51.7} duration={2300} />M social value created
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <CardHeader className="pb-3 bg-white rounded-t-lg border-b border-gray-200">
            <CardTitle className="text-lg font-bold text-black text-center">
              Brand Impact Score
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 bg-white rounded-b-lg text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">
              <CountUp end={92} duration={1800} />/100
            </div>
            <p className="text-sm text-gray-600 font-medium">Excellent brand perception</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-2 border-orange-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <CardHeader className="pb-3 bg-white rounded-t-lg border-b border-gray-200">
            <CardTitle className="text-lg font-bold text-black text-center">
              Active Campaigns
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 bg-white rounded-b-lg text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">
              <CountUp end={12} duration={1500} />
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Across <CountUp end={8} duration={1200} /> cities
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards with working buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-200 bg-white">
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

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-200 bg-white">
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

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-200 bg-white">
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

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-orange-200 bg-white">
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
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-indigo-200 bg-white">
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

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-pink-200 bg-white">
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

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-cyan-200 bg-white">
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

        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-teal-200 bg-white">
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
        <Card className="card-hover bg-white border-2 border-gray-200">
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

        <Card className="card-hover bg-white border-2 border-gray-200">
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
        <Card className="card-hover bg-white border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Impact Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {impactMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">{metric.metric}</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {metric.metric === 'Sustainability Score' ? (
                        <>
                          <CountUp end={metric.value} duration={2000} />
                          /10
                        </>
                      ) : (
                        <CountUp end={metric.value} duration={2000} />
                      )}
                    </p>
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

        <Card className="card-hover bg-white border-2 border-gray-200">
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoadingCampaigns && (
                <>
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </>
              )}
              {!isLoadingCampaigns && campaignData && campaignData.length > 0 ? (
                campaignData.map((campaign) => (
                  <div key={campaign.id} className="p-4 border-2 border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                        campaign.status === 'active' || campaign.status === 'draft' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Funding Goal</p>
                        <p className="font-medium text-lg">
                          ₹<CountUp end={Number(campaign.funding_goal)} duration={2000} />
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Impact Score</p>
                        <p className="font-medium text-lg">
                          <CountUp end={campaign.impact_score || 0} duration={1800} />/100
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Amount Raised</p>
                        <p className="font-medium text-lg">
                          ₹<CountUp end={Number(campaign.amount_raised)} duration={1500} />
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : !isLoadingCampaigns && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No campaigns found.</p>
                  <p className="text-gray-500 text-sm">Launch a new campaign to get started!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <CampaignModal 
        isOpen={showCampaignModal} 
        onClose={() => setShowCampaignModal(false)}
        onCampaignCreated={handleCampaignCreated}
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
