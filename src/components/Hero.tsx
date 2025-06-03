
import { ArrowRight, CheckCircle, Globe, Users, TrendingUp, Brain, Shield, Headset, Trophy, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const uniqueFeatures = [
    {
      icon: Brain,
      title: "AI Impact Predictor",
      description: "ML-powered success prediction",
      color: "from-purple-600 to-blue-600"
    },
    {
      icon: Shield,
      title: "Blockchain Certificates",
      description: "NFT-based impact verification",
      color: "from-emerald-600 to-blue-600"
    },
    {
      icon: Headset,
      title: "VR Impact Tours",
      description: "360° virtual site visits",
      color: "from-cyan-600 to-blue-600"
    },
    {
      icon: Trophy,
      title: "Community Challenges",
      description: "Gamified competitions",
      color: "from-pink-600 to-purple-600"
    },
    {
      icon: BookOpen,
      title: "AI Story Generator",
      description: "Multi-language narratives",
      color: "from-green-600 to-emerald-600"
    }
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background with enhanced gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Hero Content */}
          <Badge className="mb-6 bg-blue-100 text-blue-700 px-4 py-2">
            🚀 Revolutionary Social Impact Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Empower Communities Through
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Transparent Funding
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect corporations, NGOs, and vendors through AI-verified improvements, 
            blockchain certificates, and immersive impact experiences that create lasting social change.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">₹15M+</div>
              <div className="text-sm text-gray-600">Impact Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">98.7%</div>
              <div className="text-sm text-gray-600">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">5</div>
              <div className="text-sm text-gray-600">Unique Tech</div>
            </div>
          </div>

          {/* Enhanced Start Your Journey Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-12 text-white shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              🌟 Start Your Impact Journey Today
            </h2>
            <p className="text-blue-100 mb-6 text-lg">
              Join the revolution in social impact measurement and funding
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={scrollToFeatures}
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg"
              >
                Explore Features
              </Button>
            </div>

            {/* Quick Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center justify-center gap-2 text-blue-100">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">AI-Powered Predictions</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-100">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Blockchain Verified</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-100">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">VR Experiences</span>
              </div>
            </div>
          </div>

          {/* Unique Features Showcase */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Revolutionary Features That Set Us Apart
            </h3>
            <p className="text-gray-600 mb-6">
              Experience cutting-edge technology that transforms social impact measurement
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {uniqueFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                      <p className="text-xs text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <Button 
              onClick={scrollToFeatures}
              className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            >
              See Features in Action
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
