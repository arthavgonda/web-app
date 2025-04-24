import { useState } from "react";
import { 
  Code, 
  FileCode, 
  Server, 
  Lock, 
  Cpu, 
  Terminal, 
  Settings, 
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Book,
  Wrench
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DocsPage = () => {
  const [activeTab, setActiveTab] = useState("guides");

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Documentation</h1>
        <p className="text-xl text-gray-400">
          Comprehensive guides and API references for DecentraGPU
        </p>
      </div>

      <Tabs defaultValue="guides" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
          <TabsTrigger value="guides" className="flex items-center gap-2">
            <Book className="h-4 w-4" /> Guides
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Code className="h-4 w-4" /> API
          </TabsTrigger>
          <TabsTrigger value="sdk" className="flex items-center gap-2">
            <FileCode className="h-4 w-4" /> SDK
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" /> FAQ
          </TabsTrigger>
        </TabsList>

        {/* Guides Content */}
        <TabsContent value="guides" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 space-y-4">
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#getting-started" className="text-primary hover:underline flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Getting Started
                    </a>
                  </li>
                  <li>
                    <a href="#provider-guides" className="text-primary hover:underline flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Provider Guides
                    </a>
                  </li>
                  <li>
                    <a href="#client-guides" className="text-primary hover:underline flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Client Guides
                    </a>
                  </li>
                  <li>
                    <a href="#security-guides" className="text-primary hover:underline flex items-center">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Security Best Practices
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-4">Popular Topics</h3>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary transition">
                      Setting up a provider node
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary transition">
                      Creating your first job
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary transition">
                      Optimizing GPU performance
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary transition">
                      Understanding encryption
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary transition">
                      Payment processing
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="col-span-2 space-y-8">
              <div id="getting-started">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Terminal className="mr-2 h-5 w-5" /> Getting Started
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p>
                    DecentraGPU is a decentralized marketplace for GPU compute resources, 
                    enabling AI developers to access high-performance hardware while 
                    providing GPU owners an opportunity to monetize their resources.
                  </p>
                  
                  <h3>Quick Start</h3>
                  <ol>
                    <li>Create an account by signing up on the platform</li>
                    <li>Choose your role: Provider (rent out GPUs) or Client (rent GPUs)</li>
                    <li>Complete account verification process</li>
                    <li>
                      As a provider: List your hardware details and pricing
                      <br />
                      As a client: Browse available GPUs and create your first job
                    </li>
                  </ol>
                </div>
              </div>
              
              <div id="provider-guides">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Server className="mr-2 h-5 w-5" /> Provider Guides
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Hardware Requirements</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">Minimum requirements for GPU providers:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>NVIDIA GPU with CUDA support (RTX 2000 series or newer)</li>
                        <li>8GB+ VRAM for most workloads</li>
                        <li>Stable internet connection (100Mbps+ recommended)</li>
                        <li>24/7 system availability for optimal earnings</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Setting Up Your Provider Node</AccordionTrigger>
                    <AccordionContent>
                      <p>Our provider software automatically configures your system with:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Secure container environment for job isolation</li>
                        <li>Encryption protocols for data protection</li>
                        <li>Automatic billing and time tracking</li>
                        <li>Performance monitoring and optimization</li>
                      </ul>
                      <div className="bg-gray-800 p-3 rounded-md mt-3 font-mono text-sm overflow-x-auto">
                        <pre>curl -sSL https://decentragpu.io/install.sh | sudo bash</pre>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Optimizing Provider Earnings</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-3">Maximize your GPU rental income with these strategies:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Set competitive pricing based on hardware capabilities</li>
                        <li>Ensure 24/7 availability to capture more jobs</li>
                        <li>Optimize cooling for better performance and longevity</li>
                        <li>Monitor performance metrics and adjust pricing accordingly</li>
                        <li>Build positive reviews through reliable service</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div id="client-guides">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Cpu className="mr-2 h-5 w-5" /> Client Guides
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Creating Your First Job</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-3">Follow these steps to submit your first compute job:</p>
                      <ol className="list-decimal pl-6 space-y-1">
                        <li>Browse the marketplace to find a suitable GPU</li>
                        <li>Review provider specifications and pricing</li>
                        <li>Create a new job with your code and datasets</li>
                        <li>Configure environment settings and frameworks</li>
                        <li>Submit the job and monitor progress in real-time</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Supported Frameworks</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">DecentraGPU supports all major AI and ML frameworks:</p>
                      <ul className="list-disc pl-6 space-y-1 grid grid-cols-2">
                        <li>PyTorch</li>
                        <li>TensorFlow</li>
                        <li>JAX</li>
                        <li>ONNX</li>
                        <li>scikit-learn</li>
                        <li>Keras</li>
                        <li>MXNet</li>
                        <li>Caffe</li>
                      </ul>
                      <p className="mt-3">Custom environments are also supported via Docker.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Managing Compute Costs</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-3">Control your spending with these strategies:</p>
                      <ul className="list-disc pl-6 space-y-1">
                        <li>Use automatic shutdown on job completion</li>
                        <li>Set budget limits for each job</li>
                        <li>Optimize code to reduce runtime</li>
                        <li>Choose GPUs appropriate for your workload</li>
                        <li>Schedule jobs during off-peak hours for better rates</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              
              <div id="security-guides">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Lock className="mr-2 h-5 w-5" /> Security Best Practices
                </h2>
                <div className="prose prose-invert max-w-none">
                  <p>
                    DecentraGPU employs state-of-the-art security to protect your data and models.
                    Here are key security features and recommendations:
                  </p>
                  
                  <h3>Data Encryption</h3>
                  <p>
                    All data is encrypted with AES-256 in transit and at rest. Your encryption keys 
                    are only available to you, ensuring zero-knowledge execution.
                  </p>
                  
                  <h3>Secure Environments</h3>
                  <p>
                    Jobs run in isolated containers with ephemeral storage. After job completion, 
                    all data is permanently erased from provider systems.
                  </p>
                  
                  <h3>Client Recommendations</h3>
                  <ul>
                    <li>Use secure API keys and rotate them regularly</li>
                    <li>Encrypt sensitive data before uploading</li>
                    <li>Review provider ratings and security metrics</li>
                    <li>Utilize network isolation for sensitive workloads</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* API Content */}
        <TabsContent value="api" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 space-y-4">
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-4">API Reference</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center">
                      <Code className="h-4 w-4 mr-2" />
                      Authentication
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center">
                      <Code className="h-4 w-4 mr-2" />
                      GPUs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center">
                      <Code className="h-4 w-4 mr-2" />
                      Jobs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center">
                      <Code className="h-4 w-4 mr-2" />
                      Transactions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center">
                      <Code className="h-4 w-4 mr-2" />
                      Metrics
                    </a>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-4">Tools</h3>
                <ul className="space-y-1">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary transition flex items-center gap-2">
                      <Wrench className="h-4 w-4" />
                      API Explorer
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-primary transition flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      API Management
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="col-span-2">
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                <h2 className="text-2xl font-bold mb-6">DecentraGPU REST API</h2>
                <p className="mb-6">
                  Our comprehensive REST API allows you to programmatically interact with the DecentraGPU platform.
                  Generate API keys in your account settings to get started.
                </p>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">Authentication</h3>
                  <div className="bg-gray-800 p-4 rounded-md font-mono text-sm mb-4 overflow-x-auto">
                    <pre>{`curl -X POST https://api.decentragpu.io/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"apiKey": "YOUR_API_KEY", "apiSecret": "YOUR_API_SECRET"}'`}</pre>
                  </div>
                  <p className="text-gray-400">
                    Returns a JWT token valid for 24 hours. Use this token in the Authorization header for subsequent requests.
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">Example: List Available GPUs</h3>
                  <div className="bg-gray-800 p-4 rounded-md font-mono text-sm mb-4 overflow-x-auto">
                    <pre>{`curl -X GET https://api.decentragpu.io/gpus \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json"`}</pre>
                  </div>
                  <p className="text-gray-400">
                    Returns an array of available GPUs with specifications and pricing details.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Example: Submit a Job</h3>
                  <div className="bg-gray-800 p-4 rounded-md font-mono text-sm mb-4 overflow-x-auto">
                    <pre>{`curl -X POST https://api.decentragpu.io/jobs \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "gpuId": 1234,
    "jobConfig": {
      "framework": "pytorch",
      "datasetUrl": "s3://your-bucket/dataset.zip",
      "scriptUrl": "s3://your-bucket/script.py",
      "environment": {
        "BATCH_SIZE": "64",
        "LEARNING_RATE": "0.001"
      }
    }
  }'`}</pre>
                  </div>
                  <p className="text-gray-400">
                    Submits a new job to the specified GPU and returns the job details including ID and status.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* SDK Content */}
        <TabsContent value="sdk" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-1 space-y-4">
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                <h3 className="text-lg font-semibold mb-4">SDK Libraries</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center">
                      <FileCode className="h-4 w-4 mr-2" />
                      Python SDK
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center">
                      <FileCode className="h-4 w-4 mr-2" />
                      JavaScript SDK
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline flex items-center">
                      <FileCode className="h-4 w-4 mr-2" />
                      CLI Tool
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="col-span-2">
              <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
                <h2 className="text-2xl font-bold mb-6">DecentraGPU SDK</h2>
                <p className="mb-6">
                  Our SDK libraries provide convenient wrappers around our REST API, making
                  it easy to integrate DecentraGPU into your applications and workflows.
                </p>
                
                <Tabs defaultValue="python">
                  <TabsList>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="cli">CLI</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="python" className="mt-4">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">Installation</h3>
                      <div className="bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                        <pre>pip install decentragpu-sdk</pre>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">Usage Example</h3>
                      <div className="bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                        <pre>{`from decentragpu import DecentraGPUClient

# Initialize client
client = DecentraGPUClient(api_key="YOUR_API_KEY", api_secret="YOUR_API_SECRET")

# List available GPUs
gpus = client.gpus.list(min_vram=16, is_online=True)

# Submit a job
job = client.jobs.create(
    gpu_id=gpus[0].id,
    job_config={
        "framework": "pytorch",
        "script_path": "./train.py",
        "dataset_path": "./data/",
        "environment": {
            "BATCH_SIZE": "64",
            "LEARNING_RATE": "0.001"
        }
    }
)

# Monitor job status
status = client.jobs.get_status(job.id)
print(f"Job status: {status}")`}</pre>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="javascript" className="mt-4">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">Installation</h3>
                      <div className="bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                        <pre>npm install decentragpu-sdk</pre>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">Usage Example</h3>
                      <div className="bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                        <pre>{`import { DecentraGPUClient } from 'decentragpu-sdk';

// Initialize client
const client = new DecentraGPUClient({
  apiKey: 'YOUR_API_KEY',
  apiSecret: 'YOUR_API_SECRET'
});

// List available GPUs
async function findAndRunJob() {
  try {
    const gpus = await client.gpus.list({
      minVram: 16,
      isOnline: true
    });
    
    // Submit a job
    const job = await client.jobs.create({
      gpuId: gpus[0].id,
      jobConfig: {
        framework: 'pytorch',
        scriptUrl: 's3://your-bucket/script.py',
        datasetUrl: 's3://your-bucket/dataset.zip',
        environment: {
          BATCH_SIZE: '64',
          LEARNING_RATE: '0.001'
        }
      }
    });
    
    // Monitor job status
    const status = await client.jobs.getStatus(job.id);
    console.log(\`Job status: \${status}\`);
  } catch (error) {
    console.error('Error:', error);
  }
}

findAndRunJob();`}</pre>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="cli" className="mt-4">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">Installation</h3>
                      <div className="bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                        <pre>npm install -g decentragpu-cli</pre>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">Configuration</h3>
                      <div className="bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                        <pre>decentragpu config set-key YOUR_API_KEY YOUR_API_SECRET</pre>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">Usage Examples</h3>
                      <div className="bg-gray-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                        <pre>{`# List available GPUs
decentragpu gpus list --min-vram 16 --online-only

# Submit a job
decentragpu jobs create --gpu-id 1234 --script ./train.py --dataset ./data/ --env BATCH_SIZE=64,LEARNING_RATE=0.001

# Check job status
decentragpu jobs status 5678

# Download job results
decentragpu jobs download-results 5678 ./results/`}</pre>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* FAQ Content */}
        <TabsContent value="faq" className="mt-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="faq-1">
                <AccordionTrigger>What types of GPUs are supported on the platform?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    DecentraGPU supports a wide range of NVIDIA and AMD GPUs. For NVIDIA, we support RTX 2000 series and newer, including RTX 3090, 4090, and A100 models. For AMD, we support RX 6000 series and newer. The platform works best with GPUs that have at least 8GB of VRAM, though smaller GPUs can still be listed for less demanding workloads.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq-2">
                <AccordionTrigger>How is my data protected when running on someone else's GPU?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Your data and code are protected through multiple layers of security:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>AES-256 encryption for all data in transit and at rest</li>
                    <li>Zero-knowledge execution where only you hold the encryption keys</li>
                    <li>Ephemeral secure containers that isolate your workload</li>
                    <li>Complete data wiping after job completion</li>
                    <li>Secure boot verification of provider hardware</li>
                  </ul>
                  <p className="mt-2">
                    Our architecture ensures that GPU providers cannot access or view your code, data, or results.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq-3">
                <AccordionTrigger>What happens if a job fails or a GPU goes offline?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    If a job fails due to provider issues (such as the GPU going offline), you are not charged for the incomplete computation time. Our platform continuously monitors job status and handles failures gracefully:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Automatic checkpointing saves progress at regular intervals</li>
                    <li>Job can be automatically restarted on another GPU if available</li>
                    <li>You're only billed for successful computation time</li>
                    <li>Providers with frequent failures receive lower ratings and visibility</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq-4">
                <AccordionTrigger>How do payments work for providers and clients?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Our payment system is designed to be fair and transparent:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>For Clients:</strong> You pre-load your account with funds or connect a payment method. You are charged only for the actual computation time used, billed by the second.</li>
                    <li><strong>For Providers:</strong> You receive 95% of the rental fees. Earnings are calculated in real-time and paid out weekly to your connected account.</li>
                  </ul>
                  <p className="mt-2">
                    All transactions are recorded on the platform for transparency and tax purposes. Clients can set budget limits to prevent unexpected charges.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq-5">
                <AccordionTrigger>Can I use DecentraGPU for any type of workload?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    DecentraGPU supports a wide range of AI, ML, and computational workloads, but there are some limitations:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li><strong>Permitted:</strong> AI model training and inference, machine learning, scientific computing, rendering, and similar computational tasks</li>
                    <li><strong>Not Permitted:</strong> Cryptocurrency mining, illegal content processing, or any activities that violate our terms of service</li>
                  </ul>
                  <p className="mt-2">
                    The platform is optimized for data science and AI workloads but can be used for other GPU-accelerated computing tasks as well.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq-6">
                <AccordionTrigger>What frameworks and software are supported?</AccordionTrigger>
                <AccordionContent>
                  <p>
                    DecentraGPU supports all major AI and machine learning frameworks, including:
                  </p>
                  <ul className="list-disc pl-6 mt-2 grid grid-cols-2 gap-x-4">
                    <li>PyTorch</li>
                    <li>TensorFlow</li>
                    <li>JAX</li>
                    <li>ONNX</li>
                    <li>Keras</li>
                    <li>MXNet</li>
                    <li>scikit-learn</li>
                    <li>Caffe</li>
                  </ul>
                  <p className="mt-2">
                    We also support custom Docker containers, allowing you to use virtually any software stack that runs on Linux.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-6">
                Don't see your question answered here?
              </p>
              <Button>Contact Support</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocsPage;