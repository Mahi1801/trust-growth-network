
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Store, Building, Heart, Shield } from "lucide-react";

interface UserType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  color: string;
}

const userTypes: UserType[] = [
  {
    id: "vendor",
    title: "Vendor",
    description: "Local business owners seeking funding for improvements",
    icon: <Store className="h-8 w-8" />,
    features: [
      "Submit improvement requests",
      "Upload before/after photos",
      "Track funding progress",
      "Access marketplace tools"
    ],
    color: "text-blue-600"
  },
  {
    id: "ngo",
    title: "NGO",
    description: "Non-profit organizations managing funding and vendor oversight",
    icon: <Heart className="h-8 w-8" />,
    features: [
      "Review vendor applications",
      "Distribute funding",
      "Monitor progress",
      "Generate impact reports"
    ],
    color: "text-green-600"
  },
  {
    id: "corporate",
    title: "Corporate",
    description: "Companies investing in social impact and community development",
    icon: <Building className="h-8 w-8" />,
    features: [
      "Launch funding campaigns",
      "Track ROI and impact",
      "Access analytics dashboard",
      "Partner with NGOs"
    ],
    color: "text-purple-600"
  },
  {
    id: "admin",
    title: "Admin",
    description: "Platform administrators managing the entire ecosystem",
    icon: <Shield className="h-8 w-8" />,
    features: [
      "Manage all users",
      "Oversee transactions",
      "Configure AI systems",
      "Generate platform reports"
    ],
    color: "text-orange-600"
  }
];

interface UserTypeSelectorProps {
  onSelectType: (type: string) => void;
}

const UserTypeSelector = ({ onSelectType }: UserTypeSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Role
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the option that best describes your organization to get started with our platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {userTypes.map((type) => (
            <Card 
              key={type.id} 
              className="relative group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2 hover:border-blue-200"
              onClick={() => onSelectType(type.id)}
            >
              <CardHeader className="text-center">
                <div className={`mx-auto mb-4 ${type.color}`}>
                  {type.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {type.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {type.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {type.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mr-3"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectType(type.id);
                  }}
                >
                  Get Started as {type.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelector;
