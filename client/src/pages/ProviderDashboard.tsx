import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Menu, Plus, ChevronRight, Activity, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DashboardSidebar from "@/components/DashboardSidebar";
import StatusChart from "@/components/StatusChart";
import { Gpu, Job } from "@shared/schema";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const ProviderDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Get provider's GPUs
  const { data: gpus, isLoading: gpusLoading, refetch: refetchGpus } = useQuery<Gpu[]>({
    queryKey: [`/api/gpus?providerId=${user?.id}`],
    enabled: !!user,
  });
  
  // Get pending job requests
  const { data: jobs } = useQuery<Job[]>({
    queryKey: [`/api/jobs?providerId=${user?.id}&status=pending`],
    enabled: !!user,
  });
  
  // Mock data for the activity status chart (in a real app, this would come from the API)
  const activityData = [
    { day: 'Mon', value: 2, hours: 4 },
    { day: 'Tue', value: 3, hours: 8 },
    { day: 'Wed', value: 1, hours: 2 },
    { day: 'Thu', value: 0, hours: 0 },
    { day: 'Fri', value: 2, hours: 5 },
    { day: 'Sat', value: 3, hours: 7 },
    { day: 'Sun', value: 1, hours: 3 }
  ];
  
  // Calculate earnings
  const totalEarnings = 1247.32; // In a real app, this would be calculated from completed jobs
  
  // Handle GPU online/offline toggle
  const handleToggleGpuStatus = async (gpuId: number, isOnline: boolean) => {
    try {
      await apiRequest('PUT', `/api/gpus/${gpuId}`, {
        isOnline
      });
      
      refetchGpus();
      
      toast({
        title: `GPU ${isOnline ? 'Online' : 'Offline'}`,
        description: `GPU status updated successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update GPU status",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="flex">
      {/* Mobile sidebar toggle */}
      <Button 
        variant="outline" 
        size="icon" 
        className="fixed bottom-4 right-4 z-40 lg:hidden rounded-full"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu />
      </Button>
      
      {/* Sidebar */}
      <DashboardSidebar 
        isMobile={true}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Provider Dashboard</h1>
          <p className="text-muted-foreground">Manage your GPU resources and earnings</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active GPUs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {gpusLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : 
                 gpus?.filter(gpu => gpu.isOnline).length || 0}
                <span className="text-muted-foreground text-sm font-normal ml-2">
                  / {gpus?.length || 0} total
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[hsl(var(--primary))]">
                {formatCurrency(totalEarnings)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                <Activity className="inline h-3 w-3 mr-1" />
                +$254.39 this week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Job Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {jobs?.length || 0}
                <span className="text-[hsl(var(--primary))] text-sm font-normal ml-2">
                  pending
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-3">
          {/* My GPUs */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle>My GPUs</CardTitle>
                <CardDescription>Manage your GPU resources</CardDescription>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add GPU
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New GPU</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-center text-muted-foreground">
                      GPU addition form would go here
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {gpusLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : gpus && gpus.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>GPU</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gpus.map((gpu) => (
                      <TableRow key={gpu.id}>
                        <TableCell className="font-medium">
                          {gpu.name}
                          <div className="text-xs text-muted-foreground">
                            {gpu.vram}GB VRAM • {gpu.tensorScore.toFixed(1)} TensorScore
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Switch 
                              checked={gpu.isOnline}
                              onCheckedChange={(checked) => handleToggleGpuStatus(gpu.id, checked)}
                              className="mr-2"
                            />
                            <span className={gpu.isOnline ? "text-[hsl(var(--primary))]" : "text-muted-foreground"}>
                              {gpu.isOnline ? "Online" : "Offline"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-[hsl(var(--primary))]">
                          {formatCurrency(gpu.pricePerHour)}/hr
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You don't have any GPUs yet</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First GPU
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New GPU</DialogTitle>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="text-center text-muted-foreground">
                          GPU addition form would go here
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Activity Status */}
          <Card>
            <CardContent className="pt-6">
              <StatusChart data={activityData} />
            </CardContent>
          </Card>
        </div>
        
        {/* Earnings Graph */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Earnings History</CardTitle>
            <CardDescription>Your weekly earnings from GPU rentals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <div className="text-center">
                <DollarSign className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Earnings chart will be displayed here</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Complete your first rental to see earnings data
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProviderDashboard;
