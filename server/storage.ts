import { 
  users, type User, type InsertUser,
  gpus, type Gpu, type InsertGpu,
  jobs, type Job, type InsertJob,
  reviews, type Review, type InsertReview,
  transactions, type Transaction, type InsertTransaction
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // GPU operations
  getGpu(id: number): Promise<Gpu | undefined>;
  getGpus(filters?: Partial<Gpu>): Promise<Gpu[]>;
  getGpusByProviderId(providerId: number): Promise<Gpu[]>;
  createGpu(gpu: InsertGpu): Promise<Gpu>;
  updateGpu(id: number, gpu: Partial<Gpu>): Promise<Gpu | undefined>;
  deleteGpu(id: number): Promise<boolean>;
  
  // Job operations
  getJob(id: number): Promise<Job | undefined>;
  getJobsByClientId(clientId: number): Promise<Job[]>;
  getJobsByGpuId(gpuId: number): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: number, job: Partial<Job>): Promise<Job | undefined>;
  
  // Review operations
  getReview(id: number): Promise<Review | undefined>;
  getReviewsByGpuId(gpuId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  
  // Transaction operations
  getTransaction(id: number): Promise<Transaction | undefined>;
  getTransactionsByUserId(userId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransaction(id: number, transaction: Partial<Transaction>): Promise<Transaction | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private gpus: Map<number, Gpu>;
  private jobs: Map<number, Job>;
  private reviews: Map<number, Review>;
  private transactions: Map<number, Transaction>;
  
  private userIdCounter: number;
  private gpuIdCounter: number;
  private jobIdCounter: number;
  private reviewIdCounter: number;
  private transactionIdCounter: number;

  constructor() {
    this.users = new Map();
    this.gpus = new Map();
    this.jobs = new Map();
    this.reviews = new Map();
    this.transactions = new Map();
    
    this.userIdCounter = 1;
    this.gpuIdCounter = 1;
    this.jobIdCounter = 1;
    this.reviewIdCounter = 1;
    this.transactionIdCounter = 1;
    
    // Add some initial GPUs for demonstration
    this.initializeData();
  }

  private initializeData() {
    // Create some sample providers
    const provider1 = this.createUser({
      username: "crypto_miner92",
      password: "hashedpassword123", // This would be hashed in a real app
      email: "provider1@example.com",
      role: "provider"
    });
    
    const provider2 = this.createUser({
      username: "ai_research_lab",
      password: "hashedpassword456",
      email: "provider2@example.com",
      role: "provider"
    });
    
    const provider3 = this.createUser({
      username: "deep_learner42",
      password: "hashedpassword789",
      email: "provider3@example.com",
      role: "provider"
    });

    // Create some sample GPUs
    this.createGpu({
      providerId: provider1.id,
      name: "NVIDIA RTX 4090",
      vram: 24,
      cores: 16384,
      tensorScore: 98.2,
      pricePerHour: 1.82,
      isOnline: true,
      description: "Top-tier gaming and AI GPU with DLSS 3.0 support",
      specifications: {
        architecture: "Ada Lovelace",
        boost_clock: "2.52 GHz",
        memory_type: "GDDR6X"
      },
      imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });

    this.createGpu({
      providerId: provider2.id,
      name: "NVIDIA A100",
      vram: 80,
      cores: 6912,
      tensorScore: 99.7,
      pricePerHour: 3.74,
      isOnline: true,
      description: "Data center GPU built for AI and HPC workloads",
      specifications: {
        architecture: "Ampere",
        boost_clock: "1.41 GHz",
        memory_type: "HBM2e"
      },
      imageUrl: "https://images.unsplash.com/photo-1647598382205-01d0a7ca05a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });

    this.createGpu({
      providerId: provider3.id,
      name: "NVIDIA RTX 3080 Ti",
      vram: 12,
      cores: 10240,
      tensorScore: 89.3,
      pricePerHour: 0.95,
      isOnline: false,
      description: "Excellent performance for deep learning and gaming",
      specifications: {
        architecture: "Ampere",
        boost_clock: "1.67 GHz",
        memory_type: "GDDR6X"
      },
      imageUrl: "https://images.unsplash.com/photo-1628335903423-61e8886bd8e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
    
    this.createGpu({
      providerId: provider1.id,
      name: "AMD Radeon RX 7900 XTX",
      vram: 24,
      cores: 12288,
      tensorScore: 87.5,
      pricePerHour: 1.25,
      isOnline: true,
      description: "High-end GPU for graphics and compute tasks",
      specifications: {
        architecture: "RDNA 3",
        boost_clock: "2.5 GHz",
        memory_type: "GDDR6"
      },
      imageUrl: "https://images.unsplash.com/photo-1591405351990-4726e331f141?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    });
    
    this.createGpu({
      providerId: provider2.id,
      name: "NVIDIA RTX A6000",
      vram: 48,
      cores: 10752,
      tensorScore: 95.8,
      pricePerHour: 2.75,
      isOnline: true,
      description: "Professional visualization and compute GPU",
      specifications: {
        architecture: "Ampere",
        boost_clock: "1.8 GHz",
        memory_type: "GDDR6"
      },
      imageUrl: "https://images.unsplash.com/photo-1591488320409-993e1917e860?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }

  async createUser(userData: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const createdAt = new Date();
    const user: User = { ...userData, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  // GPU methods
  async getGpu(id: number): Promise<Gpu | undefined> {
    return this.gpus.get(id);
  }

  async getGpus(filters?: Partial<Gpu>): Promise<Gpu[]> {
    let gpus = Array.from(this.gpus.values());
    
    if (filters) {
      if (filters.isOnline !== undefined) {
        gpus = gpus.filter(gpu => gpu.isOnline === filters.isOnline);
      }
      
      if (filters.name) {
        gpus = gpus.filter(gpu => gpu.name.toLowerCase().includes(filters.name!.toLowerCase()));
      }
      
      if (filters.vram) {
        gpus = gpus.filter(gpu => gpu.vram >= filters.vram!);
      }
      
      if (filters.pricePerHour) {
        gpus = gpus.filter(gpu => gpu.pricePerHour <= filters.pricePerHour!);
      }
    }
    
    return gpus;
  }

  async getGpusByProviderId(providerId: number): Promise<Gpu[]> {
    return Array.from(this.gpus.values()).filter(
      (gpu) => gpu.providerId === providerId
    );
  }

  async createGpu(gpuData: InsertGpu): Promise<Gpu> {
    const id = this.gpuIdCounter++;
    const createdAt = new Date();
    const gpu: Gpu = { ...gpuData, id, createdAt };
    this.gpus.set(id, gpu);
    return gpu;
  }

  async updateGpu(id: number, gpuData: Partial<Gpu>): Promise<Gpu | undefined> {
    const gpu = this.gpus.get(id);
    if (!gpu) return undefined;
    
    const updatedGpu = { ...gpu, ...gpuData };
    this.gpus.set(id, updatedGpu);
    return updatedGpu;
  }

  async deleteGpu(id: number): Promise<boolean> {
    return this.gpus.delete(id);
  }

  // Job methods
  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async getJobsByClientId(clientId: number): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(
      (job) => job.clientId === clientId
    );
  }

  async getJobsByGpuId(gpuId: number): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(
      (job) => job.gpuId === gpuId
    );
  }

  async createJob(jobData: InsertJob): Promise<Job> {
    const id = this.jobIdCounter++;
    const createdAt = new Date();
    const job: Job = { 
      ...jobData, 
      id, 
      createdAt,
      startTime: null,
      endTime: null,
      totalCost: null,
      resultsUrl: null
    };
    this.jobs.set(id, job);
    return job;
  }

  async updateJob(id: number, jobData: Partial<Job>): Promise<Job | undefined> {
    const job = this.jobs.get(id);
    if (!job) return undefined;
    
    const updatedJob = { ...job, ...jobData };
    this.jobs.set(id, updatedJob);
    return updatedJob;
  }

  // Review methods
  async getReview(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }

  async getReviewsByGpuId(gpuId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.gpuId === gpuId
    );
  }

  async createReview(reviewData: InsertReview): Promise<Review> {
    const id = this.reviewIdCounter++;
    const createdAt = new Date();
    const review: Review = { ...reviewData, id, createdAt };
    this.reviews.set(id, review);
    return review;
  }

  // Transaction methods
  async getTransaction(id: number): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async getTransactionsByUserId(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      (transaction) => transaction.userId === userId
    );
  }

  async createTransaction(transactionData: InsertTransaction): Promise<Transaction> {
    const id = this.transactionIdCounter++;
    const createdAt = new Date();
    const transaction: Transaction = { ...transactionData, id, createdAt };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async updateTransaction(id: number, transactionData: Partial<Transaction>): Promise<Transaction | undefined> {
    const transaction = this.transactions.get(id);
    if (!transaction) return undefined;
    
    const updatedTransaction = { ...transaction, ...transactionData };
    this.transactions.set(id, updatedTransaction);
    return updatedTransaction;
  }
}

export const storage = new MemStorage();
