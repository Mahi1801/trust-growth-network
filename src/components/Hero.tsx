
import { ArrowRight, CheckCircle, Globe, Users, TrendingUp, Brain, Shield, Headset, Trophy, BookOpen, Sparkles, Target, Zap, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  const { toast } = useToast();

  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchDemo = () => {
    toast({
      title: "Demo Video",
      description: "Opening comprehensive platform demo showcasing all features in action.",
    });
  };

  const handleLearnMore = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      toast({
        title: "Learn More",
        description: "Navigating to detailed information about our platform.",
      });
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
    <div className="relative">
      {/* Main Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        {/* Background with enhanced gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/60 to-purple-50/60" />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Hero Content */}
            <Badge className="mb-6 bg-blue-100/90 text-blue-700 px-4 py-2 animate-fade-in backdrop-blur-sm">
              <Sparkles className="h-4 w-4 mr-2" />
              🚀 Revolutionary Social Impact Platform
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
              Empower Communities Through
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Transparent Funding
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in animate-delay-200">
              Connect corporations, NGOs, and vendors through AI-verified improvements, 
              blockchain certificates, and immersive impact experiences that create lasting social change.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto animate-scale-in animate-delay-300">
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-blue-200/50">
                <div className="text-3xl font-bold text-blue-600">₹15M+</div>
                <div className="text-sm text-gray-600">Impact Value</div>
              </div>
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-emerald-200/50">
                <div className="text-3xl font-bold text-emerald-600">98.7%</div>
                <div className="text-sm text-gray-600">AI Accuracy</div>
              </div>
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-purple-200/50">
                <div className="text-3xl font-bold text-purple-600">5</div>
                <div className="text-sm text-gray-600">Unique Tech</div>
              </div>
            </div>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in animate-delay-300">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl"
              >
                <Target className="mr-2 h-5 w-5" />
                Start Your Impact Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleWatchDemo}
                className="border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 px-8 py-3 text-lg backdrop-blur-sm"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>

              <Button 
                size="lg" 
                variant="outline"
                onClick={handleLearnMore}
                className="border-2 border-green-200 hover:border-green-400 hover:bg-green-50 px-8 py-3 text-lg backdrop-blur-sm"
              >
                <Zap className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>

            {/* Technology Showcase - Made More Prominent */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-blue-200/50 animate-slide-up animate-delay-300 mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Revolutionary Technology That Changes Everything
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                Experience cutting-edge AI, Blockchain, VR, and Gamification that transforms social impact measurement
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
                {uniqueFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group card-hover">
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <h4 className="font-semibold text-base mb-2">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={scrollToFeatures}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-8 py-3"
                >
                  Explore Technology
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  onClick={handleWatchDemo}
                  variant="outline"
                  className="border-2 border-blue-200 hover:border-blue-400 px-8 py-3"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Tech Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom "Start Your Journey" Section */}
      <div className="relative py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
                Ready to Transform Communities?
                <span className="block mt-2 bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                  Start Your Impact Journey
                </span>
              </h2>
              
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of organizations already making a difference with our revolutionary platform. 
                Every journey begins with a single step.
              </p>

              {/* Enhanced Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                  <Brain className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">AI-Powered Insights</h3>
                  <p className="text-white/80 text-sm">Predict impact with 98.7% accuracy</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                  <Shield className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">Blockchain Verified</h3>
                  <p className="text-white/80 text-sm">Immutable proof of social impact</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                  <Headset className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">VR Experiences</h3>
                  <p className="text-white/80 text-sm">Virtual tours of impact sites</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 text-black font-bold px-10 py-4 text-xl shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-200"
                >
                  <Sparkles className="mr-2 h-6 w-6" />
                  Begin Your Journey
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handleLearnMore}
                  className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white px-8 py-4 text-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-200"
                >
                  Learn More
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-white/70">
                <div className="flex items-center gap-2 hover:text-white/90 transition-colors">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm">Free to Start</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white/90 transition-colors">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm">No Setup Required</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white/90 transition-colors">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
