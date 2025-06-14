
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../ui/button";
import { Building, Heart, Shield, Store, Users, BarChart3, Settings } from "lucide-react";
import { useState } from "react";
import Footer from "../Footer";

const platformData = {
  vendor: {
    title: "Vendor Platform",
    description: "Connect with NGOs and corporations to provide essential services and products for social impact projects.",
    icon: <Store className="h-8 w-8 text-green-600" />,
    features: [
      "Access verified projects and expand your business through meaningful partnerships.",
      "Transparent pricing with guaranteed payments and fair compensation for your services.",
      "Track your impact contribution and business growth through detailed analytics.",
    ],
  },
  ngo: {
    title: "NGO Platform",
    description: "Connect with funding partners and vendors to amplify your social impact projects across communities.",
    icon: <Heart className="h-8 w-8 text-pink-600" />,
    features: [
      "Access corporate funding and grants for your community development projects.",
      "Connect with other NGOs and share resources for maximum impact.",
      "Blockchain-verified impact certificates to build trust with funders.",
    ],
  },
  corporate: {
    title: "Corporate Platform",
    description: "Partner with verified NGOs to create measurable social impact and meet your CSR objectives.",
    icon: <Building className="h-8 w-8 text-blue-600" />,
    features: [
      "Meet regulatory requirements with verified social impact investments.",
      "Real-time tracking and AI-powered insights on your social impact investments.",
      "Enhance brand reputation through transparent and verified social contributions.",
    ],
  },
  admin: {
    title: "Admin Platform",
    description: "Oversee platform operations, manage user verification, and ensure quality control across all partnerships.",
    icon: <Shield className="h-8 w-8 text-purple-600" />,
    features: [
      "Verify and manage NGOs, corporations, and vendors joining the platform.",
      "Monitor platform performance and impact metrics across all projects.",
      "Ensure all projects meet quality standards and verification requirements.",
    ],
  },
};

const AdminTabsDashboard = () => {
  const { logout, user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState("vendor");

  const handlePlatformSelect = (platformKey: string) => {
    if (Object.keys(platformData).includes(platformKey)) {
        setActiveTab(platformKey);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome, {profile?.first_name || user?.email}. Manage the ecosystem.</p>
          </div>
          <Button onClick={logout} variant="outline">Logout</Button>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="vendor">Vendor Platform</TabsTrigger>
            <TabsTrigger value="ngo">NGO Platform</TabsTrigger>
            <TabsTrigger value="corporate">Corporate Platform</TabsTrigger>
            <TabsTrigger value="admin">Admin Tools</TabsTrigger>
          </TabsList>

          {Object.entries(platformData).map(([key, data]) => (
            <TabsContent value={key} key={key}>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {data.icon}
                    <div>
                      <CardTitle className="text-2xl">{data.title}</CardTitle>
                      <CardDescription>{data.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold mb-2">Key Features:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {data.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        
        <Card className="mt-6">
          <CardHeader>
              <CardTitle>Admin Quick Actions</CardTitle>
              <CardDescription>Access core administrative functionalities.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline"><Users className="mr-2 h-4 w-4" /> User Management</Button>
              <Button variant="outline"><BarChart3 className="mr-2 h-4 w-4" /> Platform Analytics</Button>
              <Button variant="outline"><Settings className="mr-2 h-4 w-4" /> System Settings</Button>
          </CardContent>
        </Card>
      </main>
      <Footer onPlatformSelect={handlePlatformSelect} />
    </div>
  );
};

export default AdminTabsDashboard;
