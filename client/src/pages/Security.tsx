import { Shield, Lock, RefreshCw, Database, Zap, FileDigit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Security = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-[hsl(var(--primary))] to-[hsl(var(--secondary))]">
          Zero-Knowledge Security Architecture
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Our platform employs end-to-end encryption and containerized isolation to ensure your data and models remain private, even from providers.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
        {/* AES-256 Encrypted Data Transfer */}
        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-black" />
            </div>
            <CardTitle>AES-256 Encrypted Data Transfer</CardTitle>
            <CardDescription>
              Military-grade encryption before data leaves your device
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              All data (models, datasets, configs) is encrypted using AES-256 before leaving the client's device—ensuring that even GPU providers can't view or tamper with it.
            </p>
          </CardContent>
        </Card>

        {/* Ephemeral Decryption Inside Secure Container */}
        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-full flex items-center justify-center mb-4">
              <RefreshCw className="h-6 w-6 text-black" />
            </div>
            <CardTitle>Ephemeral Decryption</CardTitle>
            <CardDescription>
              Data only decrypted inside secure runtime container
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Decryption keys are provided only inside a secure runtime container on the provider's GPU, and only for the job duration—data is never stored in plaintext outside it.
            </p>
          </CardContent>
        </Card>

        {/* One-Time Execution Environment */}
        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-black" />
            </div>
            <CardTitle>One-Time Execution Environment</CardTitle>
            <CardDescription>
              Self-destructing containerized environment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Each job runs in a sandboxed, read-only, and time-limited container. It auto-deletes itself, logs, and data after the task ends—no persistent access for the provider.
            </p>
          </CardContent>
        </Card>

        {/* Zero-Knowledge Job Execution */}
        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-full flex items-center justify-center mb-4">
              <Database className="h-6 w-6 text-black" />
            </div>
            <CardTitle>Zero-Knowledge Job Execution</CardTitle>
            <CardDescription>
              Providers can't access or view your data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Providers can see usage stats (like GPU load) but cannot view or reverse-engineer any input/output data thanks to layered encryption and container isolation.
            </p>
          </CardContent>
        </Card>

        {/* Client-Only Key Possession */}
        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-full flex items-center justify-center mb-4">
              <FileDigit className="h-6 w-6 text-black" />
            </div>
            <CardTitle>Client-Only Key Possession</CardTitle>
            <CardDescription>
              End-to-end confidentiality by design
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Only the client holds the decryption keys, not even the platform. This means end-to-end confidentiality, preventing data leaks even in case of system compromise.
            </p>
          </CardContent>
        </Card>

        {/* On-the-Fly Encrypted File Streaming */}
        <Card>
          <CardHeader>
            <div className="w-12 h-12 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] rounded-full flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-black" />
            </div>
            <CardTitle>On-the-Fly Encrypted File Streaming</CardTitle>
            <CardDescription>
              Files never exist unencrypted on disk
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Input files are streamed encrypted into the container, decrypted in memory, and never written unencrypted to disk—reducing leakage risk to near-zero.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Diagram Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">How Our Security Architecture Works</h2>
        
        <div className="bg-black/30 border border-gray-800 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-[hsl(var(--primary))/20]">
                <h3 className="font-medium mb-2 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-black text-xs mr-2">1</span>
                  Client Side
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="text-[hsl(var(--primary))] mr-2">→</span>
                    Data & model encryption with client-generated AES-256 key
                  </li>
                  <li className="flex items-start">
                    <span className="text-[hsl(var(--primary))] mr-2">→</span>
                    Key itself encrypted with asymmetric container public key
                  </li>
                  <li className="flex items-start">
                    <span className="text-[hsl(var(--primary))] mr-2">→</span>
                    Secure transmission of encrypted package to platform
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-[hsl(var(--primary))/20]">
                <h3 className="font-medium mb-2 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-black text-xs mr-2">2</span>
                  Provider Node
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="text-[hsl(var(--primary))] mr-2">→</span>
                    Secure container instantiated with ephemeral key pair
                  </li>
                  <li className="flex items-start">
                    <span className="text-[hsl(var(--primary))] mr-2">→</span>
                    Container receives encrypted data package
                  </li>
                  <li className="flex items-start">
                    <span className="text-[hsl(var(--primary))] mr-2">→</span>
                    Container decrypts AES key using private key, then decrypts data in memory only
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border border-[hsl(var(--primary))/20]">
                <h3 className="font-medium mb-2 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center text-black text-xs mr-2">3</span>
                  Completion & Cleanup
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <span className="text-[hsl(var(--primary))] mr-2">→</span>
                    Results encrypted with client's public key
                  </li>
                  <li className="flex items-start">
                    <span className="text-[hsl(var(--primary))] mr-2">→</span>
                    Encrypted results sent back to client
                  </li>
                  <li className="flex items-start">
                    <span className="text-[hsl(var(--primary))] mr-2">→</span>
                    <span className="text-red-400">Automatic data wiping and container self-destruction</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Automatic Data & Key Destruction */}
      <div className="bg-black/30 border border-border rounded-lg p-8 mb-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 flex justify-center mb-6 md:mb-0">
            <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-400 rounded-full flex items-center justify-center animate-pulse">
              <Trash2 className="h-12 w-12 text-black" />
            </div>
          </div>
          <div className="md:w-3/4 md:pl-8">
            <h3 className="text-2xl font-bold mb-4">Automatic Data & Key Destruction</h3>
            <p className="text-gray-300 mb-4">
              As soon as a job completes, both input data and runtime keys are securely wiped—triggered by a tamper-proof self-destruct script inside the container. This happens regardless of job outcome (success, failure, or termination).
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                Memory-resident keys are securely erased using zero-filling techniques
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                Container filesystem unmounted and wiped with military-grade secure deletion
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                Self-destruction process continues even if task is forcibly terminated
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                Independent verification ensures complete data erasure for every job
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <div>
        <h2 className="text-2xl font-bold mb-8 text-center">Technical Specifications</h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-card p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Encryption Standards</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex justify-between">
                <span>Data Encryption</span>
                <span className="text-[hsl(var(--primary))]">AES-256-GCM</span>
              </li>
              <li className="flex justify-between">
                <span>Key Exchange</span>
                <span className="text-[hsl(var(--primary))]">RSA-4096 / ECDH P-384</span>
              </li>
              <li className="flex justify-between">
                <span>Hash Functions</span>
                <span className="text-[hsl(var(--primary))]">SHA-512</span>
              </li>
              <li className="flex justify-between">
                <span>Certificate Authority</span>
                <span className="text-[hsl(var(--primary))]">X.509</span>
              </li>
              <li className="flex justify-between">
                <span>Perfect Forward Secrecy</span>
                <span className="text-[hsl(var(--primary))]">Enabled</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-card p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Container Security</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex justify-between">
                <span>Isolation Technology</span>
                <span className="text-[hsl(var(--primary))]">Secure Enclaves / SGX</span>
              </li>
              <li className="flex justify-between">
                <span>Memory Protection</span>
                <span className="text-[hsl(var(--primary))]">ASLR + Stack Canaries</span>
              </li>
              <li className="flex justify-between">
                <span>Filesystem Access</span>
                <span className="text-[hsl(var(--primary))]">Read-only + tmpfs</span>
              </li>
              <li className="flex justify-between">
                <span>Network Security</span>
                <span className="text-[hsl(var(--primary))]">Isolated namespace</span>
              </li>
              <li className="flex justify-between">
                <span>Secure Deletion</span>
                <span className="text-[hsl(var(--primary))]">DoD 5220.22-M compliant</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;