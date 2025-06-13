import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, DollarSign, Users, TrendingUp, ArrowLeft, CreditCard, Wallet, Building2, Smartphone } from "lucide-react";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";

interface VendorPlatformProps {
  onBack: () => void;
}

const VendorPlatform = ({ onBack }: VendorPlatformProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("signup");

  const handleJoinAsVendor = () => {
    setAuthModalTab("signup");
    setShowAuthModal(true);
  };

  const handleLoginAsVendor = () => {
    setAuthModalTab("login");
    setShowAuthModal(true);
  };

  const handlePaymentGateway = (gateway: string) => {
    console.log(`Integrating with ${gateway} payment gateway`);
    // This would typically open the payment gateway integration flow
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 pt-20">
      <div className="container mx-auto px-4 py-12">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6 text-green-600 hover:text-green-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Vendor Platform
            <span className="block text-green-600">Join Our Network</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Connect with NGOs and corporations to provide essential services and products for social impact projects.
          </p>
          
          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              onClick={handleJoinAsVendor}
            >
              <Users className="h-5 w-5 mr-2" />
              Join as Vendor
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg"
              onClick={handleLoginAsVendor}
            >
              Already a vendor? Login
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Store className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Business Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Access verified projects and expand your business through meaningful partnerships.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <DollarSign className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Fair Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Transparent pricing with guaranteed payments and fair compensation for your services.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Growth Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Track your impact contribution and business growth through detailed analytics.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
          <div className="text-center mb-8">
            <CreditCard className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Seamless Payment Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Receive payments securely and instantly with our integrated payment gateways
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
                <p className="text-gray-600 mb-4">Global payment processing with instant transfers</p>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handlePaymentGateway('Stripe')}
                >
                  Connect Stripe
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
                <p className="text-gray-600 mb-4">Trusted worldwide payment solution</p>
                <Button 
                  className="w-full bg-yellow-600 hover:bg-yellow-700"
                  onClick={() => handlePaymentGateway('PayPal')}
                >
                  Connect PayPal
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
                <p className="text-gray-600 mb-4">India's leading payment gateway</p>
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={() => handlePaymentGateway('Razorpay')}
                >
                  Connect Razorpay
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-green-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-lg">UPI & Digital</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">Google Pay, PhonePe, Paytm integration</p>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handlePaymentGateway('UPI')}
                >
                  Connect UPI
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Features</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-gray-700">Instant Fund Transfer</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-gray-700">Multi-Currency Support</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-gray-700">Secure Transactions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Join thousands of vendors making a difference in communities worldwide
          </p>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab={authModalTab}
        userType="vendor"
      />
    </div>
  );
};

export default VendorPlatform;
