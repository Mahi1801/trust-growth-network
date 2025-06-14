
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ManageCampaignsPage from './pages/ManageCampaignsPage';
import ImpactDashboardPage from './pages/ImpactDashboardPage';
import PartnerNetworkPage from './pages/PartnerNetworkPage';
import ReportsPage from './pages/ReportsPage';
import CSRCompliancePage from './pages/CSRCompliancePage';
import InvestmentPortfolioPage from './pages/InvestmentPortfolioPage';
import GlobalImpactPage from './pages/GlobalImpactPage';
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
            <Route path="/impact-dashboard" element={<ImpactDashboardPage />} />
            <Route path="/partner-network" element={<PartnerNetworkPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/csr-compliance" element={<CSRCompliancePage />} />
            <Route path="/investment-portfolio" element={<InvestmentPortfolioPage />} />
            <Route path="/global-impact" element={<GlobalImpactPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
