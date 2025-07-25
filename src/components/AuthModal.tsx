import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { Mail, Lock, User, Phone, Building, MapPin, Loader2, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "login" | "signup";
  userType?: string;
  redirectTo?: string;
}

const AuthModal = ({ isOpen, onClose, initialTab = "login", userType, redirectTo }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const { login, signup, isAuthenticating, user, signInWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  
  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    location: "",
    password: ""
  });

  // Form validation states
  const [loginErrors, setLoginErrors] = useState<{[key: string]: string}>({});
  const [signupErrors, setSignupErrors] = useState<{[key: string]: string}>({});

  // Close modal and reset forms when user is authenticated
  useEffect(() => {
    if (user && isOpen) {
      toast.success("Successfully logged in!");
      onClose();
      resetForms();
    }
  }, [user, isOpen, onClose]);

  const resetForms = () => {
    setLoginData({ email: "", password: "" });
    setSignupData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      organization: "",
      location: "",
      password: ""
    });
    setLoginErrors({});
    setSignupErrors({});
    setShowPassword(false);
    setShowSignupPassword(false);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const validateLoginForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!loginData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(loginData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!loginData.password) {
      errors.password = "Password is required";
    }
    
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignupForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!signupData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    
    if (!signupData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    
    if (!signupData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(signupData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!signupData.phone) {
      errors.phone = "Phone number is required";
    } else if (!validatePhone(signupData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    
    if ((userType === "ngo" || userType === "corporate") && !signupData.organization.trim()) {
      errors.organization = "Organization name is required for your user type";
    }
    
    if (!signupData.location.trim()) {
      errors.location = "Location is required";
    }
    
    if (!signupData.password) {
      errors.password = "Password is required";
    } else if (!validatePassword(signupData.password)) {
      errors.password = "Password must be at least 6 characters long";
    }
    
    setSignupErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm() || isAuthenticating) {
      return;
    }

    console.log('Attempting login for:', loginData.email);

    try {
      const { error } = await login(loginData.email, loginData.password, redirectTo);
      
      if (error) {
        console.error('Login failed:', error);
        
        if (error.message.includes('Invalid login credentials')) {
          toast.error("Invalid email or password. Please check your credentials.");
        } else if (error.message.includes('Email not confirmed')) {
          toast.error("Please check your email and confirm your account before logging in.");
        } else if (error.message.includes('Too many requests')) {
          toast.error("Too many login attempts. Please wait a moment before trying again.");
        } else {
          toast.error(error.message || "Login failed. Please try again.");
        }
      }
    } catch (error) {
      console.error('Login exception:', error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignupForm() || isAuthenticating) {
      return;
    }

    console.log('Attempting signup for:', signupData.email);

    try {
      const { error } = await signup({
        ...signupData,
        userType: userType || "vendor"
      }, redirectTo);
      
      if (error) {
        console.error('Signup failed:', error);
        
        if (error.message.includes('already registered')) {
          toast.error("An account with this email already exists. Please try logging in instead.");
          setActiveTab("login");
        } else if (error.message.includes('Password should be at least')) {
          toast.error("Password must be at least 6 characters long.");
        } else {
          toast.error(error.message || "Failed to create account. Please try again.");
        }
      } else {
        toast.success("Account created successfully! Please check your email to confirm your account.");
      }
    } catch (error) {
      console.error('Signup exception:', error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    if (isAuthenticating) return;
    await signInWithGoogle();
  };

  const handleTabChange = (value: string) => {
    if (value === "login" || value === "signup") {
      setActiveTab(value);
      setLoginErrors({});
      setSignupErrors({});
    }
  };

  const getUserTypeDisplayName = (type: string) => {
    switch (type) {
      case 'vendor': return 'Vendor';
      case 'ngo': return 'NGO';
      case 'corporate': return 'Corporate';
      case 'admin': return 'Administrator';
      default: return type;
    }
  };

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case 'vendor': return 'text-green-600 bg-green-50 border-green-200';
      case 'ngo': return 'text-pink-600 bg-pink-50 border-pink-200';
      case 'corporate': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'admin': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-900">
            Welcome to EmpowerLink
          </DialogTitle>
          {userType && (
            <div className={`mx-auto px-4 py-2 rounded-lg border text-sm font-medium ${getUserTypeColor(userType)}`}>
              {getUserTypeDisplayName(userType)} Portal
            </div>
          )}
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`pl-10 ${loginErrors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                    value={loginData.email}
                    onChange={(e) => {
                      setLoginData({...loginData, email: e.target.value});
                      if (loginErrors.email) setLoginErrors({...loginErrors, email: ""});
                    }}
                    required
                    disabled={isAuthenticating}
                  />
                </div>
                {loginErrors.email && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {loginErrors.email}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`pl-10 pr-10 ${loginErrors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                    value={loginData.password}
                    onChange={(e) => {
                      setLoginData({...loginData, password: e.target.value});
                      if (loginErrors.password) setLoginErrors({...loginErrors, password: ""});
                    }}
                    required
                    disabled={isAuthenticating}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    disabled={isAuthenticating}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {loginErrors.password && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {loginErrors.password}
                  </p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11"
                disabled={isAuthenticating}
              >
                {isAuthenticating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-11"
                onClick={handleGoogleSignIn}
                disabled={isAuthenticating}
              >
                Continue with Google
              </Button>

              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("signup")}
                  className="text-blue-600 hover:underline font-medium"
                  disabled={isAuthenticating}
                >
                  Sign up here
                </button>
              </p>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4 mt-6">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First Name *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="firstName"
                      placeholder="First name"
                      className={`pl-10 ${signupErrors.firstName ? 'border-red-500 focus:border-red-500' : ''}`}
                      value={signupData.firstName}
                      onChange={(e) => {
                        setSignupData({...signupData, firstName: e.target.value});
                        if (signupErrors.firstName) setSignupErrors({...signupErrors, firstName: ""});
                      }}
                      required
                      disabled={isAuthenticating}
                    />
                  </div>
                  {signupErrors.firstName && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {signupErrors.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Last name"
                    className={signupErrors.lastName ? 'border-red-500 focus:border-red-500' : ''}
                    value={signupData.lastName}
                    onChange={(e) => {
                      setSignupData({...signupData, lastName: e.target.value});
                      if (signupErrors.lastName) setSignupErrors({...signupErrors, lastName: ""});
                    }}
                    required
                    disabled={isAuthenticating}
                  />
                  {signupErrors.lastName && (
                    <p className="text-red-500 text-xs flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {signupErrors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signupEmail" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="Enter your email"
                    className={`pl-10 ${signupErrors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                    value={signupData.email}
                    onChange={(e) => {
                      setSignupData({...signupData, email: e.target.value});
                      if (signupErrors.email) setSignupErrors({...signupErrors, email: ""});
                    }}
                    required
                    disabled={isAuthenticating}
                  />
                </div>
                {signupErrors.email && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {signupErrors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    className={`pl-10 ${signupErrors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                    value={signupData.phone}
                    onChange={(e) => {
                      setSignupData({...signupData, phone: e.target.value});
                      if (signupErrors.phone) setSignupErrors({...signupErrors, phone: ""});
                    }}
                    required
                    disabled={isAuthenticating}
                  />
                </div>
                {signupErrors.phone && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {signupErrors.phone}
                  </p>
                )}
              </div>

              {(userType === "ngo" || userType === "corporate") && (
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-sm font-medium text-gray-700">
                    Organization Name *
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="organization"
                      placeholder="Organization name"
                      className={`pl-10 ${signupErrors.organization ? 'border-red-500 focus:border-red-500' : ''}`}
                      value={signupData.organization}
                      onChange={(e) => {
                        setSignupData({...signupData, organization: e.target.value});
                        if (signupErrors.organization) setSignupErrors({...signupErrors, organization: ""});
                      }}
                      required
                      disabled={isAuthenticating}
                    />
                  </div>
                  {signupErrors.organization && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {signupErrors.organization}
                    </p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Location *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    placeholder="City, Country"
                    className={`pl-10 ${signupErrors.location ? 'border-red-500 focus:border-red-500' : ''}`}
                    value={signupData.location}
                    onChange={(e) => {
                      setSignupData({...signupData, location: e.target.value});
                      if (signupErrors.location) setSignupErrors({...signupErrors, location: ""});
                    }}
                    required
                    disabled={isAuthenticating}
                  />
                </div>
                {signupErrors.location && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {signupErrors.location}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signupPassword" className="text-sm font-medium text-gray-700">
                  Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="signupPassword"
                    type={showSignupPassword ? "text" : "password"}
                    placeholder="Create a password (min. 6 characters)"
                    className={`pl-10 pr-10 ${signupErrors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                    value={signupData.password}
                    onChange={(e) => {
                      setSignupData({...signupData, password: e.target.value});
                      if (signupErrors.password) setSignupErrors({...signupErrors, password: ""});
                    }}
                    required
                    disabled={isAuthenticating}
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    disabled={isAuthenticating}
                  >
                    {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {signupErrors.password && (
                  <p className="text-red-500 text-sm flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {signupErrors.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white h-11"
                disabled={isAuthenticating}
              >
                {isAuthenticating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
              
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                className="w-full h-11"
                onClick={handleGoogleSignIn}
                disabled={isAuthenticating}
              >
                Continue with Google
              </Button>
              
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="text-blue-600 hover:underline font-medium"
                  disabled={isAuthenticating}
                >
                  Login here
                </button>
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
