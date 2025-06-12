
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, TrendingUp, Award, Globe, ArrowLeft } from "lucide-react";

interface CorporatePlatformProps {
  onBack: () => void;
}

const CorporatePlatform = ({ onBack }: CorporatePlatformProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 pt-20">
      <div className="container mx-auto px-4 py-12">
        <Button 
          onClick={onBack}
          variant="ghost" 
          className="mb-6 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Corporate Platform
            <span className="block text-blue-600 dark:text-blue-400">Fund Impact</span>
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Partner with verified NGOs to create measurable social impact and meet your CSR objectives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Building className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <CardTitle>CSR Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Meet regulatory requirements with verified social impact investments.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <CardTitle>Impact Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Real-time tracking and AI-powered insights on your social impact investments.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Award className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
              <CardTitle>Brand Recognition</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400">
                Enhance brand reputation through transparent and verified social contributions.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Globe className="h-5 w-5 mr-2" />
            Partner with Us
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CorporatePlatform;
