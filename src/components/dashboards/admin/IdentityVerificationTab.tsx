
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { VerificationDetailsModal } from '@/components/modals/VerificationDetailsModal';
import { Database } from '@/integrations/supabase/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

type VerificationRequest = Database['public']['Tables']['document_verifications']['Row'] & {
  profiles: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  } | null;
};

const fetchVerificationRequests = async () => {
  const { data, error } = await supabase
    .from('document_verifications')
    .select(`
      *,
      profiles (
        first_name,
        last_name,
        email
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  
  if (!data) {
    return [];
  }
  
  // The supabase client might return an error object for the joined 'profiles'
  // if RLS prevents access. We clean the data to match our component's `VerificationRequest` type.
  // Using `any` here to handle the potentially inconsistent shape of `request.profiles`.
  const cleanedData = data.map((request: any) => ({
    ...request,
    profiles: (request.profiles && typeof request.profiles === 'object' && 'first_name' in request.profiles)
      ? request.profiles
      : null,
  }));
  
  return cleanedData as VerificationRequest[];
};

const IdentityVerificationTab = () => {
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);

  const { data: requests, isLoading, error } = useQuery({
      queryKey: ['verificationRequests'],
      queryFn: fetchVerificationRequests
  });

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'pending':
        return 'outline';
      case 'flagged_for_review':
        return 'secondary';
      default:
        return 'secondary';
    }
  };


  if (isLoading) return <div className="text-center p-8">Loading verification requests...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error?.message}</div>;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Document Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Submitted At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests?.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">No verification requests found.</TableCell>
            </TableRow>
          )}
          {requests?.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                <div className="font-medium">{request.profiles?.first_name} {request.profiles?.last_name}</div>
                <div className="text-sm text-gray-500">{request.profiles?.email}</div>
              </TableCell>
              <TableCell>{request.document_type}</TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(request.status)}>
                  {request.status.replace(/_/g, ' ')}
                </Badge>
              </TableCell>
              <TableCell>{request.created_at ? format(new Date(request.created_at), 'PPP') : 'N/A'}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => setSelectedRequest(request)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedRequest && (
        <VerificationDetailsModal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          request={selectedRequest}
        />
      )}
    </>
  );
};

export default IdentityVerificationTab;
