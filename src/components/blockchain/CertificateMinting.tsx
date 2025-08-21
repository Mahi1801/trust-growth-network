import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Award, Upload, Wallet, Zap, CheckCircle, AlertCircle, Camera, FileImage } from 'lucide-react';
import { toast } from 'sonner';

interface MintingForm {
  certificateType: string;
  vendorName: string;
  title: string;
  description: string;
  location: string;
  improvementType: string;
  fundingAmount: number;
  impactMetrics: {
    metric1Name: string;
    metric1Value: number;
    metric2Name: string;
    metric2Value: number;
    metric3Name: string;
    metric3Value: number;
  };
  images: File[];
}

const CertificateMinting = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintingProgress, setMintingProgress] = useState(0);
  const [gasFee, setGasFee] = useState(0.0234);
  const [form, setForm] = useState<MintingForm>({
    certificateType: '',
    vendorName: '',
    title: '',
    description: '',
    location: '',
    improvementType: '',
    fundingAmount: 0,
    impactMetrics: {
      metric1Name: '',
      metric1Value: 0,
      metric2Name: '',
      metric2Value: 0,
      metric3Name: '',
      metric3Value: 0
    },
    images: []
  });

  const certificateTypes = [
    { value: 'improvement_verified', label: 'Improvement Verified', description: 'For completed vendor improvements' },
    { value: 'funding_milestone', label: 'Funding Milestone', description: 'For reaching funding targets' },
    { value: 'community_impact', label: 'Community Impact', description: 'For significant local community changes' },
    { value: 'transparency_champion', label: 'Transparency Champion', description: 'For exceptional documentation quality' },
    { value: 'growth_achievement', label: 'Growth Achievement', description: 'For measurable business growth' }
  ];

  const handleWalletConnect = () => {
    setIsConnected(true);
    toast.success('Wallet connected successfully!');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setForm(prev => ({ ...prev, images: [...prev.images, ...files] }));
    toast.success(`${files.length} image(s) uploaded successfully!`);
  };

  const handleMintCertificate = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!form.certificateType || !form.vendorName || !form.title) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsMinting(true);
    setMintingProgress(0);

    // Simulate minting process
    const steps = [
      'Uploading metadata to IPFS...',
      'Generating certificate template...',
      'Creating smart contract transaction...',
      'Waiting for blockchain confirmation...',
      'Certificate minted successfully!'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setMintingProgress((i + 1) * 20);
      toast.success(steps[i]);
    }

    setIsMinting(false);
    setMintingProgress(100);
    toast.success('🎉 NFT Certificate minted successfully!');
    
    // Reset form
    setForm({
      certificateType: '',
      vendorName: '',
      title: '',
      description: '',
      location: '',
      improvementType: '',
      fundingAmount: 0,
      impactMetrics: {
        metric1Name: '',
        metric1Value: 0,
        metric2Name: '',
        metric2Value: 0,
        metric3Name: '',
        metric3Value: 0
      },
      images: []
    });
  };

  return (
    <div className="space-y-8">
      {/* Wallet Connection */}
      <Card className="border-2 border-dashed border-purple-200 bg-purple-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Wallet className="h-6 w-6 text-purple-600" />
            Wallet Connection
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <div className="text-center space-y-4">
              <p className="text-gray-600">Connect your Web3 wallet to mint NFT certificates</p>
              <Button 
                onClick={handleWalletConnect}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-green-700">
              <CheckCircle className="h-5 w-5" />
              <span>Wallet Connected: 0x7d1a...4f2b</span>
              <Badge className="bg-green-100 text-green-700">Connected</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {isConnected && (
        <>
          {/* Minting Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Award className="h-6 w-6 text-purple-600" />
                Mint Impact Certificate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Certificate Type Selection */}
              <div>
                <Label htmlFor="certificateType">Certificate Type *</Label>
                <Select 
                  value={form.certificateType} 
                  onValueChange={(value) => setForm(prev => ({ ...prev, certificateType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select certificate type" />
                  </SelectTrigger>
                  <SelectContent>
                    {certificateTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <p className="font-semibold">{type.label}</p>
                          <p className="text-xs text-gray-500">{type.description}</p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vendorName">Vendor Name *</Label>
                  <Input
                    id="vendorName"
                    value={form.vendorName}
                    onChange={(e) => setForm(prev => ({ ...prev, vendorName: e.target.value }))}
                    placeholder="Enter vendor name"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={form.location}
                    onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="City, State"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="title">Certificate Title *</Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter certificate title"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the achievement or improvement"
                  rows={3}
                />
              </div>

              {/* Improvement Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="improvementType">Improvement Type</Label>
                  <Input
                    id="improvementType"
                    value={form.improvementType}
                    onChange={(e) => setForm(prev => ({ ...prev, improvementType: e.target.value }))}
                    placeholder="e.g., Digital Infrastructure"
                  />
                </div>
                <div>
                  <Label htmlFor="fundingAmount">Funding Amount (₹)</Label>
                  <Input
                    id="fundingAmount"
                    type="number"
                    value={form.fundingAmount}
                    onChange={(e) => setForm(prev => ({ ...prev, fundingAmount: Number(e.target.value) }))}
                    placeholder="0"
                  />
                </div>
              </div>

              <Separator />

              {/* Impact Metrics */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-500" />
                  Impact Metrics
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex gap-2">
                      <Input
                        placeholder={`Metric ${num} name`}
                        value={form.impactMetrics[`metric${num}Name` as keyof typeof form.impactMetrics]}
                        onChange={(e) => setForm(prev => ({
                          ...prev,
                          impactMetrics: {
                            ...prev.impactMetrics,
                            [`metric${num}Name`]: e.target.value
                          }
                        }))}
                      />
                      <Input
                        type="number"
                        placeholder="Value"
                        value={form.impactMetrics[`metric${num}Value` as keyof typeof form.impactMetrics]}
                        onChange={(e) => setForm(prev => ({
                          ...prev,
                          impactMetrics: {
                            ...prev.impactMetrics,
                            [`metric${num}Value`]: Number(e.target.value)
                          }
                        }))}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Image Upload */}
              <div>
                <Label>Certificate Images</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="space-y-2">
                      <div className="mx-auto w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {form.images.length > 0 ? (
                          <FileImage className="h-6 w-6 text-green-600" />
                        ) : (
                          <Camera className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {form.images.length > 0 
                          ? `${form.images.length} image(s) selected`
                          : 'Click to upload verification images'
                        }
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Minting Progress */}
              {isMinting && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm font-semibold text-blue-700">Minting Certificate...</span>
                  </div>
                  <Progress value={mintingProgress} className="h-2" />
                </div>
              )}

              {/* Gas Fee Estimate */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-800">Estimated Gas Fee</p>
                    <p className="text-sm text-yellow-700">≈ {gasFee} ETH (~₹{Math.round(gasFee * 200000)})</p>
                  </div>
                </div>
              </div>

              {/* Mint Button */}
              <Button 
                onClick={handleMintCertificate}
                disabled={isMinting || !form.certificateType || !form.vendorName || !form.title}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="lg"
              >
                {isMinting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Minting Certificate...
                  </>
                ) : (
                  <>
                    <Award className="h-5 w-5 mr-2" />
                    Mint NFT Certificate
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default CertificateMinting;