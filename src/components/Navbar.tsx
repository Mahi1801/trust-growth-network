
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, User, LogIn, LogOut, Moon, Sun } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "./Logo";

interface NavbarProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

const Navbar = ({ onLoginClick, onSignupClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, profile, logout } = useAuth();

  useEffect(() => {
    // Check for saved dark mode preference or default to light mode
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = savedMode === 'true' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

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
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-50 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo onClick={handleLogoClick} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Contact
            </button>
            
            <div className="flex items-center space-x-3">
              {/* Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>

              {user && profile ? (
                <>
                  <span className="text-gray-700 dark:text-gray-300">
                    Welcome, {profile.first_name || user.email}!
                  </span>
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
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
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                  <Button
                    onClick={onSignupClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Join Platform
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-gray-700 dark:text-gray-300"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left"
              >
                Contact
              </button>
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                {user && profile ? (
                  <>
                    <span className="text-gray-700 dark:text-gray-300">
                      Welcome, {profile.first_name || user.email}!
                    </span>
                    <Button
                      variant="outline"
                      onClick={logout}
                      className="justify-start"
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
                      className="justify-start"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                    <Button
                      onClick={onSignupClick}
                      className="bg-blue-600 hover:bg-blue-700 text-white justify-start"
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
