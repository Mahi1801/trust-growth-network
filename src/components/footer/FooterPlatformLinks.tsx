
import { Heart, Users, Building, Store } from "lucide-react";

interface FooterPlatformLinksProps {
  onPlatformClick: (platform: string) => void;
}

const FooterPlatformLinks = ({ onPlatformClick }: FooterPlatformLinksProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Platform</h3>
      <ul className="space-y-3 text-gray-400">
        <li>
          <button 
            className="hover:text-white transition-colors flex items-center space-x-2 hover:translate-x-1 transform duration-200"
            onClick={() => onPlatformClick('VendorPlatform')}
          >
            <Store className="h-4 w-4" />
            <span>For Vendors</span>
          </button>
        </li>
        <li>
          <button 
            className="hover:text-white transition-colors flex items-center space-x-2 hover:translate-x-1 transform duration-200"
            onClick={() => onPlatformClick('NGOPlatform')}
          >
            <Heart className="h-4 w-4" />
            <span>For NGOs</span>
          </button>
        </li>
        <li>
          <button 
            className="hover:text-white transition-colors flex items-center space-x-2 hover:translate-x-1 transform duration-200"
            onClick={() => onPlatformClick('CorporatePlatform')}
          >
            <Building className="h-4 w-4" />
            <span>For Corporations</span>
          </button>
        </li>
        <li>
          <button 
            className="hover:text-white transition-colors flex items-center space-x-2 hover:translate-x-1 transform duration-200"
            onClick={() => onPlatformClick('AdminPlatform')}
          >
            <Users className="h-4 w-4" />
            <span>For Admins</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FooterPlatformLinks;
