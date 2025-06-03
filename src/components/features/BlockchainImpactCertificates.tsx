
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Award, TrendingUp, Download, Share2, Eye, Copy, ExternalLink, Coins, Sparkles } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ImpactCertificate {
  id: string;
  tokenId: string;
  projectTitle: string;
  vendorName: string;
  impactMetrics: {
    beneficiaries: number;
    co2Reduced: number;
    jobsCreated: number;
    infrastructureBuilt: number;
  };
  verificationData: {
    verifier: string;
    verificationDate: string;
    trustScore: number;
    evidenceHash: string;
  };
  blockchainData: {
    network: string;
    contractAddress: string;
    transactionHash: string;
    mintedDate: string;
    owner: string;
  };
  tradingData: {
    currentValue: number;
    lastSalePrice: number;
    totalVolume: number;
    isForSale: boolean;
  };
  metadata: {
    imageUrl: string;
    description: string;
    attributes: Array<{
      trait_type: string;
      value: string | number;
    }>;
  };
}

interface TradingOffer {
  id: string;
  certificateId: string;
  buyerName: string;
  offerAmount: number;
  offerDate: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const BlockchainImpactCertificates = () => {
  const [certificates, setCertificates] = useState<ImpactCertificate[]>([]);
  const [tradingOffers, setTradingOffers] = useState<TradingOffer[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<ImpactCertificate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<'gallery' | 'marketplace' | 'portfolio'>('gallery');
  const [offerAmount, setOfferAmount] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Load sample certificates
    setCertificates([
      {
        id: 'cert-001',
        tokenId: 'EL-IMPACT-1001',
        projectTitle: 'Clean Water Initiative - Mumbai Slums',
        vendorName: 'AquaTech Solutions',
        impactMetrics: {
          beneficiaries: 2500,
          co2Reduced: 50,
          jobsCreated: 15,
          infrastructureBuilt: 3
        },
        verificationData: {
          verifier: 'WaterAid NGO',
          verificationDate: '2024-01-15',
          trustScore: 96,
          evidenceHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385'
        },
        blockchainData: {
          network: 'Polygon',
          contractAddress: '0x742c8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b',
          transactionHash: '0x8f7c6b9e4a2d8c7f3e1a5b9c8d2f4e6a7b3c5d8e9f1a2b4c6d8e0f2a4b6c8d0e',
          mintedDate: '2024-01-16',
          owner: 'EcoTech Corporation'
        },
        tradingData: {
          currentValue: 15000,
          lastSalePrice: 12000,
          totalVolume: 45000,
          isForSale: false
        },
        metadata: {
          imageUrl: '/api/placeholder/400/400',
          description: 'Verified impact certificate for providing clean water access to 2,500 people in Mumbai slums',
          attributes: [
            { trait_type: 'Impact Category', value: 'Water & Sanitation' },
            { trait_type: 'Beneficiaries', value: 2500 },
            { trait_type: 'Verification Score', value: 96 },
            { trait_type: 'Rarity', value: 'Rare' }
          ]
        }
      },
      {
        id: 'cert-002',
        tokenId: 'EL-IMPACT-1002',
        projectTitle: 'Solar Energy Village Project',
        vendorName: 'SunPower Rural',
        impactMetrics: {
          beneficiaries: 1800,
          co2Reduced: 250,
          jobsCreated: 8,
          infrastructureBuilt: 1
        },
        verificationData: {
          verifier: 'Greenpeace India',
          verificationDate: '2024-02-10',
          trustScore: 94,
          evidenceHash: '0x8a1b2c3d4e5f6789abcdef1234567890abcdef1234567890abcdef1234567890'
        },
        blockchainData: {
          network: 'Ethereum',
          contractAddress: '0x863c8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b',
          transactionHash: '0x9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d',
          mintedDate: '2024-02-11',
          owner: 'GreenTech Innovations'
        },
        tradingData: {
          currentValue: 22000,
          lastSalePrice: 18500,
          totalVolume: 67000,
          isForSale: true
        },
        metadata: {
          imageUrl: '/api/placeholder/400/400',
          description: 'Certified impact for bringing renewable energy to rural village, reducing 250 tons CO2 annually',
          attributes: [
            { trait_type: 'Impact Category', value: 'Clean Energy' },
            { trait_type: 'CO2 Reduced (tons)', value: 250 },
            { trait_type: 'Verification Score', value: 94 },
            { trait_type: 'Rarity', value: 'Epic' }
          ]
        }
      }
    ]);

    setTradingOffers([
      {
        id: 'offer-001',
        certificateId: 'cert-002',
        buyerName: 'ImpactFund Ventures',
        offerAmount: 25000,
        offerDate: '2024-03-01',
        status: 'pending'
      }
    ]);
  }, []);

  const generateCertificate = async () => {
    setIsGenerating(true);
    
    // Simulate blockchain minting process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newCertificate: ImpactCertificate = {
      id: `cert-${Date.now()}`,
      tokenId: `EL-IMPACT-${1000 + certificates.length + 1}`,
      projectTitle: 'Digital Education Hub - Rural Schools',
      vendorName: 'EduTech Solutions',
      impactMetrics: {
        beneficiaries: 1200,
        co2Reduced: 15,
        jobsCreated: 12,
        infrastructureBuilt: 5
      },
      verificationData: {
        verifier: 'Education Alliance',
        verificationDate: new Date().toISOString().split('T')[0],
        trustScore: 92,
        evidenceHash: `0x${Math.random().toString(16).substr(2, 64)}`
      },
      blockchainData: {
        network: 'Polygon',
        contractAddress: '0x742c8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b8b',
        transactionHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        mintedDate: new Date().toISOString().split('T')[0],
        owner: 'Future Education Corp'
      },
      tradingData: {
        currentValue: 18000,
        lastSalePrice: 0,
        totalVolume: 0,
        isForSale: false
      },
      metadata: {
        imageUrl: '/api/placeholder/400/400',
        description: 'Impact certificate for establishing digital education centers in 5 rural schools',
        attributes: [
          { trait_type: 'Impact Category', value: 'Education' },
          { trait_type: 'Schools Impacted', value: 5 },
          { trait_type: 'Verification Score', value: 92 },
          { trait_type: 'Rarity', value: 'Common' }
        ]
      }
    };

    setCertificates(prev => [...prev, newCertificate]);
    setIsGenerating(false);
    
    toast({
      title: "Impact Certificate Minted!",
      description: `NFT ${newCertificate.tokenId} has been successfully created on blockchain`,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Blockchain address copied successfully",
    });
  };

  const handleTradeOffer = (certificateId: string) => {
    if (!offerAmount) return;
    
    const newOffer: TradingOffer = {
      id: `offer-${Date.now()}`,
      certificateId,
      buyerName: 'Your Company',
      offerAmount: parseFloat(offerAmount),
      offerDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    
    setTradingOffers(prev => [...prev, newOffer]);
    setOfferAmount('');
    
    toast({
      title: "Offer Submitted",
      description: `Your offer of ₹${offerAmount} has been submitted`,
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'text-gray-600 bg-gray-100';
      case 'Rare': return 'text-blue-600 bg-blue-100';
      case 'Epic': return 'text-purple-600 bg-purple-100';
      case 'Legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Shield className="h-8 w-8" />
            Blockchain Impact Certificates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-emerald-100 mb-4">
            Immutable, tradeable NFT certificates that prove real social impact. Each certificate 
            is verified by trusted NGOs and recorded permanently on the blockchain.
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">₹2.3M</div>
              <div className="text-sm text-emerald-200">Total Market Value</div>
            </div>
            <div>
              <div className="text-2xl font-bold">156</div>
              <div className="text-sm text-emerald-200">Certificates Minted</div>
            </div>
            <div>
              <div className="text-2xl font-bold">98.7%</div>
              <div className="text-sm text-emerald-200">Verification Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex gap-2">
        <Button 
          variant={viewMode === 'gallery' ? 'default' : 'outline'}
          onClick={() => setViewMode('gallery')}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          Certificate Gallery
        </Button>
        <Button 
          variant={viewMode === 'marketplace' ? 'default' : 'outline'}
          onClick={() => setViewMode('marketplace')}
          className="flex items-center gap-2"
        >
          <Coins className="h-4 w-4" />
          Impact Marketplace
        </Button>
        <Button 
          variant={viewMode === 'portfolio' ? 'default' : 'outline'}
          onClick={() => setViewMode('portfolio')}
          className="flex items-center gap-2"
        >
          <Award className="h-4 w-4" />
          My Portfolio
        </Button>
      </div>

      {/* Generate New Certificate */}
      {viewMode === 'gallery' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Generate New Impact Certificate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">
                  Create a new blockchain certificate for verified impact projects
                </p>
                <p className="text-sm text-gray-500">
                  Requires NGO verification and project completion proof
                </p>
              </div>
              <Button 
                onClick={generateCertificate}
                disabled={isGenerating}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Minting...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Mint Certificate
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certificates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => {
          const rarity = cert.metadata.attributes.find(attr => attr.trait_type === 'Rarity')?.value as string || 'Common';
          
          return (
            <Card key={cert.id} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{cert.projectTitle}</CardTitle>
                    <p className="text-sm text-gray-600">{cert.vendorName}</p>
                  </div>
                  <Badge className={getRarityColor(rarity)}>
                    {rarity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Impact Metrics */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-blue-50 p-2 rounded">
                    <div className="font-semibold text-blue-800">{cert.impactMetrics.beneficiaries.toLocaleString()}</div>
                    <div className="text-blue-600">Beneficiaries</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <div className="font-semibold text-green-800">{cert.impactMetrics.co2Reduced}</div>
                    <div className="text-green-600">CO2 Reduced (tons)</div>
                  </div>
                </div>

                {/* Blockchain Info */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Token ID:</span>
                    <span className="font-mono text-xs">{cert.tokenId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Network:</span>
                    <Badge variant="outline">{cert.blockchainData.network}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Trust Score:</span>
                    <span className="font-semibold text-green-600">{cert.verificationData.trustScore}/100</span>
                  </div>
                </div>

                {/* Trading Info */}
                {viewMode === 'marketplace' && (
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Current Value:</span>
                      <span className="font-bold text-lg">₹{cert.tradingData.currentValue.toLocaleString()}</span>
                    </div>
                    {cert.tradingData.isForSale ? (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Offer amount"
                            value={offerAmount}
                            onChange={(e) => setOfferAmount(e.target.value)}
                            type="number"
                          />
                          <Button 
                            size="sm"
                            onClick={() => handleTradeOffer(cert.id)}
                          >
                            Offer
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Badge className="w-full justify-center">Not for Sale</Badge>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setSelectedCertificate(cert)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(cert.blockchainData.transactionHash)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`https://polygonscan.com/tx/${cert.blockchainData.transactionHash}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Certificate Detail Modal */}
      {selectedCertificate && (
        <Card className="fixed inset-4 z-50 bg-white shadow-2xl overflow-auto">
          <CardHeader className="border-b">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{selectedCertificate.projectTitle}</CardTitle>
                <p className="text-gray-600">{selectedCertificate.vendorName}</p>
              </div>
              <Button variant="outline" onClick={() => setSelectedCertificate(null)}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Detailed impact metrics, blockchain verification, etc. */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Impact Metrics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Beneficiaries:</span>
                    <span className="font-semibold">{selectedCertificate.impactMetrics.beneficiaries.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CO2 Reduced:</span>
                    <span className="font-semibold">{selectedCertificate.impactMetrics.co2Reduced} tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jobs Created:</span>
                    <span className="font-semibold">{selectedCertificate.impactMetrics.jobsCreated}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Verification Data</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Verified By:</span>
                    <span className="font-semibold">{selectedCertificate.verificationData.verifier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trust Score:</span>
                    <span className="font-semibold">{selectedCertificate.verificationData.trustScore}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-semibold">{selectedCertificate.verificationData.verificationDate}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Blockchain Details</h3>
              <div className="bg-gray-50 p-4 rounded space-y-2 font-mono text-sm">
                <div>Contract: {selectedCertificate.blockchainData.contractAddress}</div>
                <div>Transaction: {selectedCertificate.blockchainData.transactionHash}</div>
                <div>Network: {selectedCertificate.blockchainData.network}</div>
                <div>Owner: {selectedCertificate.blockchainData.owner}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlockchainImpactCertificates;
