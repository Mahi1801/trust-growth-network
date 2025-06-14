
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Target, Shield, ArrowLeft, CreditCard, Wallet, Building2, Smartphone, DollarSign, Globe } from "lucide-react";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";
import { toast } from "sonner";

interface NGOPlatformProps {
  onBack: () => void;
}

const NGOPlatform = ({ onBack }: NGOPlatformProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("signup");

  const handleJoinAsNGO = () => {
    setAuthModalTab("signup");
    setShowAuthModal(true);
  };

  const handleLoginAsNGO = () => {
    setAuthModalTab("login");
    setShowAuthModal(true);
  };

  const handlePaymentGateway = (gateway: string) => {
    toast.info(`Connecting to ${gateway} is a demo feature.`);
    console.log(`Integrating with ${gateway} payment gateway`);
    // This would typically open the payment gateway integration flow
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-100 pt-20">
      <div className="container mx-auto px-4 py-12">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6 text-pink-600 hover:text-pink-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            NGO Platform
            <span className="block text-pink-600">Create Impact</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Connect with funding partners and vendors to amplify your social impact projects across communities.
          </p>
          
          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 text-lg"
              onClick={handleJoinAsNGO}
            >
              <Target className="h-5 w-5 mr-2" />
              Join as NGO
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-pink-600 text-pink-600 hover:bg-pink-50 px-8 py-3 text-lg"
              onClick={handleLoginAsNGO}
            >
              Already registered? Login
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Heart className="h-12 w-12 text-pink-600 mb-4" />
              <CardTitle>Project Funding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Access corporate funding and grants for your community development projects.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-pink-600 mb-4" />
              <CardTitle>Community Network</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Connect with other NGOs and share resources for maximum impact.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-pink-600 mb-4" />
              <CardTitle>Impact Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Blockchain-verified impact certificates to build trust with funders.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
          <div className="text-center mb-8">
            <Heart className="h-16 w-16 text-pink-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Donation & Funding Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Accept donations and manage funding with secure, trusted payment gateways
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
                <p className="text-gray-600 mb-4">Global donation processing with instant transfers</p>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handlePaymentGateway('Stripe')}
                >
                  Setup Stripe
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-yellow-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-lg">PayPal</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Trusted donation platform worldwide</p>
                <Button 
                  className="w-full bg-yellow-600 hover:bg-yellow-700"
                  onClick={() => handlePaymentGateway('PayPal')}
                >
                  Setup PayPal
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg">GoFundMe</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Crowdfunding for social causes</p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handlePaymentGateway('GoFundMe')}
                >
                  Setup Campaign
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Razorpay</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Local payment solutions for India</p>
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => handlePaymentGateway('Razorpay')}
                >
                  Setup Razorpay
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recurring Donations</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    <Heart className="h-4 w-4 text-pink-600" />
                  </div>
                  <span className="text-gray-700">Monthly Recurring Donations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-pink-600" />
                  </div>
                  <span className="text-gray-700">Automated Donor Management</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">One-time Donations</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">Instant Donation Processing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">Secure Transaction Handling</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Empower your organization with resources to maximize social impact
          </p>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab={authModalTab}
        userType="ngo"
        redirectTo="NGOPlatform"
      />
    </div>
  );
};

export default NGOPlatform;
