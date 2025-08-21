import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { QrCode, Shield, CheckCircle, AlertCircle, Search, ExternalLink, Copy, Camera, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface VerificationResult {
  isValid: boolean;
  certificateId: string;
  title: string;
  vendorName: string;
  mintDate: Date;
  blockchainHash: string;
  verificationScore: number;
  ipfsHash?: string;
  smartContractAddress?: string;
  verificationHistory: {
    timestamp: Date;
    verifier: string;
    status: 'verified' | 'pending' | 'failed';
    notes?: string;
  }[];
}

const CertificateVerification = () => {
  const [verificationInput, setVerificationInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [showQRScanner, setShowQRScanner] = useState(false);

  const handleVerify = async () => {
    if (!verificationInput.trim()) {
      toast.error('Please enter a certificate ID or blockchain hash');
      return;
    }

    setIsVerifying(true);

    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock verification result
    const result: VerificationResult = {
      isValid: true,
      certificateId: 'cert_001',
      title: 'Digital Transformation Champion',
      vendorName: 'Mumbai Street Foods Co.',
      mintDate: new Date('2024-01-15'),
      blockchainHash: '0x7d1a2f8e9c4b5a3d8f2e9c4b5a3d8f2e9c4b5a3d8f2e9c4b5a3d8f2e9c4b5a3d',
      verificationScore: 98,
      ipfsHash: 'QmX4B5a3d8f2e9c4b5a3d8f2e9c4b5a3d8f2e9c4b5a3d8f2e',
      smartContractAddress: '0x1234...5678',
      verificationHistory: [
        {
          timestamp: new Date('2024-01-15T10:30:00'),
          verifier: 'EmpowerLink AI System',
          status: 'verified',
          notes: 'Automated verification completed successfully'
        },
        {
          timestamp: new Date('2024-01-16T14:20:00'),
          verifier: 'NGO Partner: TechForGood',
          status: 'verified',
          notes: 'Manual verification by field team'
        },
        {
          timestamp: new Date('2024-01-17T09:15:00'),
          verifier: 'Corporate Sponsor: TechCorp India',
          status: 'verified',
          notes: 'Impact metrics validated'
        }
      ]
    };

    setVerificationResult(result);
    setIsVerifying(false);
    toast.success('Certificate verified successfully!');
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    toast.success('Hash copied to clipboard!');
  };

  const handleQRScan = () => {
    setShowQRScanner(true);
    toast.success('QR Scanner opened - Scan certificate QR code');
    // Simulate QR scan
    setTimeout(() => {
      setVerificationInput('cert_001');
      setShowQRScanner(false);
      handleVerify();
    }, 3000);
  };

  const handleViewOnBlockchain = () => {
    toast.success('Opening transaction on blockchain explorer...');
  };

  return (
    <div className="space-y-6">
      {/* Verification Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-blue-600" />
            Certificate Verification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="verificationInput">Certificate ID or Blockchain Hash</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="verificationInput"
                value={verificationInput}
                onChange={(e) => setVerificationInput(e.target.value)}
                placeholder="Enter certificate ID (e.g., cert_001) or blockchain hash (0x7d1a...)"
                className="flex-1"
              />
              <Button
                onClick={handleQRScan}
                variant="outline"
                disabled={showQRScanner}
              >
                {showQRScanner ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                ) : (
                  <QrCode className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Scan QR code or enter certificate details manually
            </p>
          </div>

          <Button 
            onClick={handleVerify}
            disabled={isVerifying || !verificationInput.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            size="lg"
          >
            {isVerifying ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Verifying Certificate...
              </>
            ) : (
              <>
                <Search className="h-5 w-5 mr-2" />
                Verify Certificate
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Verification Result */}
      {verificationResult && (
        <Card className={`border-2 ${verificationResult.isValid ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-3 ${verificationResult.isValid ? 'text-green-700' : 'text-red-700'}`}>
              {verificationResult.isValid ? (
                <CheckCircle className="h-6 w-6" />
              ) : (
                <AlertCircle className="h-6 w-6" />
              )}
              {verificationResult.isValid ? 'Certificate Verified ✓' : 'Certificate Invalid ✗'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {verificationResult.isValid && (
              <>
                {/* Certificate Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Certificate Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">ID:</span>
                          <span className="font-mono">{verificationResult.certificateId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Title:</span>
                          <span className="font-semibold">{verificationResult.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Vendor:</span>
                          <span>{verificationResult.vendorName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mint Date:</span>
                          <span>{verificationResult.mintDate.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Verification Score:</span>
                          <Badge className="bg-green-100 text-green-700">
                            {verificationResult.verificationScore}%
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Blockchain Details</h4>
                      <div className="space-y-3">
                        <div>
                          <Label className="text-xs text-gray-600">Blockchain Hash</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="text-xs bg-gray-100 p-2 rounded flex-1 font-mono">
                              {verificationResult.blockchainHash.slice(0, 20)}...{verificationResult.blockchainHash.slice(-10)}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleCopyHash(verificationResult.blockchainHash)}
                              className="h-8 w-8 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {verificationResult.ipfsHash && (
                          <div>
                            <Label className="text-xs text-gray-600">IPFS Hash</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="text-xs bg-gray-100 p-2 rounded flex-1 font-mono">
                                {verificationResult.ipfsHash.slice(0, 20)}...
                              </code>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleCopyHash(verificationResult.ipfsHash!)}
                                className="h-8 w-8 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}

                        {verificationResult.smartContractAddress && (
                          <div>
                            <Label className="text-xs text-gray-600">Smart Contract</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <code className="text-xs bg-gray-100 p-2 rounded flex-1 font-mono">
                                {verificationResult.smartContractAddress}
                              </code>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleCopyHash(verificationResult.smartContractAddress!)}
                                className="h-8 w-8 p-0"
                              >
                                <Copy className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Verification History */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Verification History</h4>
                  <div className="space-y-3">
                    {verificationResult.verificationHistory.map((entry, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          entry.status === 'verified' ? 'bg-green-100' : 
                          entry.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                        }`}>
                          {entry.status === 'verified' ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : entry.status === 'pending' ? (
                            <Clock className="h-4 w-4 text-yellow-600" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm">{entry.verifier}</p>
                            <Badge className={`text-xs ${
                              entry.status === 'verified' ? 'bg-green-100 text-green-700' :
                              entry.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {entry.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">
                            {entry.timestamp.toLocaleString()}
                          </p>
                          {entry.notes && (
                            <p className="text-sm text-gray-700 mt-1">{entry.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleViewOnBlockchain}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on Blockchain
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleCopyHash(`${window.location.origin}/verify/${verificationResult.certificateId}`)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Verification Link
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* How Verification Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-purple-600" />
            How Certificate Verification Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold">1. Submit Certificate ID</h4>
              <p className="text-sm text-gray-600">
                Enter the certificate ID or scan the QR code from the physical certificate
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold">2. Blockchain Verification</h4>
              <p className="text-sm text-gray-600">
                Our system checks the certificate against immutable blockchain records
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold">3. Instant Results</h4>
              <p className="text-sm text-gray-600">
                Get immediate verification status with complete audit trail and history
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificateVerification;