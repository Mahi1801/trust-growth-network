
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, AlertTriangle, CheckCircle, Search, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VendorManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VendorManagementModal = ({ isOpen, onClose }: VendorManagementModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const vendors = [
    { id: 1, name: 'Ravi Kumar Shop', location: 'Mumbai Central Market', trustScore: 92, status: 'verified', revenue: 45000, flagged: false },
    { id: 2, name: 'Priya Textiles', location: 'Delhi Cloth Market', trustScore: 88, status: 'pending', revenue: 32000, flagged: false },
    { id: 3, name: 'Tech Repair Hub', location: 'Bangalore Electronics', trustScore: 45, status: 'flagged', revenue: 15000, flagged: true },
    { id: 4, name: 'Organic Farm Store', location: 'Chennai Market', trustScore: 95, status: 'verified', revenue: 67000, flagged: false },
    { id: 5, name: 'Handicraft Corner', location: 'Jaipur Bazaar', trustScore: 82, status: 'under_review', revenue: 28000, flagged: false },
  ];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (vendorId: number, vendorName: string) => {
    toast({
      title: "Vendor Approved",
      description: `${vendorName} has been approved and verified successfully.`,
    });
  };

  const handleReject = (vendorId: number, vendorName: string) => {
    toast({
      title: "Vendor Rejected",
      description: `${vendorName} application has been rejected and flagged for review.`,
      variant: "destructive"
    });
  };

  const handleFlag = (vendorId: number, vendorName: string) => {
    toast({
      title: "Vendor Flagged",
      description: `${vendorName} has been flagged for suspicious activity.`,
      variant: "destructive"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'flagged':
        return <Badge className="bg-red-100 text-red-800">Flagged</Badge>;
      case 'under_review':
        return <Badge className="bg-blue-100 text-blue-800">Under Review</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Vendor Management System
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Vendors</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Filter by Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Vendor Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Trust Score</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {vendor.flagged && <AlertTriangle className="h-4 w-4 text-red-500" />}
                        {vendor.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        {vendor.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Star className={`h-4 w-4 ${getTrustScoreColor(vendor.trustScore)}`} />
                        <span className={getTrustScoreColor(vendor.trustScore)}>
                          {vendor.trustScore}/100
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>₹{vendor.revenue.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {vendor.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              onClick={() => handleApprove(vendor.id, vendor.name)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleReject(vendor.id, vendor.name)}
                            >
                              Reject
                            </Button>
                          </>
                        )}
                        {vendor.status === 'verified' && !vendor.flagged && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleFlag(vendor.id, vendor.name)}
                          >
                            Flag
                          </Button>
                        )}
                        {vendor.status === 'flagged' && (
                          <Button 
                            size="sm"
                            onClick={() => handleApprove(vendor.id, vendor.name)}
                          >
                            Reinstate
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredVendors.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No vendors found matching your criteria.
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

export default VendorManagementModal;
