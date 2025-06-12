
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Settings, BarChart3, Shield, ArrowLeft, Lock } from "lucide-react";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";

interface AdminPlatformProps {
  onBack: () => void;
}

const AdminPlatform = ({ onBack }: AdminPlatformProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleAdminAccess = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 pt-20">
      <div className="container mx-auto px-4 py-12">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6 text-purple-600 hover:text-purple-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Admin Platform
            <span className="block text-purple-600">Manage Ecosystem</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Oversee platform operations, manage user verification, and ensure quality control across all partnerships.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Verify and manage NGOs, corporations, and vendors joining the platform.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Platform Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Monitor platform performance and impact metrics across all projects.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Quality Control</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Ensure all projects meet quality standards and verification requirements.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={handleAdminAccess}
          >
            <Settings className="h-5 w-5 mr-2" />
            Admin Access
          </Button>
          <p className="text-gray-600 flex items-center justify-center">
            <Lock className="h-4 w-4 mr-2" />
            Secure admin portal for authorized personnel only
          </p>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab="login"
        userType="admin"
      />
    </div>
  );
};

export default AdminPlatform;
