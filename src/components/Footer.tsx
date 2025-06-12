
import { Globe, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github, Heart, Users, Building, Store } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Logo from "./Logo";

interface FooterProps {
  onNavigate?: (component: string) => void;
}

const Footer = ({ onNavigate }: FooterProps) => {
  const { toast } = useToast();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      toast({
        title: "Navigation",
        description: `Navigating to ${sectionId} section.`,
      });
    }
  };

  const handlePlatformClick = (platform: string) => {
    if (onNavigate) {
      onNavigate(platform);
    } else {
      toast({
        title: `${platform} Portal`,
        description: `Opening ${platform.toLowerCase()} dedicated portal and registration page.`,
      });
    }
  };

  const handlePolicyClick = (policy: string) => {
    if (onNavigate) {
      onNavigate(policy);
    } else {
      toast({
        title: policy,
        description: `${policy} page would be displayed here with detailed legal information.`,
      });
    }
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

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900/95 dark:bg-gray-950/95 backdrop-blur-sm text-white border-t border-gray-800 dark:border-gray-700 transition-colors duration-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo className="h-8 w-8" onClick={handleLogoClick} />
            <p className="text-gray-400 dark:text-gray-300 leading-relaxed">
              Empowering communities through transparent funding, AI-verified improvements, 
              and sustainable partnerships that create lasting social impact.
            </p>
            <div className="flex space-x-4">
              <Facebook 
                className="h-5 w-5 text-gray-400 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-colors hover:scale-110 transform duration-200" 
                onClick={() => handleSocialClick('Facebook')}
              />
              <Twitter 
                className="h-5 w-5 text-gray-400 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-colors hover:scale-110 transform duration-200" 
                onClick={() => handleSocialClick('Twitter')}
              />
              <Linkedin 
                className="h-5 w-5 text-gray-400 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-colors hover:scale-110 transform duration-200" 
                onClick={() => handleSocialClick('LinkedIn')}
              />
              <Github 
                className="h-5 w-5 text-gray-400 dark:text-gray-300 hover:text-blue-400 dark:hover:text-blue-300 cursor-pointer transition-colors hover:scale-110 transform duration-200" 
                onClick={() => handleSocialClick('GitHub')}
              />
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Platform</h3>
            <ul className="space-y-3 text-gray-400 dark:text-gray-300">
              <li>
                <button 
                  className="hover:text-white dark:hover:text-blue-300 transition-colors flex items-center space-x-2 hover:translate-x-1 transform duration-200"
                  onClick={() => handlePlatformClick('VendorPlatform')}
                >
                  <Store className="h-4 w-4" />
                  <span>For Vendors</span>
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white dark:hover:text-pink-300 transition-colors flex items-center space-x-2 hover:translate-x-1 transform duration-200"
                  onClick={() => handlePlatformClick('NGOPlatform')}
                >
                  <Heart className="h-4 w-4" />
                  <span>For NGOs</span>
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white dark:hover:text-blue-300 transition-colors flex items-center space-x-2 hover:translate-x-1 transform duration-200"
                  onClick={() => handlePlatformClick('CorporatePlatform')}
                >
                  <Building className="h-4 w-4" />
                  <span>For Corporations</span>
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white dark:hover:text-purple-300 transition-colors flex items-center space-x-2 hover:translate-x-1 transform duration-200"
                  onClick={() => handlePlatformClick('AdminPlatform')}
                >
                  <Users className="h-4 w-4" />
                  <span>For Admins</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3 text-gray-400 dark:text-gray-300">
              <li>
                <button 
                  onClick={() => scrollToSection('features')}
                  className="hover:text-white dark:hover:text-blue-300 transition-colors hover:translate-x-1 transform duration-200"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white dark:hover:text-blue-300 transition-colors hover:translate-x-1 transform duration-200"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="hover:text-white dark:hover:text-blue-300 transition-colors hover:translate-x-1 transform duration-200"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white dark:hover:text-blue-300 transition-colors hover:translate-x-1 transform duration-200"
                  onClick={() => handlePolicyClick('PrivacyPolicy')}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  className="hover:text-white dark:hover:text-blue-300 transition-colors hover:translate-x-1 transform duration-200"
                  onClick={() => handlePolicyClick('TermsOfService')}
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          {/* Contact - Updated for India */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-3 text-gray-400 dark:text-gray-300">
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:text-white dark:hover:text-blue-300 transition-colors hover:translate-x-1 transform duration-200"
                onClick={() => handleContactClick('email', 'hello@empowerlink.org')}
              >
                <Mail className="h-5 w-5" />
                <span>hello@empowerlink.org</span>
              </div>
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:text-white dark:hover:text-blue-300 transition-colors hover:translate-x-1 transform duration-200"
                onClick={() => handleContactClick('phone', '+919876543210')}
              >
                <Phone className="h-5 w-5" />
                <span>Call Us: +91 98765 43210</span>
              </div>
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:text-white dark:hover:text-blue-300 transition-colors hover:translate-x-1 transform duration-200"
                onClick={() => handleContactClick('location', 'Mumbai, Maharashtra, India')}
              >
                <MapPin className="h-5 w-5" />
                <span>Visit Us: Mumbai, Maharashtra</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 dark:text-gray-300 text-center md:text-left">
              &copy; 2024 EmpowerLink. All rights reserved. Transforming communities across India.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400 dark:text-gray-300">
              <span className="hover:text-white dark:hover:text-blue-300 transition-colors cursor-default">Powered by AI</span>
              <span>•</span>
              <span className="hover:text-white dark:hover:text-blue-300 transition-colors cursor-default">Verified Impact</span>
              <span>•</span>
              <span className="hover:text-white dark:hover:text-blue-300 transition-colors cursor-default">Global Community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
