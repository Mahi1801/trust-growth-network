
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Globe, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const countryFlags: { [key: string]: string } = {
    'South Asia': '🇮🇳',
    'Southeast Asia': '🇻🇳',
    'Sub-Saharan Africa': '🇰🇪',
    'Latin America': '🇧🇷',
    'North America': '🇺🇸',
    'Europe': '🇪🇺',
};

const GlobalImpactPage = () => {
    const { toast } = useToast();

    const fetchCampaigns = async () => {
        const { data, error } = await supabase.from('campaigns').select('region, lives_impacted, amount_raised');
        if (error) {
            toast({ title: "Error", description: "Could not fetch global impact data.", variant: "destructive" });
            return [];
        }
        return data;
    };

    const { data: campaigns, isLoading } = useQuery({
        queryKey: ['globalImpactCampaigns'],
        queryFn: fetchCampaigns,
    });

    const { regions, totals } = useMemo(() => {
        if (!campaigns) return { regions: [], totals: { continents: 0, countries: 0, projects: 0, livesImpacted: 0 } };

        const regionData: { [key: string]: { name: string, projects: number, livesImpacted: number, investment: number, flag: string } } = {};
        let livesImpactedTotal = 0;

        campaigns.forEach(c => {
            if (c.region) {
                if (!regionData[c.region]) {
                    regionData[c.region] = {
                        name: c.region,
                        projects: 0,
                        livesImpacted: 0,
                        investment: 0,
                        flag: countryFlags[c.region] || '🌍'
                    };
                }
                regionData[c.region].projects += 1;
                regionData[c.region].livesImpacted += c.lives_impacted || 0;
                regionData[c.region].investment += c.amount_raised || 0;
                livesImpactedTotal += c.lives_impacted || 0;
            }
        });

        const totals = {
            continents: Object.keys(regionData).length, // simplified to regions
            countries: 0, // Not available in data
            projects: campaigns.length,
            livesImpacted: livesImpactedTotal,
        }

        return { regions: Object.values(regionData), totals };
    }, [campaigns]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Global Impact Overview</h1>
        <p className="text-gray-600 mb-8">Monitor your social impact initiatives across the world.</p>

        <Card className="mb-8 bg-blue-600 text-white">
            <CardHeader>
                <CardTitle>Worldwide Impact At a Glance</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {isLoading ? Array.from({length: 4}).map((_, i) => <Skeleton key={i} className="h-16 bg-blue-500" />) : (
                    <>
                        <div>
                            <p className="text-3xl font-bold">{totals.continents}</p>
                            <p className="text-blue-200">Regions</p>
                        </div>
                         <div>
                            <p className="text-3xl font-bold">{totals.countries || 'N/A'}</p>
                            <p className="text-blue-200">Countries</p>
                        </div>
                         <div>
                            <p className="text-3xl font-bold">{totals.projects}</p>
                            <p className="text-blue-200">Active Projects</p>
                        </div>
                         <div>
                            <p className="text-3xl font-bold">{totals.livesImpacted.toLocaleString()}</p>
                            <p className="text-blue-200">Lives Impacted</p>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>

        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Impact by Region</h2>
            {isLoading && Array.from({length: 4}).map((_, i) => <Card key={i}><CardContent className="p-6"><Skeleton className="h-24 w-full" /></CardContent></Card>)}

            {!isLoading && regions.map(region => (
                <Card key={region.name} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                        <CardTitle className="flex items-center">{region.flag} <span className="ml-3">{region.name}</span></CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Projects</p>
                            <p className="text-xl font-bold">{region.projects}</p>
                        </div>
                         <div>
                            <p className="text-sm text-gray-500">Lives Impacted</p>
                            <p className="text-xl font-bold">{region.livesImpacted.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Investment</p>
                            <p className="text-xl font-bold">₹{region.investment.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center justify-end">
                             <Button variant="outline">
                                <MapPin className="h-4 w-4 mr-2" />
                                View Details
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
            {!isLoading && regions.length === 0 && <p className="text-center text-gray-500 py-8">No regional data available.</p>}
        </div>
      </div>
    </div>
  );
};

export default GlobalImpactPage;
