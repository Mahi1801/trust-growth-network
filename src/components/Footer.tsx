
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github, Heart, Users, Building, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlatformClick = (platform: string) => {
    toast({
      title: `${platform} Portal`,
      description: `Redirecting to the ${platform.toLowerCase()} dedicated portal and registration page.`,
    });
  };

  const handleSocialClick = (platform: string) => {
    toast({
      title: `${platform} Page`,
      description: `Opening EmpowerLink's ${platform} page in a new tab.`,
    });
  };

  const handleContactClick = (method: string, value: string) => {
    if (method === 'email') {
      window.location.href = `mailto:${value}`;
    } else if (method === 'phone') {
      window.location.href = `tel:${value}`;
    } else {
      toast({
        title: "Location",
        description: "Opening location in maps application.",
      });
    }
  };

  const handlePolicyClick = (policy: string) => {
    toast({
      title: policy,
      description: `${policy} page would be displayed here with detailed legal information.`,
    });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">EmpowerLink</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Empowering communities through transparent funding, AI-verified improvements, 
              and sustainable partnerships that create lasting social impact.
            </p>
            <div className="flex space-x-4">
              <Facebook 
                className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" 
                onClick={() => handleSocialClick('Facebook')}
              />
              <Twitter 
                className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" 
                onClick={() => handleSocialClick('Twitter')}
              />
              <Linkedin 
                className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" 
                onClick={() => handleSocialClick('LinkedIn')}
              />
              <Github 
                className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" 
                onClick={() => handleSocialClick('GitHub')}
              />
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Platform</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  className="hover:text-white transition-colors flex items-center space-x-2"
                  onClick={() => handlePlatformClick('Vendors')}
                >
                  <Store className="h-4 w-4" />
                  <span>For Vendors</span>
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white transition-colors flex items-center space-x-2"
                  onClick={() => handlePlatformClick('NGOs')}
                >
                  <Heart className="h-4 w-4" />
                  <span>For NGOs</span>
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white transition-colors flex items-center space-x-2"
                  onClick={() => handlePlatformClick('Corporations')}
                >
                  <Building className="h-4 w-4" />
                  <span>For Corporations</span>
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white transition-colors flex items-center space-x-2"
                  onClick={() => handlePlatformClick('Admins')}
                >
                  <Users className="h-4 w-4" />
                  <span>For Admins</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="hover:text-white transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white transition-colors"
                  onClick={() => handlePolicyClick('Privacy Policy')}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white transition-colors"
                  onClick={() => handlePolicyClick('Terms of Service')}
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-3 text-gray-400">
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleContactClick('email', 'hello@empowerlink.org')}
              >
                <Mail className="h-5 w-5" />
                <span>hello@empowerlink.org</span>
              </div>
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleContactClick('phone', '+15551234567')}
              >
                <Phone className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:text-white transition-colors"
                onClick={() => handleContactClick('location', 'San Francisco, CA')}
              >
                <MapPin className="h-5 w-5" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2024 EmpowerLink. All rights reserved. Built with ❤️ for social impact.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Powered by AI</span>
              <span>•</span>
              <span>Verified Impact</span>
              <span>•</span>
              <span>Global Community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
