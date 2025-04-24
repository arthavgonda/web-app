import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface TerminalProps {
  jobId?: string;
  initialOutput?: string[];
  isRunning?: boolean;
}

const Terminal = ({ jobId, initialOutput = [], isRunning = false }: TerminalProps) => {
  const [output, setOutput] = useState<string[]>(initialOutput);
  const [command, setCommand] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("shell");

  // Simulate terminal output
  useEffect(() => {
    if (isRunning && initialOutput.length === 0) {
      const demoOutput = [
        "Loading model configuration...",
        "Initializing CUDA environment with driver version 12.1",
        "Allocating GPU memory: 12.8 GB VRAM available",
        "Model loaded successfully. Starting training session...",
        "Epoch 1/50: 100%|██████████| 247/247 [01:32<00:00]",
        "Validating: 100%|██████████| 157/157 [00:42<00:00]",
        "Epoch 1/50: mAP@.5=0.423, mAP@.5:.95=0.192, loss=2.87",
        "Saving checkpoint to /workspace/models/epoch1.pt",
        "Starting epoch 2..."
      ];
      
      let index = 0;
      const interval = setInterval(() => {
        if (index < demoOutput.length) {
          setOutput(prev => [...prev, demoOutput[index]]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 1500);
      
      return () => clearInterval(interval);
    }
  }, [isRunning, initialOutput.length]);

  // Auto-scroll to bottom when new output is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim() === "") return;
    
    setOutput(prev => [...prev, `$ ${command}`]);
    
    // Simple command simulation
    if (command.includes("ls")) {
      setOutput(prev => [...prev, "models/  data/  scripts/  output/  README.md"]);
    } else if (command.includes("python")) {
      setOutput(prev => [...prev, "Starting Python script execution..."]);
    } else if (command.includes("nvidia-smi")) {
      setOutput(prev => [...prev, "| NVIDIA-SMI 515.65.01    Driver Version: 515.65.01    CUDA Version: 11.7     |",
        "| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |",
        "| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |",
        "|                               |                      |               MIG M. |",
        "|   0  NVIDIA RTX 3080    On   | 00000000:01:00.0 Off |                  N/A |",
        "| 30%   65C    P2   220W / 320W |  10240MiB / 12288MiB |     85%      Default |"]);
    } else if (command.includes("help")) {
      setOutput(prev => [...prev, "Available commands: ls, python script.py, nvidia-smi, clear"]);
    } else if (command.includes("clear")) {
      setOutput([]);
    } else {
      setOutput(prev => [...prev, `Command not found: ${command}`]);
    }
    
    setCommand("");
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden border border-border">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-border px-4 py-2">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="shell">Shell</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="shell" className="m-0">
          <div className="flex flex-col h-[400px]">
            <div ref={terminalRef} className="terminal flex-grow p-4 overflow-y-auto">
              {output.map((line, index) => (
                <div key={index} className={`terminal-line ${line.startsWith("$") ? "terminal-prompt" : ""}`}>
                  {line.startsWith("$") ? line.substring(2) : line}
                </div>
              ))}
            </div>
            <form onSubmit={handleCommandSubmit} className="border-t border-border p-2 bg-black">
              <div className="flex items-center">
                <span className="text-[hsl(var(--primary))] mr-2">$</span>
                <input
                  type="text"
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  className="flex-grow bg-transparent border-none outline-none text-white font-mono text-sm"
                  placeholder="Enter command..."
                />
              </div>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="logs" className="m-0">
          <div className="h-[400px] overflow-y-auto terminal p-4">
            <div className="terminal-line">[INFO] Session started for job #{jobId || "unknown"}</div>
            <div className="terminal-line">[INFO] Allocated GPU: NVIDIA RTX 3080 (12GB VRAM)</div>
            <div className="terminal-line">[INFO] Container started with CUDA 11.7, TensorFlow 2.10.0</div>
            <div className="terminal-line">[INFO] Mounting storage volume: projects/job-{jobId || "00000"}</div>
            <div className="terminal-line">[INFO] Network access: restricted</div>
            <div className="terminal-line">[WARN] High memory usage detected: 10.2GB/12GB (85%)</div>
            <div className="terminal-line">[INFO] Checkpointing enabled every 15 minutes</div>
            <div className="terminal-line">[INFO] Current billing rate: $1.82/hour</div>
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="m-0">
          <div className="h-[400px] p-4 overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">GPU Utilization</h3>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>VRAM Usage</span>
                <span>10.2 GB / 12 GB</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-[hsl(var(--primary))] h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>GPU Utilization</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-[hsl(var(--secondary))] h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Temperature</span>
                <span>65°C</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Power Consumption</span>
                <span>220W / 320W</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "69%" }}></div>
              </div>
            </div>
            
            <h3 className="text-lg font-medium mt-6 mb-4">Session Info</h3>
            <div className="bg-black/30 p-3 rounded-lg space-y-2 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Job ID:</span>
                <span>{jobId || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Runtime:</span>
                <span>2h 14m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Cost so far:</span>
                <span className="text-[hsl(var(--primary))]">$4.07</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Est. completion:</span>
                <span>1h 3m remaining</span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="border-t border-border p-3 flex justify-between">
        <Button variant="outline" size="sm">
          Pause Job
        </Button>
        <Button variant="destructive" size="sm">
          Terminate
        </Button>
      </div>
    </div>
  );
};

export default Terminal;
