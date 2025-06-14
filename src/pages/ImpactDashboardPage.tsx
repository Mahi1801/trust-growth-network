
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Target, Users, Globe } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943'];

const ImpactDashboardPage = () => {
    const fetchCampaigns = async () => {
        const { data, error } = await supabase.from('campaigns').select('sector, lives_impacted, communities_reached, amount_raised, created_at');
        if (error) {
            console.error(error);
            return [];
        }
        return data;
    }

    const { data: campaigns, isLoading } = useQuery({
        queryKey: ['impactDashboardCampaigns'],
        queryFn: fetchCampaigns
    });

    const { totals, sdgData, impactTimelineData } = useMemo(() => {
        if (!campaigns) {
            return { totals: { lives: 0, communities: 0 }, sdgData: [], impactTimelineData: [] };
        }

        const livesTotal = campaigns.reduce((acc, c) => acc + (c.lives_impacted || 0), 0);
        const communitiesTotal = campaigns.reduce((acc, c) => acc + (c.communities_reached || 0), 0);

        const sdgDataMap: { [key: string]: number } = {};
        campaigns.forEach(c => {
            if (c.sector) {
                if (!sdgDataMap[c.sector]) sdgDataMap[c.sector] = 0;
                sdgDataMap[c.sector] += c.amount_raised || 0;
            }
        });
        const sdgData = Object.keys(sdgDataMap).map(name => ({ name, value: sdgDataMap[name] }));

        const timelineMap: { [key: string]: { [key: string]: number } } = {};
        campaigns.forEach(c => {
            const date = new Date(c.created_at);
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            const key = `${month} ${year}`;
            
            if (!timelineMap[key]) {
              timelineMap[key] = { date: date.getTime(), livesImpacted: 0 };
            }
            timelineMap[key].livesImpacted += c.lives_impacted || 0;
        });
        
        const impactTimelineData = Object.entries(timelineMap)
            .map(([month, data]) => ({ month, livesImpacted: data.livesImpacted, date: data.date }))
            .sort((a,b) => a.date - b.date)
            .map(({month, livesImpacted}) => ({month, livesImpacted}));

        return {
            totals: { lives: livesTotal, communities: communitiesTotal },
            sdgData,
            impactTimelineData
        };

    }, [campaigns]);


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Impact Dashboard</h1>
        <p className="text-gray-600 mb-8">Detailed analytics on your social impact initiatives.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Lives Impacted</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {isLoading ? <Skeleton className="h-7 w-24 mb-1" /> : <div className="text-2xl font-bold">{totals.lives.toLocaleString()}</div>}
                    <p className="text-xs text-muted-foreground">Across all campaigns</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Communities Reached</CardTitle>
                    <Globe className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    {isLoading ? <Skeleton className="h-7 w-12 mb-1" /> : <div className="text-2xl font-bold">{totals.communities}</div>}
                    <p className="text-xs text-muted-foreground">Across all regions</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Impact Score</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">94/100</div>
                    <p className="text-xs text-muted-foreground">Across all campaigns</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
                <CardHeader>
                    <CardTitle>Impact by Sector</CardTitle>
                </CardHeader>
                <CardContent>
                   {isLoading ? <Skeleton className="h-[300px] w-full" /> : (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={sdgData} cx="50%" cy="50%" labelLine={false} outerRadius={110} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                {sdgData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                        </PieChart>
                    </ResponsiveContainer>
                   )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Impact Growth Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? <Skeleton className="h-[300px] w-full" /> : (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={impactTimelineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="livesImpacted" name="Lives Impacted" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default ImpactDashboardPage;
