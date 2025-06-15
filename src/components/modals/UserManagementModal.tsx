import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuPortal, DropdownMenuSubContent, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Users, Search, Loader2, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import { Tables, Database } from '@/integrations/supabase/types';

type UserWithRoles = Tables<'profiles'> & {
  user_roles: { role: Database['public']['Enums']['app_role'] }[]
};

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserManagementModal = ({ isOpen, onClose }: UserManagementModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const queryClient = useQueryClient();

  const { data: users = [], isLoading, isError } = useQuery<UserWithRoles[]>({
    queryKey: ['usersWithRoles'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('*, user_roles(role)');
      if (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users.');
        throw new Error('Failed to fetch users');
      }
      return data || [];
    },
    enabled: isOpen,
  });

  const updateUserMutation = useMutation({
    mutationFn: async ({ userId, newStatus }: { userId: string; newStatus: string }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ status: newStatus })
        .eq('id', userId);

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success('User status updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['usersWithRoles'] });
    },
    onError: (error) => {
      toast.error(`Failed to update user status: ${error.message}`);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const response = await fetch('https://adfitnytnodsmgxivkai.supabase.co/functions/v1/delete-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete user.');
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success('User deleted successfully.');
      queryClient.invalidateQueries({ queryKey: ['usersWithRoles'] });
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const updateUserRolesMutation = useMutation({
    mutationFn: async ({ userId, roles }: { userId: string, roles: Database['public']['Enums']['app_role'][] }) => {
      const { error: deleteError } = await supabase.from('user_roles').delete().eq('user_id', userId);
      if (deleteError) throw deleteError;

      if (roles.length > 0) {
        const newRoles = roles.map(role => ({ user_id: userId, role }));
        const { error: insertError } = await supabase.from('user_roles').insert(newRoles);
        if (insertError) throw insertError;
      }
    },
    onSuccess: () => {
      toast.success("User roles updated successfully.");
      queryClient.invalidateQueries({ queryKey: ['usersWithRoles'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to update roles: ${error.message}`);
    },
  });

  const filteredUsers = useMemo(() => {
    return users
      .map(user => ({
        id: user.id,
        name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.email || 'N/A',
        email: user.email || 'No email provided',
        userType: user.user_type || 'unknown',
        status: user.status,
        roles: user.user_roles.map(r => r.role),
        joinDate: user.created_at,
        lastActive: user.updated_at,
      }))
      .filter(user => {
        const matchesSearch =
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = userTypeFilter === 'all' || user.userType === userTypeFilter;
        return matchesSearch && matchesType;
      });
  }, [users, searchTerm, userTypeFilter]);

  const handleToggleStatus = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    updateUserMutation.mutate({ userId, newStatus });
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (window.confirm(`Are you sure you want to permanently delete ${userName}? This action cannot be undone.`)) {
      deleteUserMutation.mutate(userId);
    }
  };

  const handleRoleChange = (userId: string, currentRoles: Database['public']['Enums']['app_role'][], role: Database['public']['Enums']['app_role'], isChecked: boolean) => {
    let newRoles: Database['public']['Enums']['app_role'][];
    if (isChecked) {
      newRoles = [...currentRoles, role];
    } else {
      newRoles = currentRoles.filter(r => r !== role);
    }
    updateUserRolesMutation.mutate({ userId, roles: newRoles });
  };

  const getUserTypeBadge = (userType: string) => {
    const colors: { [key: string]: string } = {
      vendor: 'bg-green-100 text-green-800',
      ngo: 'bg-pink-100 text-pink-800',
      corporate: 'bg-blue-100 text-blue-800',
      admin: 'bg-purple-100 text-purple-800',
      unknown: 'bg-gray-100 text-gray-800'
    };
    return <Badge className={colors[userType] || colors.unknown}>{userType.toUpperCase()}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? 
      <Badge className="bg-green-100 text-green-800">Active</Badge> :
      <Badge variant="destructive">Suspended</Badge>;
  };

  const getRoleBadge = (role: string) => {
    const colors: { [key: string]: string } = {
      admin: 'bg-red-200 text-red-800',
      moderator: 'bg-yellow-200 text-yellow-800',
      support: 'bg-indigo-200 text-indigo-800',
    };
    return <Badge key={role} variant="outline" className={colors[role]}>{role}</Badge>;
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Management System
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Users</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="userType">Filter by Type</Label>
              <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="vendor">Vendor</SelectItem>
                  <SelectItem value="ngo">NGO</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="flex-grow overflow-y-auto border rounded-lg">
          <Table>
            <TableHeader className="sticky top-0 bg-white shadow-sm">
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex justify-center items-center gap-2 text-gray-500">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Loading users...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-red-500">
                    Error loading users. Please try again later.
                  </TableCell>
                </TableRow>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      <div className="flex gap-1 mt-2">
                        {user.roles.map(role => getRoleBadge(role))}
                      </div>
                    </TableCell>
                    <TableCell>{getUserTypeBadge(user.userType)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                    <TableCell>
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleToggleStatus(user.id, user.status)}>
                             {user.status === 'active' ? 'Suspend' : 'Activate'}
                          </DropdownMenuItem>
                           <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Manage Roles</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                <DropdownMenuCheckboxItem
                                  checked={user.roles.includes('admin')}
                                  onCheckedChange={(checked) => handleRoleChange(user.id, user.roles, 'admin', checked)}
                                >
                                  Admin
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                  checked={user.roles.includes('moderator')}
                                  onCheckedChange={(checked) => handleRoleChange(user.id, user.roles, 'moderator', checked)}
                                >
                                  Moderator
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                  checked={user.roles.includes('support')}
                                  onCheckedChange={(checked) => handleRoleChange(user.id, user.roles, 'support', checked)}
                                >
                                  Support
                                </DropdownMenuCheckboxItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            className="text-red-500"
                          >
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No users found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end pt-4 border-t mt-auto">
          <Button onClick={onClose} variant="outline">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserManagementModal;
