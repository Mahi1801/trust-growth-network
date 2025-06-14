
import Logo from "../Logo";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

interface FooterBrandProps {
  onLogoClick: () => void;
  onSocialClick: (platform: string) => void;
}

const FooterBrand = ({ onLogoClick, onSocialClick }: FooterBrandProps) => {
  return (
    <div className="space-y-4">
      <Logo className="h-8 w-8 cursor-pointer" onClick={onLogoClick} />
      <p className="text-gray-400 leading-relaxed">
        Empowering communities through transparent funding, AI-verified improvements, 
        and sustainable partnerships that create lasting social impact.
      </p>
      <div className="flex space-x-4">
        <Facebook 
          className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors hover:scale-110 transform duration-200" 
          onClick={() => onSocialClick('Facebook')}
        />
        <Twitter 
          className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors hover:scale-110 transform duration-200" 
          onClick={() => onSocialClick('Twitter')}
        />
        <Linkedin 
          className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors hover:scale-110 transform duration-200" 
          onClick={() => onSocialClick('LinkedIn')}
        />
        <Github 
          className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors hover:scale-110 transform duration-200" 
          onClick={() => onSocialClick('GitHub')}
        />
      </div>
    </div>
  );
};

export default FooterBrand;
