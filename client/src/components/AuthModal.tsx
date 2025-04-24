import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/context/AuthContext";
import { Loader2, Github, Twitter } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

const AuthModal = ({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [userType, setUserType] = useState<'client' | 'provider'>('client');
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const { login } = useAuth();

  // Login form state
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.username || !loginData.password) {
      toast({
        title: "Invalid Input",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await apiRequest('POST', '/api/auth/login', loginData);
      const userData = await response.json();
      
      login(userData);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      onClose();
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registerData.username || !registerData.email || !registerData.password) {
      toast({
        title: "Invalid Input",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await apiRequest('POST', '/api/auth/register', {
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
        role: userType
      });
      
      const userData = await response.json();
      
      login(userData);
      toast({
        title: "Registration Successful",
        description: "Your account has been created",
      });
      onClose();
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Welcome to DecentraGPU</DialogTitle>
          <DialogDescription className="text-center">
            Your gateway to decentralized GPU compute
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'register')} className="mt-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="space-y-4 pt-4">
            <form onSubmit={handleLoginSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username">Username</Label>
                  <Input 
                    id="login-username" 
                    placeholder="username" 
                    value={loginData.username}
                    onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <a href="#" className="text-xs text-[hsl(var(--secondary))] hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input 
                    id="login-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                </div>
                
                <Button type="submit" className="w-full font-medium" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In"}
                </Button>
              </div>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-background text-xs text-gray-500">or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" disabled>
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" disabled>
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="register" className="space-y-4 pt-4">
            <form onSubmit={handleRegisterSubmit}>
              <div className="space-y-4">
                <div className="mb-6">
                  <Label className="block text-sm font-medium mb-2">I want to:</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      type="button"
                      variant={userType === 'client' ? 'default' : 'outline'}
                      className={userType === 'client' ? 'bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-black' : ''} 
                      onClick={() => setUserType('client')}
                    >
                      Rent GPUs
                    </Button>
                    <Button 
                      type="button"
                      variant={userType === 'provider' ? 'default' : 'outline'}
                      className={userType === 'provider' ? 'bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-black' : ''} 
                      onClick={() => setUserType('provider')}
                    >
                      Provide GPUs
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-username">Username</Label>
                  <Input 
                    id="register-username" 
                    placeholder="username" 
                    value={registerData.username}
                    onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input 
                    id="register-email" 
                    type="email" 
                    placeholder="your@email.com" 
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input 
                    id="register-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">Confirm Password</Label>
                  <Input 
                    id="register-confirm-password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  />
                </div>
                
                <Button type="submit" className="w-full font-medium" disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
                </Button>
              </div>
            </form>
            
            <div className="text-center text-sm text-gray-400">
              By signing up, you agree to our <a href="#" className="text-[hsl(var(--secondary))] hover:underline">Terms of Service</a> and <a href="#" className="text-[hsl(var(--secondary))] hover:underline">Privacy Policy</a>.
            </div>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-background text-xs text-gray-500">or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" disabled>
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" disabled>
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
