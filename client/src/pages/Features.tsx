import {
  Award,
  Cpu,
  BarChart3,
  AlertCircle,
  Server,
  Leaf,
  AreaChart,
  Shield,
  Network,
  Clock,
  SquareCode,
  Eye,
  Wallet,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FeatureCard = ({ 
  icon, 
  title, 
  description,
  accentColor = "from-primary to-secondary"
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor?: string;
}) => {
  return (
    <Card className="border border-gray-800 bg-card/50 backdrop-blur-sm overflow-hidden group relative">
      <div className={`absolute top-0 left-0 h-1 w-0 bg-gradient-to-r ${accentColor} group-hover:w-full transition-all duration-700`}></div>
      <CardHeader>
        <div className={`bg-gradient-to-r ${accentColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-black`}>
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
};

const FeaturesPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Advanced Platform Features</h1>
        <p className="text-xl text-gray-400 mb-8">
          Discover the cutting-edge capabilities that make DecentraGPU the most powerful decentralized compute platform.
        </p>
      </div>

      {/* Featured Highlight */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center mb-4">
              <Sparkles className="text-primary mr-2 h-5 w-5" />
              <h3 className="text-sm font-medium uppercase tracking-wider">Featured Highlight</h3>
            </div>
            <h2 className="text-3xl font-bold mb-4">Reputation Score System</h2>
            <p className="text-gray-400 mb-6">
              Each provider and client has a dynamic reputation score based on completed jobs, feedback, on-time availability, and dispute history. This comprehensive scoring system helps build long-term trust in the marketplace.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <ChevronRight className="mr-2 h-5 w-5 text-primary mt-0.5" />
                <span>Weighted scoring based on job completion history</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="mr-2 h-5 w-5 text-primary mt-0.5" />
                <span>Transparent feedback system with verified reviews</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="mr-2 h-5 w-5 text-primary mt-0.5" />
                <span>Reliability metrics for uptime and performance</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="mr-2 h-5 w-5 text-primary mt-0.5" />
                <span>Reputation bonuses for consistent providers</span>
              </li>
            </ul>
            <Button asChild className="bg-gradient-to-r from-primary to-secondary text-black">
              <Link href="/marketplace">Browse Trusted Providers</Link>
            </Button>
          </div>
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Award className="text-amber-500 mr-2 h-5 w-5" />
                  <span className="font-medium">Provider Rating</span>
                </div>
                <div className="font-semibold">4.92/5.0</div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>85 completed jobs</span>
                <span>12 reviews</span>
                <span>99.1% uptime</span>
              </div>
              <div className="pt-4 border-t border-gray-700 mt-4">
                <h4 className="font-medium mb-2">Recent Feedback</h4>
                <div className="text-sm text-gray-400">
                  "Excellent GPU performance and reliable uptime. Would definitely rent again for my ML models."
                </div>
                <div className="text-xs text-gray-500 mt-1">DataScientist92 - 2 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        <FeatureCard
          icon={<Cpu className="h-6 w-6" />}
          title="GPU Benchmark Verification"
          description="Auto-run standardized benchmarks on provider GPUs during listing to validate specs (e.g., CUDA cores, memory bandwidth) and detect spoofing."
        />
        
        <FeatureCard
          icon={<Server className="h-6 w-6" />}
          title="Job Snapshot & Rollback"
          description="Allows clients to checkpoint long-running jobs and resume from last snapshot — useful in case of provider failure or container timeout."
          accentColor="from-blue-500 to-indigo-500"
        />
        
        <FeatureCard
          icon={<AlertCircle className="h-6 w-6" />}
          title="Anomaly Detection & Fraud Prevention"
          description="Use lightweight AI models to flag suspicious provider activity — like excessive container restarts, resource underutilization, or job output mismatches."
          accentColor="from-red-500 to-pink-500"
        />
        
        <FeatureCard
          icon={<SquareCode className="h-6 w-6" />}
          title="Custom Docker Environments"
          description="Clients can upload their own Dockerfiles or use templates — ensuring compatibility with specialized frameworks (e.g., PyTorch nightly, JAX, DeepSpeed)."
          accentColor="from-cyan-500 to-blue-500"
        />
        
        <FeatureCard
          icon={<Leaf className="h-6 w-6" />}
          title="Energy Efficiency Mode"
          description="Let providers toggle an eco-mode, favoring clients with low-intensity jobs — optimizing for heat, electricity use, and eco-conscious users."
          accentColor="from-green-500 to-emerald-500"
        />
        
        <FeatureCard
          icon={<AreaChart className="h-6 w-6" />}
          title="Interactive Metrics Dashboard"
          description="Both clients and providers get real-time dashboards with logs, graphs, and alerts — GPU temp, memory, utilization, job runtime, etc."
          accentColor="from-purple-500 to-violet-500"
        />
        
        <FeatureCard
          icon={<Shield className="h-6 w-6" />}
          title="Dispute Resolution Escrow"
          description="Smart contract–based dispute mechanism with third-party arbitrators. If a job fails or gets corrupted, payment is held until both parties agree or arbitration resolves it."
          accentColor="from-amber-500 to-orange-500"
        />
        
        <FeatureCard
          icon={<Network className="h-6 w-6" />}
          title="Multi-GPU & Multi-Node Job Support"
          description="For large jobs, allow clients to parallelize across multiple GPUs or providers with automatic job partitioning and result merging."
          accentColor="from-indigo-500 to-purple-500"
        />
        
        <FeatureCard
          icon={<Clock className="h-6 w-6" />}
          title="Offline Availability Credit"
          description="Providers get credits for declaring downtime in advance — encouraging honesty and planning, and preventing job disruptions."
          accentColor="from-sky-500 to-blue-500"
        />
        
        <FeatureCard
          icon={<BarChart3 className="h-6 w-6" />}
          title="Job Template Marketplace"
          description="Users can share or sell job configuration templates — e.g., 'Stable Diffusion training', 'BERT fine-tuning', etc. with environment + config bundled."
          accentColor="from-teal-500 to-emerald-500"
        />
        
        <FeatureCard
          icon={<Eye className="h-6 w-6" />}
          title="Privacy Visualizer"
          description="Show a real-time visualization of data flow, container runtime, and encryption stages — so users see exactly how secure their job is."
          accentColor="from-rose-500 to-pink-500"
        />
        
        <FeatureCard
          icon={<Wallet className="h-6 w-6" />}
          title="Provider Hardware Wallet Support"
          description="For crypto payouts, support hardware wallets (Ledger, Trezor) directly on payout screen — improving security of provider earnings."
          accentColor="from-amber-500 to-yellow-500"
        />
      </div>

      {/* Call to Action */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Ready to experience the future of GPU computing?</h2>
        <p className="text-xl text-gray-400 mb-8">
          Join our growing ecosystem of AI researchers, data scientists, and GPU providers leveraging our advanced features.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-black">
            <Link href="/marketplace">Browse GPUs</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/register">Become a Provider</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;