
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, DollarSign, Users, TrendingUp, ArrowLeft } from "lucide-react";

interface VendorPlatformProps {
  onBack: () => void;
}

const VendorPlatform = ({ onBack }: VendorPlatformProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900 dark:to-emerald-900 pt-20">
      <div className="container mx-auto px-4 py-12">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Vendor Platform
            <span className="block text-green-600 dark:text-green-400">Join Our Network</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Connect with NGOs and corporations to provide essential services and products for social impact projects.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Store className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
              <CardTitle>Business Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Access verified projects and expand your business through meaningful partnerships.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <DollarSign className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
              <CardTitle>Fair Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Transparent pricing with guaranteed payments and fair compensation for your services.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-green-600 dark:text-green-400 mb-4" />
              <CardTitle>Growth Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Track your impact contribution and business growth through detailed analytics.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
            <Users className="h-5 w-5 mr-2" />
            Register as Vendor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VendorPlatform;
