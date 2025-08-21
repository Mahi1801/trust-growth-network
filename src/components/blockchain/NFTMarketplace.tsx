import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, TrendingUp, Filter, Search, ExternalLink, Heart, Share2, Eye, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface MarketplaceCertificate {
  id: string;
  title: string;
  vendorName: string;
  description: string;
  type: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  currentPrice: number;
  originalPrice: number;
  highestBid?: number;
  views: number;
  likes: number;
  isForSale: boolean;
  isAuction: boolean;
  auctionEndTime?: Date;
  owner: string;
  verificationScore: number;
  tags: string[];
}

const NFTMarketplace = () => {
  const [certificates] = useState<MarketplaceCertificate[]>([
    {
      id: 'nft_001',
      title: 'Digital Transformation Pioneer',
      vendorName: 'Chennai Tech Hub',
      description: 'First vendor to achieve 100% digital payment adoption',
      type: 'improvement_verified',
      rarity: 'legendary',
      currentPrice: 5200,
      originalPrice: 3500,
      views: 1240,
      likes: 89,
      isForSale: true,
      isAuction: false,
      owner: '0x7d1a...4f2b',
      verificationScore: 100,
      tags: ['digital', 'payments', 'innovation']
    },
    {
      id: 'nft_002',
      title: 'Community Builder Excellence',
      vendorName: 'Kolkata Craft Collective',
      description: 'Created sustainable livelihoods for 100+ artisans',
      type: 'community_impact',
      rarity: 'epic',
      currentPrice: 3800,
      originalPrice: 2200,
      highestBid: 4100,
      views: 890,
      likes: 67,
      isForSale: true,
      isAuction: true,
      auctionEndTime: new Date(Date.now() + 24 * 60 * 60 * 1000),
      owner: '0x8e2b...5g3c',
      verificationScore: 97,
      tags: ['community', 'sustainability', 'artisans']
    },
    {
      id: 'nft_003',
      title: 'Growth Catalyst Achievement',
      vendorName: 'Pune Food Networks',
      description: '300% revenue growth with supply chain optimization',
      type: 'growth_achievement',
      rarity: 'rare',
      currentPrice: 2400,
      originalPrice: 1800,
      views: 567,
      likes: 34,
      isForSale: true,
      isAuction: false,
      owner: '0x9f3c...6h4d',
      verificationScore: 94,
      tags: ['growth', 'supply-chain', 'optimization']
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [rarityFilter, setRarityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('price_asc');

  const getRarityColor = (rarity: string) => {
    const colors = {
      common: 'bg-gray-500',
      rare: 'bg-blue-500',
      epic: 'bg-purple-500',
      legendary: 'bg-yellow-500'
    };
    return colors[rarity as keyof typeof colors];
  };

  const getTypeColor = (type: string) => {
    const colors = {
      improvement_verified: 'from-green-500 to-emerald-600',
      funding_milestone: 'from-blue-500 to-cyan-600',
      community_impact: 'from-purple-500 to-pink-600',
      transparency_champion: 'from-orange-500 to-yellow-600',
      growth_achievement: 'from-red-500 to-rose-600'
    };
    return colors[type as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const handlePurchase = (certificate: MarketplaceCertificate) => {
    toast.success(`Purchasing "${certificate.title}" for ₹${certificate.currentPrice.toLocaleString()}...`);
  };

  const handleBid = (certificate: MarketplaceCertificate) => {
    toast.success(`Placing bid on "${certificate.title}"...`);
  };

  const handleLike = (certificateId: string) => {
    toast.success('Added to favorites!');
  };

  const handleShare = (certificate: MarketplaceCertificate) => {
    toast.success('Certificate link copied to clipboard!');
  };

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRarity = rarityFilter === 'all' || cert.rarity === rarityFilter;
    
    return matchesSearch && matchesRarity;
  });

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-700">{certificates.length}</p>
                <p className="text-sm text-blue-600">Listed Certificates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-700">₹{certificates.reduce((sum, cert) => sum + cert.currentPrice, 0).toLocaleString()}</p>
                <p className="text-sm text-green-600">Total Volume</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-700">{certificates.filter(c => c.rarity === 'legendary' || c.rarity === 'epic').length}</p>
                <p className="text-sm text-purple-600">Premium Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Eye className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-orange-700">{certificates.reduce((sum, cert) => sum + cert.views, 0).toLocaleString()}</p>
                <p className="text-sm text-orange-600">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search certificates, vendors, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={rarityFilter} onValueChange={setRarityFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by rarity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rarities</SelectItem>
                <SelectItem value="common">Common</SelectItem>
                <SelectItem value="rare">Rare</SelectItem>
                <SelectItem value="epic">Epic</SelectItem>
                <SelectItem value="legendary">Legendary</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="views_desc">Most Viewed</SelectItem>
                <SelectItem value="likes_desc">Most Liked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Marketplace Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="auctions">Live Auctions</TabsTrigger>
          <TabsTrigger value="fixed">Fixed Price</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertificates.map((certificate) => (
              <Card 
                key={certificate.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                <div className={`h-4 bg-gradient-to-r ${getTypeColor(certificate.type)}`} />
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={`${getRarityColor(certificate.rarity)} text-white capitalize`}>
                      {certificate.rarity}
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleLike(certificate.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleShare(certificate)}
                        className="h-8 w-8 p-0"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all">
                    {certificate.title}
                  </CardTitle>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-800">{certificate.vendorName}</p>
                    <p className="text-xs text-gray-600">Owner: {certificate.owner}</p>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-700 mb-4">{certificate.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {certificate.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                    <div className="text-center">
                      <p className="font-semibold">{certificate.views}</p>
                      <p className="text-gray-500">Views</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{certificate.likes}</p>
                      <p className="text-gray-500">Likes</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold">{certificate.verificationScore}%</p>
                      <p className="text-gray-500">Verified</p>
                    </div>
                  </div>
                  
                  {/* Price Information */}
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Current Price</p>
                        <p className="text-lg font-bold text-gray-900">₹{certificate.currentPrice.toLocaleString()}</p>
                        {certificate.originalPrice !== certificate.currentPrice && (
                          <p className="text-xs text-gray-500 line-through">₹{certificate.originalPrice.toLocaleString()}</p>
                        )}
                      </div>
                      {certificate.isAuction && certificate.auctionEndTime && (
                        <div className="text-right">
                          <p className="text-xs text-orange-600">Auction Ends</p>
                          <p className="text-xs font-semibold text-orange-700">
                            {new Date(certificate.auctionEndTime.getTime() - Date.now()).getHours()}h left
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {certificate.isAuction && certificate.highestBid && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500">Highest Bid</p>
                        <p className="font-semibold text-blue-600">₹{certificate.highestBid.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {certificate.isAuction ? (
                      <Button 
                        onClick={() => handleBid(certificate)}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      >
                        Place Bid
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handlePurchase(certificate)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        Buy Now
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="auctions">
          <div className="text-center py-12">
            <Award className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600">Live Auctions</h3>
            <p className="text-gray-500">Auction certificates will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="fixed">
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600">Fixed Price Items</h3>
            <p className="text-gray-500">Fixed price certificates will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NFTMarketplace;