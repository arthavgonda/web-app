import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Marketplace from "@/pages/Marketplace";
import ProviderDashboard from "@/pages/ProviderDashboard";
import ClientDashboard from "@/pages/ClientDashboard";
import CreateJob from "@/pages/CreateJob";
import GpuDetail from "@/pages/GpuDetail";
import Security from "@/pages/Security";
import HowItWorks from "@/pages/HowItWorks";
import Pricing from "@/pages/Pricing";
import Docs from "@/pages/Docs";
import Features from "@/pages/Features";
import Register from "@/pages/auth/Register";
import Login from "@/pages/auth/Login";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import Particles from "@/components/Particles";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/provider-dashboard" component={ProviderDashboard} />
      <Route path="/client-dashboard" component={ClientDashboard} />
      <Route path="/create-job" component={CreateJob} />
      <Route path="/gpu/:id" component={GpuDetail} />
      <Route path="/security" component={Security} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/docs" component={Docs} />
      <Route path="/features" component={Features} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Particles />
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {mounted ? <Router /> : null}
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
