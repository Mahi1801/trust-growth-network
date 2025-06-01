
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Users, Building2, Heart, TrendingUp, Shield } from "lucide-react";
import { CountUp } from "@/components/ui/count-up";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                🚀 Transforming Communities Through Technology
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Empowering
                <span className="text-blue-600"> Communities</span>
                <br />
                Through
                <span className="text-green-600"> Impact</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect local vendors, NGOs, and corporations in a transparent ecosystem that drives 
                real social impact through AI-verified improvements and sustainable funding.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                onClick={onGetStarted}
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg border-2"
                onClick={() => scrollToSection('how-it-works')}
              >
                Learn How It Works
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  <CountUp end={2500} duration={2500} suffix="+" />
                </div>
                <div className="text-sm text-gray-600">Active Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  <CountUp end={150} duration={2000} suffix="+" />
                </div>
                <div className="text-sm text-gray-600">Partner NGOs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  <CountUp end={50} duration={1800} suffix="+" />
                </div>
                <div className="text-sm text-gray-600">Corporations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">
                  <CountUp end={2} duration={2200} prefix="₹" suffix="M+" />
                </div>
                <div className="text-sm text-gray-600">Impact Funded</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                  <Globe className="h-8 w-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-2">Global Reach</h3>
                  <p className="text-sm text-gray-600">Connect with impact partners worldwide</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                  <Shield className="h-8 w-8 text-red-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-2">AI-Verified Impact</h3>
                  <p className="text-sm text-gray-600">Advanced verification ensures real results</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                  <Users className="h-8 w-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-2">Community First</h3>
                  <p className="text-sm text-gray-600">Empowering local vendors and businesses</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                  <TrendingUp className="h-8 w-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-gray-900 mb-2">Transparent ROI</h3>
                  <p className="text-sm text-gray-600">Real-time impact metrics and analytics</p>
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
