
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, TrendingUp, Users, Target, DollarSign, Award, Globe, Handshake, BarChart3 } from 'lucide-react';

interface ActionCardsProps {
  onLaunchCampaign: () => void;
  onTrackROI: () => void;
  onViewImpact: () => void;
  onFindPartners: () => void;
  onManageCampaigns: () => void;
  onCSRCompliance: () => void;
  onInvestmentPortfolio: () => void;
  onGlobalImpact: () => void;
}

const ActionCards = ({
  onLaunchCampaign,
  onTrackROI,
  onViewImpact,
  onFindPartners,
  onManageCampaigns,
  onCSRCompliance,
  onInvestmentPortfolio,
  onGlobalImpact,
}: ActionCardsProps) => (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-200 bg-white">
        <CardHeader>
          <Rocket className="h-8 w-8 text-blue-600 mb-2" />
          <CardTitle>Launch Campaign</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">Create new social impact funding campaigns</p>
          <Button className="w-full" onClick={onLaunchCampaign}>
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
          <Button className="w-full" variant="outline" onClick={onTrackROI}>
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
          <Button className="w-full" variant="outline" onClick={onViewImpact}>
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
          <Button className="w-full" variant="outline" onClick={onFindPartners}>
            <Handshake className="h-4 w-4 mr-2" />
            Find Partners
          </Button>
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-indigo-200 bg-white">
        <CardHeader>
          <BarChart3 className="h-8 w-8 text-indigo-600 mb-2" />
          <CardTitle>Manage Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">Advanced campaign management and optimization</p>
          <Button className="w-full" variant="outline" onClick={onManageCampaigns}>
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
          <Button className="w-full" variant="outline" onClick={onCSRCompliance}>
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
          <Button className="w-full" variant="outline" onClick={onInvestmentPortfolio}>
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
          <Button className="w-full" variant="outline" onClick={onGlobalImpact}>
            <Globe className="h-4 w-4 mr-2" />
            Global View
          </Button>
        </CardContent>
      </Card>
    </div>
  </>
);

export default ActionCards;
