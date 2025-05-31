
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Users, Building2, Heart } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Empowering
                <span className="text-blue-600"> Communities</span>
                <br />
                Through
                <span className="text-green-600"> Impact</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect vendors, NGOs, and corporations in a transparent ecosystem that drives 
                real social impact through verified improvements and sustainable funding.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2">
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2.5K+</div>
                <div className="text-sm text-gray-600">Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">150+</div>
                <div className="text-sm text-gray-600">NGOs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">50+</div>
                <div className="text-sm text-gray-600">Corporations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">$2M+</div>
                <div className="text-sm text-gray-600">Funded</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <Globe className="h-8 w-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Global Reach</h3>
                  <p className="text-sm text-gray-600">Connect with impact partners worldwide</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <Heart className="h-8 w-8 text-red-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Verified Impact</h3>
                  <p className="text-sm text-gray-600">AI-powered verification ensures real results</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <Users className="h-8 w-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Community First</h3>
                  <p className="text-sm text-gray-600">Empowering local vendors and businesses</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <Building2 className="h-8 w-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Corporate Partnership</h3>
                  <p className="text-sm text-gray-600">Transparent ROI tracking and impact metrics</p>
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
