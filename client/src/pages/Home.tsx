import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import GpuCard from "@/components/GpuCard";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, BarChart3, Zap, Shield } from "lucide-react";
import { Gpu } from "@shared/schema";

const Home = () => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('register');
  
  const { data: featuredGpus, isLoading } = useQuery<Gpu[]>({
    queryKey: ['/api/gpus?isOnline=true'],
  });

  // Only display up to 3 GPUs in the featured section
  const displayGpus = featuredGpus?.slice(0, 3) || [];
  
  // Create particles for the background animation - for visual effect only
  const [particles, setParticles] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    const generateParticles = () => {
      const result = [];
      for (let i = 0; i < 10; i++) {
        result.push(
          <div 
            key={i}
            className="particle fixed rounded-full"
            style={{
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5
            }}
          />
        );
      }
      return result;
    };
    
    setParticles(generateParticles());
  }, []);

  const openAuthModal = (tab: 'login' | 'register') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-[hsl(var(--primary))] to-[hsl(var(--secondary))]">
                  Rent, Train, Deploy —
                </span>
                <span className="block text-white">
                  Decentralized AI Compute Starts Here
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Instant access to affordable GPU power from real people, not clouds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => user ? undefined : openAuthModal('register')}
                  asChild={!!user}
                  className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-black font-semibold hover:opacity-90 transform transition hover:-translate-y-1"
                >
                  {user ? (
                    <Link href={user.role === 'client' ? "/client-dashboard" : "/provider-dashboard"}>
                      Get Started
                    </Link>
                  ) : (
                    <>Get Started</>
                  )}
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => user?.role === 'provider' ? undefined : (user ? undefined : openAuthModal('register'))}
                  asChild={user?.role === 'provider'}
                  className="border-[hsl(var(--secondary))] hover:bg-gray-800 transform transition hover:-translate-y-1"
                >
                  {user?.role === 'provider' ? (
                    <Link href="/provider-dashboard">
                      Manage Your GPUs
                    </Link>
                  ) : (
                    <>Become a Provider</>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-[hsl(var(--primary))/20] to-transparent opacity-50 rounded-full filter blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1591405351990-4726e331f141?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="GPU Rendering" 
                className="w-full h-auto rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Decentralized GPU Power?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg hover:bg-opacity-80 transition">
              <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2">50-80% Lower Cost</h3>
              <p className="text-gray-400">Pay only for what you use. No premium pricing or marked-up enterprise tiers.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg hover:bg-opacity-80 transition">
              <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Access</h3>
              <p className="text-gray-400">No waitlists or quota limits. Choose from thousands of available GPUs.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg hover:bg-opacity-80 transition">
              <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Isolation</h3>
              <p className="text-gray-400">Your code and data are protected with enterprise-grade containerization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Preview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-3xl font-bold mb-4 md:mb-0">Featured GPUs</h2>
            <Link href="/marketplace">
              <Button variant="outline" className="group">
                Browse Marketplace
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
              </Button>
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-card animate-pulse h-[450px] rounded-lg"></div>
              ))}
            </div>
          ) : displayGpus.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {displayGpus.map((gpu) => (
                <GpuCard key={gpu.id} gpu={gpu} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg">
              <p className="text-lg text-gray-400">No GPUs available at the moment</p>
              <Button 
                className="mt-4 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-black"
                onClick={() => user?.role === 'provider' ? undefined : (user ? undefined : openAuthModal('register'))}
                asChild={user?.role === 'provider'}
              >
                {user?.role === 'provider' ? (
                  <Link href="/provider-dashboard">
                    Add Your GPU
                  </Link>
                ) : (
                  <>Become a Provider</>
                )}
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 px-4 bg-black/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative bg-card p-6 rounded-lg">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[hsl(var(--primary))] text-black rounded-full flex items-center justify-center text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold mt-4 mb-4 text-center">Choose Your GPU</h3>
              <p className="text-gray-400 text-center">Browse our marketplace for the perfect GPU that matches your AI or rendering needs.</p>
              <img 
                src="https://images.unsplash.com/photo-1622957461195-f792dca7cc19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Choose GPU" 
                className="w-full h-48 object-cover rounded-lg mt-4"
              />
            </div>
            
            <div className="relative bg-card p-6 rounded-lg">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[hsl(var(--secondary))] text-black rounded-full flex items-center justify-center text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold mt-4 mb-4 text-center">Upload Your Job</h3>
              <p className="text-gray-400 text-center">Upload your model or code and configure your computing environment securely.</p>
              <img 
                src="https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Configure Environment" 
                className="w-full h-48 object-cover rounded-lg mt-4"
              />
            </div>
            
            <div className="relative bg-card p-6 rounded-lg">
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[hsl(var(--primary))] text-black rounded-full flex items-center justify-center text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold mt-4 mb-4 text-center">Get Results</h3>
              <p className="text-gray-400 text-center">Monitor your job in real-time and download results when processing is complete.</p>
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Get Results" 
                className="w-full h-48 object-cover rounded-lg mt-4"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Security Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Enterprise-Grade Security</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[hsl(var(--primary))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Secure Containers</h3>
              <p className="text-gray-400 text-center">All jobs run in isolated containers with strict resource boundaries and no persistence.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[hsl(var(--secondary))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Encrypted Transfer</h3>
              <p className="text-gray-400 text-center">All data is encrypted in transit and at rest, ensuring your proprietary models stay protected.</p>
            </div>
            
            <div className="bg-card p-6 rounded-lg">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[hsl(var(--primary))]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Secure Deletion</h3>
              <p className="text-gray-400 text-center">All job data and artifacts are permanently erased after completion or on your request.</p>
            </div>
          </div>
          
          <div className="mt-16 p-6 bg-card rounded-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-semibold mb-4">Escrow Payment System</h3>
                <p className="text-gray-300 mb-4">Our built-in escrow system ensures transparent and fair transactions between clients and providers.</p>
                <div className="bg-black/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--primary))] mr-2"></div>
                      <span>Funds Locked</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-[hsl(var(--secondary))] mr-2"></div>
                      <span>Job Running</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                      <span>Funds Released</span>
                    </div>
                  </div>
                  <div className="w-full bg-card border border-gray-700 h-3 rounded-full mb-2 flex">
                    <div className="bg-[hsl(var(--primary))] h-full rounded-l-full" style={{ width: "25%" }}></div>
                    <div className="bg-[hsl(var(--secondary))] h-full" style={{ width: "50%" }}></div>
                    <div className="bg-indigo-500 h-full rounded-r-full" style={{ width: "25%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Job Start</span>
                    <span>Processing</span>
                    <span>Completion</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Secure Transactions" 
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab} 
      />
    </>
  );
};

export default Home;
