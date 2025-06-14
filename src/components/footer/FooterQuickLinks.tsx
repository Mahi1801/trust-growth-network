
interface FooterQuickLinksProps {
  onScrollToSection: (sectionId: string) => void;
  onPolicyClick: (policy: string) => void;
}

const FooterQuickLinks = ({ onScrollToSection, onPolicyClick }: FooterQuickLinksProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Quick Links</h3>
      <ul className="space-y-3 text-gray-400">
        <li>
          <button 
            onClick={() => onScrollToSection('features')}
            className="hover:text-white transition-colors hover:translate-x-1 transform duration-200"
          >
            Features
          </button>
        </li>
        <li>
          <button 
            onClick={() => onScrollToSection('about')}
            className="hover:text-white transition-colors hover:translate-x-1 transform duration-200"
          >
            About Us
          </button>
        </li>
        <li>
          <button 
            onClick={() => onScrollToSection('how-it-works')}
            className="hover:text-white transition-colors hover:translate-x-1 transform duration-200"
          >
            How It Works
          </button>
        </li>
        <li>
          <button 
            className="hover:text-white transition-colors hover:translate-x-1 transform duration-200"
            onClick={() => onPolicyClick('PrivacyPolicy')}
          >
            Privacy Policy
          </button>
        </li>
        <li>
          <button 
            className="hover:text-white transition-colors hover:translate-x-1 transform duration-200"
            onClick={() => onPolicyClick('TermsOfService')}
          >
            Terms of Service
          </button>
        </li>
      </ul>
    </div>
  );
};

export default FooterQuickLinks;
