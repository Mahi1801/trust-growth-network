
import { Mail, Phone, MapPin } from "lucide-react";

interface FooterContactProps {
  onContactClick: (method: string, value: string) => void;
}

const FooterContact = ({ onContactClick }: FooterContactProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Contact</h3>
      <div className="space-y-3 text-gray-400">
        <div 
          className="flex items-center space-x-3 cursor-pointer hover:text-white transition-colors hover:translate-x-1 transform duration-200"
          onClick={() => onContactClick('email', 'hello@empowerlink.org')}
        >
          <Mail className="h-5 w-5" />
          <span>hello@empowerlink.org</span>
        </div>
        <div 
          className="flex items-center space-x-3 cursor-pointer hover:text-white transition-colors hover:translate-x-1 transform duration-200"
          onClick={() => onContactClick('phone', '+919876543210')}
        >
          <Phone className="h-5 w-5" />
          <span>Call Us: +91 98765 43210</span>
        </div>
        <div 
          className="flex items-center space-x-3 cursor-pointer hover:text-white transition-colors hover:translate-x-1 transform duration-200"
          onClick={() => onContactClick('location', 'Mumbai, Maharashtra, India')}
        >
          <MapPin className="h-5 w-5" />
          <span>Visit Us: Mumbai, Maharashtra</span>
        </div>
      </div>
    </div>
  );
};

export default FooterContact;
