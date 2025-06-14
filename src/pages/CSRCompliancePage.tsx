
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, Clock, Shield } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

const CSRCompliancePage = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchComplianceItems = async () => {
    if (!user) return [];
    const { data, error } = await supabase
      .from('compliance_items')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      toast({ title: "Error", description: "Could not fetch compliance items.", variant: "destructive" });
      return [];
    }
    return data;
  };

  const { data: complianceItems, isLoading } = useQuery({
    queryKey: ['complianceItems', user?.id],
    queryFn: fetchComplianceItems,
    enabled: !!user,
  });
  
  const metItems = complianceItems?.filter(item => item.status === 'Met').length || 0;
  const totalItems = complianceItems?.length || 0;
  const complianceStatus = totalItems > 0 && metItems === totalItems ? 'Fully Compliant' : 'Partially Compliant';
  const complianceMessage = totalItems > 0 && metItems === totalItems 
    ? `All ${totalItems} mandatory requirements have been met.`
    : `${metItems} of ${totalItems} requirements met.`;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
        <div className="container mx-auto">
            <Link to="/" className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">CSR Compliance</h1>
            <p className="text-gray-600 mb-8">Track your compliance with national and international CSR regulations.</p>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center"><Shield className="mr-2 h-5 w-5 text-green-600"/>Compliance Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? <Skeleton className="h-12 w-1/2" /> : (
                    <div className="flex items-center">
                        <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
                        <div>
                            <p className="font-bold text-xl">{complianceStatus}</p>
                            <p className="text-gray-600">{complianceMessage}</p>
                        </div>
                    </div>
                  )}
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Compliance Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                    {isLoading && Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-start justify-between p-4 border rounded-lg">
                        <div className="w-full">
                          <Skeleton className="h-5 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                        <Skeleton className="h-8 w-24" />
                      </div>
                    ))}
                    {!isLoading && complianceItems?.map((item) => (
                        <div key={item.id} className="flex items-start justify-between p-4 border rounded-lg">
                            <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-gray-500">{item.details}</p>
                            </div>
                             <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${item.status === 'Met' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                {item.status === 'Met' ? <CheckCircle className="h-4 w-4 mr-1"/> : <Clock className="h-4 w-4 mr-1"/>}
                                {item.status}
                            </div>
                        </div>
                    ))}
                    {!isLoading && complianceItems?.length === 0 && (
                      <p className="text-center text-gray-500 py-8">No compliance items found. Please log in to see your data.</p>
                    )}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
};

export default CSRCompliancePage;

