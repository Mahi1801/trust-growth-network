import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';

// Manually define the Transaction type as a workaround for stale Supabase types.
type Transaction = {
  id: string;
  created_at: string;
  user_id: string | null;
  type: 'payment' | 'refund' | 'chargeback' | 'payout';
  status: 'pending' | 'completed' | 'failed' | 'disputed' | 'cancelled';
  amount: number;
  currency: string;
  gateway_transaction_id: string | null;
  profiles: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
  } | null;
};

const fetchTransactions = async () => {
  // The 'transactions' table is not yet in the auto-generated types, so we use `as any`
  const { data, error } = await (supabase as any)
    .from('transactions')
    .select(`
      *,
      profiles (
        first_name,
        last_name,
        email
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  
  if (!data) return [];
  
  const cleanedData = data.map((tx: any) => ({
    ...tx,
    profiles: (tx.profiles && typeof tx.profiles === 'object' && 'first_name' in tx.profiles)
      ? tx.profiles
      : null,
  }));
  
  return cleanedData as Transaction[];
};


const TransactionManagementTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const { data: transactions, isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions
  });

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];
    return transactions.filter(tx => {
      const userFullName = `${tx.profiles?.first_name || ''} ${tx.profiles?.last_name || ''}`.toLowerCase();
      const userEmail = (tx.profiles?.email || '').toLowerCase();
      const searchLower = searchQuery.toLowerCase();

      const matchesSearch = userFullName.includes(searchLower) || userEmail.includes(searchLower) || tx.gateway_transaction_id?.toLowerCase().includes(searchLower);
      const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;
      const matchesType = typeFilter === 'all' || tx.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [transactions, searchQuery, statusFilter, typeFilter]);
  
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount / 100);
  };
  
  if (isLoading) return <div className="text-center p-8">Loading transactions...</div>;
  if (error) return <div className="text-center p-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by name, email, or transaction ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="disputed">Disputed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="payment">Payment</SelectItem>
            <SelectItem value="refund">Refund</SelectItem>
            <SelectItem value="chargeback">Chargeback</SelectItem>
            <SelectItem value="payout">Payout</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Gateway ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">No transactions found.</TableCell>
            </TableRow>
          ) : (
            filteredTransactions.map(tx => (
              <TableRow key={tx.id}>
                <TableCell>
                  <div className="font-medium">{tx.profiles?.first_name} {tx.profiles?.last_name}</div>
                  <div className="text-sm text-gray-500">{tx.profiles?.email}</div>
                </TableCell>
                <TableCell className="capitalize">{tx.type.replace(/_/g, ' ')}</TableCell>
                <TableCell className="capitalize">{tx.status}</TableCell>
                <TableCell>{formatCurrency(tx.amount, tx.currency)}</TableCell>
                <TableCell className="font-mono text-xs">{tx.gateway_transaction_id}</TableCell>
                <TableCell>{format(new Date(tx.created_at), 'PPp')}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" disabled>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionManagementTab;
