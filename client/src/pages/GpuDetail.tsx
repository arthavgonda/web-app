import { useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { Loader2, Star, ArrowLeft, Cpu, Award, History, BarChart3, ChevronRight } from "lucide-react";
import { Gpu, Review } from "@shared/schema";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const GpuDetail = () => {
  const { id } = useParams();
  const [_, navigate] = useLocation();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Fetch GPU details
  const { data: gpu, isLoading, isError } = useQuery<Gpu>({
    queryKey: [`/api/gpus/${id}`],
  });
  
  // Fetch GPU reviews
  const { data: reviews } = useQuery<Review[]>({
    queryKey: [`/api/reviews?gpuId=${id}`],
    enabled: !!id,
  });
  
  // Mock performance data for charts
  const perfData = [
    { name: 'Jan', value: 86 },
    { name: 'Feb', value: 90 },
    { name: 'Mar', value: 88 },
    { name: 'Apr', value: 91 },
    { name: 'May', value: 94 },
    { name: 'Jun', value: 92 },
    { name: 'Jul', value: 97 },
  ];
  
  const benchmarkData = [
    { name: 'Inference', current: 95, average: 82 },
    { name: 'Training', current: 92, average: 78 },
    { name: 'Rendering', current: 88, average: 75 },
    { name: 'FP16', current: 97, average: 85 },
    { name: 'INT8', current: 98, average: 88 },
  ];
  
  // Render star ratings
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        ))}
        {hasHalfStar && (
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        )}
        {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-500" />
        ))}
      </div>
    );
  };
  
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 flex justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[hsl(var(--primary))]" />
      </div>
    );
  }
  
  if (isError || !gpu) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="mb-4 text-lg">GPU not found or an error occurred</p>
            <Button onClick={() => navigate("/marketplace")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6 -ml-2" 
        onClick={() => navigate("/marketplace")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Marketplace
      </Button>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left column: GPU image and provider info */}
        <div className="md:col-span-1">
          <div className="mb-6">
            <img 
              src={gpu.imageUrl || "https://images.unsplash.com/photo-1591405351990-4726e331f141?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"} 
              alt={gpu.name} 
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Provider Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-black font-bold mr-3">
                  P
                </div>
                <div>
                  <p className="font-medium">Provider-{gpu.providerId}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    {renderStars(4.8)}
                    <span className="ml-2">4.8 (86 reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member since</span>
                  <span>March 2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response time</span>
                  <span>~2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Successful jobs</span>
                  <span>512</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uptime</span>
                  <span className="text-[hsl(var(--primary))]">98.7%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column: GPU details and tabs */}
        <div className="md:col-span-2">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold">{gpu.name}</h1>
              <div className="flex items-center">
                <span className={`status-dot ${gpu.isOnline ? 'online' : 'offline'}`}></span>
                <span className={`text-sm ${gpu.isOnline ? 'text-green-500' : 'text-red-500'}`}>
                  {gpu.isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4">
              {gpu.description || `High-performance GPU for AI training and inference tasks.`}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-black/30 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">VRAM</div>
                <div className="font-medium text-lg">{gpu.vram} GB</div>
              </div>
              <div className="bg-black/30 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">CUDA Cores</div>
                <div className="font-medium text-lg">{formatNumber(gpu.cores)}</div>
              </div>
              <div className="bg-black/30 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">TensorScore</div>
                <div className="font-medium text-lg">{gpu.tensorScore.toFixed(1)}</div>
              </div>
              <div className="bg-black/30 p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">Price</div>
                <div className="font-medium text-lg text-[hsl(var(--primary))]">{formatCurrency(gpu.pricePerHour)}/hr</div>
              </div>
            </div>
            
            {gpu.isOnline ? (
              <Button 
                className="w-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-black"
                size="lg"
                asChild={!!user}
                onClick={() => !user && navigate("/login")}
              >
                {user ? (
                  <Link href={`/create-job?gpu=${gpu.id}`}>
                    Rent Now
                  </Link>
                ) : (
                  <>Rent Now</>
                )}
              </Button>
            ) : (
              <Button 
                className="w-full"
                size="lg"
                variant="secondary"
                disabled
              >
                Currently Offline
              </Button>
            )}
          </div>
          
          <Tabs 
            defaultValue="overview" 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="mt-8"
          >
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="overview" className="flex items-center">
                <Cpu className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="specs" className="flex items-center">
                <Award className="h-4 w-4 mr-2" />
                Specs
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-2" />
                Performance
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center">
                <Star className="h-4 w-4 mr-2" />
                Reviews
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>GPU Overview</CardTitle>
                  <CardDescription>
                    Key details about this {gpu.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Description</h3>
                    <p className="text-muted-foreground">
                      {gpu.description || `The ${gpu.name} delivers exceptional performance for deep learning, AI, and high-performance computing workloads. With ${gpu.vram}GB of high-bandwidth memory and ${formatNumber(gpu.cores)} CUDA cores, it's optimized for both training and inference tasks.`}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Best Use Cases</h3>
                    <ul className="space-y-2 ml-5 list-disc text-muted-foreground">
                      <li>Deep learning model training and fine-tuning</li>
                      <li>Large language model inference</li>
                      <li>High-resolution image generation</li>
                      <li>Video transcoding and processing</li>
                      <li>Scientific simulations and data analysis</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Performance Metrics</h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={perfData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <XAxis dataKey="name" stroke="#888" />
                          <YAxis stroke="#888" />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              borderColor: 'hsl(var(--border))' 
                            }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="hsl(var(--primary))" 
                            activeDot={{ r: 8 }} 
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specs">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                  <CardDescription>
                    Detailed specifications of the {gpu.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">GPU Specifications</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-gray-800">
                          <span className="text-muted-foreground">GPU Name</span>
                          <span>{gpu.name}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-800">
                          <span className="text-muted-foreground">VRAM</span>
                          <span>{gpu.vram} GB</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-800">
                          <span className="text-muted-foreground">CUDA Cores</span>
                          <span>{formatNumber(gpu.cores)}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-800">
                          <span className="text-muted-foreground">Architecture</span>
                          <span>{gpu.specifications?.architecture || "Ampere"}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-800">
                          <span className="text-muted-foreground">Boost Clock</span>
                          <span>{gpu.specifications?.boost_clock || "1.7 GHz"}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-800">
                          <span className="text-muted-foreground">Memory Type</span>
                          <span>{gpu.specifications?.memory_type || "GDDR6X"}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-800">
                          <span className="text-muted-foreground">Memory Interface</span>
                          <span>384-bit</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-800">
                          <span className="text-muted-foreground">Memory Bandwidth</span>
                          <span>936 GB/s</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-800">
                          <span className="text-muted-foreground">TDP</span>
                          <span>350W</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Software Compatibility</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-black/20 p-3 rounded-lg flex items-center space-x-2">
                          <Badge variant="outline">CUDA 11.7</Badge>
                        </div>
                        <div className="bg-black/20 p-3 rounded-lg flex items-center space-x-2">
                          <Badge variant="outline">TensorFlow 2.10</Badge>
                        </div>
                        <div className="bg-black/20 p-3 rounded-lg flex items-center space-x-2">
                          <Badge variant="outline">PyTorch 2.0</Badge>
                        </div>
                        <div className="bg-black/20 p-3 rounded-lg flex items-center space-x-2">
                          <Badge variant="outline">ONNX Runtime</Badge>
                        </div>
                        <div className="bg-black/20 p-3 rounded-lg flex items-center space-x-2">
                          <Badge variant="outline">OpenVINO</Badge>
                        </div>
                        <div className="bg-black/20 p-3 rounded-lg flex items-center space-x-2">
                          <Badge variant="outline">TensorRT</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Benchmarks</CardTitle>
                  <CardDescription>
                    Comparative benchmarks for this GPU
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Benchmark Results</h3>
                      <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={benchmarkData}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="name" stroke="#888" />
                            <YAxis stroke="#888" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--card))', 
                                borderColor: 'hsl(var(--border))' 
                              }} 
                            />
                            <Legend />
                            <Bar name="This GPU" dataKey="current" fill="hsl(var(--primary))" />
                            <Bar name="Category Average" dataKey="average" fill="hsl(var(--secondary))" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Framework Performance</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>TensorFlow</span>
                            <span className="text-[hsl(var(--primary))]">Excellent</span>
                          </div>
                          <div className="w-full bg-black/30 rounded-full h-2">
                            <div className="bg-[hsl(var(--primary))] h-2 rounded-full" style={{ width: "95%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>PyTorch</span>
                            <span className="text-[hsl(var(--primary))]">Excellent</span>
                          </div>
                          <div className="w-full bg-black/30 rounded-full h-2">
                            <div className="bg-[hsl(var(--primary))] h-2 rounded-full" style={{ width: "92%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>ONNX Runtime</span>
                            <span className="text-[hsl(var(--primary))]">Very Good</span>
                          </div>
                          <div className="w-full bg-black/30 rounded-full h-2">
                            <div className="bg-[hsl(var(--primary))] h-2 rounded-full" style={{ width: "88%" }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>TensorRT</span>
                            <span className="text-[hsl(var(--primary))]">Excellent</span>
                          </div>
                          <div className="w-full bg-black/30 rounded-full h-2">
                            <div className="bg-[hsl(var(--primary))] h-2 rounded-full" style={{ width: "96%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>User Reviews</CardTitle>
                  <CardDescription>
                    Feedback from clients who have used this GPU
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {reviews && reviews.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="pb-6 border-b border-border">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-black font-bold mr-3">
                                U
                              </div>
                              <div>
                                <p className="font-medium">User-{review.userId}</p>
                                <div className="flex items-center">
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'Recently'}
                            </div>
                          </div>
                          <p className="mt-2 text-muted-foreground">
                            {review.comment || "Great performance for the price. This GPU handled all my deep learning tasks efficiently."}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">No reviews yet</p>
                      <Button disabled={!user}>
                        Be the first to review
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" disabled>
                    <History className="mr-2 h-4 w-4" />
                    Show More Reviews
                  </Button>
                  <Button disabled={!user || user.role !== 'client'}>
                    Write a Review
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Similar GPUs section */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Similar GPUs</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/marketplace">
                  See More
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* This would render similar GPUs from the API in a real app */}
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    You'll see similar GPUs here based on your viewing history
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GpuDetail;
