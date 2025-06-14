
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Globe, MapPin } from 'lucide-react';

const regions = [
    { name: 'South Asia', projects: 12, livesImpacted: 8200, investment: '₹5.6M', flag: '🇮🇳' },
    { name: 'Southeast Asia', projects: 8, livesImpacted: 4500, investment: '₹3.1M', flag: '🇻🇳' },
    { name: 'Sub-Saharan Africa', projects: 15, livesImpacted: 11300, investment: '₹7.8M', flag: '🇰🇪' },
    { name: 'Latin America', projects: 5, livesImpacted: 2100, investment: '₹1.5M', flag: '🇧🇷' },
];

const GlobalImpactPage = () => {
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
                <div>
                    <p className="text-3xl font-bold">4</p>
                    <p className="text-blue-200">Continents</p>
                </div>
                 <div>
                    <p className="text-3xl font-bold">28</p>
                    <p className="text-blue-200">Countries</p>
                </div>
                 <div>
                    <p className="text-3xl font-bold">40</p>
                    <p className="text-blue-200">Active Projects</p>
                </div>
                 <div>
                    <p className="text-3xl font-bold">26,100</p>
                    <p className="text-blue-200">Lives Impacted</p>
                </div>
            </CardContent>
        </Card>

        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Impact by Region</h2>
            {regions.map(region => (
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
                            <p className="text-xl font-bold">{region.investment}</p>
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
        </div>
      </div>
    </div>
  );
};

export default GlobalImpactPage;
