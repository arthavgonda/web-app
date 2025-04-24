import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const openAuthModal = (tab: 'login' | 'register') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <nav className="sticky top-0 z-30 px-4 md:px-6 py-4 bg-background bg-opacity-80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold gradient-text">
              DecentraGPU
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/marketplace" className={`text-gray-300 hover:text-white transition ${location === '/marketplace' ? 'text-white' : ''}`}>
              Marketplace
            </Link>
            <Link href="/how-it-works" className={`text-gray-300 hover:text-white transition ${location === '/how-it-works' ? 'text-white' : ''}`}>
              How It Works
            </Link>
            <Link href="/features" className={`text-gray-300 hover:text-white transition ${location === '/features' ? 'text-white' : ''}`}>
              Features
            </Link>
            <Link href="/security" className={`text-gray-300 hover:text-white transition ${location === '/security' ? 'text-white' : ''}`}>
              Security
            </Link>
            <Link href="/pricing" className={`text-gray-300 hover:text-white transition ${location === '/pricing' ? 'text-white' : ''}`}>
              Pricing
            </Link>
            <Link href="/docs" className={`text-gray-300 hover:text-white transition ${location === '/docs' ? 'text-white' : ''}`}>
              Docs
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1">
                    {user.username}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {user.role === 'client' ? (
                    <DropdownMenuItem asChild>
                      <Link href="/client-dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem asChild>
                      <Link href="/provider-dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link href="/marketplace">Marketplace</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => openAuthModal('login')}
                  className="text-gray-300 hover:text-white">
                  Login
                </Button>
                <Button 
                  onClick={() => openAuthModal('register')}
                  className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-black hover:opacity-90">
                  Sign Up
                </Button>
              </>
            )}
            <button 
              className="md:hidden" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu">
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background flex flex-col p-4">
          <div className="flex justify-end mb-6">
            <button onClick={toggleMobileMenu} aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col items-center space-y-6 p-6">
            <Link 
              href="/marketplace" 
              className="text-xl text-gray-300 hover:text-white transition"
              onClick={toggleMobileMenu}>
              Marketplace
            </Link>
            <Link 
              href="/how-it-works" 
              className="text-xl text-gray-300 hover:text-white transition"
              onClick={toggleMobileMenu}>
              How It Works
            </Link>
            <Link 
              href="/features" 
              className="text-xl text-gray-300 hover:text-white transition"
              onClick={toggleMobileMenu}>
              Features
            </Link>
            <Link 
              href="/security" 
              className="text-xl text-gray-300 hover:text-white transition"
              onClick={toggleMobileMenu}>
              Security
            </Link>
            <Link 
              href="/pricing" 
              className="text-xl text-gray-300 hover:text-white transition"
              onClick={toggleMobileMenu}>
              Pricing
            </Link>
            <Link 
              href="/docs" 
              className="text-xl text-gray-300 hover:text-white transition"
              onClick={toggleMobileMenu}>
              Docs
            </Link>
            {user ? (
              <>
                {user.role === 'client' ? (
                  <Link 
                    href="/client-dashboard" 
                    className="text-xl text-white font-semibold"
                    onClick={toggleMobileMenu}>
                    Client Dashboard
                  </Link>
                ) : (
                  <Link 
                    href="/provider-dashboard" 
                    className="text-xl text-white font-semibold"
                    onClick={toggleMobileMenu}>
                    Provider Dashboard
                  </Link>
                )}
                <Button onClick={() => { logout(); toggleMobileMenu(); }}>
                  Logout
                </Button>
              </>
            ) : (
              <div className="pt-6 flex flex-col space-y-4 w-full">
                <Button
                  variant="outline"
                  className="w-full" 
                  onClick={() => { openAuthModal('login'); toggleMobileMenu(); }}>
                  Login
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-black" 
                  onClick={() => { openAuthModal('register'); toggleMobileMenu(); }}>
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab} 
      />
    </>
  );
};

export default Navbar;
