
import { useToast } from "@/hooks/use-toast";
import FooterBrand from "./footer/FooterBrand";
import FooterPlatformLinks from "./footer/FooterPlatformLinks";
import FooterQuickLinks from "./footer/FooterQuickLinks";
import FooterContact from "./footer/FooterContact";
import FooterCopyright from "./footer/FooterCopyright";

interface FooterProps {
  onNavigate?: (component: string) => void;
  onPlatformSelect?: (platformKey: string) => void;
}

const Footer = ({ onNavigate, onPlatformSelect }: FooterProps) => {
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
    const platformKey = platform.replace('Platform', '').toLowerCase();
    
    if (onPlatformSelect) {
      onPlatformSelect(platformKey);
      return;
    }

    if (onNavigate) {
      onNavigate(platform);
      toast({
        title: `${platform.replace('Platform', '')} Portal`,
        description: `Welcome to the ${platform.replace('Platform', '').toLowerCase()} platform. You can register or login to get started.`,
      });
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
    <footer className="bg-gray-900/95 backdrop-blur-sm text-white border-t border-gray-800 transition-colors duration-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterBrand onLogoClick={handleLogoClick} onSocialClick={handleSocialClick} />
          <FooterPlatformLinks onPlatformClick={handlePlatformClick} />
          <FooterQuickLinks onScrollToSection={scrollToSection} onPolicyClick={handlePolicyClick} />
          <FooterContact onContactClick={handleContactClick} />
        </div>
        <FooterCopyright />
      </div>
    </footer>
  );
};

export default Footer;
