import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import AboutSection from "@/components/AboutSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ContactSection from "@/components/ContactSection";
import UserTypeSelector from "@/components/UserTypeSelector";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard";
import VendorPlatform from "@/components/platform/VendorPlatform";
import NGOPlatform from "@/components/platform/NGOPlatform";
import CorporatePlatform from "@/components/platform/CorporatePlatform";
import AdminPlatform from "@/components/platform/AdminPlatform";
import PrivacyPolicy from "@/components/pages/PrivacyPolicy";
import TermsOfService from "@/components/pages/TermsOfService";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [showUserTypeSelector, setShowUserTypeSelector] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");
  const [selectedUserType, setSelectedUserType] = useState<string>("");
  const [currentView, setCurrentView] = useState<string>("home");
  const { user, profile, pendingRedirect, setPendingRedirect } = useAuth();

  // Handle redirect after authentication
  useEffect(() => {
    if (user && profile && pendingRedirect) {
      console.log('Redirecting authenticated user to:', pendingRedirect);
      setCurrentView(pendingRedirect);
      setPendingRedirect(null); // Clear the pending redirect
    }
  }, [user, profile, pendingRedirect, setPendingRedirect]);

  // If user is logged in, determine the correct view
  if (user && profile && !pendingRedirect) {
    const userTypeToPlatformMap = {
      'vendor': 'VendorPlatform',
      'ngo': 'NGOPlatform',
      'corporate': 'CorporatePlatform',
      'admin': 'AdminPlatform'
    };
    const correctPlatform = userTypeToPlatformMap[profile.user_type as keyof typeof userTypeToPlatformMap];

    if (currentView.includes('Platform')) {
      // If the user is on a platform view, but it's the wrong one, redirect them.
      if (correctPlatform && currentView !== correctPlatform) {
        setCurrentView(correctPlatform);
      }
    } else {
      // If the user is on any other page (like 'home') after logging in,
      // redirect them to their correct platform page.
      if (currentView === 'home' && correctPlatform) {
        setCurrentView(correctPlatform);
      }
      // If the user has a type that doesn't map to a platform, show the dashboard.
      else if (!correctPlatform) {
        return <Dashboard />;
      }
    }
  }

  const handleGetStarted = () => {
    setShowUserTypeSelector(true);
  };

  const handleUserTypeSelection = (type: string) => {
    setSelectedUserType(type);
    setShowUserTypeSelector(false);
    setAuthModalTab("signup");
    setShowAuthModal(true);
  };

  const handleLoginClick = () => {
    setAuthModalTab("login");
    setShowAuthModal(true);
  };

  const handleSignupClick = () => {
    setShowUserTypeSelector(true);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view);
  };

  const handleBack = () => {
    setCurrentView("home");
  };

  if (showUserTypeSelector) {
    return <UserTypeSelector onSelectType={handleUserTypeSelection} />;
  }

  // Render different views based on currentView state
  if (currentView === "VendorPlatform") {
    return <VendorPlatform onBack={handleBack} />;
  }

  if (currentView === "NGOPlatform") {
    return <NGOPlatform onBack={handleBack} />;
  }

  if (currentView === "CorporatePlatform") {
    return <CorporatePlatform onBack={handleBack} />;
  }

  if (currentView === "AdminPlatform") {
    return <AdminPlatform onBack={handleBack} />;
  }

  if (currentView === "PrivacyPolicy") {
    return <PrivacyPolicy onBack={handleBack} />;
  }

  if (currentView === "TermsOfService") {
    return <TermsOfService onBack={handleBack} />;
  }

  // Default view for unauthenticated users or during login/signup process
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      
      <div className="pt-16">
        <Hero onGetStarted={handleGetStarted} />
        <FeatureSection />
        <AboutSection />
        <HowItWorksSection />
        <ContactSection />
      </div>
      
      <Footer onNavigate={handleNavigate} />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab={authModalTab}
        userType={selectedUserType}
        redirectTo={currentView.includes('Platform') ? currentView : undefined}
      />
    </div>
  );
};

export default Index;
