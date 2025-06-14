
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CountUp } from "@/components/ui/count-up";
import { Skeleton } from "@/components/ui/skeleton";

interface Campaign {
  id: string;
  name: string;
  status: string;
  funding_goal: number | string;
  amount_raised: number | string;
  impact_score: number | null;
}

interface PerformanceSectionProps {
  campaigns: Campaign[] | undefined;
  isLoading: boolean;
}

const impactMetrics = [
  { metric: 'Lives Impacted', value: 2450, change: '+18%' },
  { metric: 'Communities Reached', value: 45, change: '+12%' },
  { metric: 'Businesses Supported', value: 156, change: '+25%' },
  { metric: 'Sustainability Score', value: 8.7, change: '+0.5' },
];

const PerformanceSection = ({ campaigns, isLoading }: PerformanceSectionProps) => (
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
          {isLoading && (
            <>
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </>
          )}
          {!isLoading && campaigns && campaigns.length > 0 ? (
            campaigns.map((campaign) => (
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
          ) : !isLoading && (
            <div className="text-center py-8">
              <p className="text-gray-500">No campaigns found.</p>
              <p className="text-gray-500 text-sm">Launch a new campaign to get started!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default PerformanceSection;
