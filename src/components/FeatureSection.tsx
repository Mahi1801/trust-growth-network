
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Camera, 
  DollarSign, 
  BarChart3, 
  MapPin, 
  Users,
  Bot,
  Handshake
} from "lucide-react";

const features = [
  {
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    title: "AI-Powered Verification",
    description: "Advanced image analysis and fraud detection ensures authentic improvements and builds trust across the platform.",
  },
  {
    icon: <Camera className="h-8 w-8 text-green-600" />,
    title: "Visual Progress Tracking",
    description: "Before and after photos with automated comparison algorithms to verify real improvements and changes.",
  },
  {
    icon: <DollarSign className="h-8 w-8 text-purple-600" />,
    title: "Secure Payment Processing",
    description: "Integrated payment systems with escrow functionality to ensure funds reach their intended recipients safely.",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
    title: "Impact Analytics",
    description: "Comprehensive dashboards showing real-time metrics, ROI tracking, and social impact measurements.",
  },
  {
    icon: <MapPin className="h-8 w-8 text-red-600" />,
    title: "Interactive Mapping",
    description: "Geographic visualization of vendor locations, funding distribution, and community impact across regions.",
  },
  {
    icon: <Users className="h-8 w-8 text-indigo-600" />,
    title: "Multi-Stakeholder Platform",
    description: "Seamless collaboration between vendors, NGOs, and corporate funders with role-based access controls.",
  },
  {
    icon: <Bot className="h-8 w-8 text-cyan-600" />,
    title: "Smart Matching",
    description: "AI-driven algorithms to match vendors with suitable NGOs and funding opportunities based on location and needs.",
  },
  {
    icon: <Handshake className="h-8 w-8 text-pink-600" />,
    title: "Trust Scoring",
    description: "Dynamic trust scores based on documentation quality, consistency, and community feedback for reliable partnerships.",
  },
];

const FeatureSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Social Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides everything you need to create, fund, and verify 
            meaningful improvements in communities worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-gray-50 to-white"
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
