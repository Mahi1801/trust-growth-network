
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Edit, Trash2, PlusCircle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const ManageCampaignsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns', user?.id],
    queryFn: fetchCampaigns,
    enabled: !!user,
  });

  const handleEdit = (id: string) => {
    toast({ title: 'Edit Campaign', description: `Editing campaigns is not yet implemented.` });
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('campaigns').delete().eq('id', id);
    if (error) {
        toast({ title: 'Error deleting campaign', description: error.message, variant: 'destructive' });
    } else {
        toast({ title: 'Campaign deleted', description: 'The campaign has been successfully deleted.' });
        queryClient.invalidateQueries({ queryKey: ['campaigns', user?.id] });
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Manage Campaigns</h1>
                    <p className="text-gray-600">View, edit, or delete your social impact campaigns.</p>
                </div>
                <Button onClick={() => navigate('/')}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Campaign
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Your Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Funding Goal</TableHead>
                                <TableHead>Amount Raised</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading && Array.from({ length: 3 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-4 w-[250px]" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                                </TableRow>
                            ))}
                            {!isLoading && campaigns?.map(campaign => (
                                <TableRow key={campaign.id}>
                                    <TableCell className="font-medium">{campaign.name}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                                            campaign.status === 'active' || campaign.status === 'draft' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                            {campaign.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>₹{Number(campaign.funding_goal).toLocaleString()}</TableCell>
                                    <TableCell>₹{Number(campaign.amount_raised).toLocaleString()}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex gap-2 justify-end">
                                            <Button variant="outline" size="icon" onClick={() => handleEdit(campaign.id)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <AlertDialog>
                                              <AlertDialogTrigger asChild>
                                                <Button variant="destructive" size="icon"><Trash2 className="h-4 w-4" /></Button>
                                              </AlertDialogTrigger>
                                              <AlertDialogContent>
                                                <AlertDialogHeader>
                                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                  <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your
                                                    campaign and remove its data from our servers.
                                                  </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                  <AlertDialogAction onClick={() => handleDelete(campaign.id)}>Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                              </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {!isLoading && campaigns?.length === 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500">No campaigns found.</p>
                            <p className="text-gray-500 text-sm">Launch a new campaign from your dashboard to get started!</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    </div>
  );
};

export default ManageCampaignsPage;
