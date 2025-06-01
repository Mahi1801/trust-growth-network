
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Users, Search, Shield, Ban, UserCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserManagementModal = ({ isOpen, onClose }: UserManagementModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const { toast } = useToast();

  const users = [
    { id: 1, name: 'Amit Sharma', email: 'amit@example.com', userType: 'vendor', status: 'active', joinDate: '2024-01-15', lastActive: '2024-05-30' },
    { id: 2, name: 'Priya Gupta', email: 'priya@ngo.org', userType: 'ngo', status: 'active', joinDate: '2024-02-20', lastActive: '2024-05-29' },
    { id: 3, name: 'TechCorp Ltd', email: 'contact@techcorp.com', userType: 'corporate', status: 'active', joinDate: '2024-03-10', lastActive: '2024-05-28' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@admin.com', userType: 'admin', status: 'active', joinDate: '2024-01-01', lastActive: '2024-05-30' },
    { id: 5, name: 'Raj Electronics', email: 'raj@shop.com', userType: 'vendor', status: 'suspended', joinDate: '2024-04-05', lastActive: '2024-05-15' },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = userTypeFilter === 'all' || user.userType === userTypeFilter;
    return matchesSearch && matchesType;
  });

  const handleToggleStatus = (userId: number, userName: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    toast({
      title: `User ${newStatus === 'active' ? 'Activated' : 'Suspended'}`,
      description: `${userName} has been ${newStatus === 'active' ? 'activated' : 'suspended'} successfully.`,
      variant: newStatus === 'suspended' ? 'destructive' : 'default'
    });
  };

  const handleDeleteUser = (userId: number, userName: string) => {
    toast({
      title: "User Deleted",
      description: `${userName} has been permanently deleted from the system.`,
      variant: "destructive"
    });
  };

  const getUserTypeBadge = (userType: string) => {
    const colors = {
      vendor: 'bg-blue-100 text-blue-800',
      ngo: 'bg-green-100 text-green-800',
      corporate: 'bg-purple-100 text-purple-800',
      admin: 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[userType as keyof typeof colors]}>{userType.toUpperCase()}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' ? 
      <Badge className="bg-green-100 text-green-800">Active</Badge> :
      <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            User Management System
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filter */}
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

          {/* Users Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
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
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getUserTypeBadge(user.userType)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={user.status === 'active'}
                          onCheckedChange={() => handleToggleStatus(user.id, user.name, user.status)}
                        />
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDeleteUser(user.id, user.name)}
                        >
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No users found matching your criteria.
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={onClose} variant="outline">Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserManagementModal;
