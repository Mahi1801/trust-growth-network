
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
  const [mounted, setMounted] = useState(false);
  const { user, profile, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
    // Check for saved dark mode preference or default to light mode
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = savedMode === 'true' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDarkMode(prefersDark);
    
    // Apply dark mode class immediately to prevent flash
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
    
    // Add smooth transition for theme change
    document.documentElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Remove transition after change is complete
    setTimeout(() => {
      document.documentElement.style.transition = '';
    }, 300);
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

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo onClick={handleLogoClick} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 font-medium"
            >
              Contact
            </button>
            
            <div className="flex items-center space-x-3">
              {/* Enhanced Dark Mode Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className="dark-mode-toggle relative text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 rounded-full p-2"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                <div className="relative">
                  {isDarkMode ? (
                    <Sun className="h-5 w-5 transform transition-transform duration-300 hover:rotate-180" />
                  ) : (
                    <Moon className="h-5 w-5 transform transition-transform duration-300 hover:-rotate-12" />
                  )}
                </div>
              </Button>

              {user && profile ? (
                <>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Welcome, {profile.first_name || user.email}!
                  </span>
                  <Button
                    variant="ghost"
                    onClick={logout}
                    className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
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
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                  <Button
                    onClick={onSignupClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
              className="dark-mode-toggle text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 rounded-full p-2"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4 transform transition-transform duration-300" />
              ) : (
                <Moon className="h-4 w-4 transform transition-transform duration-300" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 text-left font-medium py-2"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 text-left font-medium py-2"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 text-left font-medium py-2"
              >
                How It Works
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 text-left font-medium py-2"
              >
                Contact
              </button>
              
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                {user && profile ? (
                  <>
                    <span className="text-gray-700 dark:text-gray-300 font-medium py-2">
                      Welcome, {profile.first_name || user.email}!
                    </span>
                    <Button
                      variant="outline"
                      onClick={logout}
                      className="justify-start border-gray-300 dark:border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-600 transition-all duration-200"
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
                      className="justify-start border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
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
