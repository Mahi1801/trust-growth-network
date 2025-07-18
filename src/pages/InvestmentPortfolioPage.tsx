
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, DollarSign, Activity, TrendingUp } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';


const InvestmentPortfolioPage = () => {
    const { toast } = useToast();
    const fetchCampaigns = async () => {
        const { data, error } = await supabase.from('campaigns').select('*');
        if (error) {
            toast({ title: "Error", description: "Could not fetch campaigns.", variant: "destructive" });
            return [];
        }
        return data;
    }

    const { data: campaigns, isLoading } = useQuery({ queryKey: ['portfolioCampaigns'], queryFn: fetchCampaigns });

    const { portfolioData, totals } = useMemo(() => {
        if (!campaigns) return { portfolioData: [], totals: { investment: 0, sroi: 0 } };

        const sectorData: { [key: string]: number } = {};
        let totalInvestment = 0;
        let totalWeightedSROI = 0;

        campaigns.forEach(c => {
            if (c.sector) {
                if (!sectorData[c.sector]) sectorData[c.sector] = 0;
                sectorData[c.sector] += c.amount_raised || 0;
            }
            totalInvestment += c.amount_raised || 0;
            if (c.projected_sroi && c.amount_raised) {
                totalWeightedSROI += c.projected_sroi * c.amount_raised;
            }
        });
        
        const portfolioData = Object.keys(sectorData).map(key => ({ name: key, value: sectorData[key] }));
        const averageSROI = totalInvestment > 0 ? totalWeightedSROI / totalInvestment : 0;
        
        const totals = {
            investment: totalInvestment,
            sroi: averageSROI
        };

        return { portfolioData, totals };

    }, [campaigns]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Investment Portfolio</h1>
        <p className="text-gray-600 mb-8">Analyze and manage your social investment portfolio.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
                <CardHeader>
                    <CardTitle>Investment by Sector</CardTitle>
                </CardHeader>
                <CardContent>
                     {isLoading ? <Skeleton className="h-[300px] w-full" /> : (
                     <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={portfolioData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                            {portfolioData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                        </PieChart>
                    </ResponsiveContainer>
                    )}
                </CardContent>
            </Card>
            <div className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <Skeleton className="h-7 w-24" /> : <div className="text-2xl font-bold">₹{totals.investment.toLocaleString()}</div>}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Projected Social ROI</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        {isLoading ? <Skeleton className="h-7 w-16" /> : <div className="text-2xl font-bold">{totals.sroi.toFixed(1)}x</div>}
                    </CardContent>
                </Card>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Active Investments</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Campaign</TableHead>
                            <TableHead>Sector</TableHead>
                            <TableHead>Amount Invested</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Impact Score</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading && Array.from({length: 3}).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-12" /></TableCell>
                            </TableRow>
                        ))}
                        {campaigns?.map(c => (
                            <TableRow key={c.id}>
                                <TableCell className="font-medium">{c.name}</TableCell>
                                <TableCell>{c.sector}</TableCell>
                                <TableCell>₹{Number(c.amount_raised).toLocaleString()}</TableCell>
                                <TableCell><span className="capitalize">{c.status}</span></TableCell>
                                <TableCell>{c.impact_score}/100</TableCell>
                            </TableRow>
                        ))}
                         {!isLoading && campaigns?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">No active investments found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvestmentPortfolioPage;
