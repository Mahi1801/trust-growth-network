
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Target, Shield, ArrowLeft } from "lucide-react";

interface NGOPlatformProps {
  onBack: () => void;
}

const NGOPlatform = ({ onBack }: NGOPlatformProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-100 dark:from-pink-900 dark:to-red-900 pt-20">
      <div className="container mx-auto px-4 py-12">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6 text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            NGO Platform
            <span className="block text-pink-600 dark:text-pink-400">Create Impact</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Connect with funding partners and vendors to amplify your social impact projects across communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Heart className="h-12 w-12 text-pink-600 dark:text-pink-400 mb-4" />
              <CardTitle>Project Funding</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Access corporate funding and grants for your community development projects.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-pink-600 dark:text-pink-400 mb-4" />
              <CardTitle>Community Network</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with other NGOs and share resources for maximum impact.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-pink-600 dark:text-pink-400 mb-4" />
              <CardTitle>Impact Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Blockchain-verified impact certificates to build trust with funders.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white">
            <Target className="h-5 w-5 mr-2" />
            Join as NGO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NGOPlatform;
