
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Search, Handshake, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const PartnerNetworkPage = () => {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const fetchNgos = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('id, organization, location, first_name, last_name')
            .eq('user_type', 'ngo');

        if (error) {
            toast({ title: "Error", description: "Could not fetch NGOs.", variant: "destructive" });
            return [];
        }
        return data;
    };

    const { data: ngos, isLoading: isLoadingNgos } = useQuery({
        queryKey: ['ngos'],
        queryFn: fetchNgos,
    });

    const fetchConnections = async () => {
        if (!user) return [];
        const { data, error } = await supabase.from('connections').select('*').eq('corporate_id', user.id);
        if (error) {
            toast({ title: "Error", description: "Could not fetch connections.", variant: "destructive" });
            return [];
        }
        return data;
    }

    const { data: connections, isLoading: isLoadingConnections } = useQuery({
        queryKey: ['connections', user?.id],
        queryFn: fetchConnections,
        enabled: !!user,
    });

    const connectMutation = useMutation({
        mutationFn: async (ngoId: string) => {
            if (!user) throw new Error("User not authenticated");
            const { error } = await supabase.from('connections').insert({ corporate_id: user.id, ngo_id: ngoId });
            if (error) throw new Error(error.message);
        },
        onSuccess: () => {
            toast({ title: "Success", description: "Connection request sent." });
            queryClient.invalidateQueries({ queryKey: ['connections', user?.id] });
        },
        onError: (error) => {
            toast({ title: "Error", description: `Could not send request: ${error.message}`, variant: "destructive" });
        }
    });
    
    const filteredNgos = ngos?.filter(ngo => 
        (ngo.organization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ngo.location?.toLowerCase().includes(searchTerm.toLowerCase())) &&
        ngo.id !== user?.id // don't show self
    );

    const getConnectionStatus = (ngoId: string) => {
        const connection = connections?.find(c => c.ngo_id === ngoId);
        return connection?.status;
    };

    const isLoading = isLoadingNgos || isLoadingConnections;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="container mx-auto">
                <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Partner Network</h1>
                <p className="text-gray-600 mb-8">Discover and connect with verified NGO partners.</p>

                <div className="mb-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                            placeholder="Search by name or location..." 
                            className="pl-10"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading && Array.from({ length: 6 }).map((_, i) => (
                        <Card key={i}>
                            <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
                            <CardContent className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-10 w-full mt-4" />
                            </CardContent>
                        </Card>
                    ))}
                    {!isLoading && filteredNgos?.map(ngo => {
                        const status = getConnectionStatus(ngo.id);
                        return (
                        <Card key={ngo.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle>{ngo.organization || `${ngo.first_name} ${ngo.last_name}`}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-gray-600 mb-4">
                                    <Globe className="h-4 w-4 mr-2" />
                                    <span>{ngo.location || 'Location not specified'}</span>
                                </div>
                                <Button 
                                    className="w-full"
                                    onClick={() => connectMutation.mutate(ngo.id)}
                                    disabled={!!status || connectMutation.isPending}
                                >
                                    {status ? (
                                        <span className="capitalize">{status}</span>
                                    ) : (
                                        <>
                                            <Handshake className="h-4 w-4 mr-2" />
                                            Connect
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    )})}
                </div>
                 {!isLoading && filteredNgos?.length === 0 && (
                    <div className="text-center py-16 col-span-full">
                        <p className="text-gray-500 text-lg">No NGOs found.</p>
                        {searchTerm && <p className="text-gray-500">Try a different search term.</p>}
                    </div>
                 )}
            </div>
        </div>
    );
};

export default PartnerNetworkPage;
