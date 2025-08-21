import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Award, ExternalLink, Share2, QrCode, Wallet, Star, TrendingUp, Users, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface Certificate {
  id: string;
  title: string;
  type: 'improvement_verified' | 'funding_milestone' | 'community_impact' | 'transparency_champion' | 'growth_achievement';
  vendorName: string;
  description: string;
  imageUrl: string;
  mintDate: Date;
  blockchainHash: string;
  verificationScore: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  marketValue: number;
  verified: boolean;
  metadata: {
    location: string;
    improvementType: string;
    fundingAmount?: number;
    impactMetrics: Record<string, number>;
  };
}

const CertificateGallery = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: 'cert_001',
      title: 'Digital Transformation Champion',
      type: 'improvement_verified',
      vendorName: 'Mumbai Street Foods Co.',
      description: 'Successfully implemented digital payment system and inventory management',
      imageUrl: '/placeholder.svg',
      mintDate: new Date('2024-01-15'),
      blockchainHash: '0x7d1a...4f2b',
      verificationScore: 98,
      rarity: 'epic',
      marketValue: 2500,
      verified: true,
      metadata: {
        location: 'Mumbai, Maharashtra',
        improvementType: 'Digital Infrastructure',
        impactMetrics: {
          revenueIncrease: 45,
          customerSatisfaction: 92,
          efficiency: 67
        }
      }
    },
    {
      id: 'cert_002',
      title: 'Community Impact Leader',
      type: 'community_impact',
      vendorName: 'Delhi Textile Weavers',
      description: 'Created 50+ jobs and trained local artisans in modern techniques',
      imageUrl: '/placeholder.svg',
      mintDate: new Date('2024-02-20'),
      blockchainHash: '0x8e2b...5g3c',
      verificationScore: 95,
      rarity: 'legendary',
      marketValue: 4200,
      verified: true,
      metadata: {
        location: 'Delhi, NCR',
        improvementType: 'Community Development',
        impactMetrics: {
          jobsCreated: 52,
          skillsDeveloped: 89,
          communityEngagement: 78
        }
      }
    },
    {
      id: 'cert_003',
      title: 'Funding Milestone Achievement',
      type: 'funding_milestone',
      vendorName: 'Bangalore Tech Solutions',
      description: 'Successfully reached ₹10L funding target for tech infrastructure upgrade',
      imageUrl: '/placeholder.svg',
      mintDate: new Date('2024-03-10'),
      blockchainHash: '0x9f3c...6h4d',
      verificationScore: 100,
      rarity: 'rare',
      marketValue: 1800,
      verified: true,
      metadata: {
        location: 'Bangalore, Karnataka',
        improvementType: 'Technology Upgrade',
        fundingAmount: 1000000,
        impactMetrics: {
          productivityGain: 85,
          qualityImprovement: 72,
          marketReach: 95
        }
      }
    }
  ]);

  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  const getCertificateTypeColor = (type: Certificate['type']) => {
    const colors = {
      improvement_verified: 'from-green-500 to-emerald-600',
      funding_milestone: 'from-blue-500 to-cyan-600',
      community_impact: 'from-purple-500 to-pink-600',
      transparency_champion: 'from-orange-500 to-yellow-600',
      growth_achievement: 'from-red-500 to-rose-600'
    };
    return colors[type];
  };

  const getRarityColor = (rarity: Certificate['rarity']) => {
    const colors = {
      common: 'bg-gray-500',
      rare: 'bg-blue-500',
      epic: 'bg-purple-500',
      legendary: 'bg-yellow-500'
    };
    return colors[rarity];
  };

  const getCertificateIcon = (type: Certificate['type']) => {
    const icons = {
      improvement_verified: Award,
      funding_milestone: TrendingUp,
      community_impact: Users,
      transparency_champion: Star,
      growth_achievement: Award
    };
    return icons[type];
  };

  const handleShare = (certificate: Certificate) => {
    const shareText = `🏆 Just earned "${certificate.title}" NFT Certificate! Verified on blockchain: ${certificate.blockchainHash.slice(0, 10)}... #NFT #ImpactCertificate #Blockchain`;
    
    if (navigator.share) {
      navigator.share({
        title: certificate.title,
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Certificate details copied to clipboard!');
    }
  };

  const handleQRCode = (certificate: Certificate) => {
    toast.success('QR code generated for certificate verification!');
  };

  const handleViewOnMarketplace = (certificate: Certificate) => {
    toast.success('Opening certificate on NFT marketplace...');
  };

  return (
    <div className="space-y-8">
      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-700">{certificates.length}</p>
                <p className="text-sm text-green-600">Total Certificates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Wallet className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-700">₹{certificates.reduce((sum, cert) => sum + cert.marketValue, 0).toLocaleString()}</p>
                <p className="text-sm text-blue-600">Portfolio Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-700">
                  {Math.round(certificates.reduce((sum, cert) => sum + cert.verificationScore, 0) / certificates.length)}%
                </p>
                <p className="text-sm text-purple-600">Avg. Verification</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-orange-700">{certificates.filter(c => c.rarity === 'legendary' || c.rarity === 'epic').length}</p>
                <p className="text-sm text-orange-600">Rare Certificates</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => {
          const Icon = getCertificateIcon(certificate.type);
          
          return (
            <Card 
              key={certificate.id} 
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
              onClick={() => setSelectedCertificate(certificate)}
            >
              <div className={`h-4 bg-gradient-to-r ${getCertificateTypeColor(certificate.type)}`} />
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getCertificateTypeColor(certificate.type)} rounded-xl flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge className={`${getRarityColor(certificate.rarity)} text-white capitalize`}>
                    {certificate.rarity}
                  </Badge>
                </div>
                
                <CardTitle className="text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all">
                  {certificate.title}
                </CardTitle>
                
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-800">{certificate.vendorName}</p>
                  <p className="text-xs text-gray-600">{certificate.metadata.location}</p>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-gray-700 mb-4">{certificate.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center bg-gray-50 p-2 rounded-lg">
                    <p className="text-lg font-bold text-gray-900">₹{certificate.marketValue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Market Value</p>
                  </div>
                  <div className="text-center bg-gray-50 p-2 rounded-lg">
                    <p className="text-lg font-bold text-gray-900">{certificate.verificationScore}%</p>
                    <p className="text-xs text-gray-500">Verified</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(certificate);
                    }}
                    className="flex-1"
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    Share
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQRCode(certificate);
                    }}
                  >
                    <QrCode className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Certificate Detail Modal */}
      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCertificate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  {(() => {
                    const Icon = getCertificateIcon(selectedCertificate.type);
                    return <Icon className="h-6 w-6 text-purple-600" />;
                  })()}
                  {selectedCertificate.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className={`aspect-square bg-gradient-to-br ${getCertificateTypeColor(selectedCertificate.type)} rounded-xl p-8 text-white`}>
                    <div className="text-center space-y-4">
                      {(() => {
                        const Icon = getCertificateIcon(selectedCertificate.type);
                        return <Icon className="h-16 w-16 mx-auto" />;
                      })()}
                      <h3 className="text-2xl font-bold">{selectedCertificate.title}</h3>
                      <p className="text-lg">{selectedCertificate.vendorName}</p>
                      <Badge className={`${getRarityColor(selectedCertificate.rarity)} text-white`}>
                        {selectedCertificate.rarity.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleViewOnMarketplace(selectedCertificate)}
                      className="flex-1"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Marketplace
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">Certificate Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Blockchain Hash:</span>
                        <span className="font-mono text-xs">{selectedCertificate.blockchainHash}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mint Date:</span>
                        <span>{selectedCertificate.mintDate.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Verification Score:</span>
                        <span>{selectedCertificate.verificationScore}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Market Value:</span>
                        <span>₹{selectedCertificate.marketValue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Impact Metrics</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(selectedCertificate.metadata.impactMetrics).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-3 rounded-lg text-center">
                          <p className="text-lg font-bold text-gray-900">{value}{typeof value === 'number' && value <= 100 ? '%' : ''}</p>
                          <p className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => handleShare(selectedCertificate)}
                      className="flex-1"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Achievement
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleQRCode(selectedCertificate)}
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CertificateGallery;