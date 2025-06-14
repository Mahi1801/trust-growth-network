
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ManageCampaignsPage from './pages/ManageCampaignsPage';
import PlaceholderPage from './pages/PlaceholderPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/manage-campaigns" element={<ManageCampaignsPage />} />
            <Route path="/impact-dashboard" element={<PlaceholderPage title="Impact Dashboard" description="View detailed impact analytics and reports." />} />
            <Route path="/partner-network" element={<PlaceholderPage title="Partner Network" description="Connect with NGO partners and expand reach." />} />
            <Route path="/reports" element={<PlaceholderPage title="Reports" description="Generate comprehensive CSR impact reports." />} />
            <Route path="/csr-compliance" element={<PlaceholderPage title="CSR Compliance" description="Track compliance with CSR regulations." />} />
            <Route path="/investment-portfolio" element={<PlaceholderPage title="Investment Portfolio" description="Manage social investment portfolio." />} />
            <Route path="/global-impact" element={<PlaceholderPage title="Global Impact" description="Monitor worldwide social impact initiatives." />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
