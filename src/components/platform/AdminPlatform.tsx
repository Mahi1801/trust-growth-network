
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
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");

  const handleAdminAccess = () => {
    setAuthModalTab("login");
    setShowAuthModal(true);
  };

  const handleAdminSignup = () => {
    setAuthModalTab("signup");
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
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Oversee platform operations, manage user verification, and ensure quality control across all partnerships.
          </p>
          
          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg"
              onClick={handleAdminAccess}
            >
              <Settings className="h-5 w-5 mr-2" />
              Admin Login
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg"
              onClick={handleAdminSignup}
            >
              Request Admin Access
            </Button>
          </div>
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

        <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
          <div className="text-center mb-8">
            <Lock className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Secure Administrator Portal</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access restricted to authorized personnel only. All actions are logged and monitored for security.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Security Features</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Lock className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700">Multi-Factor Authentication</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700">Role-Based Access Control</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700">Audit Trail Logging</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Admin Capabilities</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">User Verification & Management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Settings className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">Platform Configuration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">Impact Monitoring</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4 flex items-center justify-center">
            <Lock className="h-4 w-4 mr-2" />
            Secure admin portal for authorized personnel only
          </p>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab={authModalTab}
        userType="admin"
      />
    </div>
  );
};

export default AdminPlatform;
