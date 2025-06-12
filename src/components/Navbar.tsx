
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, User, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "./Logo";

interface NavbarProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Navbar = ({ onLoginClick, onSignupClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, logout } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo onClick={handleLogoClick} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-blue-600 transition-all duration-200 font-medium"
            >
              Contact
            </button>
            
            <div className="flex items-center space-x-3">
              {user && profile ? (
                <>
                  <span className="text-gray-700 font-medium">
                    Welcome, {profile.first_name || user.email}!
                  </span>
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={onLoginClick}
                    className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                  <Button
                    onClick={onSignupClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Join Platform
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-700 hover:text-blue-600 transition-all duration-200 text-left font-medium py-2"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-blue-600 transition-all duration-200 text-left font-medium py-2"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-700 hover:text-blue-600 transition-all duration-200 text-left font-medium py-2"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-blue-600 transition-all duration-200 text-left font-medium py-2"
              >
                Contact
              </button>
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                {user && profile ? (
                  <>
                    <span className="text-gray-700 font-medium py-2">
                      Welcome, {profile.first_name || user.email}!
                    </span>
                    <Button
                      variant="outline"
                      onClick={logout}
                      className="justify-start border-gray-300 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={onLoginClick}
                      className="justify-start border-gray-300 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                    <Button
                      onClick={onSignupClick}
                      className="bg-blue-600 hover:bg-blue-700 text-white justify-start shadow-lg transition-all duration-200"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Join Platform
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
