import { ArrowRight, ShieldCheck, Cpu, Server, Share2, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

const HowItWorks = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4 gradient-text">How DecentraGPU Works</h1>
        <p className="text-xl text-gray-400 mb-8">
          Join the decentralized revolution in AI compute power. Our platform connects GPU owners with AI developers, creating a secure and efficient marketplace.
        </p>
      </div>

      {/* Process Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <Card className="border border-gray-800 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="bg-gradient-to-r from-primary to-secondary w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Share2 className="h-6 w-6 text-black" />
            </div>
            <CardTitle>Connect</CardTitle>
            <CardDescription>
              GPU providers list their hardware specifications and set rental prices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Hardware owners can monetize their idle GPU resources by listing them on our platform with detailed specifications and competitive pricing.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-800 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="bg-gradient-to-r from-primary to-secondary w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Cpu className="h-6 w-6 text-black" />
            </div>
            <CardTitle>Compute</CardTitle>
            <CardDescription>
              Clients rent compute power through secure containerized environments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              AI developers and researchers can browse available GPUs, compare specifications and prices, and rent the most suitable hardware for their workloads.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-800 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="bg-gradient-to-r from-primary to-secondary w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-black" />
            </div>
            <CardTitle>Secure</CardTitle>
            <CardDescription>
              End-to-end encryption and ephemeral environments ensure data privacy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Our platform utilizes advanced security measures including AES-256 encryption, zero-knowledge execution, and automatic data destruction to ensure your intellectual property remains protected.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tech Stack */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Our Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border border-gray-800 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" /> Secure Infrastructure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-4 w-4 mt-1 text-primary" />
                  <span>AES-256 encrypted data transfer</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-4 w-4 mt-1 text-primary" />
                  <span>Ephemeral decryption in secure containers</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-4 w-4 mt-1 text-primary" />
                  <span>One-time execution environments</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-4 w-4 mt-1 text-primary" />
                  <span>Zero-knowledge job execution</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-gray-800 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShieldCheck className="mr-2 h-5 w-5" /> Privacy Guarantees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-4 w-4 mt-1 text-primary" />
                  <span>Client-only key possession</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-4 w-4 mt-1 text-primary" />
                  <span>Encrypted file streaming</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-4 w-4 mt-1 text-primary" />
                  <span>Automatic data destruction</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="mr-2 h-4 w-4 mt-1 text-primary" />
                  <span>Provider hardware verification</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Use Cases */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Perfect For</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-3">AI Researchers</h3>
            <p className="text-gray-400 mb-4">
              Access high-end GPUs for training large language models and computer vision systems.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-3">Data Scientists</h3>
            <p className="text-gray-400 mb-4">
              Run complex data analysis and machine learning algorithms on powerful hardware.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-3">GPU Owners</h3>
            <p className="text-gray-400 mb-4">
              Monetize idle computing resources by renting them out securely to verified clients.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
        <p className="text-xl text-gray-400 mb-8">
          Join our growing community of GPU providers and AI developers today.
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

export default HowItWorks;