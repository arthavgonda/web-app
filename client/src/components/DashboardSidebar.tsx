import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  PcCase,
  ClipboardList,
  DollarSign,
  Settings,
  FileCode,
  PlusCircle,
  History,
  Bookmark,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface DashboardSidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

interface SidebarItemProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ href, icon, children, isActive, onClick }: SidebarItemProps) => (
  <Link href={href}>
    <Button
      variant={isActive ? "default" : "ghost"}
      className={cn(
        "w-full justify-start mb-1",
        isActive 
          ? "bg-[hsl(var(--sidebar-primary))] text-[hsl(var(--sidebar-primary-foreground))]" 
          : "text-[hsl(var(--sidebar-foreground))]"
      )}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{children}</span>
    </Button>
  </Link>
);

const DashboardSidebar = ({ isMobile = false, isOpen = false, onClose }: DashboardSidebarProps) => {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    if (onClose) onClose();
  };

  const clientMenuItems = [
    { href: "/client-dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { href: "/client-dashboard/jobs", icon: <ClipboardList size={18} />, label: "My Jobs" },
    { href: "/create-job", icon: <PlusCircle size={18} />, label: "Create Job" },
    { href: "/client-dashboard/transactions", icon: <History size={18} />, label: "Transaction History" },
    { href: "/client-dashboard/saved", icon: <Bookmark size={18} />, label: "Saved GPUs" },
    { href: "/client-dashboard/logs", icon: <FileCode size={18} />, label: "Job Logs" },
  ];

  const providerMenuItems = [
    { href: "/provider-dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { href: "/provider-dashboard/gpus", icon: <PcCase size={18} />, label: "My GPUs" },
    { href: "/provider-dashboard/requests", icon: <ClipboardList size={18} />, label: "Job Requests" },
    { href: "/provider-dashboard/earnings", icon: <DollarSign size={18} />, label: "Earnings" },
    { href: "/provider-dashboard/settings", icon: <Settings size={18} />, label: "Status Settings" },
    { href: "/provider-dashboard/logs", icon: <FileCode size={18} />, label: "Logs" },
  ];

  const menuItems = user?.role === 'client' ? clientMenuItems : providerMenuItems;

  const sidebarContent = (
    <div className="py-4 px-2">
      {/* Header/Logo */}
      <div className="px-4 mb-6 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold gradient-text">
          DecentraGPU
        </Link>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={20} />
          </Button>
        )}
      </div>

      {/* Menu Items */}
      <div className="space-y-1 px-2">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            isActive={location === item.href}
            onClick={isMobile ? onClose : undefined}
          >
            {item.label}
          </SidebarItem>
        ))}
      </div>

      {/* User Section at Bottom */}
      <div className="px-4 mt-8 pt-4 border-t border-[hsl(var(--sidebar-border))]">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-[hsl(var(--sidebar-primary))] flex items-center justify-center text-black font-medium">
            {user?.username.charAt(0).toUpperCase()}
          </div>
          <div className="ml-2">
            <p className="text-sm font-medium">{user?.username}</p>
            <p className="text-xs text-[hsl(var(--sidebar-foreground))] opacity-60">{user?.role}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-[hsl(var(--sidebar-foreground))]"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span className="ml-2">Logout</span>
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={onClose} />
        )}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[hsl(var(--sidebar-background))] transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {sidebarContent}
        </div>
      </>
    );
  }

  return (
    <div className="w-64 bg-[hsl(var(--sidebar-background))] h-screen sticky top-0 overflow-y-auto">
      {sidebarContent}
    </div>
  );
};

export default DashboardSidebar;
