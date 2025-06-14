import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import CampaignModal from '@/components/modals/CampaignModal';
import AnalyticsModal from '@/components/modals/AnalyticsModal';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { FileText, Database } from 'lucide-react';
import KeyMetrics from './corporate/KeyMetrics';
import ActionCards from './corporate/ActionCards';
import AnalyticsCharts from './corporate/AnalyticsCharts';
import PerformanceSection from './corporate/PerformanceSection';
import { seedCorporateData } from '@/lib/seed';

const CorporateDashboard = () => {
  const { user, profile, logout } = useAuth();
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isSeeding, setIsSeeding] = useState(false);

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

  const handleSeedData = async () => {
    if (!user) {
      toast({ title: "Authentication Error", description: "You must be logged in to seed data.", variant: "destructive" });
      return;
    }

    if (campaignData && campaignData.length > 0) {
      toast({ title: 'Already Seeded', description: 'Your account already has campaign data.' });
      return;
    }

    setIsSeeding(true);
    try {
      await seedCorporateData(user.id);
      toast({ title: 'Success!', description: 'Sample data has been added.' });
      
      await queryClient.invalidateQueries({ queryKey: ['campaigns', user.id] });
      await queryClient.invalidateQueries({ queryKey: ['complianceItems', user.id] });
      await queryClient.invalidateQueries({ queryKey: ['globalImpactCampaigns'] });
      await queryClient.invalidateQueries({ queryKey: ['impactDashboardCampaigns'] });
      await queryClient.invalidateQueries({ queryKey: ['portfolioCampaigns'] });
    } catch (error: any) {
        toast({ title: "Error", description: `Failed to seed data: ${error.message}`, variant: "destructive" });
    } finally {
      setIsSeeding(false);
    }
  };

  const handleCampaignCreated = () => {
    queryClient.invalidateQueries({ queryKey: ['campaigns', user?.id] });
  };

  const handleViewAnalytics = () => {
    setShowAnalyticsModal(true);
  };

  const handleViewImpact = () => {
    navigate('/impact-dashboard');
  };

  const handleFindPartners = () => {
    navigate('/partner-network');
  };

  const handleGenerateReport = () => {
    navigate('/reports');
  };

  const handleManageCampaigns = () => {
    navigate('/manage-campaigns');
  };

  const handleCSRCompliance = () => {
    navigate('/csr-compliance');
  };

  const handleInvestmentPortfolio = () => {
    navigate('/investment-portfolio');
  };

  const handleGlobalImpact = () => {
    navigate('/global-impact');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Corporate Dashboard</h1>
          <p className="text-gray-600">Welcome back, {profile?.first_name || user?.email}! Track your social impact and ROI.</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={handleSeedData} 
            variant="outline" 
            disabled={isSeeding || isLoadingCampaigns || (campaignData && campaignData.length > 0) || false}
          >
            <Database className="h-4 w-4 mr-2" />
            {isSeeding ? 'Seeding...' : 'Seed Sample Data'}
          </Button>
          <Button onClick={handleGenerateReport} variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button onClick={logout} variant="outline">Logout</Button>
        </div>
      </div>

      <KeyMetrics />

      <ActionCards
        onLaunchCampaign={() => setShowCampaignModal(true)}
        onTrackROI={handleViewAnalytics}
        onViewImpact={handleViewImpact}
        onFindPartners={handleFindPartners}
        onManageCampaigns={handleManageCampaigns}
        onCSRCompliance={handleCSRCompliance}
        onInvestmentPortfolio={handleInvestmentPortfolio}
        onGlobalImpact={handleGlobalImpact}
      />

      <AnalyticsCharts />

      <PerformanceSection campaigns={campaignData} isLoading={isLoadingCampaigns} />

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
