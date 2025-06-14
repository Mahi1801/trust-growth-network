
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, TrendingUp, Award, Globe, ArrowLeft, CreditCard, Wallet, Building2, DollarSign, Shield, Banknote } from "lucide-react";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";
import { toast } from "sonner";

interface CorporatePlatformProps {
  onBack: () => void;
}

const CorporatePlatform = ({ onBack }: CorporatePlatformProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("signup");

  const handlePartnerWithUs = () => {
    setAuthModalTab("signup");
    setShowAuthModal(true);
  };

  const handleLoginAsCorporate = () => {
    setAuthModalTab("login");
    setShowAuthModal(true);
  };

  const handlePaymentGateway = (gateway: string) => {
    toast.info(`Connecting to ${gateway} is a demo feature.`);
    console.log(`Integrating with ${gateway} payment gateway`);
    // This would typically open the payment gateway integration flow
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
      <div className="container mx-auto px-4 py-12">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6 text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Corporate Platform
            <span className="block text-blue-600">Fund Impact</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Partner with verified NGOs to create measurable social impact and meet your CSR objectives.
          </p>
          
          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              onClick={handlePartnerWithUs}
            >
              <Globe className="h-5 w-5 mr-2" />
              Partner with Us
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
              onClick={handleLoginAsCorporate}
            >
              Corporate Login
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Building className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>CSR Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Meet regulatory requirements with verified social impact investments.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Impact Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Real-time tracking and AI-powered insights on your social impact investments.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Award className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Brand Recognition</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Enhance brand reputation through transparent and verified social contributions.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
          <div className="text-center mb-8">
            <Building className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Enterprise Payment Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Streamline CSR funding and social impact investments with enterprise-grade payment infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-blue-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Stripe</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Enterprise payment processing with advanced reporting</p>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handlePaymentGateway('Stripe')}
                >
                  Setup Stripe
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-indigo-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-lg">Corporate Banking</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Direct bank transfer integration</p>
                <Button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => handlePaymentGateway('Banking')}
                >
                  Setup Banking
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Banknote className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg">Wire Transfer</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Secure high-value transfers</p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handlePaymentGateway('Wire')}
                >
                  Setup Wire
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg">PayPal Business</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Business-grade PayPal integration</p>
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => handlePaymentGateway('PayPal')}
                >
                  Setup PayPal
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">CSR Funding</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">Automated CSR Disbursement</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">Compliance Tracking</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Impact Investment</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">ROI Measurement</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Impact Certification</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Grant Management</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Building className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700">Multi-Stage Disbursement</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Globe className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700">Global Fund Distribution</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Enterprise Features</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">Bank-Grade Security</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">Real-time Analytics</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Building2 className="h-6 w-6 text-purple-600" />
                </div>
                <span className="text-sm text-gray-700">API Integration</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="h-6 w-6 text-orange-600" />
                </div>
                <span className="text-sm text-gray-700">Compliance Reports</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Transform your CSR strategy with transparent, measurable impact
          </p>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab={authModalTab}
        userType="corporate"
      />
    </div>
  );
};

export default CorporatePlatform;
