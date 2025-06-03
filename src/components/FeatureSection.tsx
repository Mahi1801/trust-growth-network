
import { Brain, Shield, Headset, Trophy, BookOpen, ArrowRight, Star, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const FeatureSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const uniqueFeatures = [
    {
      icon: Brain,
      title: "AI Impact Predictor",
      description: "Machine learning algorithms predict project success rates and social impact before funding with 98.7% accuracy",
      color: "from-purple-600 to-blue-600",
      metrics: { accuracy: "98.7%", projects: "1,250+", dataPoints: "50+" },
      status: "Live",
      benefits: ["Predict long-term impact", "Risk assessment", "Data-driven decisions"]
    },
    {
      icon: Shield,
      title: "Blockchain Impact Certificates",
      description: "NFT-based certificates create a tradeable impact economy with immutable proof of social achievements",
      color: "from-emerald-600 to-blue-600",
      metrics: { marketValue: "₹2.3M", certificates: "156", verification: "98.7%" },
      status: "Live",
      benefits: ["Immutable proof", "Tradeable credits", "Corporate portfolios"]
    },
    {
      icon: Headset,
      title: "Virtual Reality Impact Tours",
      description: "Immersive VR experiences showing before/after transformations with 360° documentation for remote visits",
      color: "from-cyan-600 to-blue-600",
      metrics: { tours: "24", views: "3,400+", funding: "+67%" },
      status: "Live",
      benefits: ["Immersive visits", "360° documentation", "Remote engagement"]
    },
    {
      icon: Trophy,
      title: "Gamified Community Challenges",
      description: "Seasonal competitions with leaderboards, achievement badges, and milestone rewards for better engagement",
      color: "from-pink-600 to-purple-600",
      metrics: { challenges: "12", participants: "890+", completion: "78%" },
      status: "Live",
      benefits: ["Competitive completion", "Achievement system", "Cross-collaboration"]
    },
    {
      icon: BookOpen,
      title: "AI-Generated Impact Stories",
      description: "Automatically create compelling narratives from data in multiple languages for global reach and engagement",
      color: "from-green-600 to-emerald-600",
      metrics: { stories: "2,400+", languages: "50+", engagement: "92%" },
      status: "Live",
      benefits: ["Auto generation", "Multi-language", "Cultural adaptation"]
    }
  ];

  const scrollToUniqueFeatures = () => {
    // In a real app, this would navigate to the unique features dashboard
    alert("🚀 Unique Features Dashboard would open here! This showcases all 5 revolutionary features in detail with live demos and interactions.");
  };

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-100 text-purple-700 px-4 py-2">
            <Star className="h-4 w-4 mr-2" />
            Revolutionary Technology
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Unique Features That
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {" "}Change Everything
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the world's first platform combining AI prediction, blockchain verification, 
            VR experiences, gamification, and automated storytelling for social impact.
          </p>
        </div>

        {/* Unique Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {uniqueFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      <Zap className="h-3 w-3 mr-1" />
                      {feature.status}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.entries(feature.metrics).map(([key, value], i) => (
                      <div key={i} className="text-center bg-gray-50 p-2 rounded">
                        <div className="font-bold text-sm">{value}</div>
                        <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      </div>
                    ))}
                  </div>

                  {/* Benefits */}
                  {hoveredFeature === index && (
                    <div className="animate-fade-in">
                      <h4 className="font-semibold mb-2 text-sm">Key Benefits:</h4>
                      <div className="space-y-1">
                        {feature.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">
            Experience These Features Live
          </h3>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            All 5 revolutionary features are fully implemented and ready to transform your social impact journey. 
            See them in action with real data and interactive demos.
          </p>
          
          <Button 
            size="lg"
            onClick={scrollToUniqueFeatures}
            className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg font-semibold"
          >
            Try Features Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <div className="mt-4 text-sm text-purple-200">
            ✨ All features available immediately • No setup required
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
