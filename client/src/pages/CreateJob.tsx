import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Upload, CpuIcon, Clock, DollarSign, Server } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { apiRequest } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Gpu } from "@shared/schema";
import { formatCurrency } from "@/lib/utils";

// Form schema
const jobFormSchema = z.object({
  gpuId: z.string().min(1, "Please select a GPU"),
  jobName: z.string().min(3, "Job name must be at least 3 characters"),
  jobDescription: z.string().optional(),
  runtime: z.enum(["python", "tensorflow", "pytorch", "custom"]),
  estimatedTime: z.string().min(1, "Please select estimated runtime"),
  codeLocation: z.enum(["upload", "github", "docker"]),
  codeInput: z.string().optional(),
});

type JobFormValues = z.infer<typeof jobFormSchema>;

const CreateJob = () => {
  const { user } = useAuth();
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);
  
  // Get available GPUs
  const { data: gpus, isLoading } = useQuery<Gpu[]>({
    queryKey: ['/api/gpus?isOnline=true'],
    enabled: !!user,
  });
  
  // If a gpuId is provided in the URL, pre-select it
  const urlParams = new URLSearchParams(window.location.search);
  const preSelectedGpuId = urlParams.get('gpu');
  
  // Find the pre-selected GPU
  const selectedGpu = gpus?.find(gpu => gpu.id.toString() === preSelectedGpuId);
  
  // Default form values
  const defaultValues: Partial<JobFormValues> = {
    gpuId: preSelectedGpuId || "",
    jobName: "",
    jobDescription: "",
    runtime: "python",
    estimatedTime: "1h",
    codeLocation: "upload",
    codeInput: "",
  };
  
  // Form setup
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues,
  });
  
  // File upload handling
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // In a real app, we'd upload this file to a server
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      form.setValue("codeInput", files[0].name);
      toast({
        title: "File uploaded",
        description: `Successfully uploaded ${files[0].name}`,
      });
    }, 1500);
  };
  
  // Submit mutation
  const submitMutation = useMutation({
    mutationFn: async (data: JobFormValues) => {
      return apiRequest('POST', '/api/jobs', {
        clientId: user?.id,
        gpuId: parseInt(data.gpuId),
        status: "pending",
        jobConfig: {
          name: data.jobName,
          description: data.jobDescription,
          runtime: data.runtime,
          estimatedTime: data.estimatedTime,
          codeLocation: data.codeLocation,
          codeInput: data.codeInput,
        }
      });
    },
    onSuccess: () => {
      toast({
        title: "Job created",
        description: "Your job has been submitted successfully",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/jobs?clientId=${user?.id}`] });
      navigate("/client-dashboard");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create job",
        variant: "destructive",
      });
    }
  });
  
  // Form submission
  const onSubmit = (data: JobFormValues) => {
    if (!user) {
      toast({
        title: "Not logged in",
        description: "You must be logged in to create a job",
        variant: "destructive",
      });
      return;
    }
    
    submitMutation.mutate(data);
  };
  
  // Calculate estimated cost
  const calculateEstimatedCost = () => {
    const gpuId = form.watch("gpuId");
    const estimatedTime = form.watch("estimatedTime");
    
    if (!gpuId || !gpus) return null;
    
    const selectedGpu = gpus.find(gpu => gpu.id.toString() === gpuId);
    if (!selectedGpu) return null;
    
    // Parse the time (e.g., "1h", "30m", "2h30m")
    let hours = 0;
    if (estimatedTime.includes('h')) {
      const h = estimatedTime.split('h')[0];
      hours = parseInt(h);
      
      if (estimatedTime.includes('m')) {
        const m = estimatedTime.split('h')[1].replace('m', '');
        hours += parseInt(m) / 60;
      }
    } else if (estimatedTime.includes('m')) {
      const m = estimatedTime.split('m')[0];
      hours = parseInt(m) / 60;
    }
    
    return selectedGpu.pricePerHour * hours;
  };
  
  const estimatedCost = calculateEstimatedCost();
  
  // Handle authenticated status
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="mb-4">You need to be logged in to create a job</p>
            <Button onClick={() => navigate("/login")}>Login</Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Job</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* GPU Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CpuIcon className="mr-2 h-5 w-5" />
                GPU Selection
              </CardTitle>
              <CardDescription>Choose a GPU for your job</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="gpuId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select GPU</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={isLoading}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a GPU" />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoading ? (
                            <div className="flex justify-center p-2">
                              <Loader2 className="h-5 w-5 animate-spin" />
                            </div>
                          ) : gpus && gpus.length > 0 ? (
                            gpus.map((gpu) => (
                              <SelectItem key={gpu.id} value={gpu.id.toString()}>
                                {gpu.name} - {gpu.vram}GB - {formatCurrency(gpu.pricePerHour)}/hr
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-center text-muted-foreground">
                              No GPUs available
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Only online GPUs are available for rent
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {selectedGpu && (
                <div className="mt-4 p-4 bg-black/30 rounded-lg">
                  <h3 className="font-semibold mb-2">{selectedGpu.name} Specifications</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">VRAM</p>
                      <p>{selectedGpu.vram} GB</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Cores</p>
                      <p>{selectedGpu.cores}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">TensorScore</p>
                      <p>{selectedGpu.tensorScore.toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Price</p>
                      <p className="text-[hsl(var(--primary))]">{formatCurrency(selectedGpu.pricePerHour)}/hr</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" />
                Job Details
              </CardTitle>
              <CardDescription>Define your job parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="jobName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My AI Training Job" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Brief description of the job" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="runtime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Runtime Environment</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-2 gap-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0 bg-black/20 p-4 rounded-lg cursor-pointer">
                          <FormControl>
                            <RadioGroupItem value="python" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Python 3.10</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0 bg-black/20 p-4 rounded-lg cursor-pointer">
                          <FormControl>
                            <RadioGroupItem value="tensorflow" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">TensorFlow 2.10</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0 bg-black/20 p-4 rounded-lg cursor-pointer">
                          <FormControl>
                            <RadioGroupItem value="pytorch" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">PyTorch 2.0</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0 bg-black/20 p-4 rounded-lg cursor-pointer">
                          <FormControl>
                            <RadioGroupItem value="custom" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Custom Dockerfile</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="estimatedTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Runtime</FormLabel>
                    <FormControl>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select estimated runtime" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30m">30 minutes</SelectItem>
                          <SelectItem value="1h">1 hour</SelectItem>
                          <SelectItem value="2h">2 hours</SelectItem>
                          <SelectItem value="4h">4 hours</SelectItem>
                          <SelectItem value="8h">8 hours</SelectItem>
                          <SelectItem value="24h">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Jobs will automatically stop after the estimated time
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
          {/* Code Source */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="mr-2 h-5 w-5" />
                Code Source
              </CardTitle>
              <CardDescription>Provide your code or model for the job</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="codeLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-3 gap-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0 bg-black/20 p-4 rounded-lg cursor-pointer">
                          <FormControl>
                            <RadioGroupItem value="upload" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">File Upload</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0 bg-black/20 p-4 rounded-lg cursor-pointer">
                          <FormControl>
                            <RadioGroupItem value="github" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">GitHub Repo</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0 bg-black/20 p-4 rounded-lg cursor-pointer">
                          <FormControl>
                            <RadioGroupItem value="docker" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Docker Image</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {form.watch("codeLocation") === "upload" && (
                <div>
                  <FormLabel>Upload File</FormLabel>
                  <div className="mt-2">
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-gray-700 bg-black/20 hover:bg-black/30">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {isUploading ? (
                            <Loader2 className="w-8 h-8 mb-3 animate-spin text-[hsl(var(--primary))]" />
                          ) : (
                            <>
                              <Upload className="w-8 h-8 mb-3 text-gray-400" />
                              <p className="mb-2 text-sm text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">
                                ZIP, TAR, or single Python files (max 500MB)
                              </p>
                            </>
                          )}
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={handleFileUpload}
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                    {form.watch("codeInput") && (
                      <p className="mt-2 text-sm text-[hsl(var(--primary))]">
                        Selected file: {form.watch("codeInput")}
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              {form.watch("codeLocation") === "github" && (
                <FormField
                  control={form.control}
                  name="codeInput"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub Repository URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://github.com/username/repo" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a public GitHub repository URL
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {form.watch("codeLocation") === "docker" && (
                <FormField
                  control={form.control}
                  name="codeInput"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Docker Image</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="username/image:tag" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a Docker image from Docker Hub
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>
          
          {/* Cost Estimate */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Cost Estimate
              </CardTitle>
              <CardDescription>Overview of the job costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>Estimated Duration</span>
                  </div>
                  <span>{form.watch("estimatedTime")}</span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>GPU Cost</span>
                  </div>
                  <span className="text-[hsl(var(--primary))]">
                    {estimatedCost !== null 
                      ? formatCurrency(estimatedCost) 
                      : 'Select GPU and runtime'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg font-medium">
                  <span>Total Estimated Cost</span>
                  <span className="text-[hsl(var(--primary))] text-lg">
                    {estimatedCost !== null 
                      ? formatCurrency(estimatedCost) 
                      : 'Select GPU and runtime'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-black px-8"
              disabled={isUploading || form.watch("codeLocation") === "upload" && !form.watch("codeInput") || submitMutation.isPending}
            >
              {submitMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Job
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateJob;
