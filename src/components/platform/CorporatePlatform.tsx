
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, TrendingUp, Award, Globe, ArrowLeft } from "lucide-react";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";

interface CorporatePlatformProps {
  onBack: () => void;
}

const CorporatePlatform = ({ onBack }: CorporatePlatformProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handlePartnerWithUs = () => {
    setShowAuthModal(true);
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
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Partner with verified NGOs to create measurable social impact and meet your CSR objectives.
          </p>
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

        <div className="text-center space-y-4">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handlePartnerWithUs}
          >
            <Globe className="h-5 w-5 mr-2" />
            Partner with Us
          </Button>
          <p className="text-gray-600">
            Transform your CSR strategy with transparent, measurable impact
          </p>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab="signup"
        userType="corporate"
      />
    </div>
  );
};

export default CorporatePlatform;
