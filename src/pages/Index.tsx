
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import UserTypeSelector from "@/components/UserTypeSelector";
import AuthModal from "@/components/AuthModal";
import Footer from "@/components/Footer";

const Index = () => {
  const [showUserTypeSelector, setShowUserTypeSelector] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login");
  const [selectedUserType, setSelectedUserType] = useState<string>("");

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

  if (showUserTypeSelector) {
    return <UserTypeSelector onSelectType={handleUserTypeSelection} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      
      <div className="pt-16">
        <Hero />
        <FeatureSection />
      </div>
      
      <Footer />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialTab={authModalTab}
        userType={selectedUserType}
      />
    </div>
  );
};

export default Index;
