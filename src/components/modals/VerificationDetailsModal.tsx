
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Database } from '@/integrations/supabase/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

type VerificationRequest = Database['public']['Tables']['document_verifications']['Row'] & {
  profiles: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  } | null;
};

interface VerificationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: VerificationRequest;
}

const updateVerificationStatus = async ({ id, status, review_notes, reviewed_by }: { id: string; status: Database['public']['Enums']['verification_status']; review_notes: string; reviewed_by: string }) => {
  const { data, error } = await supabase
    .from('document_verifications')
    .update({ status, review_notes, reviewed_by })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export function VerificationDetailsModal({ isOpen, onClose, request }: VerificationDetailsModalProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [reviewNotes, setReviewNotes] = useState(request.review_notes || '');

  const mutation = useMutation({
    mutationFn: updateVerificationStatus,
    onSuccess: () => {
      toast.success('Verification status updated successfully.');
      queryClient.invalidateQueries({queryKey: ['verificationRequests']});
      onClose();
    },
    onError: (error) => {
      toast.error(`Failed to update status: ${error.message}`);
    },
  });

  const handleUpdateStatus = (status: Database['public']['Enums']['verification_status']) => {
    if (!user) {
      toast.error('You must be logged in to perform this action.');
      return;
    }
    if (status === 'rejected' && !reviewNotes) {
      toast.error('Review notes are required for rejection.');
      return;
    }
    mutation.mutate({ id: request.id, status, review_notes: reviewNotes, reviewed_by: user.id });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Verification Request</DialogTitle>
          <DialogDescription>
            Review the submitted documents and approve or reject the request.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h4 className="font-semibold">User:</h4>
            <p>{request.profiles?.first_name} {request.profiles?.last_name} ({request.profiles?.email})</p>
          </div>
          <div>
            <h4 className="font-semibold">Document Type:</h4>
            <p>{request.document_type}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Document Front</h4>
              {request.document_front_url ? <img src={request.document_front_url} alt="Document Front" className="rounded-lg border w-full object-contain" /> : <p>No front document uploaded.</p>}
            </div>
            <div>
              <h4 className="font-semibold mb-2">Document Back</h4>
              {request.document_back_url ? <img src={request.document_back_url} alt="Document Back" className="rounded-lg border w-full object-contain" /> : <p>No back document uploaded.</p>}
            </div>
          </div>
          <div>
            <h4 className="font-semibold">Review Notes</h4>
            <Textarea
              placeholder="Add review notes (optional for approval, required for rejection)..."
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
          <Button variant="destructive" onClick={() => handleUpdateStatus('rejected')} disabled={mutation.isPending}>Reject</Button>
          <Button variant="secondary" onClick={() => handleUpdateStatus('flagged_for_review')} disabled={mutation.isPending}>Flag for Review</Button>
          <Button onClick={() => handleUpdateStatus('approved')} disabled={mutation.isPending}>Approve</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
