
import { ArrowRight, CheckCircle, Globe, Users, TrendingUp, Brain, Shield, Headset, Trophy, BookOpen, Sparkles, Target, Zap, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import VideoDemo from "./VideoDemo";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  const { toast } = useToast();
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchDemo = () => {
    setIsDemoOpen(true);
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-indigo-50/60 to-purple-50/60 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 transition-colors duration-200" />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Hero Content */}
            <Badge className="mb-6 bg-blue-100/90 dark:bg-blue-900/90 text-blue-700 dark:text-blue-300 px-4 py-2 animate-fade-in backdrop-blur-sm transition-colors duration-200">
              <Sparkles className="h-4 w-4 mr-2" />
              🚀 Revolutionary Social Impact Platform
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight animate-slide-up drop-shadow-lg transition-colors duration-200">
              Empower Communities Through
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-extrabold">
                {" "}Transparent Funding
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in animate-delay-200 font-medium transition-colors duration-200">
              Connect corporations, NGOs, and vendors through AI-verified improvements, 
              blockchain certificates, and immersive impact experiences that create lasting social change.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto animate-scale-in animate-delay-300">
              <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-blue-200/50 dark:border-blue-700/50 shadow-lg transition-colors duration-200">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">₹15M+</div>
                <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">Impact Value</div>
              </div>
              <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-emerald-200/50 dark:border-emerald-700/50 shadow-lg transition-colors duration-200">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">98.7%</div>
                <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">AI Accuracy</div>
              </div>
              <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-4 border border-purple-200/50 dark:border-purple-700/50 shadow-lg transition-colors duration-200">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">5</div>
                <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">Unique Tech</div>
              </div>
            </div>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in animate-delay-300">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white px-8 py-3 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <Target className="mr-2 h-5 w-5" />
                Start Your Impact Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                onClick={handleWatchDemo}
                className="border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:border-blue-600 dark:hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-3 text-lg font-semibold backdrop-blur-sm transform hover:scale-105 transition-all"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>

              <Button 
                size="lg" 
                variant="outline"
                onClick={handleLearnMore}
                className="border-2 border-green-500 dark:border-green-400 text-green-600 dark:text-green-400 hover:border-green-600 dark:hover:border-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 px-8 py-3 text-lg font-semibold backdrop-blur-sm transform hover:scale-105 transition-all"
              >
                <Zap className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>

            {/* Technology Showcase - Made More Prominent */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-blue-200/50 dark:border-blue-700/50 animate-slide-up animate-delay-300 mb-8 transition-colors duration-200">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 drop-shadow-md transition-colors duration-200">
                Revolutionary Technology That Changes Everything
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg font-medium transition-colors duration-200">
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
                        <h4 className="font-semibold text-base mb-2 text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={scrollToFeatures}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 px-8 py-3 font-semibold transition-all"
                >
                  Explore Technology
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  onClick={handleWatchDemo}
                  variant="outline"
                  className="border-2 border-blue-400 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:border-blue-600 dark:hover:border-blue-300 px-8 py-3 font-semibold transition-all"
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
      <div className="relative py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 transition-colors duration-200">
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/20 dark:border-white/10 shadow-2xl transition-colors duration-200">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
                Ready to Transform Communities?
                <span className="block mt-2 bg-gradient-to-r from-yellow-400 to-pink-400 dark:from-yellow-300 dark:to-pink-300 bg-clip-text text-transparent font-extrabold">
                  Start Your Impact Journey
                </span>
              </h2>
              
              <p className="text-xl text-white/90 dark:text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
                Join thousands of organizations already making a difference with our revolutionary platform. 
                Every journey begins with a single step.
              </p>

              {/* Enhanced Benefits Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                  <Brain className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-xl text-white mb-2">AI-Powered Insights</h3>
                  <p className="text-white/80 text-sm">Predict impact with 98.7% accuracy</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                  <Shield className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-xl text-white mb-2">Blockchain Verified</h3>
                  <p className="text-white/80 text-sm">Immutable proof of social impact</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors">
                  <Headset className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-xl text-white mb-2">VR Experiences</h3>
                  <p className="text-white/80 text-sm">Virtual tours of impact sites</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-500 hover:to-pink-600 dark:from-yellow-300 dark:to-pink-400 dark:hover:from-yellow-400 dark:hover:to-pink-500 text-black dark:text-gray-900 font-bold px-10 py-4 text-xl shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-200"
                >
                  <Sparkles className="mr-2 h-6 w-6" />
                  Begin Your Journey
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={handleLearnMore}
                  className="border-2 border-white/50 dark:border-white/40 text-white hover:bg-white/10 dark:hover:bg-white/5 hover:border-white dark:hover:border-white/60 px-8 py-4 text-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-200 font-semibold"
                >
                  Learn More
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-white/70">
                <div className="flex items-center gap-2 hover:text-white/90 transition-colors">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium">Free to Start</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white/90 transition-colors">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium">No Setup Required</span>
                </div>
                <div className="flex items-center gap-2 hover:text-white/90 transition-colors">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-sm font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Demo Modal */}
      <VideoDemo 
        isOpen={isDemoOpen} 
        onClose={() => setIsDemoOpen(false)} 
      />
    </div>
  );
};

export default Hero;
