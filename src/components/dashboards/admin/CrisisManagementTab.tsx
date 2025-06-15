
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Siren, Edit, Trash2 } from 'lucide-react';

// Manually define the Crisis type as Supabase types might be stale after migration.
type Crisis = {
  id: string;
  name: string;
  description: string | null;
  status: 'active' | 'monitoring' | 'resolved' | 'archived';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string | null;
  started_at: string | null;
  resolved_at: string | null;
  created_at: string;
};

const fetchCrises = async (): Promise<Crisis[]> => {
  // The 'crises' table is new, so we use `as any` to be safe.
  const { data, error } = await (supabase as any)
    .from('crises')
    .select('*')
    .order('started_at', { ascending: false });

  if (error) {
    console.error('Error fetching crises:', error);
    throw new Error(error.message);
  }
  
  return data || [];
};

const CrisisManagementTab = () => {
  const { data: crises, isLoading, error } = useQuery({
    queryKey: ['crises'],
    queryFn: fetchCrises,
  });

  const getSeverityColor = (severity: Crisis['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-400 text-black';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  if (isLoading) return <div className="text-center p-8">Loading crisis data...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold flex items-center"><Siren className="mr-2 h-6 w-6" /> Crisis Response Center</h2>
        <Button disabled>
          <Siren className="mr-2 h-4 w-4" />
          Report New Crisis
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Crisis</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Started On</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {crises && crises.length > 0 ? (
            crises.map(crisis => (
              <TableRow key={crisis.id}>
                <TableCell className="font-medium">{crisis.name}</TableCell>
                <TableCell className="capitalize">{crisis.status}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(crisis.severity)}`}>
                    {crisis.severity}
                  </span>
                </TableCell>
                <TableCell>{crisis.location || 'N/A'}</TableCell>
                <TableCell>{crisis.started_at ? format(new Date(crisis.started_at), 'PPp') : 'N/A'}</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="sm" disabled>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">No active crises.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CrisisManagementTab;
