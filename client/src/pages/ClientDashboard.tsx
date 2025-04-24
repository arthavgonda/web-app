import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Menu, Plus, Loader2, CpuIcon, Clipboard, DownloadCloud } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import DashboardSidebar from "@/components/DashboardSidebar";
import Terminal from "@/components/Terminal";
import { Job, Gpu } from "@shared/schema";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/lib/utils";

const ClientDashboard = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get client's jobs
  const { data: jobs, isLoading: jobsLoading } = useQuery<Job[]>({
    queryKey: [`/api/jobs?clientId=${user?.id}`],
    enabled: !!user,
  });
  
  // Get saved GPUs (this would be from an API in a real app)
  const { data: savedGpus } = useQuery<Gpu[]>({
    queryKey: [`/api/gpus?isOnline=true`],
    enabled: !!user,
  });
  
  // Get the first few GPUs to display as "saved" GPUs
  const displaySavedGpus = savedGpus?.slice(0, 3) || [];

  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge className="bg-[hsl(var(--primary))]">Running</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  // Calculate estimated job completion
  const getEstimatedCompletion = (job: Job) => {
    // In a real app, this would be calculated based on job metrics
    return "1h 3m remaining";
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
          <h1 className="text-3xl font-bold">Client Dashboard</h1>
          <p className="text-muted-foreground">Manage your AI jobs and GPU rentals</p>
        </div>
        
        {/* Active Jobs Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Active Jobs</h2>
            <Button asChild>
              <Link href="/create-job">
                <Plus className="mr-2 h-4 w-4" />
                Create Job
              </Link>
            </Button>
          </div>
          
          {jobsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : jobs && jobs.filter(job => job.status === "running").length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {jobs
                .filter(job => job.status === "running")
                .map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>Job #{job.id}</CardTitle>
                          <CardDescription>
                            Started {job.startTime ? new Date(job.startTime).toLocaleString() : 'Recently'}
                          </CardDescription>
                        </div>
                        {getStatusBadge(job.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="mb-1 text-sm font-medium flex justify-between">
                            <span>Job Progress</span>
                            <span>68%</span>
                          </div>
                          <Progress value={68} className="h-2" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-black/30 p-2 rounded">
                            <div className="text-xs text-muted-foreground">GPU</div>
                            <div className="font-medium">RTX 4090</div>
                          </div>
                          <div className="bg-black/30 p-2 rounded">
                            <div className="text-xs text-muted-foreground">Cost</div>
                            <div className="font-medium text-[hsl(var(--primary))]">
                              {formatCurrency(job.totalCost || 1.82)} / hr
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Est. completion:</span>
                            <span>{getEstimatedCompletion(job)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-black/30 px-6 py-3">
                      <Button variant="ghost" size="sm" className="mr-2">
                        <Clipboard className="h-4 w-4 mr-1" />
                        View Logs
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
                        Stop
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>
          ) : (
            <Card className="bg-black/20">
              <CardContent className="pt-6 pb-6 text-center">
                <CpuIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">No active jobs running</p>
                <Button asChild>
                  <Link href="/create-job">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Job
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Recent Jobs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Jobs</h2>
          
          {jobsLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : jobs && jobs.filter(job => job.status === "completed" || job.status === "failed").length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">Job ID</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">GPU</th>
                    <th className="text-left py-3 px-4">Started</th>
                    <th className="text-left py-3 px-4">Completed</th>
                    <th className="text-left py-3 px-4">Cost</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs
                    .filter(job => job.status === "completed" || job.status === "failed")
                    .slice(0, 5)
                    .map((job) => (
                      <tr key={job.id} className="border-b border-border">
                        <td className="py-3 px-4">#{job.id}</td>
                        <td className="py-3 px-4">{getStatusBadge(job.status)}</td>
                        <td className="py-3 px-4">GPU #{job.gpuId}</td>
                        <td className="py-3 px-4">{job.startTime ? new Date(job.startTime).toLocaleDateString() : 'N/A'}</td>
                        <td className="py-3 px-4">{job.endTime ? new Date(job.endTime).toLocaleDateString() : 'N/A'}</td>
                        <td className="py-3 px-4 text-[hsl(var(--primary))]">{formatCurrency(job.totalCost || 0)}</td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm" className="h-8">
                            <DownloadCloud className="h-4 w-4 mr-1" />
                            Results
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Card className="bg-black/20">
              <CardContent className="pt-6 pb-6 text-center">
                <p className="text-muted-foreground">No recent jobs found</p>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Terminal Preview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Terminal Preview</h2>
          <Terminal jobId="123" isRunning={true} />
        </div>
        
        {/* Saved GPUs */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Saved GPUs</h2>
          
          {displaySavedGpus.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-3">
              {displaySavedGpus.map((gpu) => (
                <Card key={gpu.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{gpu.name}</CardTitle>
                      <div className="flex items-center">
                        <span className={`status-dot ${gpu.isOnline ? 'online' : 'offline'}`}></span>
                        <span className={`text-sm ${gpu.isOnline ? 'text-green-500' : 'text-red-500'}`}>
                          {gpu.isOnline ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </div>
                    <CardDescription>{gpu.vram}GB VRAM • {gpu.tensorScore.toFixed(1)} TensorScore</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="text-xl font-bold text-[hsl(var(--primary))]">
                      {formatCurrency(gpu.pricePerHour)}/hr
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/create-job?gpu=${gpu.id}`}>
                        Create Job
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-black/20">
              <CardContent className="pt-6 pb-6 text-center">
                <p className="text-muted-foreground mb-4">No saved GPUs found</p>
                <Button asChild>
                  <Link href="/marketplace">
                    Browse Marketplace
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
