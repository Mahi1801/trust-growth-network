import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Award, Palette, ShoppingBag, Shield, TrendingUp, Users, Wallet, Zap } from 'lucide-react';
import CertificateGallery from './CertificateGallery';
import CertificateMinting from './CertificateMinting';
import NFTMarketplace from './NFTMarketplace';
import CertificateVerification from './CertificateVerification';

const BlockchainCertificatesMain = () => {
  const [activeTab, setActiveTab] = useState('gallery');

  const features = [
    {
      icon: Award,
      title: 'Immutable Verification',
      description: 'Certificates stored on blockchain with permanent proof of achievements',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Palette,
      title: 'NFT Technology',
      description: 'Each certificate is a unique NFT with tradeable value and rarity',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: ShoppingBag,
      title: 'Marketplace Ready',
      description: 'Trade certificates, showcase achievements, build impact portfolios',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Multi-Signature Verification',
      description: 'Verified by AI systems, NGOs, and corporate partners for trust',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { label: 'Total Certificates Minted', value: '2,847', icon: Award, color: 'text-blue-600' },
    { label: 'Marketplace Volume', value: '₹12.4M', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Active Collectors', value: '1,523', icon: Users, color: 'text-purple-600' },
    { label: 'Verification Rate', value: '99.2%', icon: Shield, color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <Badge className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 px-6 py-2 text-lg">
            <Award className="h-5 w-5 mr-2" />
            Blockchain Impact Certificates
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
            NFT-Based
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              {" "}Impact Verification
            </span>
          </h1>
          
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Revolutionary blockchain technology that transforms social impact into tradeable, 
            verifiable NFT certificates. Create immutable proof of achievements with smart contracts 
            and multi-signature verification from trusted partners.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                <CardContent className="p-6 relative">
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
            <CardTitle className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-purple-600" />
              Certificate Management Hub
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-50 m-4 rounded-xl p-1">
                <TabsTrigger 
                  value="gallery" 
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
                >
                  <Award className="h-4 w-4" />
                  <span className="hidden sm:inline">My Certificates</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="mint" 
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
                >
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">Mint New</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="marketplace" 
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span className="hidden sm:inline">Marketplace</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="verify" 
                  className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
                >
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Verify</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="p-6">
                <TabsContent value="gallery" className="mt-0">
                  <CertificateGallery />
                </TabsContent>
                
                <TabsContent value="mint" className="mt-0">
                  <CertificateMinting />
                </TabsContent>
                
                <TabsContent value="marketplace" className="mt-0">
                  <NFTMarketplace />
                </TabsContent>
                
                <TabsContent value="verify" className="mt-0">
                  <CertificateVerification />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 text-white border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            <h3 className="text-3xl font-bold mb-4">Start Building Your Impact Portfolio</h3>
            <p className="text-lg text-purple-100 mb-6 max-w-2xl mx-auto">
              Join the revolution of verifiable social impact. Mint your first certificate, 
              trade achievements, and build a portfolio that showcases your real-world impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setActiveTab('mint')}
                className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 shadow-lg"
              >
                <Wallet className="h-5 w-5 mr-2 inline" />
                Connect Wallet & Start Minting
              </button>
              <button 
                onClick={() => setActiveTab('marketplace')}
                className="border-2 border-white/20 hover:bg-white/10 px-8 py-3 rounded-xl font-semibold transition-all backdrop-blur-sm"
              >
                Explore Marketplace
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlockchainCertificatesMain;